import { NextResponse } from "next/server";

import { contactTopics } from "@/lib/content";

/**
 * The enquiry endpoint.
 *
 * The browser validates for speed; this validates for truth. Everything that
 * reaches here is treated as untrusted, whatever the form did.
 *
 * Delivery is deliberately not wired to a provider yet — see README. Until an
 * address and a sending service are confirmed, an enquiry is logged without
 * its message body so nothing is silently dropped and nothing personal is
 * written to a log either.
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

  // TODO: send to the business inbox once the address and provider are
  // confirmed. Until then this returns success without storing the enquiry,
  // which is why the form is not yet linked from a campaign.
  return NextResponse.json({ ok: true });
}
