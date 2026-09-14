import { NextResponse, after } from "next/server";
import { sendMetaLead } from "../../lib/metaCapi.server";
import type { Attribution } from "../../lib/attribution";

import {
  COUNTRY_HEADER,
  CURRENCY_HEADER,
  DEFAULT_CURRENCY,
  parseCurrency,
} from "../../lib/currency";

export const runtime = "nodejs";

type Payload = {
  name?: string
  email?: string;
  phone?: string;

  /** Delivery address. The country comes from the request, not the form. */
  address?: string;
  city?: string;
  state?: string;
  zip?: string;

  /** The consent box was ticked. Recorded with the lead. */
  consent?: boolean;

  /** Where the visitor came from. See app/lib/attribution.ts. */
  attribution?: Attribution | null;

  /** Model the qualification answers point to. */
  model?: string;

  /** Currency the visitor was shown. */
  currency?: string;

  message?: string;

  /** Qualification answers, keyed by question id. */
  answers?: Record<string, string>;

  /** Shared with the browser Pixel Lead as event_id, so Meta counts it once. */
  metaEventId?: string;

  /** Anti-spam honeypot: must arrive empty. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let data: Payload;

  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  /**
   * Honeypot anti-spam.
   */
  if (data.website) {
    return NextResponse.json({
      ok: true,
      spam: true,
    });
  }

  /**
   * Validation.
   */
  const errors: string[] = [];

  if (!data.name?.trim()) {
    errors.push("name");
  }

  if (
    !data.email?.trim() ||
    !EMAIL_RE.test(data.email.trim())
  ) {
    errors.push("email");
  }

  if (!data.model?.trim()) {
    errors.push("model");
  }

  /**
   * Sin la casilla marcada no hay permiso para guardar el dato ni para
   * contactar, así que no puede quedarse solo en el cliente.
   */
  if (data.consent !== true) {
    errors.push("consent");
  }

  if (errors.length > 0) {
    console.warn("[quote] Invalid form submission", {
      errors,
      namePresent: Boolean(data.name?.trim()),
      emailValid: Boolean(
        data.email?.trim() &&
        EMAIL_RE.test(data.email.trim())
      ),
      modelPresent: Boolean(data.model?.trim()),
    });

    return NextResponse.json(
      {
        error: "Please check the required fields.",
        fields: errors,
      },
      { status: 422 }
    );
  }

  /**
   * Question labels.
   */
  const labels: Record<string, string> = {
    equipment: "Equipment on site",
    material: "Material",
    volume: "Volume per hour",
    productSize: "Finished product size",
    timeline: "Timeline",
  };

  /**
   * Format qualification answers.
   */
  const qualification = Object.entries(
    data.answers ?? {}
  ).map(([key, value]) => ({
    question: labels[key] ?? key,
    answer: value,
  }));

  /**
   * The lead source rides along in the same question/answer list.
   *
   * It is not a qualification answer, but this is the one part of the payload
   * the Lambda already walks and prints, so the origin shows up in the email
   * without the Lambda having to be redeployed first.
   */
  const attribution = data.attribution ?? null;

  if (attribution) {
    const rows: [string, string | undefined][] = [
      ["Lead source", attribution.source],
      ["Channel", attribution.channel],
      ["Campaign", attribution.campaign],
      ["Ad group / term", attribution.term],
      ["Ad content", attribution.content],
      ["Click ID", attribution.clickId],
      ["Referrer", attribution.referrer || undefined],
      ["Landing page", attribution.landingPage],
    ];

    for (const [question, answer] of rows) {
      if (answer) qualification.push({ question, answer });
    }
  }

  /**
   * Currency is resolved primarily from the proxy header.
   * The body value is only a fallback.
   */
  const currency =
    parseCurrency(request.headers.get(CURRENCY_HEADER)) ??
    parseCurrency(data.currency) ??
    DEFAULT_CURRENCY;

  /**
   * Country detected by the proxy.
   */
  const country =
    request.headers.get(COUNTRY_HEADER) ?? "";

  /**
   * Payload sent to AWS Lambda.
   */
  const lambdaPayload = {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone?.trim() || "",
    zip: data.zip?.trim() || "",
    address: data.address?.trim() || "",
    city: data.city?.trim() || "",
    state: data.state?.trim() || "",

    consent: data.consent === true,

    /** Structured copy of the same thing, for whatever reads this next. */
    attribution,

    model: data.model.trim(),

    currency,

    country,

    message: data.message?.trim() || "",

    qualification,

    answers: data.answers ?? {},
  };

  try {
    /**
     * Send information to AWS Lambda.
     */
    const response = await fetch(
      "https://7d8v3ptt1c.execute-api.us-east-1.amazonaws.com/default/sendQuoteGrizzlyEmail",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(lambdaPayload),
      }
    );

    /**
     * Lambda returned an error.
     */
    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "[quote] Lambda email request failed",
        errorText
      );

      return NextResponse.json(
        {
          error:
            "We could not send your message. Please try again.",
        },
        { status: 502 }
      );
    }

    /**
     * Success.
     *
     * The Meta Conversions API send runs after the response has gone out, so
     * the visitor never waits on Meta and a Meta outage cannot fail a lead
     * that has already reached the inbox. Request details are read now; the
     * request itself is finished by the time `after` runs.
     */
    const requestInfo = {
      ip:
        (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
        request.headers.get("x-real-ip"),
      userAgent: request.headers.get("user-agent"),
      cookie: request.headers.get("cookie"),
      pageUrl: request.headers.get("referer"),
    };

    after(() =>
      sendMetaLead({
        eventId: data.metaEventId,
        contact: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country,
        },
        modelName: data.model,
        answers: data.answers,
        attribution,
        currency,
        requestInfo,
      })
    );

    return NextResponse.json({
      ok: true,
      delivered: true,
      // The browser has no other way to learn the country, and Advanced
      // Matching on the Pixel side wants it too.
      country: country.toLowerCase(),
    });

  } catch (error) {
    console.error(
      "[quote] Failed to send quote request",
      error
    );

    return NextResponse.json(
      {
        error:
          "We could not send your message. Try again or give us a call.",
      },
      { status: 502 }
    );
  }
}