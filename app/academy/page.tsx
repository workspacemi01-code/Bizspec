import type { Metadata } from "next";

import { ButtonLink, Card, Container, Section, SectionHead } from "@/components/ui";
import { academy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Bizspec Academy",
  description:
    "Practical courses in product management, e-commerce, inventory, technical product management and marketing with AI.",
  alternates: { canonical: "/academy" },
};

export default function AcademyPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
          Bizspec Academy
        </p>
        <h1 className="mt-3 max-w-3xl text-h1 font-semibold text-balance">{academy.headline}</h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-soft">{academy.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?topic=academy">
            {academy.enrolmentOpen ? "Enrol now" : "Join the waitlist"}
          </ButtonLink>
        </div>
        {!academy.enrolmentOpen && (
          <p className="mt-4 text-sm text-ink-muted">
            Courses are not open for enrolment yet. Join the waitlist and we will tell you when
            dates are set.
          </p>
        )}
      </Container>

      <Section tone="surface">
        <SectionHead eyebrow="Courses" title="What you can learn" />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {academy.courses.map((course) => (
            <Card as="li" key={course.title}>
              <h2 className="text-base font-semibold">{course.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{course.body}</p>
              <p className="mt-4 font-mono text-[11px] text-ink-muted">
                [FORMAT, DURATION AND FEE TO BE ADDED]
              </p>
            </Card>
          ))}
        </ul>
        {/* Accreditation is not claimed unless it has been established. */}
        <p className="mt-8 max-w-2xl text-sm text-ink-muted">
          Bizspec Academy courses are practical and industry-focused. No accreditation is
          claimed.
        </p>
      </Section>
    </>
  );
}
