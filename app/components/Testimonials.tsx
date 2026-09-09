"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { IconQuote, IconStar } from "./Icons";
import { reviews } from "../data/reviews";

/**
 * The published reviews, as a slider.
 *
 * Two decisions worth knowing about:
 *
 * The quotes run from 29 to 430 characters. Cards sitting side by side stretch
 * to the tallest one, so a six-word quote next to a ninety-word one leaves a
 * card that is mostly empty. Sorting by length before grouping puts quotes of
 * similar size on the same slide, which is the only reason the order is not the
 * source order — it carries no ranking.
 *
 * It does not advance on its own. This site is built for readers who need time,
 * and a panel that slides away mid-sentence is worse than one that waits.
 */
const sorted = [...reviews].sort((a, b) => b.text.length - a.text.length);

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

/** 3 across on a desktop, 2 on a tablet, 1 on a phone. */
function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const read = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);

    read();
    lg.addEventListener("change", read);
    sm.addEventListener("change", read);
    return () => {
      lg.removeEventListener("change", read);
      sm.removeEventListener("change", read);
    };
  }, []);

  return perView;
}

export default function Testimonials() {
  const perView = usePerView();
  const [page, setPage] = useState(0);

  const slides = chunk(sorted, perView);
  // Rotating the viewport can leave the index past the end.
  const current = Math.min(page, slides.length - 1);

  function go(next: number) {
    setPage(((next % slides.length) + slides.length) % slides.length);
  }

  return (
    <section id="reviews" className="bg-ink py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="Customers" title={<>What Our Customers Say</>} />

        <div
          className="relative mt-14"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, s) => (
                <div
                  key={s}
                  className="grid w-full shrink-0 gap-6"
                  style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }}
                  aria-hidden={s !== current}
                >
                  {slide.map((r, i) => (
                    <figure
                      key={`${r.name}-${i}`}
                      className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7"
                    >
                      <div className="flex items-center justify-between">
                        <IconQuote className="h-7 w-7 text-brand/50" />
                        <span className="flex gap-0.5 text-brand" aria-label="5 out of 5">
                          {Array.from({ length: 5 }, (_, n) => (
                            <IconStar key={n} className="h-5 w-5" />
                          ))}
                        </span>
                      </div>
                      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-white/80">
                        {r.text}
                      </blockquote>
                      <figcaption className="mt-6 border-t border-white/10 pt-4 text-base font-bold text-white">
                        {r.name}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => go(current - 1)}
              aria-label="Previous reviews"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-brand hover:text-brand"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m14 6-6 6 6 6" />
              </svg>
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {slides.map((_, s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => go(s)}
                  aria-label={`Reviews ${s + 1} of ${slides.length}`}
                  aria-current={s === current}
                  className={`h-2 rounded-full transition-all ${
                    s === current ? "w-8 bg-brand" : "w-2 bg-white/40 hover:bg-white"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(current + 1)}
              aria-label="Next reviews"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-brand hover:text-brand"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m10 6 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
