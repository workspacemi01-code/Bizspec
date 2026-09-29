import type { Metadata } from "next";
import Link from "next/link";

import { Arrow, ButtonLink, Container, Section, SectionHead } from "@/components/ui";
import { closingCta, howWeWork, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Zoho implementation, web and mobile applications, e-commerce, inventory management, testing and deployment — delivered around how your business actually runs.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Services</p>
        <h1 className="mt-3 max-w-3xl text-h1 font-semibold text-balance">
          Technology that works for your business
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-soft">
          We implement the systems a business runs on, build the products around them, and
          stay through testing, deployment and whatever the business needs next.
        </p>
      </Container>

      {/* One block per service, each its own anchor so the homepage and the
          footer can link straight to it. */}
      <div className="border-t border-line">
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`scroll-mt-20 border-b border-line ${i % 2 ? "bg-surface" : "bg-paper"}`}
          >
            <Container className="py-14">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                <div>
                  <h2 className="text-h2 font-semibold text-balance">{service.title}</h2>
                  <p className="mt-4 text-ink-soft">{service.summary}</p>
                  {"cta" in service && service.cta && (
                    <Link
                      href={service.cta.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
                    >
                      {service.cta.label}
                      <Arrow />
                    </Link>
                  )}
                </div>
                {service.items.length > 0 && (
                  <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <Section>
        <SectionHead eyebrow="How we work" title="From the problem to the system running" />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {howWeWork.map((step) => (
            <li key={step.step} className="bg-paper p-6">
              <span className="font-mono text-xs tracking-[0.14em] text-brand">{step.step}</span>
              <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
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
