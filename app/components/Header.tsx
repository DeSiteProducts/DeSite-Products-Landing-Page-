"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { IconPhone } from "./Icons";

const links = [
  { href: "/#videos", label: "Videos" },
  { href: "/#equipment", label: "Equipment" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy-950/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="/" aria-label="DeSite — home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap text-base font-medium text-white/70 transition-colors hover:text-brand"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+18772547903"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-semibold text-white/80 transition-colors hover:text-brand"
          >
            <IconPhone />
            877-254-7903
          </a>
          <a
            href="/#quote"
            className="shrink-0 whitespace-nowrap rounded-full bg-brand px-5 py-2.5 text-base font-bold text-navy transition-transform hover:scale-[1.03] hover:bg-brand-300"
          >
            Request A Quote
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-950 px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile main">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 text-base font-medium text-white/80"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="/#quote"
            onClick={() => setOpen(false)}
            className="mt-6 block rounded-full bg-brand px-5 py-3.5 text-center text-base font-bold text-navy"
          >
            Request A Quote
          </a>
        </div>
      )}
    </header>
  );
}
