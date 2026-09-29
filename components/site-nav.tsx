"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { nav, site } from "@/lib/content";
import { ButtonLink, Container } from "@/components/ui";

/**
 * The header.
 *
 * A disclosure button and a panel rather than a hamburger that only looks like
 * one: it reports its state, closes on Escape and on navigation, and the links
 * inside are real links whether or not JavaScript has run.
 */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* A route change means the panel has done its job. Compared during render
     rather than in an effect, so the panel never paints open on the new page
     first and then closes. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {site.name}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-surface ${
                  isCurrent(item.href) ? "font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ButtonLink href="/academy" variant="secondary" className="px-4 py-2">
              Explore Academy
            </ButtonLink>
            <ButtonLink href="/contact" className="px-4 py-2">
              Work with us
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-md md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <Container className="py-3">
            <nav aria-label="Main" className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-3 text-base ${
                    isCurrent(item.href) ? "font-medium text-ink" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2 pb-2">
              <ButtonLink href="/contact">Work with us</ButtonLink>
              <ButtonLink href="/academy" variant="secondary">
                Explore Academy
              </ButtonLink>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
