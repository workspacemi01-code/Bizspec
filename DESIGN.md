# Design

The brief asks the site to read as *"these people understand technology and
business"*. That argues for clear hierarchy, whitespace and restraint — not
gradients, glass or motion.

## Brand direction

Practical, technical, business-focused, professional. Confident without
claiming to revolutionise anything.

## Colour

Defined once in `app/globals.css` under `@theme`, used through Tailwind
utilities (`text-ink`, `bg-surface`, `bg-brand`). Never hard-code a hex.

| Token | Value | Use |
|---|---|---|
| `ink` | `#10151c` | Body text, dark sections |
| `ink-soft` | `#3c4652` | Secondary text |
| `ink-muted` | `#667080` | Labels, captions |
| `line` / `line-strong` | `#e3e2de` / `#cfcdc7` | Borders, dividers |
| `paper` / `surface` / `surface-deep` | `#ffffff` / `#f7f6f3` / `#edece7` | Backgrounds |
| `brand` / `brand-deep` / `brand-tint` | `#0e5a52` / `#0a423c` / `#e6efed` | The single accent |
| `danger` / `positive` | `#9f2f26` / `#1f6b3a` | Form and status feedback only |

The neutrals are biased slightly warm so the page does not read as blue-grey.
There is **one** accent; adding a second is how a site starts to look generic.
Semantic colour is never the only signal — errors carry text as well.

## Typography

IBM Plex Sans for everything, IBM Plex Mono for labels, step numbers and
technical lists. Plex was drawn for technical and business documentation,
which is what this company does.

Sizes come from the scale in `@theme`: `text-display`, `text-h1`, `text-h2`,
`text-lead`. Headings use `text-balance`. Body copy stays near 65 characters
(`max-w-2xl`).

## Spacing

Sections are `py-16 sm:py-24`. One page width: `max-w-6xl` with `px-5 sm:px-8`,
set by `<Container>` so every section lines up.

## Components

All in `components/ui.tsx`, so nothing is a special case.

- **Container** — the page width
- **Section** — vertical rhythm plus tone (`paper`, `surface`, `ink`)
- **SectionHead** — eyebrow, heading, lead
- **Button / ButtonLink** — `primary`, `secondary`, `onInk`, `ghost`
- **Card** — one border, one radius, one padding
- **Arrow** — for links that lead somewhere

Border, fill and radius are spent by role. Not everything is a card.

## Responsive

Mobile first, and mobile is designed rather than shrunk: the nav becomes a
disclosure panel, grids collapse to one column, and form inputs are 16px on
phones because anything smaller makes iOS zoom in on focus and never back out.

Breakpoints are Tailwind's defaults — `sm` 640, `md` 768, `lg` 1024, `xl` 1280.

## Accessibility

- Semantic HTML: one `h1` per page, `section`/`nav`/`footer`, `ol` for ordered steps
- A skip link, and a single visible focus style set once in `globals.css`
- The mobile menu reports `aria-expanded` and closes on Escape
- The hero diagram is decorative and hidden from assistive technology
- Every field has a real `<label>`; required fields say so in text, not colour
- `prefers-reduced-motion` is honoured globally
