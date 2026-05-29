"use client";

/**
 * Tiny editorial marker for anything we have not yet verified with the client.
 * Two roles:
 *   1) Inline pill — drop next to a quote, number, or claim that is a placeholder.
 *   2) Block pill — full-row notice (used in the QuoteBlock fallback).
 *
 * The text reads "Pending client approval". Hover tooltip explains the policy
 * so a CMO scrolling through understands this is honesty, not a missing asset.
 */

import { cn } from "@/lib/utils";

interface PendingPillProps {
  className?: string;
  /** Display variant. `inline` = small chip. `block` = full container. */
  variant?: "inline" | "block";
  /** Override label text. Defaults to "Pending client approval". */
  label?: string;
}

const TOOLTIP =
  "We don't publish what we can't verify with the client. This will fill in when they sign off.";

export function PendingPill({
  className,
  variant = "inline",
  label = "Pending client approval",
}: PendingPillProps) {
  if (variant === "block") {
    return (
      <div
        title={TOOLTIP}
        className={cn(
          "glass relative flex items-center gap-3 rounded-2xl px-5 py-4 text-sm text-white/55",
          className,
        )}
      >
        <span
          aria-hidden
          className="grid h-2 w-2 place-items-center rounded-full bg-white/30"
        />
        <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-white/60">
          {label}
        </span>
      </div>
    );
  }

  return (
    <span
      title={TOOLTIP}
      className={cn(
        "glass font-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/55",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white/35" />
      {label}
    </span>
  );
}
