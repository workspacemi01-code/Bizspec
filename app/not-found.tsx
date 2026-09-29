import Link from "next/link";

import { ButtonLink, Container } from "@/components/ui";
import { nav } from "@/lib/content";

/**
 * The 404 page.
 *
 * A dead end is a navigation problem, not an apology, so this page spends its
 * space on where to go next rather than on regret. The reference code is the
 * spec motif doing a real job: it is what someone quotes when they report a
 * broken link.
 */
export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-24 sm:py-32">
      <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
        Error 404 · page not found
      </p>
      <h1 className="mt-4 max-w-2xl text-h1 font-semibold text-balance">
        That page isn&apos;t here
      </h1>
      <p className="mt-5 max-w-xl text-lead text-ink-soft">
        The link may be out of date, or the address may have a typo in it. Everything on the
        site is one of these:
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-block rounded-md border border-line-strong px-3.5 py-2 text-sm text-ink-soft transition-colors hover:border-brand hover:text-brand"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ButtonLink href="/contact">Tell us what you were looking for</ButtonLink>
      </div>
    </Container>
  );
}
