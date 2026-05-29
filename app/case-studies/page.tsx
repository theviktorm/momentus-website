import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { CaseStudyLayout } from "./_components/CaseStudyLayout";
import { PendingPill } from "./_components/PendingPill";

export const metadata: Metadata = {
  title: "Case studies | Momentus",
  description:
    "Real outcomes from GEO × Paid engagements. Where details aren't public yet, we say so.",
  openGraph: {
    title: "Case studies | Momentus",
    description:
      "Real outcomes from GEO × Paid engagements. Where details aren't public yet, we say so.",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const MAX_CHALLENGE_PREVIEW = 280;

function trim(text: string, max: number): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= max) return flat;
  // Don't cut mid-word; trim back to last space.
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export default function CaseStudiesIndexPage() {
  return (
    <CaseStudyLayout>
      {/* ────────────────────────────── Header ────────────────────────────── */}
      <section className="container max-w-5xl">
        <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="font-semibold tabular-nums text-accent">05</span>
          <span aria-hidden className="text-accent/55">/</span>
          <span>Proof</span>
        </span>
        <h1 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight md:text-6xl">
          Outcomes you can put in front of a board.
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-white/65 md:text-lg">
          Real numbers, real timelines. Where details aren&apos;t public yet, we say so.
        </p>
      </section>

      {/* ────────────────────────────── Rows ────────────────────────────── */}
      <section className="container max-w-6xl mt-20 md:mt-28">
        <ul className="border-t border-white/8">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyRow key={study.slug} study={study} index={i} />
          ))}
        </ul>
      </section>

      {/* ────────────────────────────── Closing band ──────────────────────────────
       *
       * Curiosity-builder. The user explicitly asked for this — tells the visitor
       * that what they're seeing is the tip of the iceberg and the rest is behind
       * an NDA. Drives the next click (book a call).
       */}
      <section className="container max-w-5xl mt-24 md:mt-32">
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <p className="font-display text-balance text-2xl tracking-tight text-white md:text-4xl">
            Three more in private — covered by NDA.
            <span className="text-white/45"> Ask us in the audit call.</span>
          </p>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  const isLead = index === 0;
  return (
    <li className="border-b border-white/8">
      <Link
        href={`/case-studies/${study.slug}`}
        className="group block py-12 transition-colors duration-300 hover:bg-white/[0.02] md:py-24"
      >
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          {/* Left third — big number */}
          <div className="flex flex-col justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              {String(index + 1).padStart(2, "0")} · {study.vertical}
            </span>
            <div>
              <div
                className={`font-display text-balance text-6xl font-medium tracking-tight md:text-7xl lg:text-8xl ${
                  isLead ? "text-shimmer" : "text-accent"
                }`}
              >
                {study.headline.metric}
              </div>
              <div className="mt-3 text-sm text-white/55 md:text-base">
                {study.headline.label}
              </div>
            </div>
          </div>

          {/* Right two-thirds — title, chips, challenge preview */}
          <div className="md:col-span-2">
            <h2 className="font-display text-balance text-2xl tracking-tight text-white md:text-4xl">
              <span className="text-white">{study.brand}</span>
              <span className="text-white/45"> — {study.thesis}</span>
            </h2>

            {/* Result chips */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {study.chips.map((chip) => (
                <li
                  key={chip}
                  className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/65"
                >
                  {chip}
                </li>
              ))}
              {study.pending.length > 0 ? (
                <PendingPill className="ml-1" />
              ) : null}
            </ul>

            <p className="mt-6 max-w-2xl text-white/70 md:text-lg md:leading-relaxed">
              {trim(study.challenge, MAX_CHALLENGE_PREVIEW)}
            </p>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-white transition group-hover:text-accent">
              Read full study
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
