"use client";

import { useState } from "react";
import { questions, recommendModel } from "../data/qualify";
import { screeners } from "../data/products";
import { IconArrowRight, IconCheck, IconPhone } from "./Icons";
import { CURRENCIES, type Currency } from "../lib/currency";

type Status = "idle" | "sending" | "sent" | "error";

const TOTAL = questions.length + 1; // preguntas + datos de contacto

const field =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-base text-white placeholder:text-white/35 transition-colors focus:border-brand focus:bg-white/[0.07] focus:outline-none";
const label = "mb-2 block text-sm font-bold uppercase tracking-wider text-white/55";

export default function QuoteForm({ currency }: { currency: Currency }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const isContactStep = step === questions.length;
  const question = isContactStep ? null : questions[step];
  const current = question ? answers[question.id] : undefined;

  const recommended = recommendModel(answers);
  const model = screeners.find((s) => s.slug === recommended);

  function choose(value: string) {
    setAnswers((a) => ({ ...a, [question!.id]: value }));
  }

  function next() {
    if (question && !current) return;
    setStep((s) => Math.min(s + 1, questions.length));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const contact = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          model: model ? model.name : "To be recommended",
          // The currency they were shown, so the quote we send back matches
          // the sticker price they read.
          currency,
          answers,
        }),
      });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(body.error || "We could not send your request.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setMessage("No connection to the server. Please try again.");
    }
  }

  return (
    <section id="quote" className="relative overflow-hidden bg-navy-950 py-20 lg:py-24">
      <div className="grid-tech absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -bottom-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand/20 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-9">
          {status === "sent" ? (
            <div className="flex h-full min-h-96 flex-col items-center justify-center text-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand text-navy">
                <IconCheck className="h-8 w-8" />
              </span>
              <h3 className="mt-6 font-display text-3xl font-extrabold text-white">
                Got It
              </h3>
              <p className="mt-3 max-w-sm text-base text-white/65">
                {model
                  ? `Your answers point to the ${model.name}. We will confirm it and come back with the mesh opening and a delivered price within one business day.`
                  : "We will look at your answers and come back with a model, the mesh opening and a delivered price within one business day."}
              </p>
            </div>
          ) : (
            <>
              {/* Progreso */}
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-bold uppercase tracking-wider text-white/45">
                  {isContactStep ? "Last step" : `Question ${step + 1} of ${questions.length}`}
                </p>
                {model && (
                  <p className="text-sm font-bold text-brand">Pointing to the {model.name}</p>
                )}
              </div>
              <div
                className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuenow={step + 1}
                aria-valuemin={1}
                aria-valuemax={TOTAL}
                aria-label="Progress"
              >
                <div
                  className="h-full rounded-full bg-brand transition-all duration-300"
                  style={{ width: `${((step + 1) / TOTAL) * 100}%` }}
                />
              </div>

              {question ? (
                <fieldset className="mt-8">
                  <legend className="font-display text-2xl font-extrabold leading-snug text-white">
                    {question.question}
                  </legend>
                  {question.help && (
                    <p className="mt-3 text-base leading-relaxed text-white/55">{question.help}</p>
                  )}

                  <div className="mt-6 space-y-3">
                    {question.options.map((o) => {
                      const selected = current === o.value;
                      return (
                        <label
                          key={o.value}
                          className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 transition-colors ${
                            selected
                              ? "border-brand bg-brand/10"
                              : "border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={o.value}
                            checked={selected}
                            onChange={() => choose(o.value)}
                            className="sr-only"
                          />
                          <span
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected ? "border-brand bg-brand" : "border-white/30"
                            }`}
                            aria-hidden="true"
                          >
                            {selected && <span className="h-2 w-2 rounded-full bg-navy" />}
                          </span>
                          <span>
                            <span className="block text-base font-semibold text-white">
                              {o.value}
                            </span>
                            {o.hint && (
                              <span className="mt-0.5 block text-sm text-white/45">{o.hint}</span>
                            )}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        className="rounded-full border border-white/20 px-6 py-4 text-base font-bold text-white transition-colors hover:border-white/40"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={next}
                      disabled={!current}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-navy transition-all hover:bg-brand-300 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </fieldset>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-8">
                  <h3 className="font-display text-2xl font-extrabold text-white">
                    Where Do We Send The Quote?
                  </h3>
                  {model && (
                    <p className="mt-3 rounded-xl border border-brand/25 bg-brand/10 px-4 py-3 text-base text-white/80">
                      Your answers point to the{" "}
                      <span className="font-bold text-brand">{model.name}</span>. We will
                      confirm it against your material before quoting.
                    </p>
                  )}

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={label} htmlFor="name">
                        Name *
                      </label>
                      <input id="name" name="name" required className={field} placeholder="Dana Whitfield" />
                    </div>
                    <div>
                      <label className={label} htmlFor="company">
                        Company
                      </label>
                      <input id="company" name="company" className={field} placeholder="Valley Landscape Supply" />
                    </div>
                    <div>
                      <label className={label} htmlFor="email">
                        Email *
                      </label>
                      <input id="email" name="email" type="email" required className={field} placeholder="dana@company.com" />
                    </div>
                    <div>
                      <label className={label} htmlFor="phone">
                        Phone
                      </label>
                      <input id="phone" name="phone" type="tel" className={field} placeholder="+1 555 000 0000" />
                    </div>
                    <div>
                      <label className={label} htmlFor="zip">
                        ZIP code *
                      </label>
                      <input id="zip" name="zip" required className={field} placeholder="79336" />
                    </div>
                    <div>
                      <label className={label} htmlFor="message">
                        Anything else?
                      </label>
                      <input id="message" name="message" className={field} placeholder="Optional" />
                    </div>
                  </div>

                  {/* Honeypot anti-spam. */}
                  <div className="absolute left-[-9999px]" aria-hidden="true">
                    <label htmlFor="website">Leave this empty</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  {status === "error" && (
                    <p role="alert" className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-base text-red-200">
                      {message}
                    </p>
                  )}

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="rounded-full border border-white/20 px-6 py-4 text-base font-bold text-white transition-colors hover:border-white/40"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-bold text-navy transition-all hover:bg-brand-300 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? "Sending…" : "Send My Answers"}
                      {status !== "sending" && (
                        <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </button>
                  </div>

                  <p className="mt-4 text-center text-sm text-white/40">
                    We use your details only to answer this request. No mailing lists.
                    We will quote in {CURRENCIES[currency].label}.
                  </p>
                </form>
              )}
            </>
          )}
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-base text-white/50">Rather Just Talk To Somebody?</p>
          <a
            href="tel:+18772547903"
            className="mt-2 inline-flex items-center gap-3 font-display text-2xl font-extrabold text-white transition-colors hover:text-brand"
          >
            <IconPhone className="h-5 w-5 text-brand" />
            877-254-7903
          </a>
        </div>
      </div>
    </section>
  );
}
