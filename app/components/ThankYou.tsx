"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { screeners } from "../data/products";
import { IconArrowRight, IconCheck, IconPhone } from "./Icons";
import {
  META_PIXEL_ID,
  markLeadFired,
  readLeadHandoff,
  whenPixelReady,
  type LeadHandoff,
} from "../lib/metaPixel";

/**
 * Confirmation page, and the one place the Meta Lead event is sent.
 *
 * See app/lib/metaPixel.ts for why it fires here and only once.
 */
export default function ThankYou() {
  const [handoff, setHandoff] = useState<LeadHandoff | null>(null);

  useEffect(() => {
    const lead = readLeadHandoff();
    setHandoff(lead);
    if (!lead || lead.firedAt) return;

    const model = screeners.find((s) => s.slug === lead.model);
    let cancelled = false;

    whenPixelReady().then((ready) => {
      if (cancelled || !ready) return;
      // Advanced Matching: re-initialising the pixel with the hashed contact
      // details attaches them to this event, which is what lets Meta tie the
      // Lead back to the person who clicked the ad.
      if (lead.userData && Object.keys(lead.userData).length > 0) {
        window.fbq?.("init", META_PIXEL_ID, lead.userData);
      }
      window.fbq?.(
        "track",
        "Lead",
        lead.customData ?? {
          content_name: model ? `DeSite ${model.name}` : "To be recommended",
          content_category: "Grizzly screener",
        },
        { eventID: lead.eventId }
      );
      markLeadFired(lead);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const model = screeners.find((s) => s.slug === handoff?.model);

  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand text-navy">
          <IconCheck className="h-10 w-10" />
        </span>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-brand">
          Request Received
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Thank You
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/75">
          {model
            ? `Your answers point to the ${model.name}. We will confirm it and come back with the mesh opening and a delivered price within one business day.`
            : "We will look at your answers and come back with a model, the mesh opening and a delivered price within one business day."}
        </p>

        {model && (
          <a
            href={`/#${model.slug}`}
            className="group mx-auto mt-10 flex max-w-md items-center gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-left transition-colors hover:border-brand/50"
          >
            <Image
              src={model.image}
              alt={model.imageAlt}
              width={900}
              height={900}
              sizes="7rem"
              quality={80}
              className="h-28 w-28 shrink-0 object-contain"
            />
            <span>
              <span className="block text-sm font-bold uppercase tracking-wider text-brand">
                {model.family}
              </span>
              <span className="mt-1 block font-display text-3xl font-extrabold text-white">
                {model.name}
              </span>
              <span className="mt-2 inline-flex items-center gap-2 text-base font-bold text-white/70 group-hover:text-brand">
                More Information
                <IconArrowRight className="h-4 w-4" />
              </span>
            </span>
          </a>
        )}

        <div className="mt-12 border-t border-white/10 pt-10">
          <p className="text-base text-white/70">Rather Just Talk To Somebody?</p>
          <a
            href="tel:+18772547903"
            className="mt-2 inline-flex items-center gap-3 font-display text-3xl font-extrabold text-white transition-colors hover:text-brand"
          >
            <IconPhone className="h-6 w-6 text-brand" />
            877-254-7903
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/#videos"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-navy transition-colors hover:bg-brand-300"
          >
            Watch It In Action
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/"
            className="rounded-full border border-white/25 px-7 py-4 text-base font-bold text-white transition-colors hover:border-brand hover:text-brand"
          >
            Back To Home
          </a>
        </div>
      </div>
    </section>
  );
}
