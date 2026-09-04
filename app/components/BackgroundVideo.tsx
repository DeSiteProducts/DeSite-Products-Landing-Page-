"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Vimeo background loop.
 *
 * Muted, looping, no controls and not focusable. The scrim is weighted to the
 * bottom, where the copy sits: the middle and top of the frame stay clear so
 * the footage actually reads as video.
 *
 * The poster is the page's largest contentful paint, so it is the one image on
 * the page that gets `priority`. The player iframe is held back until the
 * browser is idle: it pulls in Vimeo's script and the video itself, and none of
 * that should compete with the poster for the first paint.
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
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => setShowPlayer(true);

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(start, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      )}

      {showPlayer && (
        <iframe
          title=""
          tabIndex={-1}
          src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0`}
          allow="autoplay; fullscreen"
          loading="lazy"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
      )}

      {/* Oscuro abajo, donde va el texto; despejado en el medio y arriba */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/75 to-transparent" />
    </div>
  );
}
