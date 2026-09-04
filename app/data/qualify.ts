/**
 * Lead qualification questions.
 *
 * The order matters: the carrier machine and the volume are what actually
 * decide the model, so they come first. Moisture and whether the customer sells
 * the product are the two questions the research brief calls out as the ones
 * that separate a real buyer from a browser.
 */

export type ModelSlug = "slg-56" | "slg-78" | "slg-108";

export type Option = {
  value: string;
  hint?: string;
  /** Model this answer points to, when it points to one. */
  model?: ModelSlug;
};

export type Question = {
  id: string;
  question: string;
  help?: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: "carrier",
    question: "What machine will load the screener?",
    help: "This is what sizes the screener. Pick the machine that will actually be dumping into it.",
    options: [
      {
        value: "Mini excavator, stand-on skid steer or mini tractor",
        hint: "Under 5 tons",
        model: "slg-56",
      },
      {
        value: "Skid steer, bucket tractor or compact loader",
        hint: "Buckets up to 82 in",
        model: "slg-78",
      },
      {
        value: "Wheel loader, backhoe or full-size excavator",
        hint: "Buckets 84 to 108 in",
        model: "slg-108",
      },
      { value: "Not sure yet", hint: "We will work it out with you" },
    ],
  },
  {
    id: "material",
    question: "What are you screening?",
    options: [
      { value: "Topsoil or fill" },
      { value: "Compost, mulch or wood waste" },
      { value: "Sand" },
      { value: "Gravel, decorative or landscape stone" },
      { value: "Crushed concrete or asphalt millings" },
      { value: "Rock, rip-rap or erosion control" },
      { value: "A mix of several" },
    ],
  },
  {
    id: "volume",
    question: "How much do you need to move in an hour?",
    help: "A rough number is fine. It is the second thing that decides the model.",
    options: [
      { value: "Under 10 yards an hour", model: "slg-56" },
      { value: "10 to 30 yards an hour", model: "slg-78" },
      { value: "30 to 50 yards an hour", model: "slg-78" },
      { value: "50 yards an hour or more", model: "slg-108" },
      { value: "No idea yet" },
    ],
  },
  {
    id: "productSize",
    question: "What product size do you need to come out?",
    help: "This sets the mesh opening, which is roughly a third larger than the product.",
    options: [
      { value: "Under 1 in", hint: "Fine topsoil, compost, traction sand" },
      { value: "About 1-1/2 in", hint: "2 x 2 in mesh" },
      { value: "About 2 in", hint: "3 x 3 in mesh" },
      { value: "About 3 in", hint: "4 x 4 in mesh" },
      { value: "More than one size", hint: "Mesh swaps out in the field" },
      { value: "Not sure" },
    ],
  },
  {
    id: "moisture",
    question: "How wet does the material usually run?",
    help: "Moisture is what kills screening production. It changes the deck angle we recommend.",
    options: [
      { value: "Dry" },
      { value: "Slightly damp" },
      { value: "Wet, or heavy with clay" },
      { value: "It changes with the season" },
    ],
  },
  {
    id: "purpose",
    question: "Are you selling what comes off the deck?",
    help: "Graded product sells by the yard. Cleaning up a site is a different job, and sometimes a fixed grizzly is enough.",
    options: [
      { value: "Yes, we sell it by the yard" },
      { value: "No, it goes back into our own jobs" },
      { value: "Both" },
    ],
  },
  {
    id: "timeline",
    question: "When do you need it on site?",
    options: [
      { value: "As soon as possible" },
      { value: "Within the next month or two" },
      { value: "This year, still budgeting" },
      { value: "Just researching for now" },
    ],
  },
];

/** Picks the model the answers point to: the carrier first, then the volume. */
export function recommendModel(answers: Record<string, string>): ModelSlug | null {
  for (const id of ["carrier", "volume"]) {
    const q = questions.find((x) => x.id === id);
    const picked = q?.options.find((o) => o.value === answers[id]);
    if (picked?.model) return picked.model;
  }
  return null;
}
