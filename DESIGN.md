# Design

The site has to read as *"these people understand technology and business"*.
Everything below follows from that and from the logo.

## Where the design comes from

The palette is not chosen, it is **taken from the logo file**. Reading the
PNG's colour table gives `#336799` for the mark and `#eaf0f3` for the halo
inside it. Both are used exactly as they are, and the neutrals are pulled
toward that blue so the page reads as one family rather than a brand colour
dropped onto grey furniture.

The visual idea is a **specification sheet**. The company is called Bizspec and
its work is turning how a business runs into something precise, so the page is
built like a technical drawing: hairline grids, registration marks, mono
reference labels, tight corners. That is where the structure comes from — not
from a template.

## Colour

Defined once in `app/globals.css` under `@theme`, used through Tailwind
utilities (`text-ink`, `bg-surface`, `bg-brand`). Never hard-code a hex.

| Token | Value | Use |
|---|---|---|
| `brand` | `#336799` | The logo blue. Links, buttons, marks |
| `brand-deep` | `#204d78` | Hover and pressed |
| `brand-navy` | `#12304d` | Inverted sections |
| `brand-tint` | `#eaf0f3` | The halo from inside the mark. Quiet fills |
| `ink` | `#0e1b28` | Body text |
| `ink-soft` | `#3a4a5c` | Secondary text |
| `ink-muted` | `#637384` | Labels and captions |
| `line` / `line-strong` | `#dfe5ea` / `#c1cdd8` | Borders, grids, dividers |
| `paper` / `surface` / `surface-deep` | `#ffffff` / `#f4f7f9` / `#e8eef3` | Backgrounds |
| `danger` / `positive` | `#9f2f26` / `#1f6b3a` | Form and status feedback only |

There is **one** accent. Adding a second is how a site starts to look generic.
Semantic colour is never the only signal — errors carry text as well.

Every pairing has been measured, not eyeballed:

| Pair | Ratio |
|---|---|
| brand on white / white on brand | 5.93:1 |
| ink on white | 17.41:1 |
| ink-soft on white | 9.08:1 |
| ink-muted on surface | 4.52:1 |
| white on navy | 13.50:1 |

`ink-muted` was darkened from `#6b7b8c` specifically because it measured 4.04:1
on tinted sections, which fails AA for the small labels it is used on.

## Type

Three faces, each with one job.

- **Archivo** — headings. A grotesque with enough weight to hold a page
  without shouting, close in temperament to the wordmark in the logo.
- **Manrope** — reading text. Its round bowls echo the circles the mark is
  built from.
- **IBM Plex Mono** — the instrument face: reference numbers, labels, and
  anything that belongs on a specification rather than in a sentence.

Sizes are **fluid, via `clamp()`**, not stepped at a breakpoint. This matters:
Tailwind 4 flattens an `@theme` block nested inside a media query, so a
responsive scale written that way silently ships its desktop sizes to phones.
That bug was live here and is why the headline overflowed on a 390px screen.

## The motifs

Three, each doing a job rather than decorating:

- `.blueprint` — a 28px hairline field, masked out toward the bottom so it
  reads as drawing paper under the content. On the hero and one inverted
  section only; a texture on every surface stops being a texture.
- `.ticked` — registration marks in two corners, revealed on hover. Only on
  cards that are an actual choice the visitor makes.
- `.dim-rule` — a measurement rule under a section label, with a node where
  the dimension starts.

## Layout

One `Container` (max 72rem, 20px gutter at every width). Sections alternate
paper and surface. Radii are small — 4px — because a technical drawing has
tight corners, not pill shapes.

Mobile is not an afterthought: the headline leads on a phone, the schematic
follows it. Anything that reversed that order would put the picture above the
argument.
