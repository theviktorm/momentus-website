"use client";

import { motion } from "framer-motion";
import { fmtUsd } from "@/lib/roi/calculate";

/**
 * Inline SVG bar chart — 12 months of projected monthly savings.
 *
 * Animates on mount (bars rise from 0 to height). Re-keys on `timelineId`
 * so changing the engagement timeline re-plays the ramp animation.
 */
export function SavingsChart({
  ramp,
  timelineId,
}: {
  ramp: number[];
  timelineId: number | string;
}) {
  const max = Math.max(...ramp, 1);
  const W = 560;
  const H = 220;
  const padL = 36;
  const padR = 12;
  const padT = 14;
  const padB = 32;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const barGap = 6;
  const barW = (innerW - barGap * (ramp.length - 1)) / ramp.length;

  // Reasonable y-axis ticks: 0, 25%, 50%, 75%, 100% of max.
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    label: fmtUsd(max * t),
    y: padT + innerH - innerH * t,
  }));

  return (
    <div className="glass rounded-2xl p-5 md:p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            12-month savings ramp
          </span>
          <p className="mt-1 text-[13px] text-white/55">
            Projected monthly savings, month 1 → month 12.
          </p>
        </div>
        <span className="font-mono inline-block rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] tabular-nums text-accent">
          peak {fmtUsd(max)}
        </span>
      </div>

      <div className="mt-5 overflow-hidden">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          className="block"
          role="img"
          aria-label="12-month projected savings"
        >
          {/* Grid lines + y labels */}
          {ticks.map((t, i) => (
            <g key={i}>
              <line
                x1={padL}
                x2={W - padR}
                y1={t.y}
                y2={t.y}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray={i === 0 ? "" : "3 4"}
              />
              <text
                x={padL - 6}
                y={t.y + 3}
                textAnchor="end"
                className="fill-white/45"
                style={{ fontSize: 9, fontFamily: "ui-monospace, monospace" }}
              >
                {i === 0 ? "$0" : abbrev(max * (1 - i / 4))}
              </text>
            </g>
          ))}

          {/* Bars */}
          {ramp.map((v, i) => {
            const h = (v / max) * innerH;
            const x = padL + i * (barW + barGap);
            const y = padT + innerH - h;
            return (
              <motion.rect
                key={`${timelineId}-${i}`}
                x={x}
                width={barW}
                rx={2}
                initial={{ y: padT + innerH, height: 0, opacity: 0 }}
                animate={{ y, height: h, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * i,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                fill="url(#roi-bar)"
              />
            );
          })}

          {/* X labels */}
          {ramp.map((_, i) => {
            const x = padL + i * (barW + barGap) + barW / 2;
            const showLabel =
              i === 0 || i === 5 || i === 11 || i === ramp.length - 1;
            if (!showLabel) return null;
            return (
              <text
                key={`xl-${i}`}
                x={x}
                y={H - padB + 18}
                textAnchor="middle"
                className="fill-white/55"
                style={{ fontSize: 10, fontFamily: "ui-monospace, monospace" }}
              >
                M{i + 1}
              </text>
            );
          })}

          <defs>
            <linearGradient id="roi-bar" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#C6FF3D" stopOpacity="1" />
              <stop offset="100%" stopColor="#9BD300" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/** Compact USD label for chart y-axis: $12k, $1.2M, etc. */
function abbrev(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}
