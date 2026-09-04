import BackgroundVideo from "./BackgroundVideo";
import { IconArrowRight } from "./Icons";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-end overflow-hidden bg-ink px-0 pb-16 pt-32 lg:pb-20"
    >
      <BackgroundVideo
        vimeoId="1223412221"
        poster="/images/hero-poster.jpg"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-6xl animate-rise text-center">
          <h1 className="font-display font-extrabold tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
            <span className="block text-2xl uppercase tracking-[0.28em] text-brand sm:text-3xl">
              DeSite
            </span>
            <span className="mt-3 block text-3xl sm:whitespace-nowrap sm:text-[clamp(0.85rem,4.6vw,3.75rem)] leading-[1.08]">
              Spring Suspension Grizzly Screeners
            </span>
            <span className="mt-2 block text-3xl sm:whitespace-nowrap sm:text-[clamp(0.85rem,4.6vw,3.75rem)] leading-[1.08] text-brand">
              Better and Faster
            </span>
          </h1>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#equipment"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-navy transition-all hover:bg-brand-300 hover:shadow-[0_0_40px_-8px_var(--color-brand)]"
            >
              See The Three Models
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#quote"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-ink/40 px-7 py-4 text-base font-bold text-white backdrop-blur transition-colors hover:border-brand hover:text-brand"
            >
              Get A Delivered Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
