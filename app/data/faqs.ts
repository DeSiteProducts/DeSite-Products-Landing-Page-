/**
 * The published questions and answers.
 *
 * Kept out of the component because the page marks them up as a schema.org
 * FAQPage as well — the two must never drift, or the rich result promises an
 * answer the page does not give.
 *
 * `a` is a list of paragraphs. Several answers run to four or five of them, and
 * a single blob of text at this length is unreadable on a phone.
 *
 * The wording is the customer's own, verbatim. Do not tidy it.
 */
export type Faq = { q: string; a: string[] };

export const faqs: Faq[] = [
  {
    q: `How does a bucket-fed grizzly screener work?`,
    a: [
      `Unlike traditional static grizzly screeners, DeSite grizzly screeners use a unique spring-suspension system derived from our vibratory screening equipment. Material is loaded directly onto the screen deck with your excavator, skid steer, or loader bucket. Smaller material passes through the screen while oversized material travels off the end.`,
      `The spring-suspension design allows the screen deck angle to be adjusted quickly based on your material and production goals. A steeper angle increases material flow, while a lower angle provides more time on the deck for additional screening.`,
      `Because the screener is a standalone unit rather than a bucket attachment, your loader or excavator remains available for other work. If a truck arrives to be loaded, material needs to be moved, or conditions on the jobsite change, you aren't tied to the screener. This flexibility helps reduce downtime and keeps both your equipment and crew productive.`,
    ],
  },
  {
    q: `Which mesh opening should I order?`,
    a: [
      `That depends on your desired finished product and the material you're screening.`,
      `For larger grizzly screening applications, we offer openings up to 4" x 4" for scalping oversized material and processing fill dirt, down to 1" x 1" for producing approximately 3/4" minus material. Different mesh sizes allow contractors to match the screener to jobsite specifications, backfill requirements, or the finished aggregate size they need.`,
      `For property owners, farmers, landscapers, and smaller projects requiring finer material, our SLG 56 Mini Screener offers more than 14 mesh options. These range from larger openings for rock and debris removal all the way down to 1/8" x 4" elongated mesh for fine screening applications such as sand.`,
      `Not sure which opening you need? Tell us what material you're screening and what finished product you're trying to produce, and we'll recommend the best mesh for your application.`,
    ],
  },
  {
    q: `Do I need a foundation or any site prep?`,
    a: [
      `No foundation or permanent site preparation is required. All three models are self-supporting and designed to operate on their own frame.`,
      `For best performance, we recommend setting the screener on a firm, relatively level surface with enough room to safely load the machine and manage your screened and oversized material piles.`,
      `The SLG 78 and 108 can be lifted and moved using quick-disconnect bucket lugs, while the SLG 56 features removable wheels and a quick-disconnect hitch that can be removed in under five minutes.`,
    ],
  },
  {
    q: `What size machine do I need to load it?`,
    a: [
      `Match the screener to the equipment you already operate. The SLG 56 is designed for mini excavators, stand-on skid steers, and compact tractors. The SLG 78 works well with skid steers, compact loaders, tractors, and mid-size excavators. The SLG 108 is designed for full-size equipment and accommodates buckets from 84" to 108" wide.`,
      `Not sure which model fits your equipment? Contact us with your machine and bucket size and we'll recommend the best fit.`,
    ],
  },
  {
    q: `Does it handle wet or sticky material?`,
    a: [
      `To a degree. How much moisture a grizzly screener can handle depends heavily on the material being screened and the mesh opening you're using.`,
      `With larger openings, such as 4" x 4", moisture is generally much less of a concern because there is plenty of open area for material to pass through. As you move toward smaller openings, such as 1" x 1", wet or sticky material becomes increasingly difficult to screen efficiently.`,
      `No dry grizzly screener is designed to efficiently process extremely wet soils, sand, or clay through fine openings. This is where vibratory screening equipment becomes the better choice.`,
      `DeSite grizzly screeners do have an advantage over traditional fixed-deck designs. Our spring-suspension system allows the deck to flex and work with the material rather than relying on a completely rigid screening surface. The deck angle can also be adjusted to help material shed and flow more efficiently in challenging conditions.`,
      `Be cautious when comparing grizzly screeners advertised for producing fine topsoil simply because a fine mesh has been placed over traditional grizzly bars. Fine openings and wet soil can lead to rapid plugging without the movement necessary to keep material flowing.`,
      `If you're dealing with wet or sticky material, contact us with your material type and desired finished size. We'll tell you whether a grizzly screener is a good fit or if a vibratory screener would be the better option.`,
    ],
  },
  {
    q: `What does the warranty cover?`,
    a: [
      `DeSite screeners include a 5-year warranty covering the structure of the unit and workmanship.`,
      `The warranty does not cover damage caused by abuse, normal wear items, or operating the equipment outside of our recommended applications and guidelines.`,
      `If you ever have an issue with your screener, contact us directly and our team will help determine the best solution.`,
    ],
  },
  {
    q: `How much does a DeSite screener cost?`,
    a: [
      `Current pricing for our screeners is listed directly on our website.`,
      `For a delivered-to-your-door quote, simply fill out our quote form with your contact and delivery information. We'll calculate the freight to your location and provide you with a complete delivered price.`,
    ],
  },
  {
    q: `Is financing available?`,
    a: [
      `Yes. We offer traditional commercial equipment financing through third-party lenders, with several term options available depending on approval.`,
      `We also offer in-house financing options for qualified customers. Contact us to learn more about our current financing programs and determine which option works best for your business`,
    ],
  },
  {
    q: `What mesh sizes are available for the SLG 108?`,
    a: [
      `The SLG 108 Grizzly Screener is available with mesh openings ranging from 1" x 1" up to 4" x 4".`,
      `For a complete list of available mesh sizes and the approximate finished product each produces, check out our Mesh Guide on the home page.`,
    ],
  },
  {
    q: `What mesh sizes are available for the SLG 78?`,
    a: [
      `The SLG 78 Grizzly Screener is available with mesh openings ranging from 1" x 1" up to 4" x 4".`,
      `For a complete list of available mesh sizes and the approximate finished product each produces, check out our Mesh Guide on the home page.`,
    ],
  },
  {
    q: `How do I move the DeSite SLG 108?`,
    a: [
      `The DeSite SLG 108 can be moved around the jobsite using either forks or your machine's bucket.`,
      `Fork pockets are built directly into the screener’s structure and can accommodate forks up to 7" wide and 3" thick.`,
      `We also offer Bucket Transportation Lugs that slide into the fork pockets. These allow the cutting edge of your machine's bucket to engage the lift lugs, making it easy to pick up and move the screener around the jobsite.`,
    ],
  },
  {
    q: `What is the maximum bucket width for the SLG 108?`,
    a: [
      `The maximum recommended bucket width for the SLG 108 is 108" (9 ft.).`,
      `The 10-foot-wide screen deck provides approximately 6" of clearance on each side of a 9-foot bucket, making it easier to feed the screener and remove finished material.`,
    ],
  },
  {
    q: `Will using my machine's bucket to flatten the screen deck slope damage the screener?`,
    a: [
      `No. DeSite screeners are designed to allow the operator to make contact with the screen deck while feeding the screener.`,
      `Making contact with the top of the screen deck serves two purposes. First, it temporarily flattens the deck slope to help control the flow of material being screened. Second, it reduces vertical impact as material transfers from the machine's bucket onto the screen deck, allowing for better utilization of the entire screening area.`,
    ],
  },
  {
    q: `How long does it take to change the mesh on the SLG 108?`,
    a: [
      `A typical mesh change on the SLG 108 Grizzly Screener takes approximately 30 minutes.`,
      `Before removing the mesh clamps, we recommend securing the existing mesh to the screen deck with wire or rope. This helps keep the mesh safely in position during removal. When installing the new mesh, secure it to the deck in the same manner while reinstalling the clamps.`,
    ],
  },
  {
    q: `Does the SLG 108 have chain tie-down points for transport?`,
    a: [
      `Yes. The SLG 108 has built-in chain tie-down points located on the sides of the screener, making it quick and easy to properly secure the unit to a trailer for transport.`,
    ],
  },
  {
    q: `How long will the screen mesh last on the SLG 108?`,
    a: [
      `Mesh life will vary depending on the opening size, material being screened, and how frequently the screener is used. The 1" x 1" through 4" x 4" meshes used on the SLG 108 are extremely robust and, under normal operating conditions, will typically provide several years of service.`,
      `Screening highly abrasive materials such as rock, sand, and gravel will naturally create more wear than softer materials. Proper mesh tension and routine inspection will also help maximize screen life.`,
      `Our screen meshes are manufactured from hardened 65Mn wire with a double-lock crimp for a strong, durable weave.`,
    ],
  },
  {
    q: `What can I screen with the SLG 108?`,
    a: [
      `The SLG 108 Grizzly Screener is designed for a wide range of heavy-duty screening and scalping applications, including erosion-control rock, road gravel, base rock, fill dirt, trench backfill, demolition debris, and burn-pile cleanup.`,
      `Its simple, rugged design makes it well suited for contractors, excavation work, utility projects, site preparation, and other applications where oversized material needs to be separated quickly.`,
    ],
  },
  {
    q: `Is the SLG 108 easy to maintain and service?`,
    a: [
      `Yes. The SLG 108 has very few moving parts and requires minimal routine maintenance.`,
      `There are two grease points located at the top of the coil towers that should be greased daily during use. We also recommend a quick inspection before each day of operation to check for loose, damaged, or missing hardware.`,
      `During the off-season or as part of an annual inspection, check the coil tower bushings for wear and replace them as needed.`,
    ],
  },
  {
    q: `What are the dimensions of the SLG 108?`,
    a: [
      `The DeSite SLG 108 Grizzly Screener measures approximately 11 ft. wide, 6 ft. deep, and 10 ft. tall when fully assembled.`,
      `The SLG 108 is designed for transport on equipment trailers up to 42" tall. For complete dimensions, weight, transport configuration, and other technical specifications, see the SLG 108 Specifications section`,
    ],
  },
  {
    q: `How much material can the SLG 108 screen before the piles need to be cleared?`,
    a: [
      `When mounted on the riser box, the SLG 108 can hold approximately 6 cubic yards of finished material and 6 cubic yards of oversize material, for a total capacity of approximately 12 cubic yards before the piles need to be cleared.`,
      `Without the riser box, capacity is approximately 3 cubic yards of finished material and 3 cubic yards of oversize material, or approximately 6 cubic yards total.`,
    ],
  },
  {
    q: `What is the feed height of the SLG 108 on the Riser Box?`,
    a: [
      `The maximum feed height on the SLG 108 Grizzly when on the riser box is about 10ft. Remember that the screen deck has two fixed slope settings for screening topsoil , sand , or gravel. Steeper for soils and later for aggregate is the rule of thumb.`,
    ],
  },
  {
    q: `What is the feed height of the SLG 108 off the Riser Box?`,
    a: [
      `The SLG 108 Grizzly when off the riser box has a feed height of 8ft. When compact equipment is being used it is recommended that the riser box be removed to lower the feed height for more efficient screening`,
    ],
  },
  {
    q: `What are the fork pocket dimensions for moving the screener?`,
    a: [
      `The for pocket inside dimensions are 3-1/2” x 7-1/2 inches, for fork up to 7” wide and 3” thick.`,
    ],
  },
  {
    q: `What is the weight of the SLG 108?`,
    a: [
      `The weight of the SLG 108 Grizzly with Riser Box is 4400lbs. The weight of the SLG 108 Grizzly without Riser Box is 3300lbs`,
    ],
  },
  {
    q: `What is the warranty on the SLG 108?`,
    a: [
      `Like all DeSite screeners the SLG 108 comes with a 5 Year Warranty on the Structure and 1 Year on all electrical components not manufactured by DeSite.`,
    ],
  },
];
