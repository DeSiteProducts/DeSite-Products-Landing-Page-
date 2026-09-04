"use client";

import { useState, type ReactNode } from "react";

type Photo = { src: string; alt: string };

/**
 * One photo at a time, swapped by opacity rather than by scrolling or
 * translating a track: the active slide is the only opaque one, so the state
 * of the gallery never depends on a scroll position or a transform landing.
 */
export default function PhotoGallery({
  photos,
  fallback,
}: {
  photos: Photo[];
  /** Shown as the only slide while this difference has no photographs yet. */
  fallback?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const many = photos.length > 1;

  function go(next: number) {
    setIndex(((next % photos.length) + photos.length) % photos.length);
  }

  return (
    <figure className="group relative min-h-72 overflow-hidden bg-navy-950">
      {photos.length === 0 && fallback}

      {photos.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={p.src}
          src={p.src}
          alt={p.alt}
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {many && (
        <>
          {[-1, 1].map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(index + dir)}
              aria-label={dir < 0 ? "Previous photo" : "Next photo"}
              className={`absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/70 text-white backdrop-blur transition-colors hover:border-brand hover:text-brand ${
                dir < 0 ? "left-4" : "right-4"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={dir < 0 ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6"} />
              </svg>
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Photo ${i + 1} of ${photos.length}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-brand" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </figure>
  );
}
