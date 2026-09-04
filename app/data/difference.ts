/**
 * The five DeSite differences.
 *
 * TO ADD PHOTOS: drop the files in /public/images and add them to `images`.
 * Each block shows them as a gallery, so a difference can carry as many photos
 * as you have. A block with no photos falls back to the illustration in `art`.
 */

export type Difference = {
  n: string;
  title: string;
  body: string;
  points?: string[];
  /** Photo gallery for this difference. Empty means "use the illustration". */
  images?: { src: string; alt: string }[];
  /** Fallback illustration while the photo is missing. */
  art: "slg108" | "slg78" | "slg56" | "grizzly";
};

export const differences: Difference[] = [
  {
    n: "1",
    title: "Spring Suspension System:",
    body: "Operator stays in the machine continuously feeding the grizzly while using the cantilevered spring suspension system to keep the screen deck clear.",
    images: [
      {
        src: "/images/slg-78-spring-suspension.jpg",
        alt: "Close-up of the cantilevered spring suspension mounting an SLG 78 screen deck to the frame.",
      },
      {
        src: "/images/slg-56-c-spring-suspension.jpg",
        alt: "The C spring suspension under an SLG 56 screen deck, with the frame and hitch mount in view.",
      },
    ],
    art: "slg108",
  },
  {
    n: "2",
    title: "DeSite Tilting Screen Deck",
    body: "The operator has the ability to change the screen deck slope while feeding the grizzly.",
    points: [
      "Flatter slope to keep material on the screen deck longer.",
      "Steeper slope to move material faster.",
    ],
    images: [
      {
        src: "/images/slg-78-tilting-deck.jpg",
        alt: "A wheel loader tipping gravel onto an SLG 78 while the operator stays in the cab.",
      },
    ],
    art: "slg78",
  },
  {
    n: "3",
    title: "Square Mesh Versus Bars",
    body: "Square mesh makes a more uniform product.",
    points: ["10 minutes to change out the mesh to another size."],
    images: [
      {
        src: "/images/slg-square-mesh.jpg",
        alt: "Head-on view of a square mesh deck holding back burnt wood and rock, with the oversize piled in front of the screener.",
      },
    ],
    art: "grizzly",
  },
  {
    n: "4",
    title: "Quick Disconnect Riser Box",
    body: "Only DeSite offers a Riser that can be easily removed to bring the feed height down so that smaller equipment can feed the screener.",
    art: "slg108",
  },
  {
    n: "5",
    title: "Transportation",
    body: "Easily transported from yard to jobsite on the same trailer that moves your equipment.",
    points: [
      "Once onsite DeSite grizzly\u2019s are easily moved with forks or a bucket using bucket transport lugs.",
    ],
    art: "slg56",
  },
];

/** The line that sums the whole thing up. */
export const claims = [
  "More Affordable",
  "Faster Screening",
  "Better Sizing",
  "More Versatile",
  "More Control",
];
