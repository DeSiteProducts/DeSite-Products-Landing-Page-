import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  zip?: string;

  /** Model the qualification answers point to. */
  model?: string;

  message?: string;

  /** Qualification answers, keyed by question id. */
  answers?: Record<string, string>;

  /** Anti-spam honeypot: must arrive empty. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Construye la URL de redirección.
 */
function buildRedirectUrl(
  request: Request,
  pathname: string,
  result?: "error" | "success",
  params?: Record<string, string>
) {
  const url = new URL(
    pathname,
    process.env.NEXT_PUBLIC_SITE_URL ?? request.url
  );

  if (result) {
    url.searchParams.set(result, "1");
  }

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        url.searchParams.set(key, value);
      }
    }
  }

  return url;
}

/**
 * Redirección después del POST.
 */
function redirectAfterPost(
  request: Request,
  pathname: string,
  result?: "error" | "success",
  params?: Record<string, string>
) {
  return NextResponse.redirect(
    buildRedirectUrl(request, pathname, result, params),
    { status: 303 }
  );
}

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
   * Si un bot llena el campo website, respondemos OK
   * pero no procesamos nada.
   */
  if (data.website) {
    return NextResponse.json({
      ok: true,
      spam: true,
    });
  }

  /**
   * Validación.
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
   * Labels para las respuestas del cuestionario.
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
   * Formateamos las respuestas.
   */
  const qualification = Object.entries(
    data.answers ?? {}
  ).map(([key, value]) => ({
    question: labels[key] ?? key,
    answer: value,
  }));

  /**
   * Payload que enviaremos a AWS Lambda.
   */
  const lambdaPayload = {
    name: data.name.trim(),
    company: data.company?.trim() || "",
    email: data.email.trim(),
    phone: data.phone?.trim() || "",
    zip: data.zip?.trim() || "",
    model: data.model.trim(),
    message: data.message?.trim() || "",
    qualification,
    answers: data.answers ?? {},
  };

  try {
    /**
     * Enviar información a AWS Lambda.
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
     * Si Lambda devuelve error.
     */
    if (!response.ok) {
      console.error(
        "[quote] Lambda email request failed",
        await response.text()
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
     * Éxito.
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