"use client";
import { motion, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { SectionEyebrow } from "./ui/section-eyebrow";

const steps = [
  {
    n: "01",
    t: "Precision intake & selection",
    b: "Capacity is limited by design. Every client is vetted for market fit, category potential and authority upside. Recommendation engines reward clarity and consistency over volume.",
  },
  {
    n: "02",
    t: "AI-specific optimization layers",
    b: "ChatGPT, Perplexity, Gemini and AI-powered search don't interpret information the same way. We build separate signal layers per system instead of forcing one generic GEO play across all.",
  },
  {
    n: "03",
    t: "Total online presence control",
    b: "We handle the full visibility surface: website structure, content signals, social presence, YouTube. AI sees one coherent, verifiable version of your brand everywhere it looks.",
  },
  {
    n: "04",
    t: "Proprietary acceleration tools",
    b: "Internal systems not used by other agencies. Designed to surface gaps, test AI perception, and accelerate trust signals so results happen faster than traditional GEO timelines.",
  },
  {
    n: "05",
    t: "Real-time feedback & accountability",
    b: "You see progress as it happens. Weekly reports, regular calls, direct access. Reach out, hear back within hours, not days.",
  },
];

export function Process() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Manual scroll-progress tracking — bypasses Lenis-related quirks with
  // framer-motion's useScroll. Updates on every rAF tick so the dot tracks 1:1.
  const lineH = useMotionValue("0%");

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = wrapRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress = how far the viewport center has crossed the wrapper.
        // 0 when wrapper top is at viewport center, 1 when wrapper bottom is at center.
        const total = r.height;
        const passed = vh / 2 - r.top;
        const p = Math.max(0, Math.min(1, passed / total));
        lineH.set(`${p * 100}%`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lineH]);

  return (
    <section id="process" className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <SectionEyebrow id="process" label="How we work" />
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            We engineer AI visibility, <span className="text-white/40">not chase it.</span>
          </h2>
          <p className="mt-5 text-white/65">
            Our system requires consistency, signal control and time for authority to compound. We only partner
            with businesses willing to do this properly instead of chasing short-term tricks.
          </p>
        </div>

        {/*
          Layout strategy
          - Mobile: 2-col grid [56px badge | 1fr card]. Rail at left edge.
          - Desktop: 3-col grid [1fr | 56px badge | 1fr]. Rail in middle column.
            Cards alternate between col 1 and col 3 so the spine stays clean.
        */}
        <div ref={wrapRef} className="relative mx-auto max-w-5xl">
          {/* Base rail. Mobile: at x=27px. Desktop: dead center. */}
          <div className="pointer-events-none absolute top-0 h-full w-px bg-white/10 left-[27px] md:left-1/2 md:-translate-x-1/2" />
          {/* Animated progress fill */}
          <motion.div
            style={{ height: lineH }}
            className="pointer-events-none absolute top-0 w-px bg-gradient-to-b from-accent via-accent/60 to-transparent left-[27px] md:left-1/2 md:-translate-x-1/2"
          />
          {/* Moving glow dot */}
          <motion.span
            style={{ top: lineH }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 left-[27px] md:left-1/2"
            aria-hidden
          >
            <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(198,255,61,0.55)]" />
          </motion.span>

          <ol className="relative">
            {steps.map((s, i) => (
              <Step key={s.n} index={i} step={s} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ index, step }: { index: number; step: { n: string; t: string; b: string } }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const onLeft = index % 2 === 0;

  return (
    <li
      ref={ref}
      className="relative grid items-center gap-x-6 gap-y-3 pb-14 last:pb-0
        grid-cols-[56px_1fr]
        md:grid-cols-[1fr_56px_1fr] md:gap-x-12"
    >
      {/* Number badge — middle column on desktop, first on mobile */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.05 }}
        className="relative z-10 col-start-1 row-start-1 justify-self-center md:col-start-2"
      >
        <span className="relative grid h-14 w-14 place-items-center rounded-full border border-accent/30 bg-bg">
          {/* pulsing ring */}
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full"
            initial={{ boxShadow: "0 0 0 0 rgba(198,255,61,0.0)" }}
            animate={
              inView
                ? {
                    boxShadow: [
                      "0 0 0 0 rgba(198,255,61,0.45)",
                      "0 0 0 14px rgba(198,255,61,0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeOut" }}
          />
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(198,255,61,0.25),transparent_60%)]" />
          <span className="font-display relative z-10 text-base font-semibold leading-none tracking-tight text-accent">
            <Digit value={step.n[0]} delay={0.15} active={inView} />
            <Digit value={step.n[1]} delay={0.22} active={inView} />
          </span>
        </span>
      </motion.div>

      {/* Card — col 2 on mobile; alternates col 1 / col 3 on desktop */}
      <motion.div
        initial={{ opacity: 0, x: onLeft ? -24 : 24, y: 12 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 0.7, 0.2, 1] }}
        className={[
          "glass relative overflow-hidden rounded-2xl p-6 md:p-7",
          // mobile: always second column
          "col-start-2 row-start-1",
          // desktop: alternate sides; opposite column stays empty so the badge doesn't collide
          onLeft
            ? "md:col-start-1 md:justify-self-end md:text-right"
            : "md:col-start-3 md:justify-self-start",
        ].join(" ")}
      >
        <h3 className="font-display text-xl tracking-tight md:text-2xl">{step.t}</h3>
        <p className="mt-2 text-white/65">{step.b}</p>
      </motion.div>
    </li>
  );
}

/** Single digit that springs in from below, odometer-style flip-up. */
function Digit({ value, delay = 0, active }: { value: string; delay?: number; active: boolean }) {
  return (
    <motion.span
      initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
      animate={active ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ type: "spring", stiffness: 320, damping: 24, delay }}
      className="inline-block tabular-nums"
    >
      {value}
    </motion.span>
  );
}
