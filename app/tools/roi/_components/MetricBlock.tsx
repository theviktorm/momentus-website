"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Tween a number toward `value` on every change. Unlike the global
 * NumberTicker (which only fires once on viewport entry), this one runs
 * on every input change in the calculator. That's the whole point —
 * dragging a slider should feel like the result *flowed* to the new value.
 */
function useAnimatedNumber(value: number, durationMs = 220): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  const targetRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    fromRef.current = display;
    targetRef.current = value;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(elapsed / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = fromRef.current + (targetRef.current - fromRef.current) * eased;
      setDisplay(cur);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // We deliberately depend on `value` only; the tween reads `display`
    // via fromRef at the moment of restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return display;
}

export type MetricTone = "accent" | "white";

/**
 * Big editorial metric block. Number on top, label underneath, optional
 * delta pill on the right. Used 4 times in the results column.
 */
export function MetricBlock({
  label,
  value,
  format,
  sublabel,
  tone = "white",
  shimmer = false,
  delta,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  sublabel?: string;
  tone?: MetricTone;
  /** Animated text-shimmer (use sparingly — on the hero metric only). */
  shimmer?: boolean;
  /** Optional small pill on the right of the value row. */
  delta?: { text: string; positive: boolean };
}) {
  const animated = useAnimatedNumber(value);

  const valueClass =
    tone === "accent"
      ? shimmer
        ? "text-shimmer"
        : "text-accent"
      : "text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass relative overflow-hidden rounded-2xl p-6 md:p-7"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {label}
        </span>
        {delta ? (
          <span
            className={`font-mono inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] tabular-nums ${
              delta.positive
                ? "border-accent/35 bg-accent/10 text-accent"
                : "border-white/15 bg-white/5 text-white/65"
            }`}
          >
            {delta.text}
          </span>
        ) : null}
      </div>
      <div
        className={`font-display mt-2.5 text-4xl font-medium leading-none tracking-tight tabular-nums md:text-5xl ${valueClass}`}
      >
        {format(animated)}
      </div>
      {sublabel ? (
        <p className="mt-2.5 text-[13px] leading-snug text-white/55">{sublabel}</p>
      ) : null}
    </motion.div>
  );
}
