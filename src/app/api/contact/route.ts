import type { NextRequest } from "next/server";
import { site } from "@/config/site";
import { validateContact, type ContactErrors } from "@/lib/validation";

/**
 * Contact endpoint.
 *
 * Behaviour:
 *  1. Honeypot filled  → pretend success (spam bots get nowhere).
 *  2. Invalid payload  → 400 with field errors.
 *  3. CONTACT_ENDPOINT set (server-side env var, e.g. Formspree/Resend/
 *     Web3Forms URL) → forward the message; real success/error responses.
 *  4. No endpoint      → return a pre-filled `mailto:` link so the client
 *     can open the visitor's email app — the UI explains exactly what
 *     happened. No fake "sent" states, ever.
 *
 * Secrets (endpoint URL, API keys) live only in server env vars — nothing
 * is exposed to the browser.
 */

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Spam trap: real users never see this field.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const fields = {
    name: typeof payload.name === "string" ? payload.name : "",
    email: typeof payload.email === "string" ? payload.email : "",
    message: typeof payload.message === "string" ? payload.message : "",
  };

  const errors: ContactErrors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        errors,
      },
      { status: 400 },
    );
  }

  const endpoint = process.env.CONTACT_ENDPOINT;

  if (endpoint) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      if (process.env.CONTACT_API_KEY) {
        headers.Authorization = `Bearer ${process.env.CONTACT_API_KEY}`;
      }

      const upstream = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(10_000),
      });

      if (!upstream.ok) {
        return Response.json(
          {
            ok: false,
            error: "The message service rejected the request. Please email me directly.",
          },
          { status: 502 },
        );
      }

      return Response.json({ ok: true });
    } catch {
      return Response.json(
        {
          ok: false,
          error: "Couldn't reach the message service. Please email me directly.",
        },
        { status: 502 },
      );
    }
  }

  // Honest fallback: hand a pre-filled draft to the visitor's mail client.
  const subject = encodeURIComponent(`Portfolio contact from ${fields.name}`);
  const body = encodeURIComponent(
    `${fields.message}\n\n— ${fields.name}\n${fields.email}`,
  );

  return Response.json({
    ok: true,
    mailto: `mailto:${site.email}?subject=${subject}&body=${body}`,
  });
}
