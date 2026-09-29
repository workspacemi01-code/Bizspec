import type { Metadata } from "next";

import { Container } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${site.name}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * Placeholder. The wording has to come from whoever is accountable for it,
 * so this states plainly that it is not yet written rather than presenting
 * invented terms as though they were in force.
 */
export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-h1 font-semibold">Privacy Policy</h1>
      <p className="mt-5 max-w-2xl text-lead text-ink-soft">
        [Privacy Policy TO BE ADDED]
      </p>
      <p className="mt-4 max-w-2xl text-sm text-ink-muted">
        This page is not yet written. Until it is, no policy is implied. For any question
        about how {site.name} handles your information, write to{" "}
        <a href={`mailto:${site.email}`} className="text-brand hover:underline">
          {site.email}
        </a>
        .
      </p>
    </Container>
  );
}
