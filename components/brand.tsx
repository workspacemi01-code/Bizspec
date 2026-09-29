import Image from "next/image";

import mark from "@/public/brand/bizspec-mark.png";

/**
 * The logo lockup: the mark as supplied, set against the wordmark in the
 * display face.
 *
 * The mark is the real asset rather than a redrawing of it, so the site and
 * every other place the logo appears stay identical. It is imported rather
 * than referenced by path so Next can size it and serve it in a modern format.
 */
export function Logo({
  className = "",
  size = 32,
  wordmark = true,
}: {
  className?: string;
  /** Rendered size of the square mark, in pixels. */
  size?: number;
  wordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={mark}
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-[5px]"
        style={{ width: size, height: size }}
      />
      {wordmark && (
        <span className="font-display text-[1.0625rem] leading-none font-bold tracking-[0.02em]">
          BIZ<span className="text-brand">SPEC</span>
        </span>
      )}
    </span>
  );
}
