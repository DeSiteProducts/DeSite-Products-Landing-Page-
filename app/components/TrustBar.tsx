const sectors = [
  "Landscaping & topsoil",
  "Compost & mulch yards",
  "Septic & drainage rock",
  "Erosion control",
  "Concrete & asphalt recycling",
  "Site contractors",
  "Municipal yards",
];

export default function TrustBar() {
  const loop = [...sectors, ...sectors];

  return (
    <section className="border-y border-white/10 bg-ink py-7" aria-label="Industries served">
      <p className="mb-5 text-center text-xs uppercase tracking-[0.3em] text-white/40">
        Screening On Site For
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-12">
          {loop.map((s, i) => (
            <li
              key={`${s}-${i}`}
              className="flex shrink-0 items-center gap-3 font-display text-base font-bold uppercase tracking-wide text-white/45"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
