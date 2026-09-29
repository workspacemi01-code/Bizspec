# Pre-launch checklist

Where each item stands. **Done** means it was verified against the running
site, not just written.

| # | Item | Status |
|---|---|---|
| 1 | Privacy policy page | Page exists, wording is a marked placeholder — **needs Bizspec** |
| 2 | Terms & conditions page | Page exists, wording is a marked placeholder — **needs Bizspec** |
| 3 | Secrets off the frontend | Done — no secret in the tree; only `NEXT_PUBLIC_` values, all non-sensitive |
| 4 | Force HTTPS | Done — HSTS two years, `includeSubDomains`, `preload`, plus `upgrade-insecure-requests` |
| 5 | Cookie consent banner | Done — nothing loads before consent; declining is as easy as accepting |
| 6 | Meta titles + descriptions | Done — every page; fixed a bug where three read "Privacy Policy for .name." |
| 7 | Social preview image | Done — `/opengraph-image`, generated from the real logo and copy |
| 8 | Favicon | Done — `app/icon.png` and `app/apple-icon.png`, cut from the logo |
| 9 | Sitemap + robots.txt | Done — both generated; legal pages `noindex` |
| 10 | Alt text on images | Done — the only image is the logo; decorative, with the link carrying the label |
| 11 | Compress images | Done — one 8.5KB PNG, served through `next/image` |
| 12 | Page load speed | Done — static pages, self-hosted fonts, no third-party script before consent |
| 13 | Fix colour contrast | Done — all pairs measured; `ink-muted` darkened to clear AA |
| 14 | Mobile friendly | Done — checked at 390px; fixed hero order and a dead responsive type scale |
| 15 | Custom 404 page | Done — `app/not-found.tsx`, returns a real 404 |
| 16 | Fix broken links | Done — crawled 21 pages, no broken link or missing anchor |
| 17 | Form validation | Done — server-side is the authority; client-side for speed only |
| 17b | Form **delivery** | Wired to Resend over plain HTTP, no SDK dependency. **Needs `RESEND_API_KEY`** |
| 18 | Spam protection | Done — honeypot plus 5 requests per IP per 10 minutes |
| 19 | Set up analytics | Wired and consent-gated. **Set `NEXT_PUBLIC_GA_ID` to switch on** |
| 20 | One clear call to action | Done — "Work with Bizspec" leads every page |

## Also done, from the application-security list

- Security headers: CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy`
- `X-Powered-By` removed
- All input validated and length-capped server-side; topic checked against an
  allow-list
- Rate limiting on the one endpoint
- User content is never rendered as HTML — React escapes it
- `npm audit`: 0 vulnerabilities
- No file upload, no database, no session, no authentication — the whole class
  of risk is absent by design

## Before this goes public

1. **Set `RESEND_API_KEY`.** Delivery is wired and tested; without the key the
   form validates, rate-limits and returns success but sends nothing. Sign up
   at resend.com, create an API key, put it in `.env.local` (see
   `.env.example`). Enquiries then arrive at `bizspec.org@gmail.com`, and
   hitting reply goes straight back to the enquirer.
2. **Replace the placeholders.** Privacy, terms, cookie wording, case-study
   detail, and the Zoho partner status. They are marked, not hidden.
3. **Confirm the real domain** and set `NEXT_PUBLIC_SITE_URL`, or canonical
   URLs and the social card will point at `bizspec.co`.
4. **Submit HSTS preload** only once you are certain every subdomain is HTTPS —
   it is hard to undo.
