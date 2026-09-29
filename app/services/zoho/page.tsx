import type { Metadata } from "next";

import { ButtonLink, Card, Container, Section, SectionHead } from "@/components/ui";
import { clients, zoho } from "@/lib/content";

export const metadata: Metadata = {
  title: "Zoho Implementation & Support",
  description:
    "Zoho CRM, Books, Inventory, Desk, People and SalesIQ — configured, integrated and supported so the system matches how your business works.",
  alternates: { canonical: "/services/zoho" },
};

export default function ZohoPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Zoho</p>
        <h1 className="mt-3 max-w-3xl text-h1 font-semibold text-balance">{zoho.headline}</h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-soft">{zoho.lead}</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {zoho.apps.map((app) => (
            <li
              key={app}
              className="rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink-soft"
            >
              {app}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href={zoho.cta.href}>{zoho.cta.label}</ButtonLink>
        </div>
      </Container>

      <Section tone="surface">
        <SectionHead
          eyebrow="How it goes"
          title="Implementation is more than configuration"
          lead="Setting the software up is the middle of the job, not the end of it."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {zoho.flow.map((step, i) => (
            <Card as="li" key={step.title}>
              <span className="font-mono text-xs tracking-[0.14em] text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
            </Card>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Client work"
          title="Businesses we support on Zoho"
          lead="Shown with permission. Detailed case studies are in preparation."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {clients.map((client) => (
            <Card as="li" key={client.name}>
              <h3 className="text-base font-semibold">{client.name}</h3>
              <p className="mt-1 font-mono text-xs text-ink-muted">{client.region}</p>
              <p className="mt-3 text-sm text-ink-soft">{client.work}</p>
            </Card>
          ))}
        </ul>
        {/* Partner and certification claims stay off the site until the status
            is verified and current. */}
        <p className="mt-6 max-w-2xl text-sm text-ink-muted">
          [ZOHO PARTNER STATUS TO BE CONFIRMED BEFORE ANY CERTIFICATION IS SHOWN]
        </p>
      </Section>
    </>
  );
}
