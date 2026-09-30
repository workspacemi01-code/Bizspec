import { NextResponse } from "next/server";

import { contactTopics, site } from "@/lib/content";

/**
 * The enquiry endpoint.
 *
 * The browser validates for speed; this validates for truth. Everything that
 * reaches here is treated as untrusted, whatever the form did.
 *
 * Delivery goes out through Resend's HTTP API, called with plain fetch rather
 * than their SDK so the site takes no extra dependency for one POST. With no
 * RESEND_API_KEY set the endpoint still validates and rate-limits but does not
 * deliver — that is the state the site ships in, and the log line says so.
 *
 * The key is read from the server environment and never reaches the browser.
 */

const MAX = { name: 120, company: 160, email: 200, phone: 40, country: 80, message: 4000 };

/** One window per address, held in memory. A single instance is enough for a
 *  marketing site; move to a shared store if this ever runs on several. */
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing without bound on a long-running instance.
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

/** Deliberately permissive: the aim is to catch a typo, not to police
 *  addresses, and an over-strict pattern rejects valid ones. */
const looksLikeEmail = (v: string) => /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(v);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Could not read that request." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // The honeypot is invisible to people, so anything in it came from a script.
  // Answer as though it worked: a bot told it failed simply tries again.
  if (str(data.company_website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(data.name, MAX.name);
  const email = str(data.email, MAX.email);
  const message = str(data.message, MAX.message);
  const topic = str(data.topic, 60);

  if (!name) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (!looksLikeEmail(email))
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
  if (message.length < 10)
    return NextResponse.json(
      { error: "Please say a little more about what you need." },
      { status: 400 },
    );
  if (topic && !contactTopics.includes(topic as (typeof contactTopics)[number]))
    return NextResponse.json({ error: "Choose one of the listed options." }, { status: 400 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "That is a lot of enquiries. Please try again shortly." },
      { status: 429 },
    );
  }

  // Only that one arrived and what it was about. No name, address or message
  // body goes to the log.
  console.info(`[contact] enquiry received${topic ? ` — ${topic}` : ""}`);

  const sent = await deliver({
    name,
    email,
    message,
    topic,
    company: str(data.company, MAX.company),
    phone: str(data.phone, MAX.phone),
    country: str(data.country, MAX.country),
  });

  if (sent === "failed") {
    /* Better to say so than to show a thank-you for an enquiry that went
       nowhere. The address in the message is the way through. */
    return NextResponse.json(
      {
        error: `We could not send that just now. Please email us directly at ${site.email}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

type Enquiry = {
  name: string;
  email: string;
  message: string;
  topic: string;
  company: string;
  phone: string;
  country: string;
};

/** HTML-escape, because every one of these fields is something a stranger
 *  typed and the result goes into an email body. */
const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

async function deliver(enquiry: Enquiry): Promise<"sent" | "skipped" | "failed"> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info("[contact] RESEND_API_KEY not set — enquiry validated but not delivered");
    return "skipped";
  }

  const to = process.env.CONTACT_TO ?? site.email;
  /* Resend's shared sender works without a verified domain, but only delivers
     to the account owner. Set CONTACT_FROM to an address on the real domain
     once it is verified. */
  const from = process.env.CONTACT_FROM ?? "Bizspec Website <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Company", enquiry.company],
    ["Phone", enquiry.phone],
    ["Country", enquiry.country],
    ["Topic", enquiry.topic],
  ].filter(([, v]) => v) as [string, string][];

  const html = `
    <div style="font-family:system-ui,sans-serif;color:#0e1b28;line-height:1.55">
      <h2 style="margin:0 0 4px;font-size:18px">New enquiry from the website</h2>
      <p style="margin:0 0 20px;color:#637384;font-size:13px">${esc(
        enquiry.topic || "No topic selected",
      )}</p>
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#637384">${k}</td><td style="padding:4px 0"><strong>${esc(
                v,
              )}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:22px 0 6px;color:#637384;font-size:13px">Message</p>
      <div style="white-space:pre-wrap;border-left:3px solid #336799;padding-left:14px">${esc(
        enquiry.message,
      )}</div>
    </div>`;

  /* A plain-text alternative alongside the HTML. Spam filters mark down
     HTML-only mail, and some clients show nothing useful without it. */
  const text = [
    "New enquiry from the website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    enquiry.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        /* So hitting reply in the inbox goes to the person who wrote in,
           rather than to the sending service. */
        reply_to: enquiry.email,
        subject: `Website enquiry — ${enquiry.name}${enquiry.topic ? ` (${enquiry.topic})` : ""}`,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      /* The status is ours to log; the provider's body may quote the payload,
         so it does not go to the log. */
      console.error(`[contact] delivery failed with status ${res.status}`);
      return "failed";
    }
    return "sent";
  } catch {
    console.error("[contact] delivery failed: could not reach the mail provider");
    return "failed";
  }
}
