"use client";
import { motion } from "framer-motion";

/**
 * ValueCard — numbered editorial card for the "Five positions we won't move on"
 * section on /about. Bold position headline, one-line body, no buttons.
 */
export function ValueCard({
  index,
  headline,
  body,
}: {
  index: number;
  headline: string;
  body: string;
}) {
  const num = String(index).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 0.65, 0.2, 1] }}
      className="glass relative overflow-hidden rounded-2xl p-7 md:p-9"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-8">
        <span
          aria-hidden
          className="font-mono shrink-0 text-[11px] uppercase tracking-[0.22em] text-accent/80"
        >
          {num} /
        </span>
        <div className="flex-1">
          <h3 className="font-display text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
            {headline}
          </h3>
          <p className="mt-3 max-w-2xl text-pretty text-base text-white/65 md:text-lg">
            {body}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
