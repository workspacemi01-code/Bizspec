# Security

A marketing site with one form. The surface is small, and the point of this
document is to keep it that way.

## Architecture

Static pages plus one route handler (`app/api/contact/route.ts`). No database,
no session, no authentication, no third-party scripts.

## Form security

- **Server-side validation.** Everything arriving at the endpoint is untrusted,
  whatever the browser did. Names, lengths, email shape and the topic are all
  checked again on the server; the topic must be one of the known options.
- **Client-side validation** for speed only. It is never the authority.
- **Input limits.** Every field is trimmed and truncated at a maximum length
  before use, so an oversized payload cannot become an oversized log line.
- **Rate limiting.** Five submissions per address per ten minutes, in memory.
  Enough for a single instance; move to a shared store before running several.
- **Spam.** A hidden honeypot field, invisible and not tabbable. When it is
  filled the response is a normal success — a bot told it failed simply retries.
- **Error handling.** Failures return a short sentence and a status code.
  Internal detail stays in the server log.
- **CSRF.** The endpoint accepts JSON only, sets no cookie and holds no session,
  so there is no ambient authority for a cross-site request to borrow.

## API

The one endpoint is public by design. It has no authentication because it
performs no privileged action, and it must stay that way: if it ever writes to
a store or sends on someone's behalf, it needs authentication and authorisation
added at the same time.

`/api/` is disallowed in `robots.ts`.

## Authentication

None today. If a client or Academy portal is added later: secure password
storage, MFA where appropriate, short sessions, `HttpOnly` `Secure` `SameSite`
cookies, and role checks on the server rather than in the interface.

## Payments

None today. If Paystack is added:

- Secret keys stay server-side and never enter the bundle
- Verify every transaction server-side against Paystack's API
- Verify webhook signatures before acting on a webhook
- Never trust a payment status reported by the browser
- Store only what is needed; no card data ever touches this application

## Data

The form collects a name, email, optional phone, company and country, and a
message. Nothing else, and nothing is stored yet — the endpoint validates and
returns. Logs record that an enquiry arrived and its topic, never the name,
address or message body.

## Environment variables

Only `NEXT_PUBLIC_*` values are used today, all non-sensitive. Anything secret
must use a server-only name so it cannot reach the browser bundle.

## Deployment

HTTPS everywhere; HSTS at the platform. Add `Content-Security-Policy`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
and `Permissions-Policy` at the host before launch — they are not set in the
application.
