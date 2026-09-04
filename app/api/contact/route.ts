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
  /** Currency the visitor was shown, so we quote them in the same one. */
  currency?: string;
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
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (data.website) {
    // Bot: answer 200 and do nothing.
    return NextResponse.json({ ok: true });
  }

  const errors: string[] = [];
  if (!data.name?.trim()) errors.push("name");
  if (!data.email?.trim() || !EMAIL_RE.test(data.email.trim())) errors.push("email");
  if (!data.model?.trim()) errors.push("model");

  if (errors.length) {
    return NextResponse.json(
      { error: "Please check the required fields.", fields: errors },
      { status: 422 }
    );
  }

  const labels: Record<string, string> = {
    carrier: "Loading machine",
    material: "Material",
    volume: "Volume per hour",
    productSize: "Product size",
    moisture: "Moisture",
    purpose: "Selling the product",
    timeline: "Timeline",
  };

  const qualification = Object.entries(data.answers ?? {}).map(
    ([key, value]) => `  ${labels[key] ?? key}: ${value}`
  );

  // The proxy resolves this from the country the request came from. The posted
  // value is only a fallback, since anything in the body is client-supplied.
  const currency =
    parseCurrency(request.headers.get(CURRENCY_HEADER)) ??
    parseCurrency(data.currency) ??
    DEFAULT_CURRENCY;
  const country = request.headers.get(COUNTRY_HEADER);

  const lines = [
    `Name:     ${data.name}`,
    `Company:  ${data.company || "—"}`,
    `Email:    ${data.email}`,
    `Phone:    ${data.phone || "—"}`,
    `ZIP:      ${data.zip || "—"}`,
    `Model:    ${data.model}`,
    `Currency: ${currency}${country ? ` (request from ${country})` : ""}`,
    "",
    "Qualification:",
    ...(qualification.length ? qualification : ["  (no answers)"]),
    "",
    "Notes:",
    data.message || "—",
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } =
    process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    // No SMTP credentials configured: log the lead so it is not lost.
    console.info("[quote] SMTP not configured, lead received:\n" + lines);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: data.email,
      subject: `Quote request (${currency}) — ${data.model} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text: lines,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[quote] failed to send the email", err);
    return NextResponse.json(
      { error: "We could not send your message. Try again or give us a call." },
      { status: 502 }
    );
  }
}
