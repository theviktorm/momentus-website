"use client";
import { motion } from "framer-motion";
import { awards, type Award } from "@/lib/awards";

/**
 * Dual-mode authority strip. Reads from lib/awards.ts.
 *  - Empty list → returns null. Zero-noise homepage.
 *  - Populated → splits into Press (top row) and Awards (bottom row).
 *    Each entry: mono caps label with optional `detail` underneath.
 */
export function Press() {
  if (!awards || awards.length === 0) return null;

  const press = awards.filter((a) => a.kind === "press");
  const recog = awards.filter((a) => a.kind === "award");

  return (
    <section className="relative py-16">
      <div className="container space-y-10">
        {press.length > 0 && <Row label="As contributed to" items={press} />}
        {recog.length > 0 && <Row label="Recognized by" items={recog} />}
      </div>
    </section>
  );
}

function Row({ label, items }: { label: string; items: Award[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 md:grid-cols-6">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex flex-col gap-1"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/80">
              {it.label}
            </span>
            {it.detail && (
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                {it.detail}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
