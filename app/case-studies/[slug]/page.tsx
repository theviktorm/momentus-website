import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CASE_STUDIES,
  getCaseStudy,
  getRelatedCaseStudies,
  type CaseStudy,
} from "@/lib/case-studies";
import { CALENDLY_URL } from "@/lib/config";
import { Aurora } from "@/components/ui/aurora";
import { CaseStudyLayout } from "../_components/CaseStudyLayout";
import { MetricBlock } from "../_components/MetricBlock";
import { TimelineGate } from "../_components/TimelineGate";
import { QuoteBlock } from "../_components/QuoteBlock";
import { PendingPill } from "../_components/PendingPill";

/** Statically pre-render every known case study slug. */
export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(study.slug, 2);
  const showQuote = study.quote !== undefined;
  const quotePending = study.pending.includes("quote");

  return (
    <CaseStudyLayout>
      {/* ────────────────────────────── 1. Hero ──────────────────────────────
       *
       * Full-bleed dark band with the Aurora background gradient subtle in
       * the back. Massive headline metric is the visual anchor.
       */}
      <section className="relative isolate overflow-hidden pb-24 md:pb-40">
        <Aurora className="opacity-50" />
        <div className="container max-w-6xl relative">
          <span className="font-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-accent">
            Case study
            <span aria-hidden className="text-accent/40">·</span>
            <span className="text-white/55">{study.vertical}</span>
            <span aria-hidden className="text-accent/40">·</span>
            <span className="text-white/55">{study.region}</span>
          </span>

          <h1 className="font-display mt-6 max-w-4xl text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-white">{study.brand}</span>
            <span className="text-white/45"> — {study.thesis}</span>
          </h1>

          {/* HUGE headline metric */}
          <div className="mt-16 md:mt-24">
            <div className="text-shimmer font-display block text-balance text-[88px] font-medium leading-[0.9] tracking-tighter md:text-[160px] lg:text-[180px]">
              {study.headline.metric}
            </div>
            <div className="font-mono mt-4 text-sm uppercase tracking-[0.22em] text-white/55 md:text-base">
              {study.headline.label}
            </div>
          </div>

          {/* Result chips */}
          <ul className="mt-12 flex flex-wrap gap-2">
            {study.chips.map((chip) => (
              <li
                key={chip}
                className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70"
              >
                {chip}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
            >
              Book a call
              <span className="text-bg/55">·</span>
              <span className="text-bg/75">{study.duration}</span>
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
            </a>
            <a
              href="#framework"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:border-accent hover:text-accent"
            >
              Read the framework
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────────────────── 2. 30-day signals ────────────────────────────── */}
      <section className="container max-w-6xl">
        <SectionEyebrow num="01" label="30-day signals" />
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          {study.signals_30d.map((s, i) => (
            <MetricBlock
              key={`${s.metric}-${i}`}
              metric={s.metric}
              label={s.label}
              tone={i === 0 ? "shimmer" : "accent"}
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────── 3. Challenge ────────────────────────────── */}
      <section className="container max-w-6xl mt-32 md:mt-40">
        <SectionEyebrow num="01" label="The challenge" />
        <ChallengeBody text={study.challenge} />
      </section>

      {/* Temporal context strip */}
      <section className="container max-w-5xl mt-24 md:mt-28">
        <TimelineGate duration={study.duration} />
      </section>

      {/* ────────────────────────────── 4. Approach ────────────────────────────── */}
      <section className="container max-w-5xl mt-24 md:mt-32">
        <SectionEyebrow num="02" label="What we did" />
        <ol className="mt-12 space-y-8 md:space-y-10">
          {study.approach.map((step, i) => (
            <ApproachStep key={i} index={i + 1} text={step} />
          ))}
        </ol>
      </section>

      {/* ────────────────────────────── 5. Outcomes ────────────────────────────── */}
      <section className="container max-w-6xl mt-32 md:mt-40">
        <SectionEyebrow num="03" label={`${study.duration} outcomes`} />
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          {study.outcomes_90d.map((o, i) => (
            <MetricBlock
              key={`${o.metric}-${i}`}
              metric={o.metric}
              label={o.label}
              tone={i === 0 ? "shimmer" : "accent"}
            />
          ))}
        </div>
      </section>

      {/* ────────────────────────────── 6. Quote ────────────────────────────── */}
      <section className="container max-w-5xl mt-32 md:mt-40">
        {showQuote && study.quote ? (
          <QuoteBlock text={study.quote.text} role={study.quote.role} />
        ) : (
          <div className="mx-auto max-w-3xl">
            <PendingPill
              variant="block"
              label="Client quote pending publication approval"
            />
            <p className="mt-3 text-center text-xs text-white/40">
              We don&apos;t publish what we can&apos;t verify with the client.{" "}
              {quotePending ? "This will fill in when they sign off." : ""}
            </p>
          </div>
        )}
      </section>

      {/* ────────────────────────────── 7. Framework ────────────────────────────── */}
      <section id="framework" className="container mt-32 max-w-3xl md:mt-40">
        <SectionEyebrow num="04" label="The reusable framework" />
        <p
          className="font-display mt-10 text-balance text-2xl font-medium leading-[1.35] tracking-tight text-white/85 md:text-3xl"
          style={{ maxWidth: "65ch" }}
        >
          {study.framework}
        </p>
      </section>

      {/* ────────────────────────────── 8. Related ────────────────────────────── */}
      <section className="container max-w-6xl mt-32 md:mt-40">
        <div className="flex items-end justify-between gap-4">
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            More cases
          </span>
          <Link
            href="/case-studies"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 transition hover:text-accent"
          >
            View all →
          </Link>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/case-studies/${r.slug}`}
                className="glass group block rounded-2xl p-6 transition-colors hover:bg-white/[0.04]"
              >
                <div className="font-display text-3xl tracking-tight text-accent md:text-4xl">
                  {r.headline.metric}
                </div>
                <div className="mt-1 text-sm uppercase tracking-widest text-white/45">
                  {r.headline.label}
                </div>
                <div className="font-display mt-5 text-balance text-xl tracking-tight md:text-2xl">
                  {r.brand} — <span className="text-white/55">{r.vertical}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-white transition group-hover:text-accent">
                  Read the case
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ────────────────────────────── 9. Final CTA ────────────────────────────── */}
      <section className="container max-w-4xl mt-32 md:mt-40">
        <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
          />
          <h2 className="font-display text-balance text-3xl font-medium tracking-tight md:text-5xl">
            Want this for your category?
          </h2>
          <p className="mt-4 max-w-2xl text-balance text-white/65 md:text-lg">
            30-minute audit. We tell you what&apos;s possible in 90 days for your
            brand — or the honest answer that this isn&apos;t your lever.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
          >
            Book a free call
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

/** Numbered editorial eyebrow used between sections of a case study detail. */
function SectionEyebrow({ num, label }: { num: string; label: string }) {
  return (
    <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
      <span className="font-semibold tabular-nums text-accent">{num}</span>
      <span aria-hidden className="text-accent/55">/</span>
      <span>{label}</span>
    </span>
  );
}

/**
 * Two-column editorial layout for the challenge.
 *   - Desktop: lead paragraph left column, remaining paragraphs right column.
 *   - Mobile: collapses to a single readable column.
 */
function ChallengeBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/);
  const [lead, ...rest] = paragraphs;
  return (
    <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
      <p className="font-display text-balance text-2xl font-medium leading-[1.3] tracking-tight text-white/90 md:text-3xl">
        {lead}
      </p>
      <div className="space-y-5 text-white/70 md:text-lg md:leading-relaxed">
        {rest.length === 0 ? (
          <p>&nbsp;</p>
        ) : (
          rest.map((p, i) => <p key={i}>{p}</p>)
        )}
      </div>
    </div>
  );
}

/**
 * One numbered step. Editorial — bigger spacing, fewer animations than the
 * homepage process timeline. Pending placeholders inside the text are
 * promoted to a visible PendingPill so the reader can't miss them.
 */
function ApproachStep({ index, text }: { index: number; text: string }) {
  const pendingMatch = text.includes("[Pending client approval]");
  const cleaned = pendingMatch
    ? text.replace(/\[Pending client approval\]/g, "").trimEnd().replace(/[:\s]+$/, "")
    : text;
  return (
    <li className="grid gap-6 md:grid-cols-[80px_1fr] md:gap-10">
      <div className="flex md:justify-end">
        <span className="font-display text-3xl font-medium leading-none tracking-tight text-accent md:text-5xl">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="border-l border-white/8 pl-6 md:border-l-0 md:pl-0">
        <p className="text-balance text-base text-white/80 md:text-lg md:leading-relaxed">
          {cleaned}
          {pendingMatch ? <span className="ml-2 align-middle inline-block"><PendingPill /></span> : null}
        </p>
      </div>
    </li>
  );
}

/** Disable runtime fallback — any unknown slug 404s. */
export const dynamicParams = false;
