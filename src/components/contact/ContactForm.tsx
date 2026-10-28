"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateContact, type ContactErrors } from "@/lib/validation";

type Status = "idle" | "sending" | "success" | "error";

const EMPTY = { name: "", email: "", message: "" };

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
}

function Field({ label, id, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-mono text-2xs uppercase tracking-[0.14em] text-faint"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs text-warning"
        >
          <AlertCircle className="size-3.5" aria-hidden />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputClasses = (error?: string) =>
  cn(
    "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors focus:outline-none focus:ring-0",
    error
      ? "border-warning"
      : "border-line hover:border-line-strong focus:border-accent",
  );

/**
 * Contact form.
 *
 * • Client-side validation with inline, accessible errors
 * • Honeypot field for basic spam filtering (server enforces it too)
 * • POSTs to /api/contact — which forwards to a configured endpoint or
 *   falls back to a pre-filled mailto: draft (no fake success states)
 */
export function ContactForm() {
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const set = (key: keyof typeof EMPTY, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const validationErrors = validateContact(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setNotice(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, company: honeypot }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        error?: string;
        errors?: ContactErrors;
        mailto?: string;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        setNotice(
          data.error ?? "Something went wrong sending your message. Please try again.",
        );
        return;
      }

      setStatus("success");

      if (data.mailto) {
        setNotice(
          "Form delivery isn't configured on this site yet — your email app is opening with the message pre-filled instead.",
        );
        window.location.href = data.mailto;
      } else {
        setNotice("Message sent. Thanks — I'll get back to you soon.");
        setFields(EMPTY);
      }
    } catch {
      setStatus("error");
      setNotice("Network error — please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      {/* Honeypot — hidden from real users, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="Your name"
            value={fields.name}
            onChange={(event) => set("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClasses(errors.name)}
          />
        </Field>

        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            value={fields.email}
            onChange={(event) => set("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClasses(errors.email)}
          />
        </Field>
      </div>

      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          placeholder="What are you building, and how can I help?"
          value={fields.message}
          onChange={(event) => set("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClasses(errors.message), "resize-y")}
        />
      </Field>

      {/* Status feedback */}
      {notice ? (
        <p
          role={status === "error" ? "alert" : "status"}
          className={cn(
            "flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
            status === "error"
              ? "border-warning/40 bg-warning/10 text-warning"
              : "border-success/40 bg-success/10 text-success",
          )}
        >
          {status === "error" ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          ) : (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
          )}
          {notice}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 text-sm font-medium text-on-accent shadow-[0_8px_24px_-12px_var(--glow)] transition-all hover:brightness-110 focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
