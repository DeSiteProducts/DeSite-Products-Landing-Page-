/** Round discounted prices to the nearest hundred; preserve explicit offers. */
export function salePrice(originalPrice: number, override?: number): number {
  return override ?? Math.round((originalPrice * 0.9) / 100) * 100;
}
