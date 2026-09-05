/**
 * A specification figure with its unit drawn small.
 *
 * The units are written into the value itself ("6ft × 10ft") so the data reads
 * the way the card does; this splits the letter runs back out and sets them at
 * a smaller size, which keeps the number the thing the eye lands on.
 */
export default function SpecValue({ value }: { value: string }) {
  return (
    <>
      {value.split(/([A-Za-z]+)/).map((part, i) =>
        /^[A-Za-z]+$/.test(part) ? (
          <span key={i} className="text-base font-bold text-white/50">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
