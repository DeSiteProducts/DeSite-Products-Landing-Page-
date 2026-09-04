import Image from "next/image";
import type { Machine } from "../data/equipment";

/**
 * Every carrier machine at once, no slider.
 *
 * Every slot is the same fixed width on every card, so a mini tractor on the
 * SLG 56 cannot end up drawn larger than a 24-tonne excavator on the SLG 108.
 * Each image fills a share of its slot, and that share is the machine's size
 * relative to the biggest one, which keeps the line-up to scale.
 *
 * `zoom` enlarges a whole row at once. The mini row needs it: measured against
 * the same reference as the others its machines come out too small to read, and
 * enlarging the row keeps every machine in it in proportion to the rest.
 */
export default function EquipmentRow({
  title,
  machines,
  zoom = 1,
}: {
  title: string;
  machines: Machine[];
  zoom?: number;
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
            <Image
              src={m.image}
              alt={m.name}
              width={m.width}
              height={m.height}
              sizes="10rem"
              quality={80}
              // Every one of these rows sits well below the fold.
              loading="lazy"
              className="h-auto"
              style={{ width: `${Math.min(m.scale * zoom, 1) * 100}%` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
