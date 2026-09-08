import Image from "next/image";
import { screeners } from "../data/products";
import { CURRENCIES, formatPrice, type Currency } from "../lib/currency";
import EquipmentRow from "./EquipmentRow";
import { compactEquipment, fullSizeEquipment, miniEquipment } from "../data/equipment";
import { IconArrowRight } from "./Icons";
import SpecValue from "./SpecValue";

export default function Products({ currency }: { currency: Currency }) {
  return (
    <section id="equipment" className="relative overflow-hidden bg-ink py-20 lg:py-24">
      <div className="grid-tech absolute inset-0 opacity-25" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          Which DeSite Grizzly Best Fits With{" "}
          <span className="text-brand">Your Equipment ?</span>
        </h2>

        <div className="mt-12 space-y-12 lg:space-y-16">
          {screeners.map((p, i) => {
            return (
              <article
                key={p.slug}
                className={`group relative grid overflow-hidden rounded-3xl border transition-all duration-300 md:grid-cols-[15rem_1fr] lg:grid-cols-[20rem_1fr_16rem] ${
                  p.featured
                    ? "border-brand/50 bg-white/[0.04] shadow-[0_24px_70px_-40px_var(--color-brand)]"
                    : "border-white/10 bg-white/[0.02] hover:border-brand/40 hover:bg-white/[0.04]"
                }`}
              >
                {/* Panel de la ilustración, a sangre */}
                <div className="relative flex items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy-800/50 via-navy-950 to-ink p-6 md:border-b-0 md:border-r">
                  <div
                    className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl"
                    aria-hidden="true"
                  />
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    width={900}
                    height={900}
                    sizes="(min-width: 1024px) 20rem, (min-width: 768px) 15rem, 100vw"
                    quality={80}
                    // The first card sits just under the fold on a laptop.
                    loading={i === 0 ? undefined : "lazy"}
                    className="relative h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand backdrop-blur">
                    {p.family}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 lg:p-8">
                  <h3 className="font-display text-3xl font-extrabold tracking-tight text-white">
                    {p.name}
                  </h3>

                  <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {p.specs.map((spec) => (
                      <div key={spec.label} className="flex flex-col">
                        <dt className="text-sm uppercase tracking-wider text-white/70">
                          {spec.label}
                        </dt>
                        <dd className="mt-1 whitespace-nowrap font-display text-2xl font-extrabold text-white sm:text-3xl">
                          <SpecValue value={spec.value} />
                          {spec.note && (
                            <span className="mt-0.5 block font-sans text-sm font-normal text-white/70">{spec.note}</span>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={`#${p.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-base font-bold text-navy transition-colors hover:bg-brand-300"
                  >
                    More Information
                    <IconArrowRight className="h-4 w-4" />
                  </a>
                </div>

                {/* Precio y acción */}
                <div className="flex flex-col justify-center gap-5 border-t border-white/10 bg-navy-950/40 p-6 md:col-start-2 lg:col-start-3 lg:border-l lg:border-t-0 lg:p-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">Price</p>
                    <p className="mt-1 font-display text-4xl font-extrabold leading-none text-white">
                      {formatPrice(p.prices[currency], currency)}
                      <span className="ml-2 text-base font-bold text-white/70">
                        {CURRENCIES[currency].label}
                      </span>
                    </p>
                  </div>

                  <a
                    href="#quote"
                    className={`group/cta flex flex-col items-center justify-center rounded-2xl px-3 py-4 text-center transition-all ${
                      p.featured
                        ? "bg-brand text-navy hover:bg-brand-300"
                        : "border border-white/25 text-white hover:border-brand hover:bg-brand hover:text-navy"
                    }`}
                  >
                    <span className="whitespace-nowrap font-display text-base font-extrabold leading-tight">
                      Save 50% On Freight
                    </span>
                    <span className="mt-0.5 inline-flex items-center gap-1.5 text-base font-bold opacity-80">
                      Get A Code
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                    </span>
                  </a>

                </div>

                {p.slug === "slg-108" && (
                  <EquipmentRow
                    title="Designed For Full Sized Equipment"
                    machines={fullSizeEquipment}
                  />
                )}
                {p.slug === "slg-78" && (
                  <EquipmentRow
                    title="Designed For Compact Equipment"
                    machines={compactEquipment}
                  />
                )}
                {p.slug === "slg-56" && (
                  <EquipmentRow
                    title="Designed For Mini Equipment"
                    machines={miniEquipment}
                    zoom={2.4}
                  />
                )}

              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
