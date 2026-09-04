import { claims, differences } from "../data/difference";
import ScreenerArt from "./ScreenerArt";
import PhotoGallery from "./PhotoGallery";
import GrizzlyArt from "./GrizzlyArt";

function Artwork({ art }: { art: string }) {
  if (art === "grizzly") return <GrizzlyArt className="w-full" />;
  return <ScreenerArt variant={art as "slg108" | "slg78" | "slg56"} className="w-full" />;
}

export default function Difference() {
  return (
    <section id="difference" className="relative overflow-hidden bg-navy-950 py-20 lg:py-24">
      <div className="grid-tech absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* La promesa, en cinco palabras */}
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-brand">
            <span className="h-px w-8 bg-brand" />
            The DeSite Difference
          </span>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {claims.map((c, i) => (
              <li key={c} className="flex items-center gap-4">
                {c}
                {i < claims.length - 1 && (
                  <span className="text-brand/50" aria-hidden="true">
                    /
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-6 font-display text-xl font-bold text-brand sm:text-2xl">
            That Is a DeSite SLG Grizzly Screener.
          </p>
        </div>

        {/* Las cinco diferencias */}
        <ol className="mt-16 space-y-6">
          {differences.map((d, i) => (
            <li
              key={d.n}
              className={`grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>figure]:order-2" : ""
              }`}
            >
              <PhotoGallery
                photos={d.images ?? []}
                fallback={
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy-800/50 via-navy-950 to-ink p-6 lg:p-8">
                    <Artwork art={d.art} />
                  </div>
                }
              />

              <div className="p-7 lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                  DeSite Difference #{d.n}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-white lg:text-3xl">
                  {d.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/70">{d.body}</p>

                {d.points && (
                  <ul className="mt-4 space-y-2">
                    {d.points.map((p) => (
                      <li key={p} className="flex gap-3 text-lg leading-snug text-white/60">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
