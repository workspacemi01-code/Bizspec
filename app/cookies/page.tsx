import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `Cookie Policy for ${site.name}.`,
  alternates: { canonical: "/cookies" },
  robots: { index: false, follow: true },
};

/**
 * Two halves, deliberately.
 *
 * What the site actually stores is a fact about this codebase, so it is
 * written out plainly and kept true. The policy itself — retention, legal
 * basis, who to complain to — has to come from whoever is accountable for it,
 * so it stays marked as unwritten rather than invented.
 */
export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-h1 font-semibold">Cookie Policy</h1>

      <p className="mt-5 max-w-2xl text-lead text-ink-soft">
        What this website stores on your device, in plain terms.
      </p>

      <h2 className="mt-12 text-h2 font-semibold">What we store</h2>
      <dl className="mt-6 max-w-2xl space-y-6">
        <div>
          <dt className="font-mono text-xs tracking-[0.1em] text-brand uppercase">
            bizspec.consent
          </dt>
          <dd className="mt-2 text-sm text-ink-soft">
            Set only when you answer the cookie banner, and it records nothing but your
            answer — accept or decline. It is kept in your browser&apos;s local storage and
            is never sent to our server. Clearing your site data removes it and the banner
            returns.
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs tracking-[0.1em] text-brand uppercase">
            Analytics
          </dt>
          <dd className="mt-2 text-sm text-ink-soft">
            Only loaded if you accept. Nothing is requested from an analytics provider
            before that, so declining means those cookies are never set in the first place
            rather than being set and then ignored.
          </dd>
        </div>
      </dl>

      <h2 className="mt-12 text-h2 font-semibold">What we do not store</h2>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        There are no advertising cookies, no tracking pixels and no third-party embeds on
        this site. The enquiry form sends what you type in it to us and stores nothing on
        your device.
      </p>

      <h2 className="mt-12 text-h2 font-semibold">Changing your mind</h2>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        Clear this site&apos;s data in your browser settings and the banner will ask you
        again on your next visit.
      </p>

      <h2 className="mt-12 text-h2 font-semibold">Questions</h2>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        How we handle personal information more generally is set out in our{" "}
        <a href="/privacy" className="text-brand hover:underline">
          privacy policy
        </a>
        . For anything else, write to{" "}
        <a href={`mailto:${site.email}`} className="text-brand hover:underline">
          {site.email}
        </a>
        .
      </p>
    </Container>
  );
}
