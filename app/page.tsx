import Link from "next/link";

import { SystemDiagram } from "@/components/system-diagram";
import {
  Arrow,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui";
import {
  academy,
  clientWork,
  closingCta,
  differentiators,
  hero,
  needs,
  howWeWork,
  products,
  services,
  site,
  zoho,
} from "@/lib/content";

/**
 * The homepage carries the big picture; the dedicated pages carry the depth.
 *
 * Order follows the journey the brief asks for — problem, capability,
 * evidence, solution, trust, action — so a visitor meets their own question
 * before they meet the company's structure.
 */
export default function HomePage() {
  return (
    <>
      {/* The hero sits on the drawing grid: the page opens on a specification,
          which is the company's name and its actual argument. */}
      <div className="blueprint border-b border-line">
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
                {site.regions.join(" / ")}
              </p>
              <h1 className="mt-5 text-display font-bold text-balance">{hero.headline}</h1>
              <p className="mt-6 max-w-xl text-lead text-ink-soft">{hero.lead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
                <ButtonLink href={hero.secondary.href} variant="secondary">
                  {hero.secondary.label}
                </ButtonLink>
              </div>

              {/* The legend to the drawing beside it — four marks, four
                  labels, the way a plan explains its own symbols. */}
              <ul className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-4">
                {hero.trust.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[3px] size-2 shrink-0 bg-brand" />
                    <span className="font-mono text-[11px] leading-tight tracking-[0.06em] text-ink-muted uppercase">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SystemDiagram className="mx-auto w-full max-w-sm" />
            </div>
          </div>
        </Container>
      </div>

      <Section tone="surface" id="needs">
        <SectionHead
          eyebrow="Start here"
          title="What are you trying to solve?"
          lead="Find the thing you came for. Each one leads to the detail behind it."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {needs.map((need) => (
            <Card as="li" key={need.title} ticked className="flex flex-col">
              <h3 className="text-base font-semibold">{need.title}</h3>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{need.body}</p>
              <Link
                href={need.cta.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
              >
                {need.cta.label}
                <Arrow />
              </Link>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="services">
        <SectionHead
          eyebrow="Services"
          title="Technology that works for your business"
          lead="From implementing a business system to building and deploying the product around it."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card as="li" key={service.id}>
              <h3 className="text-base font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{service.summary}</p>
              {service.items.length > 0 && (
                <p className="mt-4 font-mono text-xs leading-relaxed text-ink-muted">
                  {service.items.slice(0, 6).join(" · ")}
                </p>
              )}
            </Card>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href="/services" variant="secondary">
            See all services
          </ButtonLink>
        </div>
      </Section>

      <Section tone="ink" blueprint>
        <div className="max-w-2xl">
          <Eyebrow onInk>Why Bizspec</Eyebrow>
          <h2 className="mt-3 text-h2 font-semibold text-balance">
            We don&apos;t just build software. We understand the business behind it.
          </h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d) => (
            <li key={d.title}>
              <h3 className="text-base font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{d.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="How we work" title="From the problem to the system running" />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {howWeWork.map((p) => (
            <li key={p.step} className="bg-paper p-6">
              <span className="font-mono text-xs tracking-[0.14em] text-brand">{p.step}</span>
              <h3 className="mt-3 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="products">
        <SectionHead
          eyebrow="Products"
          title="Products we've built"
          lead="We build practical digital products around real business problems."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <Card as="li" key={product.name} className="flex flex-col">
              <h3 className="text-base font-semibold">{product.name}</h3>
              <p className="mt-1 font-mono text-xs text-ink-muted">{product.category}</p>
              <p className="mt-3 text-sm text-ink-soft">{product.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <SectionHead eyebrow="Client work" title={clientWork.headline} lead={clientWork.lead} />

        {/* Counted, not claimed — three numbers that are simply true. */}
        <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-8">
          {clientWork.facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="font-display text-h2 font-bold text-brand">{f.value}</span>
                <span className="mt-1 block text-sm text-ink-soft">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {clientWork.disciplines.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="zoho">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Zoho</Eyebrow>
            <h2 className="mt-3 text-h2 font-semibold text-balance">{zoho.headline}</h2>
            <p className="mt-4 text-lead text-ink-soft">{zoho.lead}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
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
          </div>
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
            {zoho.flow.map((s) => (
              <li key={s.title} className="bg-paper p-5">
                <h3 className="text-sm font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="surface" id="academy">
        <SectionHead eyebrow="Bizspec Academy" title={academy.headline} lead={academy.lead} />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {academy.courses.map((course) => (
            <Card as="li" key={course.title}>
              <h3 className="text-base font-semibold">{course.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{course.body}</p>
            </Card>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/academy">Explore Bizspec Academy</ButtonLink>
          {!academy.enrolmentOpen && (
            <ButtonLink href="/contact?topic=academy" variant="secondary">
              Join the waitlist
            </ButtonLink>
          )}
        </div>
      </Section>

      <Section tone="ink" blueprint>
        <div className="max-w-2xl">
          <h2 className="text-h2 font-semibold text-balance">{closingCta.headline}</h2>
          <p className="mt-4 text-lead text-white/70">{closingCta.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={closingCta.primary.href} variant="onInk">
              {closingCta.primary.label}
            </ButtonLink>
            <ButtonLink
              href={closingCta.secondary.href}
              variant="ghost"
              className="border border-white/25 text-white hover:bg-white/10"
            >
              {closingCta.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
