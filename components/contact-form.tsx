"use client";

import { useState } from "react";

import { Button } from "@/components/ui";
import { contactTopics } from "@/lib/content";

/**
 * The enquiry form.
 *
 * Validated in the browser for speed and on the server for truth — the server
 * is the only side that counts, so the same rules run there whatever reaches
 * the endpoint.
 *
 * `topic` can be pre-selected from the query string, so "Talk to a Zoho
 * specialist" arrives with Zoho already chosen.
 */
export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) {
        setState("error");
        setMessage(body?.error ?? "We could not send that. Please try again.");
        return;
      }
      setState("sent");
      form.reset();
    } catch {
      setState("error");
      setMessage("We could not reach the server. Check your connection and try again.");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-lg border border-line bg-surface p-8 text-center"
      >
        <h2 className="text-base font-semibold">Thank you — we have your enquiry</h2>
        <p className="mt-2 text-sm text-ink-soft">
          We read every message and will come back to you with a practical next step.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setState("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {/* Not shown, not tabbable, not announced. A bot fills it; a person
          cannot. Cheaper and less hostile than a puzzle. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Business or company" name="company" autoComplete="organization" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone or WhatsApp" name="phone" type="tel" autoComplete="tel" />
        <Field label="Country" name="country" autoComplete="country-name" />
        <div>
          <Label htmlFor="topic">What can we help with?</Label>
          <select
            id="topic"
            name="topic"
            defaultValue={initialTopic}
            className="w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-base sm:text-sm"
          >
            <option value="">Choose one</option>
            {contactTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-base sm:text-sm"
          placeholder="What are you trying to build, improve or implement?"
        />
      </div>

      {message && (
        <p role="alert" className="rounded-md bg-danger-tint px-3 py-2 text-sm text-danger">
          {message}
        </p>
      )}

      <Button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && (
          <span className="text-danger" aria-hidden>
            {" "}
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        /* 16px on a phone, or iOS zooms the page in on focus and never back. */
        className="w-full rounded-md border border-line-strong bg-paper px-3 py-2.5 text-base sm:text-sm"
      />
    </div>
  );
}
