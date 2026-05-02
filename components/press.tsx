"use client";
import { motion } from "framer-motion";

/**
 * "As seen in" press authority strip. Swap names with real publications
 * where the team has been quoted, contributed, or covered.
 */
const press = [
  "Forbes",
  "Search Engine Land",
  "MarketingProfs",
  "AdWeek",
  "TechCrunch",
  "Marketing Brew",
];

export function Press() {
  return (
    <section className="relative py-16">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            As seen in / contributed to
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 md:grid-cols-6">
            {press.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="font-display text-lg tracking-tight text-white/55 transition hover:text-white md:text-xl"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
