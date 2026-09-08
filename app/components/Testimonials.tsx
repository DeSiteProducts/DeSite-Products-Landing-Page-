import SectionHeading from "./SectionHeading";
import { IconQuote } from "./Icons";

/**
 * PLACEHOLDER: replace with real, verifiable customer quotes before going live.
 */
const quotes = [
  {
    text: "We put the SLG 78 behind the skid steer and stopped hauling topsoil back to the yard to screen it. We saw the payback in the second season.",
    role: "Plant manager",
    context: "Landscape supply yard",
  },
  {
    text: "The 56 goes on the trailer with the mini excavator and comes off in five minutes. That alone saved us an equipment rental on every project.",
    role: "Operations manager",
    context: "Excavation contractor",
  },
  {
    text: "We run it hard on crushed concrete. Swapping the mesh takes one morning and there is no engine to service at the end of the season.",
    role: "Yard supervisor",
    context: "Concrete recycling yard",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Customers"
          title={<>What The Crews Running Them Say</>}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.role}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8"
            >
              <IconQuote className="h-8 w-8 text-brand/50" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-white/80">
                {q.text}
              </blockquote>
              <figcaption className="mt-7 border-t border-white/10 pt-5">
                <p className="text-base font-bold text-white">{q.role}</p>
                <p className="text-sm text-white/70">{q.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
