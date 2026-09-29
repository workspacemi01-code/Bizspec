<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project standard

Follow this on every task. If something here conflicts with what I ask for, ask me.

## Design

- Read the palette out of the logo file, do not choose one. Sample the actual
  hex values and build the neutrals around them. This project's blue is
  `#336799`, taken from the logo's own colour table.
- Pair typefaces deliberately: a display face, a reading face, and a mono for
  labels and data. Never ship a single default UI sans.
- One accent colour. A second is how a site starts to look generic.
- Find a visual idea in the subject itself and carry it through. Here it is the
  specification sheet — hairline grid, registration marks, measurement rules.
- Avoid the AI house style: cream and terracotta, purple-to-blue gradients,
  Inter or Space Grotesk, emoji section markers, everything centred, rounded
  cards with an accent bar.
- Measure every text/background pair. 4.5:1 minimum for normal text.
- Fluid type with `clamp()`, not sizes stepped at a breakpoint. Tailwind 4
  flattens a `@theme` block nested in a media query, so a scale written that
  way ships desktop sizes to phones.
- Check it at 390px before calling it responsive.

## Security

- No secret in the repo, ever. Server-only env vars, `.env*` gitignored.
- Validate every input on the server, whatever the client did. Cap lengths.
  Check any closed set against an allow-list.
- Rate-limit every public endpoint.
- Escape anything a stranger typed before it goes into HTML, an email or a log.
- Never log personal data. Log that something happened, not what was in it.
- Keep the security headers in `next.config.ts` intact: CSP, HSTS, nosniff,
  frame-ancestors none, Referrer-Policy, Permissions-Policy.
- Nothing that needs consent loads before consent is given.
- Errors tell the user what to do next. They never leak an internal message.

## Architecture

- All copy in `lib/content.ts`, not scattered through components.
- All design tokens in `app/globals.css` under `@theme`. Never hard-code a hex
  in a component.
- Every configurable value read from env with a sensible default.
- Small shared primitives in `components/ui.tsx`, used everywhere.
- Comment why, not what.

## How to work

- Measure, do not guess. Prove a claim with a command and show the output.
- Fix what was asked. Mention adjacent problems, do not silently fix them.
- Never invent a statistic, testimonial, certification or partnership. Mark it
  `[TO BE ADDED]` instead.
- Say plainly what is not done.
