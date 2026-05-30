"use client";
import { NumberTicker } from "./ui/number-ticker";
import { motion } from "framer-motion";
import { SectionEyebrow } from "./ui/section-eyebrow";

const items = [
  { v: 8, suffix: "x", label: "ChatGPT visitor growth in 12 months" },
  { v: 123, suffix: "%", label: "increase in AI referral traffic YoY" },
  { v: 70, suffix: "%", label: "of buyers now use AI to discover brands" },
  { v: 61, suffix: "%", label: "of GenZ prefer AI tools over search" },
];

export function Stats() {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <SectionEyebrow id="why-now" />
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">
            The market is being rewired in real time.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="glass rounded-2xl p-6"
            >
              <div className="font-display text-5xl tracking-tight text-accent md:text-6xl">
                <NumberTicker value={it.v} suffix={it.suffix} />
              </div>
              <p className="mt-3 text-sm text-white/65">{it.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
