/**
 * Real customer reviews, copied from the "What our customers say" carousel on
 * https://desiteproducts.com/ (fetched 9 September 2026).
 *
 * THESE ARE REAL PEOPLE. The text is verbatim, typos and all — a testimonial
 * that has been tidied up is no longer a testimonial. If a quote needs to
 * change, it has to come from the customer, not from here.
 *
 * Two entries on the source page were left out on purpose:
 *   - "Andy" carried word for word the same quote as "MIKE", so one of the two
 *     attributions is wrong. Kept once, under the name it appeared with first.
 *   - "Harlowe Farm — SLG 56 on Harlowe Farm." is a photo caption, not a review.
 *
 * `model` is only set where the customer names the machine themselves; it feeds
 * the review markup on that product and nothing else.
 */
export type Review = {
  name: string;
  text: string;
  model?: "slg-108" | "slg-78" | "slg-56";
};

export const reviews: Review[] = [
  {
    name: "Rickie Lacroix",
    text: "I had this screener and made so much $$$$ with it over just a few years. It paid for itself in 3 weeks of selling soil. Then I ran it for another 4 years until my dump truck died. Then sold it for 75% of what I paid for it. Can't loose $ with one of these !",
  },
  {
    name: "Derek Taylor",
    text: "I have the desite 78 and can do 30 to 35 yards an hour with my 3 yard loader . I have done hundreds and hundreds of yards of topsoil in the last 3 years with zero problems with it . Great working screener for small operators in my opinion.",
    model: "slg-78",
  },
  {
    name: "Donnie Malcomb",
    text: "I've had one for 8 years. Zero maintenance and has never let me down. Has been a great investment.",
  },
  {
    name: "Mark Kowalczyk",
    text: "Using my 108 almost everyday. Making 1 inch minus soil fill blended with aged compost and mushroom soil. Screen works awesome and the material it makes sells itself.",
    model: "slg-108",
  },
  {
    name: "Bill Stone",
    text: "The screener is a “no joke” piece of equipment. Too bad folks can't see one in person to see the quality before they decide to get one. The pictures and videos don't show how well built it is. Thanks for the great service. Looking forward to trying it out this afternoon.",
  },
  {
    name: "Cameron Henderson",
    text: "Hey Andy! Hope all is well absolutely love the slg 78! Absolutely changed the business! Only wish is that I had gotten the slg108!!",
    model: "slg-78",
  },
  {
    name: "Mike B",
    text: "As with any equipment purchase, you always hope for the best. I have to say your screening machine worked better than I could have ever imagined. Its ease of operation was simply fantastic. The product it produced was actually better than we could have purchased from local suppliers. Continued success in 2016, Best regards.",
  },
  {
    name: "Larry Pierce",
    text: "Andy did a fantastic job selling this very easy and great communication unloaded it screen 6 yards worked great much faster and cleaner product than my other name brand screener.",
  },
  {
    name: "Jennifer Bond",
    text: "I'm so glad I ordered the riser with my 78, I wouldn't own one without it.",
    model: "slg-78",
  },
  {
    name: "MIKE",
    text: "I wasn't expecting delivery until next week. Had fun today sifting a pile of mixed debris. Made some nice topsoil. Also screened some DG. Beautiful job. So pleased with this machine I can't tell you how much. Hope to get some video soon.",
  },
  {
    name: "Chris Hawes",
    text: "Love my machine I'm in California it's very portable I screen manure compost and topsoil since I'm in California, We always have carb checking to see if you have an updated motors so with this set up I have a Honda generator. It runs the vibrations, so I no longer have to deal with carb, I can put it in my dump trailer move it to different jobs. I run the machine all by myself. Easy to set up and cheap to run. Love my machine.",
  },
  {
    name: "Piney Grove Homestead and Mini Farm",
    text: "Trying out our DeSite 56” screener for the first time. Can't wait to put this to work on our huge compost pile!",
    model: "slg-56",
  },
  {
    name: "Carl C",
    text: "I purchase a 78 inch screen last year from Woodbury Tractor, it has been one of the best pieces of equipment I have purchased, Thanks.",
    model: "slg-78",
  },
  {
    name: "Jennifer Bond",
    text: "BEST screener in the industry with the BEST support I've seen across all my equipment. Andy and Brad have been GREAT to work with and my equipment has been flawless. Everyone who see's it is in awe at the build quality, the welds look like rolls of dimes, they're gorgeous... You won't regret buying ANY of Columbia's products... I know I sure don't!!!!",
  },
  {
    name: "Rufus S",
    text: "We did purchase one of your units through Larry Lang in 2014 and we are very pleased with it. We have shown it to several other cemeteries in the area as well.",
  },
  {
    name: "Michael Paul",
    text: "The Easter bunny dropped a big egg today for us !! This should definitely help the screening operation . Thank you for all the help Brad and Andy Columbia Equipment Sales.",
  },
  {
    name: "Chris Hawes",
    text: "Got a 108 it's a great machine.",
    model: "slg-108",
  },
  {
    name: "Dewey Coleman",
    text: "We love ours! Great product!.",
  },
];
