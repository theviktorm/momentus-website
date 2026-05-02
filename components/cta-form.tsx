"use client";
import { motion } from "framer-motion";
import { Magnetic } from "./ui/magnetic";
import { CALENDLY_URL } from "@/lib/config";
import { Check } from "lucide-react";

const bullets = [
  "Where you stand in AI recommendations today",
  "Who AI already treats as default in your space",
  "What it takes for you to be one of them",
];

export function CTAForm() {
  return (
    <section id="book" className="relative py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 0.65, 0.2, 1] }}
          className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-16"
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          {/* Subtle grid bg */}
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 mask-radial" />

          <div className="relative mx-auto max-w-3xl">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              Your window
            </span>

            <h2 className="font-display mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
              Stop guessing. Start making deliberate decisions in a world where AI is already picking winners.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/65 md:text-lg">
              Book a GEO Visibility & Recommendation Audit. You walk away with a clear plan to become a default
              brand in AI, or the honest answer that this isn't your lever.
            </p>

            <ul className="mx-auto mt-8 grid max-w-2xl gap-2 text-left md:grid-cols-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm text-white/85">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-3">
              <Magnetic strength={0.3}>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-9 py-5 text-base font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft md:text-lg"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Book a free call
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </Magnetic>
              <p className="text-xs text-white/40">30 minutes. Hear back in hours, not days.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
