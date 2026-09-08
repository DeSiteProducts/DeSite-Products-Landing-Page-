"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PLAYER_ORIGIN = "https://player.vimeo.com";

/**
 * Vimeo background loop.
 *
 * Muted, looping, no controls and not focusable. The scrim is weighted to the
 * bottom, where the copy sits: the middle and top of the frame stay clear so
 * the footage actually reads as video.
 *
 * The poster is the page's largest contentful paint, so it is the one image on
 * the page that gets preloaded. Load the player after the poster has decoded
 * and the document has loaded, then use idle time. Cap adaptive video quality:
 * the oversized cover iframe must not select a 4K stream on phones.
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
  const [playerQuality, setPlayerQuality] = useState<string | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const posterImage = useRef<HTMLImageElement>(null);
  const player = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let ready = false;
    let started = false;
    let inView = false;
    let idleId: number | undefined;
    let timer: number | undefined;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const canPlay = () => inView && !document.hidden && !motion.matches;
    const syncPlayback = () => {
      player.current?.contentWindow?.postMessage(
        { method: canPlay() ? "play" : "pause" }, PLAYER_ORIGIN,
      );
    };
    const start = () => {
      idleId = undefined;
      timer = undefined;
      if (disposed || started || !ready || !canPlay()) return;
      started = true;
      setPlayerQuality(window.matchMedia("(max-width: 767px)").matches ? "540p" : "720p");
    };
    const update = () => {
      if (started) return syncPlayback();
      if (!ready || !canPlay() || idleId !== undefined || timer !== undefined) return;
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timer = window.setTimeout(start, 0);
      }
    };
    const onLoad = async () => {
      // Wait for the poster download and decode without blocking on failures.
      await posterImage.current?.decode().catch(() => {});
      if (disposed) return;
      ready = true;
      update();
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== PLAYER_ORIGIN || event.source !== player.current?.contentWindow) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (data?.event === "ready") syncPlayback();
      } catch { /* Ignore unrelated or malformed player messages. */ }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    if (container.current) observer.observe(container.current);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    window.addEventListener("message", onMessage);
    if (document.readyState === "complete") {
      void onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("load", onLoad);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={container} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {poster && (
        <Image
          src={poster}
          ref={posterImage}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={70}
          className="object-cover"
        />
      )}

      {playerQuality && (
        <iframe
          ref={player}
          title="DeSite grizzly screener background video"
          tabIndex={-1}
          src={`${PLAYER_ORIGIN}/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&playsinline=1&keyboard=0&dnt=1&initial_quality=360p&max_quality=${playerQuality}`}
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
