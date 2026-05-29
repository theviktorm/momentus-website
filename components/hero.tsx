"use client";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { Aurora } from "./ui/aurora";
import { WordReveal } from "./ui/word-reveal";
import { Magnetic } from "./ui/magnetic";
import { CALENDLY_URL } from "@/lib/config";
import { track } from "@/lib/track";
import { AIRotator } from "./ui/ai-rotator";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pt-44">
      <Aurora />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 -z-10 grid-bg mask-radial opacity-50" />
      <div className="container relative">
        {/* Year + niche stamp — anchors recency + ICP in a single line above the pill. */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono mx-auto mb-4 w-fit text-[10px] uppercase tracking-[0.22em] text-white/55"
        >
          2026 · GEO × Paid for B2B &amp; DTC at $5M–$500M
        </motion.p>

        {/* Top stat pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-10 flex w-fit items-center gap-3 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            AI is already telling buyers who to trust
          </span>
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <h1 className="font-display mx-auto max-w-5xl text-balance text-center text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl lg:text-[88px]">
          <WordReveal text="Take first place in" />{" "}
          <motion.span
            initial={{ opacity: 0, y: "0.6em", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 0.65, 0.2, 1] }}
            className="text-shimmer inline-block"
          >
            AI citations
          </motion.span>
          <br className="hidden md:block" />{" "}
          <WordReveal text="before competitors" delay={0.7} />{" "}
          <WordReveal
            text="block you out."
            delay={1.0}
            highlight={["block", "you", "out"]}
            italic={["block", "you", "out"]}
          />
        </h1>

        {/* AI platform rotator */}
        <AIRotator />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg text-white/65 md:text-xl"
        >
          We run <strong className="text-white">GEO + Paid together</strong>, so when ChatGPT, Perplexity and Gemini
          quietly point buyers to a few default brands, your company is the one ads reinforce. Not the one
          fighting uphill to be noticed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.25 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_click", { location: "hero", label: "book_free_call" })}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-base font-medium text-bg transition hover:bg-accent-soft"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Book a free call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#flywheel"
              onClick={() => track("cta_click", { location: "hero", label: "see_flywheel" })}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-base text-white/85 transition hover:bg-white/[0.06]"
            >
              See the flywheel
            </a>
          </Magnetic>
        </motion.div>

        {/* Hero Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-b from-accent/30 to-transparent blur-2xl" />
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMock() {
  const brands = [
    { name: "Your brand", score: 94, win: true },
    { name: "Competitor A", score: 71 },
    { name: "Competitor B", score: 58 },
    { name: "Competitor C", score: 42 },
  ];
  return (
    <div className="glass rounded-2xl p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="ml-3 text-xs text-white/50">momentus.ai / visibility</span>
        </div>
        <span className="rounded-full bg-accent/15 px-3 py-1 text-[11px] font-medium text-accent">
          Live AI Visibility
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-xl bg-black/30 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-sm text-white/70">AI citations · last 30 days</h3>
            <span className="font-mono inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-accent shadow-[0_0_18px_rgba(198,255,61,0.28)]">
              +318%
            </span>
          </div>
          <Sparkline />
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] text-white/50">
            <div><div className="text-white">ChatGPT</div>1,284</div>
            <div><div className="text-white">Perplexity</div>692</div>
            <div><div className="text-white">Gemini</div>418</div>
          </div>
        </div>
        <div className="rounded-xl bg-black/30 p-5 ring-line">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-sm text-white/70">"Best in [your category]?"</h3>
            <span className="text-xs text-white/40">ChatGPT</span>
          </div>
          <ul className="space-y-2">
            {brands.map((b, i) => (
              <li key={b.name} className="flex items-center gap-3">
                <span className="w-4 text-right text-xs text-white/40">{i + 1}</span>
                <span className={`flex-1 truncate text-sm ${b.win ? "text-accent" : "text-white/85"}`}>{b.name}</span>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${b.win ? "bg-accent" : "bg-white/40"}`} style={{ width: `${b.score}%` }} />
                </div>
                <span className="w-9 text-right text-xs tabular-nums text-white/60">{b.score}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Sparkline() {
  const points = [12, 18, 16, 24, 30, 28, 38, 44, 50, 58, 70, 92];
  const max = Math.max(...points);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 100;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
  const area = `${path} L100,100 L0,100 Z`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-32 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C6FF3D" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#C6FF3D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={path} fill="none" stroke="#C6FF3D" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
