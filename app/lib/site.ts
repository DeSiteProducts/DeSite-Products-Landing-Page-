/**
 * Where this site lives.
 *
 * Everything canonical hangs off this: the canonical link, the sitemap, the
 * absolute URLs inside the structured data and the Open Graph image. Set
 * NEXT_PUBLIC_SITE_URL in the deployment environment to the real origin, with
 * no trailing slash. Getting it wrong is worse than leaving it: a canonical
 * pointing at a domain you do not control tells Google to index that one.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://desiteproducts.com"
).replace(/\/$/, "");

export const SITE_NAME = "DeSite Products";

export const PHONES = ["+1-877-254-7903", "+1-806-500-3915"];

export function absolute(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
