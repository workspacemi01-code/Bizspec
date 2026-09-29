# Content

Every word on the site lives in `lib/content.ts`. Change copy there, not in a
component. This file explains the shape and the rules.

## Structure

| Export | Used on |
|---|---|
| `site` | Name, tagline, URL, contact details, regions |
| `nav` | Header and footer navigation |
| `hero` | Homepage headline, lead, CTAs, trust strip |
| `needs` | "What are you trying to solve?" cards |
| `services` | Services grid and the services page sections |
| `differentiators` | "Why Bizspec" |
| `howWeWork` | The five-step process |
| `products` | Product cards |
| `clients` | Client work |
| `zoho` | Zoho page and homepage section |
| `academy` | Academy page and homepage section |
| `about` | About page |
| `contactTopics` | The enquiry dropdown, and the server's allow-list |
| `closingCta` | The conversion section before the footer |

`contactTopics` is validated server-side, so adding an option there is what
makes it selectable — the endpoint rejects anything not on that list.

## Rules

Do not invent: testimonials, client results, revenue, customer numbers,
certifications, partnerships, awards, countries served, product features or
statistics.

Where something is not yet confirmed, leave the placeholder:

```
[CASE STUDY DETAIL TO BE ADDED]
[PRODUCT DETAIL AND SCREENSHOT TO BE ADDED]
[ZOHO PARTNER STATUS TO BE CONFIRMED BEFORE ANY CERTIFICATION IS SHOWN]
[FORMAT, DURATION AND FEE TO BE ADDED]
```

They are deliberate. Replace them with real content; do not delete them to
make the page look finished.

## Tone

Confident and practical. Avoid "revolutionise", "world-leading",
"next-generation" and "innovative solutions for the future". Say what the
company does and who it is for.

## Outstanding

- Case study detail for David Wej, Marsden and Promenadeshirts
- Product descriptions, screenshots and live links
- Academy course format, duration and fees
- Privacy, terms and cookie copy
- Confirmed business email, WhatsApp and LinkedIn
