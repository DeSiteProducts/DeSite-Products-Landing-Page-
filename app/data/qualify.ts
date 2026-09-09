/**
 * Lead qualification questions.
 *
 * The order matters: the equipment on site and the volume per hour are what
 * actually decide the model, so they come first and they are the only two
 * questions carrying a `model` tag.
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
    id: `equipment`,
    question: `What equipment do you have?`,
    help: `Select the equipment you plan to use with your screener. This helps us recommend the right size.`,
    options: [
      {
        value: `Mini excavator, stand-on skid steer, or mini tractor`,
        hint: `Compact equipment`,
        model: "slg-56",
      },
      {
        value: `Skid steer, tractor, or compact loader`,
        hint: `Bucket up to 82" wide`,
        model: "slg-78",
      },
      {
        value: `Wheel loader, backhoe, or full-size excavator`,
        hint: `Bucket 84"–108" wide`,
        model: "slg-108",
      },
      { value: `Not sure yet`, hint: `We'll help you determine the right fit.` },
    ],
  },
  {
    id: `material`,
    question: `What are you screening?`,
    help: `Select the material that best matches your application.`,
    options: [
      { value: `Topsoil or fill dirt` },
      { value: `Compost, mulch, or wood waste` },
      { value: `Sand` },
      { value: `Gravel, decorative stone, or landscape rock` },
      { value: `Crushed concrete or asphalt millings` },
      { value: `Rock, rip-rap, or erosion-control material` },
      { value: `A mix of several materials` },
    ],
  },
  {
    id: `volume`,
    question: `How much material do you need to screen per hour?`,
    help: `A rough estimate is fine. This helps us recommend the right screener for your production needs.`,
    options: [
      { value: `Under 10 cubic yards per hour`, model: "slg-56" },
      { value: `10–30 cubic yards per hour`, model: "slg-78" },
      { value: `30–50 cubic yards per hour`, model: "slg-78" },
      { value: `50+ cubic yards per hour`, model: "slg-108" },
      { value: `Not sure yet` },
    ],
  },
  {
    id: `productSize`,
    question: `What finished product size do you need?`,
    help: `This helps us recommend the right mesh for your application.`,
    options: [
      { value: `Under 1"`, hint: `Fine topsoil, compost, or sand` },
      { value: `About 1-1/2"`, hint: `Typically produced with 2" x 2" mesh` },
      { value: `About 2"`, hint: `Typically produced with 3" x 3" mesh` },
      { value: `About 3"`, hint: `Typically produced with 4" x 4" mesh` },
      { value: `More than one size`, hint: `Mesh can be changed in the field` },
      { value: `Not sure yet`, hint: `We'll help you choose the right mesh.` },
    ],
  },
  {
    id: `timeline`,
    question: `When are you looking to purchase?`,
    options: [
      { value: `Immediately` },
      { value: `Within 30 days` },
      { value: `1–3 months` },
      { value: `Just researching for now` },
    ],
  },
];

/** Picks the model the answers point to: the equipment first, then the volume. */
export function recommendModel(answers: Record<string, string>): ModelSlug | null {
  for (const id of ["equipment", "volume"]) {
    const q = questions.find((x) => x.id === id);
    const picked = q?.options.find((o) => o.value === answers[id]);
    if (picked?.model) return picked.model;
  }
  return null;
}
