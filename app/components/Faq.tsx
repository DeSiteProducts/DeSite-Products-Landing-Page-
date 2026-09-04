"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { type Currency } from "../lib/currency";
import { faqs } from "../data/faqs";


export default function Faq({ currency }: { currency: Currency }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = faqs(currency);

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          tone="light"
          eyebrow="FAQ"
          title={<>What Buyers Ask Us First</>}
        />

        <div className="mt-12 divide-y divide-navy/10 border-y border-navy/10">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-base font-bold text-navy sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-navy"
                          : "border-navy/20 text-navy"
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  hidden={!isOpen}
                  className="pb-7 pr-12 text-base leading-relaxed text-graphite/80 sm:text-base"
                >
                  {f.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
