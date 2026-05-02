"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Floating "live pulse" ticker. Cycles through recent client wins to signal
 * the agency is currently active — not a static brochure.
 * Auto-hides on small screens to avoid covering content; dismissible.
 */
const wins = [
  { brand: "Batz Hungary", line: "Secured #1 citation on Perplexity for \"comfort shoes Europe\"", ago: "2h ago" },
  { brand: "SW Solar", line: "Replaced legacy competitor as default in ChatGPT", ago: "Today" },
  { brand: "Emineo Private Clinic", line: "+412% AI referral traffic in 30 days", ago: "Yesterday" },
  { brand: "Oktogon Medical", line: "Ranked #1 in Gemini for 18 priority queries", ago: "2d ago" },
  { brand: "Aesthetic Plastic Surgery", line: "Default expert for category in ChatGPT", ago: "3d ago" },
];

export function RecentWins() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    // appear after page settles
    const t0 = setTimeout(() => setOpen(true), 4500);
    return () => clearTimeout(t0);
  }, [dismissed]);

  useEffect(() => {
    if (!open || dismissed) return;
    const t = setInterval(() => setI((p) => (p + 1) % wins.length), 6000);
    return () => clearInterval(t);
  }, [open, dismissed]);

  if (dismissed) return null;
  const w = wins[i];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 0.65, 0.2, 1] }}
          className="fixed bottom-5 left-5 z-40 hidden md:block"
        >
          <div
            className="relative max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-bg/85 p-3 pr-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-start gap-3">
              {/* Live pulse */}
              <span className="relative mt-1 flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={w.brand}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="min-w-0"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    <span className="text-accent">Live</span>
                    <span>·</span>
                    <span>{w.ago}</span>
                  </div>
                  <p className="mt-1 text-sm text-white">
                    <span className="font-semibold text-accent">{w.brand}</span>{" "}
                    <span className="text-white/85">— {w.line}</span>
                  </p>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                className="ml-2 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <motion.span
              key={`p-${i}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 6, ease: "linear" }}
              className="absolute inset-x-0 bottom-0 block h-px origin-left bg-gradient-to-r from-accent via-accent/60 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
