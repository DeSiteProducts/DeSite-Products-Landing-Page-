import Image from "next/image";
import { comparisonRows, screeners, type Screener } from "../data/products";
import { CURRENCIES, formatPrice, type Currency } from "../lib/currency";
import { videos } from "../data/videos";
import VideoCard from "./VideoCard";
import SpecValue from "./SpecValue";
import { IconArrowRight, IconCheck, IconPhone } from "./Icons";

const artVariant = {
  "slg-108": "slg108",
  "slg-78": "slg78",
  "slg-56": "slg56",
} as const;

/**
 * The full write-up for one model, in place on the home page: header, videos,
 * features, materials and the complete spec table. `tone` alternates the
 * background so consecutive models stay visually separated.
 */
export default function ModelSection({
  model,
  currency,
  tone = "dark",
}: {
  model: Screener;
  currency: Currency;
  tone?: "dark" | "darker";
}) {
  const index = screeners.findIndex((s) => s.slug === model.slug);
  const variant = artVariant[model.slug as keyof typeof artVariant];
  const modelVideos = videos.filter((v) => v.model === variant);
  const specs = comparisonRows.map((row) => ({
    label: row.label,
    value: row.values[index],
  }));

  return (
    <section
      id={model.slug}
      className={`relative overflow-hidden py-20 lg:py-24 ${
        tone === "dark" ? "bg-navy-950" : "bg-ink"
      }`}
    >
      <div className="grid-tech absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Encabezado del modelo */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="inline-flex rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand">
              {model.family}
            </span>
            <h2 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
              {model.name}
            </h2>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5">
              {model.specs.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wider text-white/40">{s.label}</dt>
                  <dd className="mt-0.5 font-display text-3xl font-extrabold text-white">
                    <SpecValue value={s.value} />
                  </dd>
                  {s.note && <p className="mt-0.5 text-sm text-white/40">{s.note}</p>}
                </div>
              ))}
            </dl>

            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Price</p>
              <p className="mt-1 font-display text-4xl font-extrabold leading-none text-white">
                {formatPrice(model.prices[currency], currency)}
                <span className="ml-2 align-middle text-base font-bold text-white/45">
                  {CURRENCIES[currency].label}
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#quote"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-navy transition-all hover:bg-brand-300"
              >
                Get A Delivered Quote
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="tel:+18772547903"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-bold text-white transition-colors hover:border-brand hover:text-brand"
              >
                <IconPhone className="h-4 w-4" />
                877-254-7903
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-navy-800/50 via-navy-950 to-ink p-6 lg:p-10">
            <Image
              src={model.image}
              alt={model.imageAlt}
              width={900}
              height={900}
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={80}
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* Videos del modelo */}
        {modelVideos.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-extrabold text-white">
              {model.name} In Action
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modelVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </div>
        )}

        {/* Características y materiales */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-white">What It Brings</h3>
            <ul className="mt-6 space-y-3">
              {model.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-lg leading-snug text-white/75">
                  <IconCheck className="mt-1.5 h-4 w-4 shrink-0 text-brand" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl font-extrabold text-white">What It Screens</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {model.bestFor.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-base font-medium text-white/70"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Ficha técnica completa */}
        <div className="mt-16">
          <h3 className="font-display text-2xl font-extrabold text-white">
            {model.name} Specifications
          </h3>
          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {specs.map((s) => (
              <div key={s.label} className="grid gap-1 py-4 sm:grid-cols-[16rem_1fr] sm:gap-6">
                <dt className="text-base font-semibold text-white">{s.label}</dt>
                <dd className="text-base text-white/60">
                  {s.value === "yes" ? "Included" : s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
