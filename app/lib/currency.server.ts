import { headers } from "next/headers";
import {
  COUNTRY_HEADER,
  CURRENCY_HEADER,
  DEFAULT_CURRENCY,
  parseCurrency,
  type Currency,
} from "./currency";

export type CurrencyContext = {
  currency: Currency;
  /** ISO country the request was placed in, when the platform reported one. */
  country: string | null;
};

/**
 * The currency for the request being rendered.
 *
 * `proxy.ts` has already done the deciding; this only reads the result. Reading
 * the header opts the page into dynamic rendering, which is what we want: a
 * cached page would show one country's prices to the other's visitors.
 */
export async function getCurrencyContext(): Promise<CurrencyContext> {
  const headerList = await headers();

  return {
    currency: parseCurrency(headerList.get(CURRENCY_HEADER)) ?? DEFAULT_CURRENCY,
    country: headerList.get(COUNTRY_HEADER),
  };
}

export async function getCurrency(): Promise<Currency> {
  return (await getCurrencyContext()).currency;
}
