"use client";
import { motion } from "framer-motion";
import { SectionEyebrow } from "./ui/section-eyebrow";

export function Problem() {
  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionEyebrow id="split" />
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            Most teams are fighting with{" "}
            <span className="text-white/40">one hand tied.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
          <Card
            tag="GEO only"
            title="Trust without harvest"
            body="AI starts recommending them, but paid competitors scoop up the demand. Trust is there. Revenue leaks and results take too long to show."
          />
          <div className="hidden items-center justify-center md:flex">
            <span className="font-display rounded-full border border-accent/40 bg-bg px-4 py-2 text-sm tracking-tight text-accent shadow-[0_0_24px_rgba(198,255,61,0.25)]">
              vs
            </span>
          </div>
          <Card
            tag="Paid only"
            title="Spend without signal"
            body="They buy cold attention while AI recommends someone else. Nothing pre-sells them, so CAC keeps climbing just to stay visible."
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="font-display mx-auto mt-14 max-w-3xl text-center text-2xl leading-snug tracking-tight md:text-3xl"
        >
          AI decides who deserves attention.{" "}
          <span className="text-accent">Paid decides who profits from it.</span>
        </motion.p>
      </div>
    </section>
  );
}

function Card({ tag, title, body }: { tag: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="glass relative overflow-hidden rounded-2xl p-7"
    >
      <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-accent">
        {tag}
      </span>
      <h3 className="font-display mt-4 text-2xl tracking-tight md:text-3xl">{title}</h3>
      <p className="mt-3 text-white/65">{body}</p>
    </motion.div>
  );
}
