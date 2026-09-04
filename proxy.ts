import { NextResponse, type NextRequest } from "next/server";
import {
  COUNTRY_HEADER,
  CURRENCY_HEADER,
  currencyForCountry,
} from "./app/lib/currency";

/**
 * Decides, per request, whether the visitor is quoted in US or Canadian dollars.
 * The visitor is never asked and cannot choose: a request from Canada is priced
 * in CAD, every other request in USD.
 *
 * `proxy.ts` is Next 16's name for what used to be `middleware.ts`.
 *
 * The country never comes from the app itself: it is put on the request by
 * whatever CDN or platform sits in front of us, and each one spells the header
 * differently. We read all of the common ones so the site prices correctly on
 * Vercel, Cloudflare, Netlify, CloudFront, Fastly or App Engine without any
 * further configuration.
 */
const COUNTRY_HEADERS = [
  "x-vercel-ip-country", // Vercel
  "cf-ipcountry", // Cloudflare
  "cloudfront-viewer-country", // AWS CloudFront
  "fastly-client-geo-country", // Fastly
  "x-appengine-country", // Google App Engine
  "x-country-code", // Akamai and several reverse proxies
  "x-geo-country",
  "x-client-geo-country",
];

/** Netlify ships geo as base64-encoded JSON in a single header. */
function countryFromNetlify(request: NextRequest): string | null {
  const raw = request.headers.get("x-nf-geo");
  if (!raw) return null;
  try {
    const json = JSON.parse(
      typeof atob === "function" ? atob(raw) : Buffer.from(raw, "base64").toString("utf8")
    );
    const code = json?.country?.code;
    return typeof code === "string" ? code : null;
  } catch {
    return null;
  }
}

function countryFromHeaders(request: NextRequest): string | null {
  for (const name of COUNTRY_HEADERS) {
    const value = request.headers.get(name)?.trim();
    // Cloudflare sends "XX" for requests it cannot place, and "T1" for Tor.
    if (value && value.length === 2 && value !== "XX" && value !== "T1") {
      return value.toUpperCase();
    }
  }
  return countryFromNetlify(request);
}

/**
 * Last resort when no CDN sits in front of us — local development, a bare
 * Node host. `en-CA` or `fr-CA` at the top of Accept-Language is a decent
 * signal, and it is the only one available without calling out to a
 * geolocation service on every render.
 */
function countryFromLanguage(request: NextRequest): string | null {
  const header = request.headers.get("accept-language");
  if (!header) return null;

  const best = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim(), q: q ? Number(q.split("=")[1]) || 0 : 1 };
    })
    .filter((l) => l.tag && l.tag !== "*")
    .sort((a, b) => b.q - a.q)[0];

  const region = best?.tag.split("-")[1];
  return region && region.length === 2 ? region.toUpperCase() : null;
}

export function proxy(request: NextRequest) {
  const country = countryFromHeaders(request) ?? countryFromLanguage(request);

  // Forwarded on the request itself, so the page renders the right currency on
  // this very response rather than one navigation later. Nothing is persisted:
  // every request is priced from where that request came from.
  const headers = new Headers(request.headers);
  headers.set(CURRENCY_HEADER, currencyForCountry(country));
  if (country) headers.set(COUNTRY_HEADER, country);

  return NextResponse.next({ request: { headers } });
}

export const config = {
  /**
   * Everything except Next's own assets and files in /public. The quote API is
   * included on purpose: the lead email records the currency the visitor was
   * shown, and this is where that comes from.
   */
  matcher: ["/((?!_next/static|_next/image|images|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|txt|xml)$).*)"],
};
