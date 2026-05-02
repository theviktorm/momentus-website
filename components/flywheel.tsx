"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { CinemaBand } from "./ui/cinema-band";

const steps = [
  {
    n: "01",
    t: "AI names you",
    b: "Recommendation engines warm the market by treating you as a default brand. ChatGPT, Perplexity and Gemini quietly start citing you when buyers ask the questions that matter.",
    glyph: "AI",
  },
  {
    n: "02",
    t: "Branded search rises",
    b: "Buyers leave the AI tab and Google your name. Higher intent traffic lifts Quality Score and drops CPC across paid.",
    glyph: "↗",
  },
  {
    n: "03",
    t: "Paid harvests trust",
    b: "Higher CTR, lower CPC, faster conversions. Paid stops working uphill because trust already exists before the click.",
    glyph: "$",
  },
  {
    n: "04",
    t: "AI reinforces winner",
    b: "More citations, more brand-search engagement, stronger default status. Authority compounds and the loop closes.",
    glyph: "↻",
  },
];

/**
 * Sticky-scroll narrative. The headline + visual pin while the user scrolls,
 * and the active step swaps with a crossfade as scrollYProgress crosses thresholds.
 */
export function Flywheel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="flywheel" className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
            The flywheel
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            GEO creates trust. <span className="text-white/40">Paid multiplies it.</span>
          </h2>
          <p className="mt-5 text-white/65">
            Once AI is willing to recommend you, paid stops working uphill and starts working with the grain.
            Instead of paying to convince strangers, you pay to scale decisions AI already made in your favor.
          </p>
        </div>

        {/* Sticky scroll narrative */}
        <div ref={wrapRef} className="relative" style={{ height: `${steps.length * 90}vh` }}>
          <div className="sticky top-24 grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div className="relative h-[60vh] w-full">
              <FlywheelDial progress={scrollYProgress} />
            </div>

            <div className="relative h-[60vh]">
              {steps.map((s, i) => (
                <Slide key={s.n} step={s} index={i} total={steps.length} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>

        {/* Cinematic loop — the punchline visual for "GEO creates trust. Paid multiplies it." */}
        <CinemaBand
          src="https://player.vimeo.com/video/1024930683?h=3900cf1ed8&autoplay=1&loop=1&muted=1&background=1&player_id=0"
          eyebrow="The loop, in motion"
          title="Trust compounds. Paid harvests. AI reinforces the winner."
          body="Every cycle widens the gap. Competitors keep paying for cold attention while your defaults pre-sell themselves."
        />

        {/* Pull quote */}
        <div className="glass mt-16 rounded-2xl p-6 md:p-10">
          <h3 className="font-display text-2xl tracking-tight md:text-3xl">
            When AI pre-sells you, paid stops being a tax.
          </h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 text-white/75 md:grid-cols-2">
            {[
              "AI recommendations warm the market before your ads ever show.",
              "Branded search and intent clicks rise. Quality Score follows.",
              "Higher Quality Score drops CPC. Warmer traffic lifts conversion.",
              "Better conversion improves LTV : CAC. Paid harvests trust, not creates it.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Slide({
  step,
  index,
  total,
  progress,
}: {
  step: { n: string; t: string; b: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [40, 0, 0, -40],
  );
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="font-mono text-xs text-accent">STEP {step.n}</div>
      <h3 className="font-display mt-2 text-3xl tracking-tight md:text-5xl">{step.t}</h3>
      <p className="mt-5 max-w-md text-white/70 md:text-lg">{step.b}</p>
    </motion.div>
  );
}

/** Rotating dial — fills as user scrolls through the section. */
function FlywheelDial({ progress }: { progress: MotionValue<number> }) {
  const rot = useTransform(progress, [0, 1], [0, 360]);
  const dash = useTransform(progress, [0, 1], [0, 1]);
  const counterRot = useTransform(progress, [0, 1], [0, -360]);
  const indices = [0, 1, 2, 3];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <motion.div
        style={{ rotate: rot }}
        className="relative aspect-square h-full max-h-[420px]"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C6FF3D" />
              <stop offset="100%" stopColor="#9BD300" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            stroke="url(#ring)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={2 * Math.PI * 90}
            style={{ pathLength: dash, rotate: -90 }}
            strokeLinecap="round"
          />
          {indices.map((i) => {
            const angle = (i / indices.length) * Math.PI * 2 - Math.PI / 2;
            const cx = 100 + 90 * Math.cos(angle);
            const cy = 100 + 90 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r="4" fill="#C6FF3D" />;
          })}
        </svg>
        {/* counter-rotated center label */}
        <motion.div
          style={{ rotate: counterRot }}
          className="absolute inset-0 grid place-items-center"
        >
          <div className="text-center">
            <div className="font-display text-5xl tracking-tight md:text-7xl">∞</div>
            <div className="mt-2 text-xs uppercase tracking-[0.22em] text-white/55">GEO × Paid</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
