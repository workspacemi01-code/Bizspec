import Link from "next/link";

import { academy, services, site } from "@/lib/content";
import { Logo } from "@/components/brand";
import { Container } from "@/components/ui";

const company = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/academy", label: "Academy" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ink-soft hover:text-ink">
        {children}
      </Link>
    </li>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo size={30} />
            <p className="mt-4 max-w-xs text-sm text-ink-soft">{site.tagline}</p>
            <p className="mt-4 font-mono text-xs text-ink-muted">
              {site.regions.join(" · ")}
            </p>
          </div>

          <Column title="Company">
            {company.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </Column>

          <Column title="Services">
            {services.map((s) => (
              <FooterLink key={s.id} href={s.id === "zoho" ? "/services/zoho" : `/services#${s.id}`}>
                {s.title.replace(" implementation & support", "").replace(" development", "")}
              </FooterLink>
            ))}
          </Column>

          <Column title="Academy">
            {academy.courses.map((c) => (
              <FooterLink key={c.title} href="/academy">
                {c.title}
              </FooterLink>
            ))}
          </Column>

          <Column title="Legal">
            {legal.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="text-sm text-ink-soft hover:text-ink">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                className="text-sm text-ink-soft hover:text-ink"
                rel="noopener noreferrer"
                target="_blank"
              >
                {site.phone}
              </a>
            </li>
          </Column>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
