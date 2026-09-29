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
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "ink";
  id?: string;
}) {
  const tones = {
    paper: "bg-paper text-ink",
    surface: "bg-surface text-ink",
    ink: "bg-ink text-white",
  };
  return (
    <section id={id} className={`${tones[tone]} py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** A small label above a heading. Uppercase mono, used sparingly. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">{children}</p>
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
      <h2 className="mt-3 text-h2 font-semibold text-balance">{title}</h2>
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
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  /** So a card can be linked to directly. */
  id?: string;
}) {
  return (
    <Tag id={id} className={`rounded-lg border border-line bg-paper p-6 ${className}`}>
      {children}
    </Tag>
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
