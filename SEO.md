# SEO

## Metadata

Site-wide defaults live in `app/layout.tsx`: `metadataBase`, a title template
(`%s — Bizspec`), the default description, Open Graph and Twitter cards.

Each page exports its own `metadata` with a title, description and canonical:

| Page | Title | Canonical |
|---|---|---|
| Home | Bizspec — Business Systems, Digital Products & Technology Solutions | `/` |
| Services | Services | `/services` |
| Zoho | Zoho Implementation & Support | `/services/zoho` |
| Products | Products | `/products` |
| Academy | Bizspec Academy | `/academy` |
| About | About | `/about` |
| Contact | Contact | `/contact` |
| Privacy / Terms / Cookies | — | noindex while they are placeholders |

## Sitemap and robots

`app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`.
`/api/` is disallowed. The sitemap reads `NEXT_PUBLIC_SITE_URL`, so setting
that correctly at deploy time matters more than anything else here.

## Structured data

Not yet added. An `Organization` block on the homepage and `Service` blocks on
the services pages are the sensible first two — once the business address,
logo and verified social profiles exist, because structured data that asserts
unverified facts is worse than none.

## Headings

One `h1` per page, sections under `h2`, cards under `h3`. Headings describe the
content rather than repeating keywords.

## Open Graph image

Still to add at `app/opengraph-image.tsx` (or `.png`). Until then link previews
fall back to text.

## Strategy

The pages worth ranking are the ones naming a job someone searches for: Zoho
implementation, e-commerce development, inventory management, testing and
deployment. Each has its own section with its own anchor, and Zoho — the
strongest service — has a page of its own. No keyword stuffing; the copy reads
as sentences because that is what gets linked to.
