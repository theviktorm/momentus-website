"use client";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/config";
import { track } from "@/lib/track";
import { Aurora } from "@/components/ui/aurora";
import { Spotlight } from "@/components/ui/spotlight";
import { BorderBeam } from "@/components/ui/border-beam";
import { Magnetic } from "@/components/ui/magnetic";
import { Tilt } from "@/components/ui/tilt";
import { WordReveal, FadeInUp } from "@/components/ui/word-reveal";

export interface Deliverable {
  n: string;
  title: string;
  body: string;
  chip: string;
}

export interface TimelineStep {
  range: string;
  title: string;
  body: string;
  curve: number[]; // 7 sample points 0..100 for the inline sketch
}

export interface CaseRef {
  metric: string;
  metricLabel: string;
  title: string;
  body: string;
  slug: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ServiceLayoutProps {
  eyebrow: string; // e.g. "01 / Service · GEO"
  title: ReactNode;
  sub: string;
  primaryCtaLabel?: string;
  secondaryCta?: { label: string; href: string };
  audience: string[]; // 3 chips
  deliverables: Deliverable[]; // 6
  timeline: TimelineStep[]; // 3
  cases: CaseRef[]; // 3
  faqs: FAQItem[]; // 3
  finalCta: string;
  sampleReport: ReactNode;
  // optional extras
  extraAfterTimeline?: ReactNode;
  trackingLocation: string; // for analytics
}

export function ServiceLayout(props: ServiceLayoutProps) {
  const {
    eyebrow,
    title,
    sub,
    primaryCtaLabel = "Book a free audit",
    secondaryCta,
    audience,
    deliverables,
    timeline,
    cases,
    faqs,
    finalCta,
    sampleReport,
    extraAfterTimeline,
    trackingLocation,
  } = props;

  return (
    <>
      <ServiceHero
        eyebrow={eyebrow}
        title={title}
        sub={sub}
        primaryCtaLabel={primaryCtaLabel}
        secondaryCta={secondaryCta}
        trackingLocation={trackingLocation}
      />
      <WhoThisIsFor audience={audience} />
      <Deliverables items={deliverables} />
      <Timeline steps={timeline} />
      {extraAfterTimeline}
      <SampleReportWrap>{sampleReport}</SampleReportWrap>
      <ProofRow cases={cases} />
      <FAQ items={faqs} />
      <FinalCTA copy={finalCta} trackingLocation={trackingLocation} />
    </>
  );
}

/* ---------------- Hero ---------------- */

function ServiceHero({
  eyebrow,
  title,
  sub,
  primaryCtaLabel,
  secondaryCta,
  trackingLocation,
}: {
  eyebrow: string;
  title: ReactNode;
  sub: string;
  primaryCtaLabel: string;
  secondaryCta?: { label: string; href: string };
  trackingLocation: string;
}) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <Aurora />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 -z-10 grid-bg mask-radial opacity-50" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono mx-auto mb-7 w-fit rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-accent"
        >
          {eyebrow}
        </motion.div>

        <h1 className="font-display mx-auto max-w-5xl text-balance text-center text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base text-white/65 md:text-lg"
        >
          {sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.3}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track("cta_click", { location: trackingLocation + ":hero", label: "book_free_audit" })
              }
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-base font-medium text-bg transition hover:bg-accent-soft"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {primaryCtaLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </Magnetic>
          {secondaryCta ? (
            <Magnetic strength={0.2}>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-base text-white/85 transition hover:bg-white/[0.06]"
              >
                {secondaryCta.label}
              </a>
            </Magnetic>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Who this is for ---------------- */

function WhoThisIsFor({ audience }: { audience: string[] }) {
  return (
    <section className="relative py-20">
      <div className="container">
        <FadeInUp>
          <div className="mb-8 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-balance text-3xl tracking-tight md:text-4xl">
              Who this is for
            </h2>
            <span className="font-mono hidden text-[11px] uppercase tracking-[0.22em] text-white/40 md:inline">
              fit check
            </span>
          </div>
        </FadeInUp>
        <div className="grid gap-3 md:grid-cols-3">
          {audience.map((a, i) => (
            <FadeInUp key={a} delay={i * 0.05}>
              <div className="glass flex h-full items-start gap-3 rounded-2xl p-5">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span className="text-sm text-white/85 md:text-base">{a}</span>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Deliverables ---------------- */

function Deliverables({ items }: { items: Deliverable[] }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <FadeInUp>
          <div className="mb-12 max-w-3xl">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              What we actually do
            </span>
            <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
              Six deliverables. None of them slideware.
            </h2>
            <p className="mt-4 text-white/65">
              Every line below ships as something you can hold, send to a board, or hand to an
              engineer. No advisory-only retainers.
            </p>
          </div>
        </FadeInUp>

        <ol className="grid gap-4 md:grid-cols-2">
          {items.map((d, i) => (
            <motion.li
              key={d.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.05 }}
              className="glass relative overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-accent">{d.n}</span>
                <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-white/55">
                  {d.chip}
                </span>
              </div>
              <h3 className="font-display mt-4 text-xl tracking-tight md:text-2xl">{d.title}</h3>
              <p className="mt-2 text-sm text-white/70 md:text-base">{d.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Timeline ---------------- */

function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <FadeInUp>
          <div className="mb-12 max-w-3xl">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              30 / 60 / 90
            </span>
            <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
              What the first 90 days look like.
            </h2>
          </div>
        </FadeInUp>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.range}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="glass relative flex flex-col gap-5 overflow-hidden rounded-2xl p-6"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {s.range}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-white/35">
                  phase {i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl tracking-tight">{s.title}</h3>
              <p className="text-sm text-white/65">{s.body}</p>
              <CurveSketch points={s.curve} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurveSketch({ points }: { points: number[] }) {
  const max = Math.max(...points, 1);
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 100 - (p / max) * 85 - 5;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const area = `${path} L100,100 L0,100 Z`;
  return (
    <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="mt-auto h-16 w-full">
      <defs>
        <linearGradient id="curve-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#C6FF3D" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C6FF3D" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#curve-g)" />
      <path d={path} fill="none" stroke="#C6FF3D" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* ---------------- Sample report wrapper ---------------- */

function SampleReportWrap({ children }: { children: ReactNode }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <FadeInUp>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
                Sample report
              </span>
              <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                What lands in your inbox on Monday.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-white/55">
              A single page. Movement, why, next. No vanity charts, no 60-slide decks.
            </p>
          </div>
        </FadeInUp>
        <Tilt intensity={3}>{children}</Tilt>
      </div>
    </section>
  );
}

/* ---------------- Proof row ---------------- */

function ProofRow({ cases }: { cases: CaseRef[] }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <FadeInUp>
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
                Proof
              </span>
              <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                What this looks like in the wild.
              </h2>
            </div>
          </div>
        </FadeInUp>

        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="font-display text-3xl tracking-tight text-accent md:text-4xl">
                {c.metric}
              </div>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/45">
                {c.metricLabel}
              </p>
              <h3 className="font-display mt-5 text-lg tracking-tight md:text-xl">{c.title}</h3>
              <p className="mt-3 text-sm text-white/65">{c.body}</p>
              <Link
                href={`/case-studies/${c.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/85 transition hover:text-accent"
              >
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <FadeInUp>
          <div className="mb-10 max-w-3xl">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              FAQ
            </span>
            <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
              The questions CMOs actually ask.
            </h2>
          </div>
        </FadeInUp>
        <div className="mx-auto max-w-3xl space-y-3">
          {items.map((it, i) => (
            <FAQRow key={it.q} item={it} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="glass overflow-hidden rounded-2xl"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 p-5 text-left md:p-6"
        aria-expanded={open}
      >
        <span className="font-display text-base tracking-tight md:text-lg">{item.q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 transition ${
            open ? "rotate-45 border-accent/60 text-accent" : "text-white/60"
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 0.65, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 text-sm text-white/70 md:px-6 md:pb-6 md:text-base">{item.a}</div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Final CTA ---------------- */

function FinalCTA({ copy, trackingLocation }: { copy: string; trackingLocation: string }) {
  return (
    <section className="relative py-24">
      <div className="container">
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
          <BorderBeam size={260} duration={14} />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
                Next step
              </span>
              <h2 className="font-display mt-5 text-balance text-3xl tracking-tight md:text-5xl">
                {copy}
              </h2>
            </div>
            <div className="flex md:justify-end">
              <Magnetic strength={0.3}>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    track("cta_click", { location: trackingLocation + ":final", label: "book_free_audit" })
                  }
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-4 text-base font-medium text-bg transition hover:bg-accent-soft"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Book a free audit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
