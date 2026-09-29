import type { Metadata } from "next";

import { ButtonLink, Card, Container, Section } from "@/components/ui";
import { closingCta, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Digital products Bizspec has built: Styles2Fit, a space booking system, a budgeting platform and Bummitestore.",
  alternates: { canonical: "/products" },
};

/** Ids match the anchors the homepage cards link to. */
const anchor = (href: string) => href.split("#")[1] ?? "";

export default function ProductsPage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Products</p>
        <h1 className="mt-3 max-w-3xl text-h1 font-semibold text-balance">
          Products we&apos;ve built
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-ink-soft">
          We build practical digital products around real business problems — our own as well
          as our clients&apos;.
        </p>
      </Container>

      <Section tone="surface">
        <ul className="grid gap-4 sm:grid-cols-2">
          {products.map((product) => (
            <Card as="li" key={product.name} id={anchor(product.href)} className="scroll-mt-20">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-base font-semibold">{product.name}</h2>
                <span className="shrink-0 rounded-full bg-brand-tint px-2.5 py-1 font-mono text-[11px] text-brand-deep">
                  {product.status}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-ink-muted">{product.category}</p>
              <p className="mt-3 text-sm text-ink-soft">{product.body}</p>
              {/* No feature list until each product's detail is confirmed. */}
              <p className="mt-4 text-xs text-ink-muted">
                [PRODUCT DETAIL AND SCREENSHOT TO BE ADDED]
              </p>
            </Card>
          ))}
        </ul>
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
