import { CURRENCIES, type Currency } from "../lib/currency";

/**
 * The published questions and answers.
 *
 * Kept out of the component because the page marks them up as a schema.org
 * FAQPage as well — the two must never drift, or the rich result promises an
 * answer the page does not give.
 */
export type Faq = { q: string; a: string };

export const faqs = (currency: Currency): Faq[] => [
  {
    q: "How does a bucket-fed screener work?",
    a: "There is no motor. You tip a bucket of material onto a mesh deck set at an angle, and the deck is mounted on spring suspension so it flexes under the load. Fines drop through the mesh into a pile underneath and the oversize slides off the low end.",
  },
  {
    q: "Which mesh opening should I order?",
    a: "The opening determines the product size, roughly two thirds of the mesh. A 2 × 2 in square mesh yields about a 1-1/2 in product, 3 × 3 in yields 2 in, and 4 × 4 in yields 3 in. The SLG 56 also runs finer square mesh down to 5/32 in and elongated patterns from 3/8 × 4 in to 1 × 4 in for topsoil and compost.",
  },
  {
    q: "Do I need a foundation or any site prep?",
    a: "No. All three models are self-supporting and stand on their own frame. The SLG 78 and 108 are lifted and moved with quick-disconnect bucket lugs, and the SLG 56 has removable wheels and a quick-disconnect hitch that come off in under five minutes.",
  },
  {
    q: "What size machine do I need to load it?",
    a: "Match the screener to the carrier you already run. The SLG 56 is built for mini excavators, stand-on skid steers and mini tractors. The SLG 78 suits skid steers, bucket tractors, compact loaders and mid-size excavators. The SLG 108 is for full-size equipment and takes buckets from 84 to 108 inches.",
  },
  {
    q: "Does it handle wet or sticky material?",
    a: "Tilt the deck toward 45 degrees and the material sheds instead of blinding the mesh. The spring suspension keeps the deck working under the load, which is what stops it packing the way a fixed grizzly deck does. Very wet clay still screens poorly on any dry deck, so send us a description of the material before ordering.",
  },
  {
    q: "What does the warranty cover, and how do I get a price?",
    a: `Five years on the structure, with parts supplied at no cost during that period — you install the part and cover shipping. Pre- and post-use inspection is the customer's responsibility, and damage from abuse or missed maintenance is not covered. Prices are listed above, in ${CURRENCIES[currency].label} and before freight and tax; send us your ZIP code and we come back with the delivered figure.`,
  },
  {
    q: "Is financing available?",
    a: "Yes, up to 60 months across the range. For most contractors the useful question is not whether the sticker price is higher than a fixed grizzly's, but whether the monthly payment is smaller than the monthly margin the machine brings in. Ask us to quote the payment alongside the delivered price.",
  },
];
