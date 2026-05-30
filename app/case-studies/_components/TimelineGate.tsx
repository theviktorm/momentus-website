"use client";

/**
 * Three timeline markers connected by a hairline. Used to set temporal
 * context between Challenge and Approach on a detail page.
 *
 *   ●─────────●─────────●
 *   Week 0    Week 4    Week 12
 *
 * Pass `labels` to override defaults. Pass `duration` (e.g. "25 days") and we
 * synthesise sensible gates from it.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineGateProps {
  /** Override the labels. If absent, derived from `duration`. */
  labels?: string[];
  /** Engagement duration. Drives default labels. */
  duration?: string;
  className?: string;
}

/**
 * Synthesise three temporal labels from a free-form duration string.
 * "90 days" → ["Week 0", "Week 4", "Week 12"]
 * "25 days" → ["Day 0", "Day 12", "Day 25"]
 * "27 days" → ["Day 0", "Day 14", "Day 27"]
 * "50 days" → ["Day 0", "Day 25", "Day 50"]
 * Falls back to Week 0 / 4 / 12 if no number found.
 */
function gatesFromDuration(duration?: string): string[] {
  if (!duration) return ["Week 0", "Week 4", "Week 12"];
  const m = duration.match(/(\d+)\s*(day|days|week|weeks|month|months)/i);
  if (!m) return ["Week 0", "Week 4", "Week 12"];
  const n = parseInt(m[1], 10);
  const unitWord = m[2].toLowerCase();
  if (unitWord.startsWith("day")) {
    if (n >= 60) {
      return [`Week 0`, `Week ${Math.round(n / 14)}`, `Week ${Math.round(n / 7)}`];
    }
    return [`Day 0`, `Day ${Math.round(n / 2)}`, `Day ${n}`];
  }
  if (unitWord.startsWith("week")) {
    return [`Week 0`, `Week ${Math.round(n / 2)}`, `Week ${n}`];
  }
  return [`Month 0`, `Month ${Math.round(n / 2)}`, `Month ${n}`];
}

export function TimelineGate({ labels, duration, className }: TimelineGateProps) {
  const gates = labels ?? gatesFromDuration(duration);
  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto flex max-w-3xl items-center justify-between">
        {/* hairline */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-2 right-2 top-1/2 h-px -translate-y-1/2 bg-white/10"
        />
        {gates.map((g, i) => (
          <div key={`${g}-${i}`} className="relative z-10 flex flex-col items-center">
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative grid h-3 w-3 place-items-center"
            >
              <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_20px_4px_rgba(198,255,61,0.4)]" />
              <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-accent/40" />
            </motion.span>
            <span className="font-mono mt-3 text-[11px] uppercase tracking-[0.22em] text-white/55">
              {g}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
