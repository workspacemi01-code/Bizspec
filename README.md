# Bizspec

The Bizspec website: business systems, digital products and practical technology.

## Tech stack

- **Next.js 16** (App Router) with React 19
- **TypeScript**
- **Tailwind CSS 4** — design tokens live in `app/globals.css` under `@theme`
- **IBM Plex Sans / Mono** via `next/font`, self-hosted at build time

No CMS, no database, no analytics vendor. The site is static apart from one
route handler for the enquiry form.

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

## Environment variables

None are required to run locally. All are optional and change content rather
than behaviour:

| Variable | Used for | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph | `https://bizspec.co` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The address shown on the contact page | `hello@bizspec.co` |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number; the link is hidden when unset | unset |
| `NEXT_PUBLIC_LINKEDIN` | LinkedIn URL; the link is hidden when unset | unset |

Anything secret belongs in a server-only variable — never `NEXT_PUBLIC_`.

## Commands

```bash
npm run dev     # development server
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # typecheck
```

## Project structure

```
app/
  layout.tsx        root layout, fonts, site-wide metadata
  page.tsx          homepage
  services/         services index and the Zoho page
  products/  academy/  about/  contact/
  privacy/  terms/  cookies/     placeholders, noindex
  api/contact/      enquiry endpoint
  sitemap.ts  robots.ts
components/         nav, footer, shared UI, hero diagram, contact form
lib/content.ts      every word on the site
```

## Before this goes live

- [ ] Point `NEXT_PUBLIC_SITE_URL` at the real domain
- [ ] Set the real contact email, WhatsApp and LinkedIn
- [ ] Wire `app/api/contact/route.ts` to a sending service — it currently
      validates and rate-limits but does not deliver
- [ ] Write the privacy, terms and cookie pages
- [ ] Replace the `[TO BE ADDED]` placeholders in `lib/content.ts`
- [ ] Add an Open Graph image at `app/opengraph-image.*`

## Content rules

`lib/content.ts` is the only place copy lives. Nothing there may state a
certification, partnership, metric, testimonial or product feature that has not
been confirmed. Where something is unknown it carries a `[TO BE ADDED]`
placeholder, which is deliberate and should be replaced rather than deleted.


## Environment

Copy `.env.example` to `.env.local`. `.env*` is gitignored, so no real value is
ever committed.

The one that matters for launch is `RESEND_API_KEY` — without it the enquiry
form validates and rate-limits but delivers nothing. With it, enquiries arrive
at `CONTACT_TO` and replying in the inbox goes back to the enquirer.

Resend's shared sender (`onboarding@resend.dev`) works with no domain setup but
only delivers to the address that owns the Resend account, which is fine to
start. Once a domain is verified there, set `CONTACT_FROM` to an address on it.
