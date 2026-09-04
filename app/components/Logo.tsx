export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#052356" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M3 7h18M4.5 12h15M6 17h12" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight text-white">
        DeSite<span className="text-brand">.</span>
      </span>
    </span>
  );
}
