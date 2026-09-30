import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles personal information collected through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * This describes what the site actually does, which is a matter of fact and
 * verifiable against the code: one form, one optional analytics script, no
 * database, no account, no third-party embed.
 *
 * It deliberately makes no claim about retention schedules, lawful basis or
 * the registered entity, because those are decisions for the business rather
 * than facts about the code. Have it reviewed before relying on it.
 */
export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-h1 font-semibold">Privacy Policy</h1>
      <p className="mt-5 max-w-2xl text-lead text-ink-soft">
        This policy explains what happens to your information when you use this website.
        It is deliberately short, because the site collects very little.
      </p>

      <div className="mt-12 max-w-2xl space-y-10">
        <section>
          <h2 className="text-h2 font-semibold">What we collect</h2>
          <p className="mt-4 text-ink-soft">
            Only what you type into the enquiry form: your name, email address, and
            optionally your company, phone number, country and the subject of your enquiry,
            along with your message.
          </p>
          <p className="mt-3 text-ink-soft">
            We do not ask for payment details, we have no user accounts, and there is
            nothing on this site to log in to.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">What we do with it</h2>
          <p className="mt-4 text-ink-soft">
            We read your enquiry and reply to it. That is the whole purpose. We do not sell
            personal information, and we do not share it with anyone except the service that
            delivers the email to us.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Who else sees it</h2>
          <p className="mt-4 text-ink-soft">
            Your enquiry is delivered to our inbox by an email provider, which handles it in
            transit. Our website host processes the request in order to serve the page. Both
            are ordinary infrastructure suppliers acting on our instructions.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Cookies and analytics</h2>
          <p className="mt-4 text-ink-soft">
            No analytics cookie is set unless you accept the banner. If you decline, or
            ignore it, nothing is loaded and nothing is measured. The only thing stored on
            your device is your answer to that banner.{" "}
            <a href="/cookies" className="text-brand hover:underline">
              Full detail is on the cookie page
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Security</h2>
          <p className="mt-4 text-ink-soft">
            The site is served over HTTPS only. Enquiries are validated and rate-limited on
            our server. We do not write the contents of your message to our application
            logs.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Your choices</h2>
          <p className="mt-4 text-ink-soft">
            You can ask us what we hold about you, ask for a copy, ask us to correct it, or
            ask us to delete it. Write to{" "}
            <a href={`mailto:${site.email}`} className="text-brand hover:underline">
              {site.email}
            </a>{" "}
            and we will act on it. You can withdraw analytics consent at any time by
            clearing this site&apos;s data in your browser.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Contact</h2>
          <p className="mt-4 text-ink-soft">
            Questions about this policy go to{" "}
            <a href={`mailto:${site.email}`} className="text-brand hover:underline">
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Container>
  );
}
