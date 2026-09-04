export type Screener = {
  slug: string;
  name: string;
  /** Positioning line shown above the model name. */
  family: string;
  badge?: string;
  featured?: boolean;
  /** List price, before freight and tax. */
  price: string;
  /** Product photograph on a transparent background. */
  image: string;
  imageAlt: string;
  highlights: string[];
  /** `unit` renders small next to the value (e.g. 6 × 10 ft). */
  specs: { label: string; value: string; unit?: string }[];
  bestFor: string[];
};

/** Shared material list published for the SLG 78 and SLG 108. */
const materials = [
  "Wood mulch",
  "Decorative stone",
  "Road gravel",
  "Erosion control rock",
  "Ground asphalt",
  "Crushed concrete",
];

/**
 * All three models are real DeSite products. Specs come from:
 *   https://desiteproducts.com/slg-108/
 *   https://desiteproducts.com/slg-78static/
 *   https://desiteproducts.com/slg-56/
 */
export const screeners: Screener[] = [
  {
    slug: "slg-108",
    image: "/images/slg-108.png",
    imageAlt: "DeSite SLG 108 screener with its galvanised riser box and tilting mesh deck.",
    name: "SLG 108",
    family: "Full-size equipment",
    price: "$14,900",
    highlights: [
      "Tilting deck adjusts from 45° to 30°",
      "Takes buckets from 84 to 108 in",
      "Cantilevered spring suspension and feed deflector",
      "Optional galvanized riser box, 5 yd per side",
    ],
    specs: [
      { label: "Production (yd³/hr)", value: "50–80" },
      { label: "Screen deck", value: "6 × 10", unit: "ft" },
      { label: "Weight (lb)", value: "4,300" },
    ],
    bestFor: materials,
  },
  {
    slug: "slg-78",
    image: "/images/slg-78.png",
    imageAlt: "DeSite SLG 78 screener with fork pockets and a tilting mesh deck.",
    name: "SLG 78",
    family: "Compact equipment",
    price: "$7,900",
    featured: true,
    highlights: [
      "Tilting deck adjusts from 45° to 30°",
      "Harmonic spring suspension resists clogging",
      "Riser box on or off in under 5 minutes",
      "Fits skid steers, tractors and compact loaders",
    ],
    specs: [
      { label: "Production (yd³/hr)", value: "30–50" },
      { label: "Screen deck", value: "4 × 7", unit: "ft" },
      { label: "Weight (lb)", value: "1,750" },
    ],
    bestFor: materials,
  },
  {
    slug: "slg-56",
    image: "/images/slg-56.png",
    imageAlt: "DeSite SLG 56 mini screener on its removable wheels and tow hitch.",
    name: "SLG 56",
    family: "Mini equipment",
    price: "$4,500",
    highlights: [
      "Tilting deck adjusts from 45° to 30°",
      "C spring suspension with rubber deck skirts",
      "Removable wheels and quick-disconnect hitch in under 5 min",
      "Ships flat-packed, about 1.5 hours to assemble",
    ],
    specs: [
      { label: "Production (yd³/hr)", value: "5–10" },
      { label: "Screen deck", value: "4 × 5", unit: "ft" },
      { label: "Weight (lb)", value: "882" },
    ],
    bestFor: [
      "Topsoil",
      "Compost",
      "Sand",
      "Pea stone",
      "Septic rock",
      "Landscape stone",
      "Traction sand",
      "Wood mulch",
      "Road gravel",
      "Ground asphalt",
      "Crushed concrete",
      "Erosion control rock",
    ],
  },
];

/** Comparison table rows: this order drives the order of the table. */
export const comparisonRows: { label: string; values: [string, string, string] }[] = [
  { label: "Rated output", values: ["50 – 80 yd³/hr", "30 – 50 yd³/hr", "5 – 10 yd³/hr"] },
  {
    label: "Suspension",
    values: [
      "Cantilevered leaf and Z springs, UHMW bushings",
      "Cantilevered leaf and Z springs, UHMW bushings",
      "C spring",
    ],
  },
  { label: "Screen deck", values: ["6 × 10 ft", "4 × 7 ft", "4 × 5 ft"] },
  { label: "Deck tilt angle", values: ["45° to 30°", "45° to 30°", "45° to 30°"] },
  { label: "Machine width × height", values: ["126 × 122 in", "95 × 90 in", "74 × 61.4 in"] },
  { label: "Total weight", values: ["4,300 lb (5,500 with riser box)", "1,750 lb (2,250 with riser box)", "882 lb"] },
  {
    label: "Loaded by",
    values: [
      "Loader, backhoe, skid steer, excavator — 84 to 108 in bucket",
      "Skid steer, bucket tractor, compact loader, mid-size excavator — buckets up to 82 in",
      "Mini excavator, stand-on skid steer, mini tractor",
    ],
  },
  /** "yes" se pinta como check en la tabla. */
  { label: "Riser box", values: ["yes", "yes", "—"] },
  {
    label: "Transport",
    values: [
      "Quick-disconnect bucket lugs",
      "Quick-disconnect bucket lugs",
      "Removable wheels and quick-disconnect hitch",
    ],
  },
  {
    label: "Warranty",
    values: [
      "5 yr structural warranty",
      "5 yr structural warranty",
      "5 yr structural warranty",
    ],
  },
];
