import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** The one page width, so every section lines up down the page. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "paper",
  id,
  blueprint = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "ink";
  id?: string;
  /** Lays the hairline grid under the section. For a couple of sections only —
   *  a texture on every surface stops being a texture. */
  blueprint?: boolean;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    surface: "bg-surface text-ink",
    ink: "bg-brand-navy text-white",
  };
  const grid = blueprint ? (tone === "ink" ? "blueprint blueprint-ink" : "blueprint") : "";
  return (
    <section id={id} className={`${tones[tone]} ${grid} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** A small label above a heading. Uppercase mono, used sparingly. */
export function Eyebrow({ children, onInk = false }: { children: ReactNode; onInk?: boolean }) {
  return (
    <p
      className={`font-mono text-xs tracking-[0.14em] uppercase ${
        onInk ? "text-white/60" : "text-brand"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {/* The measurement rule: a node where the dimension starts, then the
          line. Borrowed from a drawing, and it gives the eyebrow a floor. */}
      {eyebrow && align === "left" && <div className="dim-rule mt-3 w-24" />}
      <h2 className="mt-4 text-h2 font-semibold text-balance">{title}</h2>
      {lead && <p className="mt-4 text-lead text-ink-soft">{lead}</p>}
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  secondary: "border border-line-strong bg-paper text-ink hover:bg-surface",
  onInk: "bg-white text-ink hover:bg-surface-deep",
  ghost: "text-brand hover:bg-brand-tint",
} as const;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof variants }) {
  return <button {...props} className={`${buttonBase} ${variants[variant]} ${className}`} />;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof variants }) {
  return <Link {...props} className={`${buttonBase} ${variants[variant]} ${className}`} />;
}

/** One card treatment, used everywhere, so nothing looks like a special case. */
export function Card({
  children,
  className = "",
  as: Tag = "div",
  id,
  ticked = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** So a card can be linked to directly. */
  id?: string;
  /** Registration marks in two corners, revealed on hover. Reserved for cards
   *  that are an actual choice the visitor makes, not every box on the page. */
  ticked?: boolean;
}) {
  return (
    <Tag
      id={id}
      className={`rounded-md border border-line bg-paper p-6 ${
        ticked ? "ticked transition-colors hover:border-line-strong" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * A short run of figures.
 *
 * Three columns works on a wide screen and falls apart on a phone, where each
 * label gets a narrow column and wraps to three ragged lines. So below `sm`
 * these become rows — figure left, label beside it, a hairline between — which
 * is how a phone wants to read a short list anyway.
 */
export function Facts({
  items,
}: {
  items: readonly { value: string; label: string }[];
}) {
  return (
    <dl className="mt-10 divide-y divide-line border-y border-line sm:grid sm:grid-cols-3 sm:gap-6 sm:divide-y-0 sm:py-8">
      {items.map((item) => (
        <div key={item.label} className="py-4 sm:py-0">
          <dt className="sr-only">{item.label}</dt>
          <dd className="flex items-baseline gap-3 sm:block">
            <span className="font-display text-h2 font-bold text-brand tabular-nums">
              {item.value}
            </span>
            {/* Hidden from assistive tech: the <dt> above already says it. */}
            <span aria-hidden className="text-sm text-ink-soft sm:mt-1 sm:block">
              {item.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A plain arrow, so a link that leads somewhere says so without an icon set. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
