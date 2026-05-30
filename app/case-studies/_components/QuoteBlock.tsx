"use client";

/**
 * Editorial pullquote.
 *
 *   "
 *   Big serif italic line of someone saying something verified
 *   we'd put in front of a board.
 *   "
 *   — VP MARKETING, BRAND
 *
 * If no quote is set on the case study, the detail page renders the
 * `PendingPill` (variant="block") instead — we never silently omit the
 * section, because the empty slot teaches the reader that quotes here mean
 * something.
 */

import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  text: string;
  role: string;
  className?: string;
}

export function QuoteBlock({ text, role, className }: QuoteBlockProps) {
  return (
    <figure
      className={cn(
        "relative mx-auto max-w-3xl pl-4 md:pl-12",
        className,
      )}
    >
      <span
        aria-hidden
        className="font-display absolute -left-2 -top-12 select-none text-[120px] leading-none text-accent/25 md:-left-2 md:text-[160px]"
      >
        &ldquo;
      </span>
      <blockquote
        className="font-display text-balance text-2xl font-medium italic leading-[1.25] tracking-tight text-white/90 md:text-4xl"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        {text}
      </blockquote>
      <figcaption className="font-mono mt-6 text-xs uppercase tracking-[0.22em] text-accent">
        — {role}
      </figcaption>
    </figure>
  );
}
