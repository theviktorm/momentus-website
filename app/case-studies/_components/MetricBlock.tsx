"use client";

/**
 * Big editorial number with a tiny label underneath.
 *
 * If `metric` is a pure numeric form like "1.53", "+25", "8x", "340%", we feed
 * it through NumberTicker so it animates in from zero. Otherwise we render it
 * static (e.g. "#1", "$1.53M", "0").
 *
 * Use `tone="shimmer"` for the lead metric and the default plain accent for
 * the rest.
 */

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

interface MetricBlockProps {
  metric: string;
  label: string;
  tone?: "shimmer" | "accent" | "white";
  className?: string;
}

const NUMERIC_RE = /^(-?)([+])?(\$|€|£)?(\d+(?:\.\d+)?)([xX%kKmMbB])?$/;

/**
 * Try to parse a metric string into { prefix, value, suffix, decimals } so the
 * NumberTicker can animate the digits while we render the prefix/suffix as
 * static decoration. Returns null if the metric isn't numeric.
 */
function parseNumeric(metric: string): {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
} | null {
  // Strip a leading "+" if present, since NumberTicker doesn't support it via prop.
  const m = metric.match(NUMERIC_RE);
  if (!m) return null;
  const [, sign, plus, currency, num, unit] = m;
  const value = parseFloat(num);
  if (Number.isNaN(value)) return null;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const prefix = `${plus ?? ""}${sign ?? ""}${currency ?? ""}`;
  const suffix = unit ?? "";
  return { prefix, value: sign === "-" ? -Math.abs(value) : value, suffix, decimals };
}

export function MetricBlock({
  metric,
  label,
  tone = "accent",
  className,
}: MetricBlockProps) {
  const parsed = parseNumeric(metric);

  const toneClass =
    tone === "shimmer"
      ? "text-shimmer"
      : tone === "white"
      ? "text-white"
      : "text-accent";

  return (
    <div className={cn("flex flex-col", className)}>
      <span
        className={cn(
          "font-display block text-balance text-5xl font-medium tracking-tight md:text-6xl lg:text-7xl",
          toneClass,
        )}
      >
        {parsed ? (
          <NumberTicker
            value={parsed.value}
            decimalPlaces={parsed.decimals}
            prefix={parsed.prefix}
            suffix={parsed.suffix}
          />
        ) : (
          metric
        )}
      </span>
      <span className="mt-3 text-xs uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>
    </div>
  );
}
