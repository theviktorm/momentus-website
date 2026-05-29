"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const PLATFORMS = [
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Claude",
  "Copilot",
  "Google AI Overview",
];

/**
 * Single rotating platform name beneath the hero headline.
 * `Engineered for · <Platform>` — crossfade + tiny y, 2.5s per word, 350ms
 * transition. Pauses on hover and respects prefers-reduced-motion.
 */
export function AIRotator() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(() => setI((p) => (p + 1) % PLATFORMS.length), 2500);
    return () => clearInterval(t);
  }, [paused, reduced]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      className="mx-auto mt-6 flex w-fit items-baseline gap-2 text-sm text-white/55"
    >
      <span className="font-mono uppercase tracking-[0.22em] text-white/45">
        Engineered for
      </span>
      <span aria-hidden className="text-white/30">·</span>
      <span className="relative inline-block h-6 min-w-[14ch] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={PLATFORMS[i]}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 0.65, 0.2, 1] }}
            className="font-display absolute inset-x-0 text-base font-medium tracking-tight text-white"
          >
            {PLATFORMS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
