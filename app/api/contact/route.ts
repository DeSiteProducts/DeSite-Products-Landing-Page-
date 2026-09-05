import { NextResponse } from "next/server";

import {
  COUNTRY_HEADER,
  CURRENCY_HEADER,
  DEFAULT_CURRENCY,
  parseCurrency,
} from "../../lib/currency";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  zip?: string;

  /** Model the qualification answers point to. */
  model?: string;
<<<<<<< Updated upstream

  /** Currency the visitor was shown. */
  currency?: string;

=======
  /** Currency the visitor was shown, so we quote them in the same one. */
  currency?: string;
>>>>>>> Stashed changes
  message?: string;

  /** Qualification answers, keyed by question id. */
  answers?: Record<string, string>;

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
    carrier: "Loading machine",
    material: "Material",
    volume: "Volume per hour",
    productSize: "Product size",
    moisture: "Moisture",
    purpose: "Selling the product",
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

<<<<<<< Updated upstream
  /**
   * Currency is resolved primarily from the proxy header.
   * The body value is only a fallback.
   */
=======
  // The proxy resolves this from the country the request came from. The posted
  // value is only a fallback, since anything in the body is client-supplied.
>>>>>>> Stashed changes
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
    company: data.company?.trim() || "",
    email: data.email.trim(),
    phone: data.phone?.trim() || "",
    zip: data.zip?.trim() || "",
    model: data.model.trim(),

    currency,

    country,

    message: data.message?.trim() || "",
<<<<<<< Updated upstream

=======
    // La moneda que vio el visitante, para cotizarle en la misma.
    currency,
    country: country ?? "",
>>>>>>> Stashed changes
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
     */
    return NextResponse.json({
      ok: true,
      delivered: true,
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