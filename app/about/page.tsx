import type { Metadata } from "next";

import { ButtonLink, Container, Section, SectionHead } from "@/components/ui";
import { about, closingCta, differentiators, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bizspec works where business operations meet technology — implementing business systems, building digital products and supporting the work that follows a launch.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">About</p>
        <h1 className="mt-3 max-w-3xl text-h1 font-semibold text-balance">{about.headline}</h1>
        <div className="mt-6 max-w-2xl space-y-4">
          {about.story.map((para) => (
            <p key={para} className="text-lead text-ink-soft">
              {para}
            </p>
          ))}
        </div>
      </Container>

      <Section tone="surface">
        <SectionHead eyebrow="What we believe" title="Five things we hold to" />
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.beliefs.map((belief) => (
            <li key={belief} className="border-l-2 border-brand pl-4 text-ink-soft">
              {belief}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How we differ"
          title="We don't just build software. We understand the business behind it."
        />
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <li key={d.title}>
              <h3 className="text-base font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{d.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">
          {site.regions.join(" • ")}
        </p>
      </Section>

      <Section tone="ink">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-semibold text-balance">{closingCta.headline}</h2>
          <p className="mt-4 text-lead text-white/70">{closingCta.lead}</p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="onInk">
              {closingCta.primary.label}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
