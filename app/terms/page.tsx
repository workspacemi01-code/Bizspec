import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms on which ${site.name} makes this website available.`,
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

/**
 * Terms for the website only — not for client engagements, which are governed
 * by their own signed agreements. Keeping that boundary explicit is the point:
 * nothing on a marketing page should be capable of being read as a contract
 * for the work.
 */
export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-h1 font-semibold">Terms of Service</h1>
      <p className="mt-5 max-w-2xl text-lead text-ink-soft">
        These terms cover your use of this website. Work we carry out for clients is
        governed by a separate written agreement, not by this page.
      </p>

      <div className="mt-12 max-w-2xl space-y-10">
        <section>
          <h2 className="text-h2 font-semibold">Using this site</h2>
          <p className="mt-4 text-ink-soft">
            You may read this site, and contact us through it, for any lawful purpose. Do
            not attempt to disrupt it, gain access to parts of it that are not public, or
            use it to send unsolicited or automated messages.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">What the content is</h2>
          <p className="mt-4 text-ink-soft">
            The descriptions of our services, products and training on this site are
            general information about what we do. They are not an offer, a quotation or
            professional advice, and nothing here forms a contract on its own.
          </p>
          <p className="mt-3 text-ink-soft">
            Any engagement begins with a written proposal setting out scope, cost and
            timelines, agreed by both sides.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Enquiries you send us</h2>
          <p className="mt-4 text-ink-soft">
            Sending an enquiry does not create a client relationship or oblige either of us
            to proceed. Please do not send confidential material through the form — wait
            until we have a confidentiality agreement in place.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Ownership</h2>
          <p className="mt-4 text-ink-soft">
            The {site.name} name, logo, wording and design of this site belong to us. Product
            names and trademarks mentioned belong to their respective owners, and referring
            to them implies no endorsement in either direction.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Availability</h2>
          <p className="mt-4 text-ink-soft">
            We keep this site running and accurate as best we can, but we do not guarantee
            it will always be available or free of error. We may change or remove content
            at any time.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Links out</h2>
          <p className="mt-4 text-ink-soft">
            Where we link to another organisation, we are not responsible for what is on
            their site or how they handle your information.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-semibold">Changes and contact</h2>
          <p className="mt-4 text-ink-soft">
            We may update these terms. The version on this page is the one that applies.
            Questions go to{" "}
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
