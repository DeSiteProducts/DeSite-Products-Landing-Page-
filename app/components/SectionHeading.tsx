export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      <span
        className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] ${
          tone === "dark" ? "text-brand" : "text-navy"
        }`}
      >
        <span className={`h-px w-8 ${tone === "dark" ? "bg-brand" : "bg-navy"}`} />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            tone === "dark" ? "text-white/65" : "text-graphite/75"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
