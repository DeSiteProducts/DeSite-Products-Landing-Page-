"use client";

import { useState } from "react";
import type { VideoItem } from "../data/videos";
import ScreenerArt from "./ScreenerArt";

function runtime(seconds?: number) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function VideoCard({ video, featured }: { video: VideoItem; featured?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  const hasVideo = Boolean(video.vimeoId);
  const length = runtime(video.seconds);

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-brand/40 ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden bg-navy-950">
        {playing && video.vimeoId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            title={video.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <>
            {/* La ilustración queda siempre debajo: si la miniatura tarda o
                no carga, la tarjeta nunca se ve vacía. */}
            <div className="absolute inset-0 flex items-center justify-center p-4 opacity-70">
              <ScreenerArt variant={video.model} className="h-full w-full" />
            </div>
            {video.thumb && !thumbFailed && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumb}
                alt=""
                loading="lazy"
                onError={() => setThumbFailed(true)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/10" />

            {hasVideo && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play: ${video.title}`}
              >
                <span
                  className={`inline-flex items-center justify-center rounded-full bg-brand text-navy shadow-[0_0_40px_-6px_var(--color-brand)] transition-transform group-hover:scale-110 ${
                    featured ? "h-20 w-20" : "h-14 w-14"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={featured ? "h-9 w-9" : "h-6 w-6"} fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                  </svg>
                </span>
              </button>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <h3 className={`font-display font-bold text-white ${featured ? "text-xl sm:text-2xl" : "text-base"}`}>
                {video.title}
              </h3>
              <span className="shrink-0 rounded-full border border-white/20 bg-navy-950/80 px-2.5 py-0.5 text-xs font-bold tracking-wider text-white/70 backdrop-blur">
                {length ?? "Filming"}
              </span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

