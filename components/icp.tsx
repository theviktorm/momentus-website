"use client";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { SectionEyebrow } from "./ui/section-eyebrow";

const fits = [
  "You're the one people look at when someone asks \"what's our AI plan?\"",
  "CMO, VP / Head of Marketing, Head of Growth, founder or CEO.",
  "Revenue ~$5M–$500M+, already investing seriously in brand, content and SEO.",
  "You've tried \"best [your category]\" in AI tools and didn't like what you saw.",
  "Your growth depends on inbound, trust, and being the safe choice.",
];

const notFits = [
  "Looking for cheap AI-written content.",
  "Hoping your SEO agency \"figures it out later.\"",
  "Want short-term tricks instead of compounding authority.",
];

export function ICP() {
  return (
    <section id="fit" className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionEyebrow id="fit" label="Fit check" />
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            We start by working with the <span className="text-accent">right few.</span>
          </h2>
          <p className="mt-5 text-white/65">
            Right now, in 99% of niches, AI systems are still forming their habits. You're either the brand that
            shows up early, clearly and consistently, or the one explaining to the board why you're late.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-7"
          >
            <h3 className="font-display text-2xl tracking-tight">This is for you if…</h3>
            <ul className="mt-5 space-y-3">
              {fits.map((f) => (
                <li key={f} className="flex gap-3 text-white/80">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="glass rounded-2xl p-7"
          >
            <h3 className="font-display text-2xl tracking-tight text-white/55">This isn't for you if…</h3>
            <ul className="mt-5 space-y-3">
              {notFits.map((f) => (
                <li key={f} className="flex gap-3 text-white/55">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/5">
                    <X size={12} strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
