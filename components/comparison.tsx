"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

/**
 * Drag-slider comparison: shows the same ChatGPT answer "without" vs "with" Momentus.
 * Visceral demonstration of what the work actually changes.
 */
export function Comparison() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useMotionValue(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  };

  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            Same query. Different outcome.
          </span>
          <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            Drag to see what AI says about your category.
          </h2>
        </div>

        <div
          ref={ref}
          onMouseMove={(e) => dragging.get() && update(e.clientX)}
          onMouseUp={() => dragging.set(false)}
          onMouseLeave={() => dragging.set(false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
          className="glass relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-3xl select-none"
        >
          {/* WITH — accent panel (full width, sits behind) */}
          <Panel
            tag="With Momentus"
            tagClass="bg-accent/15 text-accent"
            rows={[
              { name: "Your brand", score: 96, win: true, line: "The clear category leader, cited across studies and expert lists." },
              { name: "Competitor A", score: 74 },
              { name: "Competitor B", score: 61 },
            ]}
          />

          {/* WITHOUT — clipped from the right */}
          <div
            className="absolute inset-0 overflow-hidden border-r border-white/10"
            style={{ width: `${pos}%` }}
          >
            <Panel
              tag="Without Momentus"
              tagClass="bg-white/5 text-white/55"
              rows={[
                { name: "Competitor A", score: 88 },
                { name: "Competitor B", score: 71 },
                { name: "Competitor C", score: 64 },
                { name: "Your brand", score: 23, dim: true, line: "Mentioned occasionally as a smaller alternative." },
              ]}
              dim
            />
          </div>

          {/* Divider */}
          <motion.div
            onMouseDown={() => dragging.set(true)}
            onTouchStart={() => dragging.set(true)}
            className="absolute inset-y-0 z-10 w-1 cursor-ew-resize bg-accent shadow-[0_0_24px_2px_rgba(198,255,61,0.5)]"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-accent bg-bg shadow-[0_0_28px_4px_rgba(198,255,61,0.45)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C6FF3D" strokeWidth="2.5">
                  <path d="M9 6L3 12l6 6M15 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </motion.div>
        </div>

        <p className="mt-6 text-center text-sm text-white/45">
          Drag the divider. This is the answer your future buyer is reading right now.
        </p>
      </div>
    </section>
  );
}

interface Row {
  name: string;
  score: number;
  win?: boolean;
  dim?: boolean;
  line?: string;
}

function Panel({
  tag,
  tagClass,
  rows,
  dim = false,
}: {
  tag: string;
  tagClass: string;
  rows: Row[];
  dim?: boolean;
}) {
  const winner = rows.find((r) => r.win);
  return (
    <div className="absolute inset-0 grid h-full w-full bg-bg p-5 md:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-[10px] uppercase text-white/70">
            AI
          </span>
          <span className="text-sm text-white/55">"Best in [your category]?"</span>
        </div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest ${tagClass}`}>
          {tag}
        </span>
      </div>

      <div className="mt-6 self-center md:mt-0">
        <p className={`max-w-2xl text-pretty text-lg leading-relaxed md:text-2xl ${dim ? "text-white/40" : "text-white/85"}`}>
          {winner?.line ??
            rows[0]?.line ??
            "Based on recent coverage, expert lists and citation patterns, here are the top brands buyers should consider:"}
        </p>
        <ol className="mt-6 space-y-2">
          {rows.map((r, i) => (
            <li
              key={r.name}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                r.win ? "bg-accent/10 ring-1 ring-accent/30" : ""
              }`}
            >
              <span className={`w-6 text-right text-sm tabular-nums ${dim ? "text-white/30" : "text-white/45"}`}>
                {i + 1}.
              </span>
              <span className={`flex-1 truncate text-sm md:text-base ${
                r.win ? "text-accent" : r.dim ? "text-white/45" : "text-white/85"
              }`}>
                {r.name}
              </span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10 md:w-40">
                <div className={`h-full ${r.win ? "bg-accent" : "bg-white/35"}`} style={{ width: `${r.score}%` }} />
              </div>
              <span className="w-10 text-right text-xs tabular-nums text-white/55">{r.score}%</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
