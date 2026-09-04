/**
 * Currency shown to the visitor.
 *
 * DeSite publishes two list prices: one in US dollars and one in Canadian
 * dollars. Which one a visitor sees is decided from the country their request
 * comes from, and from nothing else — there is no switch and nothing to pick.
 * See `proxy.ts` for the detection.
 *
 * This module is shared by the proxy (edge runtime), server components and
 * client components, so it must stay free of any Node or React import.
 */

export type Currency = "USD" | "CAD";

export const CURRENCIES = {
  USD: {
    code: "USD",
    /** Locale used to format the amount, so CAD is not printed as "CA$". */
    locale: "en-US",
    label: "USD",
    /** Shown under the price. */
    note: "USD, before freight",
  },
  CAD: {
    code: "CAD",
    locale: "en-CA",
    label: "CAD",
    note: "CAD, before freight",
  },
} as const satisfies Record<Currency, { code: Currency; locale: string; label: string; note: string }>;

/** Request header the proxy forwards with the resolved currency. */
export const CURRENCY_HEADER = "x-desite-currency";

/** Request header the proxy forwards with the detected ISO country, for the lead email. */
export const COUNTRY_HEADER = "x-desite-country";

/** Countries priced in Canadian dollars. Everywhere else pays in US dollars. */
const CAD_COUNTRIES = new Set(["CA"]);

export const DEFAULT_CURRENCY: Currency = "USD";

export function isCurrency(value: unknown): value is Currency {
  return value === "USD" || value === "CAD";
}

export function parseCurrency(value: string | null | undefined): Currency | null {
  if (!value) return null;
  const upper = value.trim().toUpperCase();
  return isCurrency(upper) ? upper : null;
}

/**
 * ISO 3166-1 alpha-2 country to currency. An unknown or missing country falls
 * back to US dollars, which is what the rest of the world is quoted in.
 */
export function currencyForCountry(country: string | null | undefined): Currency {
  if (!country) return DEFAULT_CURRENCY;
  return CAD_COUNTRIES.has(country.trim().toUpperCase()) ? "CAD" : DEFAULT_CURRENCY;
}

/**
 * "$14,900". Whole dollars only: these are list prices, never cents.
 */
export function formatPrice(amount: number, currency: Currency): string {
  return new Intl.NumberFormat(CURRENCIES[currency].locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
