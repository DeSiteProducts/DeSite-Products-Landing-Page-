/**
 * Vimeo background loop.
 *
 * Muted, looping, no controls and not focusable. The scrim is weighted to the
 * bottom, where the copy sits: the middle and top of the frame stay clear so
 * the footage actually reads as video.
 *
 * Hidden for anyone who asked for reduced motion — the poster frame stands in.
 */
export default function BackgroundVideo({
  vimeoId,
  poster,
}: {
  vimeoId: string;
  poster?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      )}

      <iframe
        title=""
        tabIndex={-1}
        src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0`}
        allow="autoplay; fullscreen"
        className="absolute left-1/2 top-1/2 hidden h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 motion-safe:block"
      />

      {/* Oscuro abajo, donde va el texto; despejado en el medio y arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
    </div>
  );
}
