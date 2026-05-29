"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionEyebrow } from "./ui/section-eyebrow";

const QA = [
  {
    q: "Is GEO different from SEO?",
    a: "SEO ranks pages on Google's results list. GEO determines whether ChatGPT, Perplexity, Gemini, Claude, Copilot and Google AI Overview cite you when a buyer asks for the best in your category. Different signals, different surfaces, different timeline. We run both alongside paid because each multiplies the other.",
  },
  {
    q: "How long until I see citations?",
    a: "First measurable citation lift typically lands inside 21–45 days. The full flywheel — AI warms the market → paid harvests it → AI reinforces the winner — compounds over 90–180 days. We publish a 30-day signal report regardless of timing.",
  },
  {
    q: "Do you guarantee #1 placement?",
    a: "No. Any agency that does is selling you something that recommendation engines can yank tomorrow. We guarantee a defensible plan, transparent signal control, and weekly reports. If we don't think we can move you in 90 days, we say so during the audit.",
  },
  {
    q: "What's the minimum engagement?",
    a: "A 90-day initial sprint. We don't do month-to-month because AI citation patterns don't move on month-to-month attention spans. The audit (Book a free call) is genuinely free — it's our way of testing whether we'd be a fit.",
  },
  {
    q: "Who owns the data and the work?",
    a: "You do. Reports, audits, content, the dashboard data — yours. We don't gate or re-sell client data. If you bring this in-house later, we transfer the playbook.",
  },
  {
    q: "What if a competitor sees what's working and copies us?",
    a: "By the time they reverse-engineer it, AI's habit has formed around you. Default-brand status compounds. Signal coherence is hard to fake retroactively. The clients who win are the ones who move first, not the ones who move loudest.",
  },
];

export function FAQ() {
  // First question open by default. Single-open accordion — opening one closes
  // the previous, mirrors editorial reading rhythm.
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="questions" className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionEyebrow id="questions" label="Questions" />
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            What CMOs actually ask us.
          </h2>
          <p className="mt-5 text-white/65">
            Straight answers. No upsell ladder. If your question isn't here, you'll get it answered on the audit call.
          </p>
        </div>

        <ul className="mx-auto flex max-w-3xl flex-col gap-3">
          {QA.map((item, i) => {
            const isOpen = open === i;
            const idx = String(i + 1).padStart(2, "0");
            return (
              <li key={item.q}>
                <motion.div
                  layout
                  transition={{ duration: 0.35, ease: [0.22, 0.65, 0.2, 1] }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left transition hover:bg-white/[0.02] md:px-7 md:py-6"
                  >
                    <span className="font-mono shrink-0 text-[11px] tabular-nums tracking-[0.18em] text-accent">
                      {idx}.
                    </span>
                    <span className="font-display flex-1 text-base tracking-tight text-white md:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.65, 0.2, 1] }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/12 text-white/70"
                      aria-hidden
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 0.65, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pl-[3.25rem] text-[15px] leading-relaxed text-white/70 md:px-7 md:pl-[3.75rem] md:text-base">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
