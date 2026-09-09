import SectionHeading from "./SectionHeading";
import { IconQuote } from "./Icons";
import { reviews } from "../data/reviews";

/**
 * Every review DeSite publishes, verbatim.
 *
 * Laid out in CSS columns rather than a grid: the quotes run from six words to
 * ninety, and a grid would stretch every card in a row to match the longest one
 * in it. Columns let each card end where its text ends.
 */
export default function Testimonials() {
  return (
    <section id="reviews" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Customers"
          title={<>What Our Customers Say</>}
        />

        <div className="mt-14 gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <figure
              key={`${r.name}-${i}`}
              className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7"
            >
              <IconQuote className="h-7 w-7 text-brand/50" />
              <blockquote className="mt-4 text-lg leading-relaxed text-white/80">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 text-base font-bold text-white">
                {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
