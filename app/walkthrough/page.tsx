"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";
import { SCENES, type SceneId } from "@/lib/walkthrough/scenes";
import { DashboardMock } from "./_components/DashboardMock";

const SCENE_TO_NAV: Record<SceneId, "overview" | "observations" | "alerts" | "share" | "runs"> = {
  import: "overview",
  track: "observations",
  alert: "alerts",
  share: "share",
  run: "runs",
};

export default function Walkthrough() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Active scene index from progress (0..N-1).
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.max(0, Math.min(SCENES.length - 1, Math.floor(v * SCENES.length))),
  );

  return (
    <>
      <Nav />
      <main>
        {/* Header */}
        <section className="container pt-36 md:pt-44">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              The product · 3 minutes
            </span>
            <h1 className="font-display mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
              Scroll through the dashboard your CMO will eventually screenshot.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-white/65 md:text-lg">
              Five scenes. Same product every Momentus engagement runs on.
            </p>
          </div>
        </section>

        {/* Scroll-driven stage */}
        <section ref={wrapRef} className="container relative mt-20" style={{ height: `${SCENES.length * 110}vh` }}>
          <div className="sticky top-24 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:items-center">
            {/* Captions (left, pinned, only one visible at a time on desktop) */}
            <div className="relative min-h-[60vh]">
              {SCENES.map((s, i) => (
                <Caption key={s.id} index={i} total={SCENES.length} progress={scrollYProgress} scene={s} />
              ))}
            </div>

            {/* Dashboard mock (right, sticky) */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl glass">
              <ActiveMock activeIndex={activeIndex} />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mt-32">
          <div className="glass mx-auto max-w-3xl rounded-3xl p-8 text-center md:p-14">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              The next move
            </span>
            <h2 className="font-display mt-5 text-balance text-3xl tracking-tight md:text-5xl">
              See it live with your data, not ours.
            </h2>
            <p className="mt-5 text-white/65 md:text-lg">
              Bring a domain and a query to a 30-minute audit call. You walk away with the actual playbook for your category.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
              >
                Book a free call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm text-white/85 transition hover:bg-white/[0.06]"
              >
                Read the product page
              </Link>
            </div>
          </div>
        </section>
        <div className="h-32" />
      </main>
      <Footer />
    </>
  );
}

function Caption({
  scene,
  index,
  total,
  progress,
}: {
  scene: (typeof SCENES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    progress,
    [start - 0.06, start + 0.05, end - 0.05, end + 0.06],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start - 0.06, start + 0.05, end - 0.05, end + 0.06], [30, 0, 0, -30]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
        Step {scene.step} of {total} · {scene.label}
      </span>
      <h3 className="font-display mt-4 text-balance text-3xl tracking-tight md:text-5xl">{scene.title}</h3>
      <p className="mt-5 max-w-md text-white/70 md:text-lg">{scene.body}</p>
      {index < total - 1 && (
        <p className="font-mono mt-8 text-[11px] uppercase tracking-[0.22em] text-white/40">
          Keep scrolling ↓
        </p>
      )}
    </motion.div>
  );
}

function ActiveMock({ activeIndex }: { activeIndex: MotionValue<number> }) {
  // We can't pass a MotionValue directly to DashboardMock; subscribe to the value
  // and re-render when it changes by mapping to local state.
  const navKey = useTransform(activeIndex, (v) => SCENE_TO_NAV[SCENES[v].id] as string);
  return <DashboardWrapper navKey={navKey} />;
}

// Small wrapper so the DashboardMock re-renders when navKey changes.
function DashboardWrapper({ navKey }: { navKey: MotionValue<string> }) {
  const Inner = ({ value }: { value: string }) => (
    <DashboardMock
      workspace="Momentus · SW Solar"
      activeNav={value as "overview" | "observations" | "alerts" | "share" | "runs"}
    >
      <SceneBody nav={value} />
    </DashboardMock>
  );
  // useMotionValueEvent would be ideal; using onChange via useTransform via state
  // is cleanest in client component land:
  return <NavKeyConsumer navKey={navKey} render={(v) => <Inner value={v} />} />;
}

import { useEffect, useState } from "react";

function SceneBody({ nav }: { nav: string }) {
  if (nav === "observations") {
    return (
      <div className="space-y-2 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          Recent observations
        </div>
        {[
          ["best comfort shoes Europe", "ChatGPT", 0.74, "positive"],
          ["birkenstock alternatives 2026", "Perplexity", 0.62, "positive"],
          ["plantar fasciitis sandals", "Gemini", 0.41, "neutral"],
          ["BATZ vs Scholl review", "ChatGPT", 0.88, "positive"],
        ].map((r) => (
          <div key={String(r[0])} className="glass flex items-center justify-between rounded-lg px-3 py-2 text-xs">
            <span className="truncate text-white/85">{String(r[0])}</span>
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">{String(r[1])}</span>
            <div className="ml-3 h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-accent" style={{ width: `${Number(r[2]) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (nav === "alerts") {
    return (
      <div className="space-y-2 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Inbox · 3 open</div>
        {[
          ["🚨", "Visibility drop", "ChatGPT · -22% vs prior 7d", "border-red-400/30 bg-red-400/5"],
          ["⚠️", "New competitor: Acme", "Appeared 4× in last 7d", "border-amber-300/30 bg-amber-300/5"],
          ["ℹ️", "Sentiment flip", "Perplexity · neutral → positive", "border-white/10 bg-white/5"],
        ].map(([emo, t, body, cls]) => (
          <div key={String(t)} className={`flex items-start gap-3 rounded-lg border px-3 py-2 text-xs ${cls}`}>
            <span className="text-base">{emo}</span>
            <div className="min-w-0">
              <div className="font-display text-sm">{t}</div>
              <div className="text-white/60">{body}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (nav === "share") {
    return (
      <div className="p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Share tokens · 2 active</div>
        <div className="glass mt-3 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm">CMO weekly link</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">12 views</span>
          </div>
          <div className="font-mono mt-2 truncate text-[10px] text-white/45">
            momentus.ai/share/g4FsPIDQATa1PhGPgczsNSSiuo6ix9xj
          </div>
        </div>
        <div className="glass mt-2 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm">Quarterly board link</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">expires May 30</span>
          </div>
        </div>
      </div>
    );
  }
  if (nav === "runs") {
    return (
      <div className="space-y-1.5 p-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">Engine runs · last 8</div>
        {[
          ["insights_scan", "inline", "success", "127ms"],
          ["prompt_tracker", "background", "success", "1.8s"],
          ["attack_map", "background", "success", "3.2s"],
          ["authority_score", "inline", "success", "84ms"],
          ["citation_intel", "scheduled", "pending", "—"],
        ].map(([n, tr, st, d]) => (
          <div key={String(n)} className="flex items-center gap-3 rounded-lg px-2 py-1.5 font-mono text-[10px]">
            <span className="w-32 truncate text-white/85">{n}</span>
            <span className="w-20 uppercase tracking-[0.18em] text-white/45">{tr}</span>
            <span
              className={`rounded-full border px-2 py-0.5 uppercase tracking-[0.18em] ${
                st === "success" ? "border-accent/40 text-accent" : "border-amber-300/40 text-amber-300"
              }`}
            >
              {st}
            </span>
            <span className="ml-auto text-white/45">{d}</span>
          </div>
        ))}
      </div>
    );
  }
  // import / overview default
  return (
    <div className="p-3">
      <div className="glass mx-auto max-w-md rounded-xl border-2 border-dashed border-accent/30 p-6 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          peec-export-2026-05.csv · 4,127 rows
        </div>
        <div className="mt-3 text-sm text-white/80">Auto-detecting format…</div>
        <div className="font-mono mt-1 text-[10px] uppercase tracking-[0.18em] text-white/55">
          → peec_prompts
        </div>
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-accent" style={{ width: "67%" }} />
        </div>
        <div className="font-mono mt-2 text-[10px] text-white/45">67% · ingesting BrandMention rows</div>
      </div>
    </div>
  );
}

function NavKeyConsumer({
  navKey,
  render,
}: {
  navKey: MotionValue<string>;
  render: (v: string) => JSX.Element;
}) {
  const [v, setV] = useState<string>(navKey.get() || "overview");
  useEffect(() => {
    const unsub = navKey.on("change", (next) => setV(next));
    return () => unsub();
  }, [navKey]);
  return render(v);
}
