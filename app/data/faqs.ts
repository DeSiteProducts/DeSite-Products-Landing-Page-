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
  {
    q: "What mesh sizes are available for the SLG 108?",
    a: "Although we offer a wide range of screen mesh in the 108 size from 1/8 all the way up to 4 inch, for maximum screening efficiency on the SLG 108 Grizzly screener we only recommend 4 x 4, 3 x 3, 2 x 2 and 1-1/4 x 1-1/4. It is important to keep in mind that product size is always less the the mesh opening size. For example a 4 x 4 mesh will make a 3’ to 3-1/2 product, 3 x 3 mesh will make a 2-1/4 product, 2 x 2 mesh male 1-1/2.",
  },
  {
    q: "How do I move the DeSite SLG 108?",
    a: "DeSite Portable Screeners can be move onsite with both forks or your machine bucket.There are fork pockets designed into the structure of the screener. The fork pocket can accept forks up to 7 inches wide and 3 inches thick.We also offer what we call Bucket Transportation Lugs that will slide into the fork pockets, allowing the cutting edge of the machines bucket to fit into the lift lugs, pick up the screener and move it around onsite.",
  },
  {
    q: "What is the feed height of the SLG 108 on the Riser Box?",
    a: "The maximum feed height on the SLG 108 Grizzly when on the riser box is about 10ft. Remember that the screen deck has two fixed slope settings for screening topsoil , sand , or gravel. Steeper for soils and later for aggregate is the rule of thumb. ",
  },
  {
    q: "What is the feed height of the SLG 108 off the Riser Box?",
    a: "The SLG 108 Grizzly when off the riser box has a feed height of 8ft. When compact equipment is being used it is recommended that the riser box be removed to lower the feed height for more efficient screening",
  },
  {
    q:"What is the maximum width of bucket for the SLG 108?",
    a:"The screen deck at the screen box are 10ft wide but the maximum recommended bucket width for 108 grizzly is 9ft. A 9ft bucket will leave 6 inches of room on each side of the bucket when feeding the screen deck or when scooping out the finished product from the screen box.",
  },
  {
    q:"Will using my machines bucket to flatten the screen deck slope do damage to the screener?",
    a:"DeSite screeners are designed to allow the operator to make contact with the screen deck when feeding the screener. Making that contact with the top of the screen deck serves two purposes. First it flattens the slope to control the flow our material being screened on the deck. Second, it eliminates any vertical impact as material transfers from the machines bucket to the screen deck allowing for 100% screen deck area utilization.",
  },
  {
    q: "How long does it take to change the mesh on the SLG 108?",
    a: "Screen mesh change out time on the SLG 108 Grizzly is about 30 minutes. It is recommended to secure the screen mesh to the screen deck using wire or rope before removing the bolts. Once installing the new mesh it onto the screen deck resume the wire or rope while installing the clamps. "
  },
  {
    q: "Does the SLG 108 have chain tie down points for transport?",
    a: "Yes, you will find chain hooks on the side of the screener making it quick and easy to chain the SLG 108 Grizzly to the trailer. Tie down time can be as little as 5 minutes start to finish. Some DeSite screener models also have chain tie down teardrop points on the corners of the screener making it even easier to secure the screener to the trailer for transport."
  },
  {
    q: "What are the fork pocket dimensions for moving the screener?",
    a: "The for pocket inside dimensions are 3-1/2” x 7-1/2 inches, for fork up to 7” wide and 3” thick."
  },
  {
    q: "What is the weight of the SLG 108?",
    a: "The weight of the SLG 108 Grizzly with Riser Box is 4400lbs. The weight of the SLG 108 Grizzly without Riser Box is 3300lbs"
  },
  {
    q:"How long will the screen mesh last on the SLG 108?",
    a:"Screen meshes come in varying sizes and with varying wire size. The smaller the mesh opening the small the wire. For example: A mesh with 1/4 x 4 elongated opening is woven with either 1/8 or 3/16 wire. This mesh is designed to make a 1/8 product. A  4” x 4” mesh is woven with 9/16 wire and is meant for screening heavy rock. Wear factors will vary depending upon the wire size and the products being screened. For Example: When screening topsoil the mesh has less wear than when screening sand and gravel. With all that being said we weave our meshes with 65mn hardened wire, using double lock crimp dies for a tighter stronger weave. It is also important to to have the side tension set correctly to get the maximum life out of the screens"
  },
  {
    q:"What can I screen with the SLG 108?",
    a:"DeSite screener are very versatile. The simple and rugged design of the 108 Grizzly will allow for screening Erosion Control Rock, Road Gravel, Base Rock, along with Burn Piles and Demolition Debris"
  },
  {
    q:"What is the warranty on the SLG 108?",
    a:"Like all DeSite screeners the SLG 108 comes with a 5 Year Warranty on the Structure and 1 Year on all electrical components not manufactured by DeSite."
  },
  {
    q:"Is the SLG 108 easy to maintain and service?",
    a:"The SLG has very few moving parts that need service. There is only two grease points at the top of each coil tower that needs to be grease each day. It is important to inspect the screener for loose or broken bolts before beginning to screen each day as it is an aggressive, high frequency screening machine. Annually, in the off season you should inspect the bushings in the coil tower and replace if worn."
  },
  {
    q:"What is the outside dimensions of the SLG 108?",
    a:"The foot print of the SLG 108 Grizzly Screeners is 6ft deep and 11 ft wide. The SLG 108 grizzly is 10ft tall, designed to be legally hauled on up to a 42” tall equipment trailer. If the trailer is taller than 42” and you do not have an overweight permit  you can remove the 108 grizzly from the riser box and standing it next to the screener. You then will be 102’ wide and 8ft tall. "
  },
  {
    q:"How many yards of material can be screened before I must remove material?",
    a:"Up on the riser box the SLG 108 can store more than six cubic yards of both finished and oversize for a total of 12 yards of material. Off the riser box the storage capacity drop in half to 3 yards of finished and 3 yards of overs."
  },

];
