import Logo from "./Logo";
import { IconPhone, IconPin } from "./Icons";

const columns = [
  {
    title: "Equipment",
    links: [
      { label: "SLG 108", href: "/#slg-108" },
      { label: "SLG 78", href: "/#slg-78" },
      { label: "SLG 56", href: "/#slg-56" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Videos In Action", href: "/#videos" },
      { label: "FAQ", href: "/#faq" },
      { label: "Request A Quote", href: "/#quote" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-base leading-relaxed text-white/55">
              Bucket-fed topsoil and rock screeners for landscaping, aggregate
              yards and site contractors.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/45">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-base text-white/70 transition-colors hover:text-brand">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-white/45">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-base text-white/70">
              <li>
                <a href="tel:+18772547903" className="flex items-center gap-2.5 transition-colors hover:text-brand">
                  <IconPhone className="h-4 w-4 text-brand" />
                  877-254-7903
                </a>
              </li>
              <li>
                <a href="tel:+18065003915" className="flex items-center gap-2.5 transition-colors hover:text-brand">
                  <IconPhone className="h-4 w-4 text-brand" />
                  806-500-3915
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                FM 1490, Levelland, TX
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} DeSite Products. All rights reserved.
          </p>
          <p className="text-sm text-white/40">
            Specifications are subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}
