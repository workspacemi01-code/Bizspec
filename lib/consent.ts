/**
 * Cookie consent, kept in one place so the banner and the analytics loader
 * cannot disagree about what the visitor chose.
 *
 * Stored in localStorage rather than a cookie: the choice is only ever read in
 * the browser, so sending it to the server on every request would be one more
 * piece of data collected for no purpose. Nothing that needs consent runs
 * until consent is explicitly granted — the default, including for a visitor
 * who ignores the banner entirely, is "no".
 */

export const CONSENT_KEY = "bizspec.consent";
export const CONSENT_EVENT = "bizspec:consent";

export type Consent = "granted" | "denied" | "unset";
/** "pending" is the server's answer: it cannot know, so it must not guess. */
export type ConsentSnapshot = Consent | "pending";

export function readConsent(): Consent {
  /* Private browsing and blocked site data both throw here rather than
     returning null, and a thrown error must not take the page down. */
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

/*
 * The three pieces useSyncExternalStore wants. Consent genuinely is an
 * external store — it lives in localStorage and can change in another tab —
 * so reading it this way is both more correct than an effect and the reason
 * neither component needs one.
 */

export function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  /* Fired when another tab writes the key, so a choice made over there is
     honoured here without a reload. */
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Snapshots are plain strings, so React can compare them by value. */
export const consentSnapshot = (): ConsentSnapshot => readConsent();

/** On the server there is no answer yet, and "pending" renders nothing —
 *  so a returning visitor never gets a flash of the banner they dismissed. */
export const consentServerSnapshot = (): ConsentSnapshot => "pending";

export function writeConsent(value: Exclude<Consent, "unset">) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* The choice still applies to this page view; it just will not be
       remembered for the next one. Better than failing the click. */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}
