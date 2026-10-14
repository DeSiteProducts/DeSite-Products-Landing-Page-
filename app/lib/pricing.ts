/** Early Black Friday discount, applied to the original list price. */
export function salePrice(originalPrice: number, override?: number): number {
  return override ?? Math.round(originalPrice * 90) / 100;
}
