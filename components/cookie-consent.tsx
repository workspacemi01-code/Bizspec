"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import { Button } from "@/components/ui";
import {
  consentServerSnapshot,
  consentSnapshot,
  subscribeToConsent,
  writeConsent,
} from "@/lib/consent";

/**
 * The cookie banner.
 *
 * Two things most banners get wrong and this one does not: refusing is exactly
 * as easy as accepting — same size, same prominence, no dark pattern — and
 * nothing that needs consent has already run by the time it is shown. The
 * banner is the gate, not an announcement made after the fact.
 *
 * It renders nothing until the browser has told us what the visitor chose, so
 * the server-rendered HTML never shows a banner to someone who decided months
 * ago.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    consentSnapshot,
    consentServerSnapshot,
  );

  /* "pending" is the server; "granted"/"denied" is someone who already
     answered. Only an unanswered browser sees the banner. */
  if (consent !== "unset") return null;

  function choose(value: "granted" | "denied") {
    /* No local state to set: writing dispatches the event, the store
       re-reads, and this component and the analytics loader both follow. */
    writeConsent(value);
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper p-4 shadow-[0_-8px_32px_rgba(14,27,40,0.08)] sm:p-5"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="cookie-title" className="text-sm font-semibold">
            Cookies on this site
          </h2>
          <p id="cookie-body" className="mt-1 max-w-2xl text-sm text-ink-soft">
            We use analytics cookies to understand which pages are useful. They are off
            until you turn them on, and the site works either way.{" "}
            <Link href="/cookies" className="text-brand underline underline-offset-2">
              Read our cookie policy
            </Link>
            .
          </p>
        </div>
        {/* Same weight on both buttons: declining is not the harder path. */}
        <div className="flex shrink-0 gap-2">
          <Button variant="secondary" onClick={() => choose("denied")}>
            Decline
          </Button>
          <Button onClick={() => choose("granted")}>Accept</Button>
        </div>
      </div>
    </div>
  );
}
