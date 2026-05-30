import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Aurora } from "@/components/ui/aurora";
import { Spotlight } from "@/components/ui/spotlight";
import { WordReveal, FadeInUp } from "@/components/ui/word-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { NewsletterSignup } from "@/components/ui/newsletter-signup";
import { ROLES, type Role } from "@/lib/roles";

export const metadata: Metadata = {
  title: "Careers | Momentus",
  description:
    "Small team. Compounding work. No bullshit. We hire roughly twice a year for GEO, Paid, Engineering, and Operations. Read everything before you apply.",
  openGraph: {
    title: "Careers | Momentus",
    description:
      "Small team. Compounding work. No bullshit. Open roles at a specialist GEO × Paid agency capped at twelve clients.",
    type: "website",
  },
};

const HIRING_EMAIL = "hiring@momentus.ai";

/**
 * Build a mailto: link with a proper subject + body template per role. We
 * URL-encode the body line-by-line so newlines survive (encodeURIComponent
 * turns "\n" into %0A, which mail clients honour). The body intentionally
 * mirrors what we ask candidates for in step 1 of the process.
 */
function applyHref(title: string): string {
  const subject = `Application - ${title}`;
  const body = [
    `Hi Viktor,`,
    ``,
    `I'd like to be considered for ${title}.`,
    ``,
    `Here's why: [one paragraph]`,
    ``,
    `Here's a thing I've shipped that I'm proud of: [link]`,
    ``,
    `Resume / portfolio / writing samples: [links]`,
  ].join("\n");
  return `mailto:${HIRING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const openApplicationHref = applyHref("Open application");

export default function CareersPage() {
  return (
    <>
      <Nav />
      <main className="pb-24">
        <Hero />
        <Premise />
        <CompNote />
        <RolesList />
        <Process />
        <WhatWeLookFor />
        <NewsletterCallout />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

/* ---------- 1. Hero ---------- */

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
      <Aurora />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 -z-10 grid-bg mask-radial opacity-40" />
      <div className="container relative max-w-5xl">
        <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="font-semibold tabular-nums">16</span>
          <span aria-hidden className="text-accent/55">/</span>
          <span>Careers</span>
        </span>
        <h1 className="font-display mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
          <WordReveal text="Small team. Compounding work. No bullshit." />
        </h1>
        <FadeInUp delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-pretty text-lg text-white/65 md:text-xl">
            We hire roughly twice a year. Each seat takes 6–12 months to fill
            because we won&apos;t fill a seat to fill a seat. If you&apos;re
            considering us, read everything below first.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------- 2. The premise ---------- */

const premise = [
  {
    h: "Why we're small by design.",
    body: "AI citation patterns compound for clients when the same strategists own the work for 6+ months. Junior-heavy agency models break the loop. We cap active clients at ~12 and pay senior compensation for senior thinking.",
  },
  {
    h: "What we actually do, day to day.",
    body: "A weekly Monday delta report per client. A bi-weekly editorial session inside our portfolio (someone walks through what they shipped, the rest of the team challenges it). One audit-call a week per strategist. Friday is heads-down — no internal meetings, no client calls.",
  },
  {
    h: "What we don't do.",
    body: "We don't have a “growth team” function separate from the work. We don't run hackathons or chase shiny tools. We don't promise we'll move 20× faster next quarter because we won't.",
  },
];

function Premise() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container max-w-3xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">01</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>The premise</span>
          </span>
          <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            How the place actually runs.
          </h2>
        </FadeInUp>

        <div className="mt-12 space-y-10">
          {premise.map((p, i) => (
            <FadeInUp key={p.h} delay={0.05 + i * 0.05}>
              <div className="border-l-2 border-accent/30 pl-6">
                <h3 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
                  {p.h}
                </h3>
                <p className="mt-3 text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                  {p.body}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Comp note ---------- */

function CompNote() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container max-w-3xl">
        <FadeInUp>
          <div className="glass relative overflow-hidden rounded-3xl p-7 md:p-9">
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                On comp
              </p>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/85 md:text-lg">
                Senior comp, transparent. We share comp bands inside the team
                and with serious candidates from the first call. Roles below
                have starting bands in the spec; final number depends on what
                you bring. Equity for the first 10 hires.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------- 4. Roles list ---------- */

function statusClasses(status: Role["status"]): string {
  switch (status) {
    case "Open":
      return "border-accent text-accent";
    case "Hiring soon":
      return "border-accent/40 bg-accent/10 text-accent";
    case "Always open":
    default:
      return "border-white/15 text-white/55";
  }
}

function RoleRow({ role }: { role: Role }) {
  const href = applyHref(role.title);
  return (
    <a
      href={href}
      className="glass group relative block overflow-hidden rounded-2xl p-6 transition hover:border-accent/30 md:p-7"
    >
      <div className="grid gap-6 md:grid-cols-[1.4fr_2fr_auto] md:items-center">
        {/* Left: title + meta chips */}
        <div>
          <h3 className="font-display text-2xl font-medium tracking-tight text-white md:text-2xl">
            {role.title}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            <li className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
              {role.team}
            </li>
            <li className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
              {role.location}
            </li>
            <li className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
              {role.type}
            </li>
          </ul>
        </div>

        {/* Middle: one-liner */}
        <p className="text-pretty text-sm text-white/70 md:text-base">
          {role.oneLiner}
        </p>

        {/* Right: status + apply */}
        <div className="flex items-center gap-4 md:justify-end">
          <span
            className={`font-mono inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${statusClasses(role.status)}`}
          >
            {role.status}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition group-hover:bg-accent-soft">
            Apply
            <svg
              width="12"
              height="12"
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
    </a>
  );
}

function RolesList() {
  return (
    <section id="roles" className="relative py-20 md:py-24">
      <div className="container max-w-5xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">02</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>Open roles</span>
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Five seats. Real ones.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Click a role to open a templated email. We read every application
            — usually within 48 hours.
          </p>
        </FadeInUp>

        <div className="mt-12 flex flex-col gap-3">
          {ROLES.map((r, i) => (
            <FadeInUp key={r.slug} delay={Math.min(0.4, 0.04 * i)}>
              <RoleRow role={r} />
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Process ---------- */

const steps = [
  {
    n: "01",
    title: "Intro call",
    body: "30 minutes with Viktor. We talk about what you've shipped, what you want to ship next, and whether the shape of the job matches the shape of your week.",
  },
  {
    n: "02",
    title: "Take-home (paid)",
    body: "A real piece of work scoped to 2–4 hours of your time, max. We pay for it. We don't extract free strategy decks from candidates.",
  },
  {
    n: "03",
    title: "Panel call",
    body: "60 minutes with two future teammates. They run it. They challenge your take-home, you challenge our assumptions back. We're hiring for argument quality.",
  },
  {
    n: "04",
    title: "Reference calls + offer",
    body: "Three references on our side, two on yours. Comp is on the table from call one — the offer step is paperwork, not negotiation theater.",
  },
];

function Process() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container max-w-4xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">03</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>Process</span>
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Four steps. Two to three weeks.
          </h2>
        </FadeInUp>

        <ol className="mt-12 space-y-6">
          {steps.map((s, i) => (
            <FadeInUp key={s.n} delay={0.05 + i * 0.05}>
              <li className="grid gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-7">
                <div className="font-mono text-3xl uppercase tracking-[0.14em] text-accent md:text-4xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-white md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-white/70 md:text-base">
                    {s.body}
                  </p>
                </div>
              </li>
            </FadeInUp>
          ))}
        </ol>

        <FadeInUp delay={0.3}>
          <p className="font-mono mt-8 text-[11px] uppercase tracking-[0.2em] text-white/45">
            Total wall-clock: 2–3 weeks
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------- 6. What we look for ---------- */

const lookFor = [
  "Range over depth-of-one — you've shipped in 2+ disciplines.",
  "A track record of telling clients “no”.",
  "Specific opinions about your craft (you've changed your mind about something out loud).",
  "Comfort with weekly transparency.",
  "A real reason to be here that isn't “next career step”.",
];

function WhatWeLookFor() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container max-w-3xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">04</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>What we look for</span>
          </span>
          <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Five signals we weight more than a résumé.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="glass mt-10 rounded-3xl p-7 md:p-9">
            <ul className="space-y-5">
              {lookFor.map((item, i) => (
                <li key={i} className="flex gap-4 text-base leading-relaxed text-white/85 md:text-lg">
                  <span
                    aria-hidden
                    className="font-mono mt-1.5 text-[11px] tabular-nums text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------- 7. Newsletter callout ---------- */

function NewsletterCallout() {
  return (
    <section className="relative py-16">
      <div className="container max-w-4xl">
        <FadeInUp>
          <NewsletterSignup variant="careers" source="careers" />
        </FadeInUp>
      </div>
    </section>
  );
}

/* ---------- 8. Closing CTA ---------- */

function ClosingCTA() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container max-w-4xl">
        <FadeInUp>
          <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 mask-radial" />

            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="font-display text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl">
                  Two ways in.
                </h2>
                <p className="mt-3 text-pretty text-base text-white/65 md:text-lg">
                  Pick the one that fits where you are.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Magnetic strength={0.25}>
                  <Link
                    href="#roles"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
                  >
                    Apply for a specific role
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
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href={openApplicationHref}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    Send an open application
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
                </Magnetic>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
