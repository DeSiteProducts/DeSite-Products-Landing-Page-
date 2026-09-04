import type { Machine } from "../data/equipment";

/**
 * Every carrier machine at once, no slider.
 *
 * Every slot is the same fixed width on every card, so a mini tractor on the
 * SLG 56 cannot end up drawn larger than a 24-tonne excavator on the SLG 108.
 * Each image fills a share of its slot, and that share is the machine's size
 * relative to the biggest one, which keeps the line-up to scale.
 */
export default function EquipmentRow({
  title,
  machines,
}: {
  title: string;
  machines: Machine[];
}) {
  return (
    <div className="border-t border-white/10 px-6 py-6 md:col-span-2 lg:col-span-3 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">{title}</p>

      {/* La rejilla va en estilo directo: Tailwind no genera este valor
          arbitrario y la lista terminaba en una máquina por fila. */}
      <ul
        className="mt-5 grid items-end gap-x-4 gap-y-6"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(5.5rem, 1fr))" }}
      >
        {machines.map((m) => (
          <li key={m.name} className="flex w-[7.25rem] items-end justify-center sm:w-[10rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.image}
              alt={m.name}
              className="h-auto"
              style={{ width: `${m.scale * 100}%` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
