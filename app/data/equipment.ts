/**
 * Carrier machines a screener is designed to be loaded by.
 *
 * `scale` sets the rendered width, derived from how TALL the machine stands in
 * its photo rather than how long it is. Scaling by length made the 323D
 * dominate the row: its boom is raised, so its crop is nearly square, while a
 * wheel loader's crop is long and low. Matching apparent height instead makes
 * two machines of similar size read as similar size.
 *
 * All three rows share one reference (the Cat 930 = 1), not one per row, so the
 * same machine is drawn the same size wherever it appears and a mini row stays
 * visibly smaller than a full-size one.
 *
 * NOTE: these are Caterpillar product photographs used to show what the
 * screener works with. Confirm you are cleared to publish them.
 */

export type Machine = {
  name: string;
  image: string;
  /** 1 = the biggest machine in the row. */
  scale: number;
  /** Intrinsic pixel size, so the row reserves its space before the PNG lands. */
  width: number;
  height: number;
};

/** Full-size carriers for the SLG 108, ordered biggest to smallest. */
export const fullSizeEquipment: Machine[] = [
  { name: "Cat 323D excavator", image: "/images/equipment/cat-323d.png", scale: 0.86, width: 724, height: 692 },
  { name: "Cat 930 wheel loader", image: "/images/equipment/cat-930.png", scale: 1, width: 769, height: 467 },
  { name: "Cat 420F2 backhoe loader", image: "/images/equipment/cat-420f2.png", scale: 0.91, width: 681, height: 476 },
  { name: "Cat 308 excavator", image: "/images/equipment/cat-308.png", scale: 0.67, width: 612, height: 446 },
  { name: "Cat 907 compact wheel loader", image: "/images/equipment/cat-907.png", scale: 0.67, width: 650, height: 459 },
  { name: "Cat 259D3 compact track loader", image: "/images/equipment/cat-259d3.png", scale: 0.44, width: 504, height: 432 },
];

/**
 * Compact carriers for the SLG 78, ordered biggest to smallest.
 * The scales stay consistent with the full-size row: every machine is measured
 * against the same real-world reference, only renormalised to this group.
 */
export const compactEquipment: Machine[] = [
  { name: "Cat 308 excavator", image: "/images/equipment/cat-308.png", scale: 0.67, width: 612, height: 446 },
  { name: "Cat 907 compact wheel loader", image: "/images/equipment/cat-907.png", scale: 0.67, width: 650, height: 459 },
  { name: "Kubota B26 backhoe loader", image: "/images/equipment/kubota-b26.png", scale: 0.7, width: 657, height: 412 },
  { name: "Cat 259D3 compact track loader", image: "/images/equipment/cat-259d3.png", scale: 0.44, width: 504, height: 432 },
];

/** Mini carriers for the SLG 56, ordered biggest to smallest. */
export const miniEquipment: Machine[] = [
  { name: "Compact tractor with loader", image: "/images/equipment/tractor-loader.png", scale: 0.37, width: 446, height: 424 },
  { name: "Kubota K008 micro excavator", image: "/images/equipment/kubota-k008.png", scale: 0.21, width: 291, height: 438 },
  { name: "Kubota SCL1000 stand-on track loader", image: "/images/equipment/kubota-scl1000.png", scale: 0.34, width: 640, height: 474 },
];
