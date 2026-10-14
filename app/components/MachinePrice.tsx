import { CURRENCIES, formatPrice, type Currency } from "../lib/currency";
import { salePrice } from "../lib/pricing";

export default function MachinePrice({ originalPrice, currency, offerPrice }: {
  originalPrice: number;
  currency: Currency;
  offerPrice?: number;
}) {
  return (
    <div>
      <p className="font-display text-4xl font-extrabold leading-none text-white">
        <span className="sr-only">Sale price: </span>
        {formatPrice(salePrice(originalPrice, offerPrice), currency)}
        <span className="ml-2 align-middle text-base font-bold text-white/70">
          {CURRENCIES[currency].label}
        </span>
      </p>
      <p className="mt-3 text-xl font-semibold text-white/70">
        <span className="sr-only">Original price: </span>
        <del className="decoration-2">{formatPrice(originalPrice, currency)} {CURRENCIES[currency].label}</del>
      </p>
    </div>
  );
}
