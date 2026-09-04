"use client";

import { useState } from "react";
import { videos } from "../data/videos";
import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";

const INITIAL = 6;

export default function Videos() {
  const [expanded, setExpanded] = useState(false);

  const featured = videos.find((v) => v.featured);
  const rest = videos.filter((v) => v !== featured);
  const shown = expanded ? rest : rest.slice(0, INITIAL - 1);
  const hidden = rest.length - shown.length;

  return (
    <section id="videos" className="relative overflow-hidden bg-navy-950 py-20 lg:py-24">
      <div className="grid-tech absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading eyebrow="See It Work" title={<>SLG Grizzly Screeners In Action</>} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <VideoCard video={featured} featured />}
          {shown.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>

        {hidden > 0 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-bold text-white transition-colors hover:border-brand hover:text-brand"
            >
              Show All {videos.length} Videos
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
