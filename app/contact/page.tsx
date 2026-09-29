import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/ui";
import { contactTopics, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are trying to build, improve or implement, and we will help you identify the next practical step.",
  alternates: { canonical: "/contact" },
};

/** ?topic=zoho-implementation arrives from the Zoho page, so the dropdown is
 *  already on the right answer. */
function topicFromQuery(raw?: string): string {
  if (!raw) return "";
  const wanted = raw.replace(/-/g, " ").toLowerCase();
  return contactTopics.find((t) => t.toLowerCase() === wanted) ?? "";
}

export default async function ContactPage(props: PageProps<"/contact">) {
  const params = await props.searchParams;
  const topic = topicFromQuery(typeof params.topic === "string" ? params.topic : undefined);

  return (
    <Container className="py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">Contact</p>
          <h1 className="mt-3 text-h1 font-semibold text-balance">Start a conversation</h1>
          <p className="mt-5 text-lead text-ink-soft">
            Tell us what you&apos;re trying to build, improve or implement. We&apos;ll help you
            identify the next practical step.
          </p>

          <dl className="mt-10 space-y-5 border-t border-line pt-8">
            <div>
              <dt className="font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-ink hover:text-brand">
                  {site.email}
                </a>
              </dd>
            </div>
            {site.whatsapp && (
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">
                  WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                    className="text-ink hover:text-brand"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {site.whatsapp}
                  </a>
                </dd>
              </div>
            )}
            {site.linkedin && (
              <div>
                <dt className="font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">
                  LinkedIn
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.linkedin}
                    className="text-ink hover:text-brand"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Bizspec on LinkedIn
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs tracking-[0.14em] text-ink-muted uppercase">
                Where we work
              </dt>
              <dd className="mt-1 text-ink-soft">{site.regions.join(" · ")}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
          <ContactForm initialTopic={topic} />
        </div>
      </div>
    </Container>
  );
}
