import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Aurora } from "@/components/ui/aurora";
import { Spotlight } from "@/components/ui/spotlight";
import { WordReveal, FadeInUp } from "@/components/ui/word-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { ValueCard } from "@/components/ui/value-card";
import { TeamCard } from "@/components/ui/team-card";
import { PendingPill } from "@/components/ui/pending-pill";
import { TEAM } from "@/lib/team";
import { CALENDLY_URL } from "@/lib/config";
import { FounderSignature } from "./signature";

export const metadata: Metadata = {
  title: "About | Momentus",
  description:
    "Momentus is a specialist GEO × Paid agency built for one job: making your brand the default AI recommends, then capturing the demand that creates.",
};

const values = [
  {
    headline: "We don't sell SEO in new clothes.",
    body: "GEO is a different surface, with different signals, on a different timeline. If an agency tells you it's \"just SEO for AI\" — they don't know.",
  },
  {
    headline: "We say no.",
    body: "About 40% of audit calls end with us telling the prospect this isn't their lever right now. If we can't move you, the engagement won't pay back the spend.",
  },
  {
    headline: "Capacity is a feature, not a constraint.",
    body: "Twelve active clients, max. Default-brand status doesn't compound when the team's stretched thin.",
  },
  {
    headline: "Weekly transparency, not quarterly theater.",
    body: "Monday delta reports. If you reach out, you hear back within hours. If we don't move a metric, we say why.",
  },
  {
    headline: "Compounding over campaigns.",
    body: "AI citation patterns reward consistency over months, not bursts over weeks. We design for the second half of the year, not the first thirty days.",
  },
];

const turnDowns = [
  "Pre-product-market-fit brands — we can't move what isn't yet a category.",
  "Brands with a single legal or regulatory query barrier — we won't fight that uphill.",
  "Buyers shopping the lowest quote — the math doesn't pay back for us.",
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pb-24">
        <Hero />
        <FounderNote />
        <Values />
        <Team />
        <WhereWeWork />
        <TurnDowns />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pt-44">
      <Aurora />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 -z-10 grid-bg mask-radial opacity-40" />
      <div className="container relative max-w-5xl">
        <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="font-semibold tabular-nums">10</span>
          <span aria-hidden className="text-accent/55">/</span>
          <span>About</span>
        </span>
        <h1 className="font-display mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
          <WordReveal text="We're the team you call when AI decides who wins your category." />
        </h1>
        <FadeInUp delay={0.3} className="mt-8 max-w-2xl">
          <p className="text-pretty text-lg text-white/65 md:text-xl">
            Momentus is a specialist GEO × Paid agency built for one job: making your brand the
            default AI recommends, then capturing the demand that creates.
          </p>
          <p className="mt-3 text-pretty text-lg text-white/65 md:text-xl">
            We don't do everything. We do this.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="relative py-24">
      <div className="container max-w-3xl">
        <FadeInUp>
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
            A note from the founder
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.05}>
          <div className="mt-10 flex items-center gap-5">
            <div className="relative">
              <div
                aria-hidden
                className="h-20 w-20 rounded-full ring-line"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(198,255,61,0.25), transparent 60%), linear-gradient(160deg, #1a1a22, #0b0b12)",
                }}
              />
              <PendingPill
                label="founder photo"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
              />
            </div>
            <div>
              <p className="font-display text-lg font-medium tracking-tight text-white">
                Viktor Mozsa
              </p>
              <p className="text-xs text-white/55">Founder &amp; CEO · Central EU</p>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="prose prose-invert mt-10 max-w-none space-y-6 text-pretty text-base leading-relaxed text-white/80 md:text-lg">
            <p>
              Every agency I worked with before Momentus treated GEO and Paid as separate
              disciplines — two teams, two reporting decks, two sets of incentives that quietly
              pulled in opposite directions. They aren't separate. The compounding loop only
              closes when both halves are run by the same team, looking at the same dashboard,
              with one person accountable for the outcome.
            </p>
            <p>
              We work with $5M–$500M brands where the buyer journey starts with research. The
              kind of company whose CMO can't explain to their board why every AI assistant
              recommends a competitor by name. If that's the shape of your problem, we can
              probably help. If it isn't, we'll tell you on the audit call.
            </p>
            <p>
              We don't sell SEO with new clothes on. We don't promise a number-one slot. We don't
              take on clients we can't move inside ninety days. And we say no when the lever
              isn't there — saying no is the most expensive thing an agency can do, and it's
              also the only honest one.
            </p>
            <p>
              Twelve active clients is the cap. One senior strategist per account, named on day
              one. Weekly transparent reporting, no quarterly theater. NDA on everything we
              don't publish. That's the entire operating model — boring on purpose, because the
              second half of the year is where the math compounds.
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/8 pt-8">
            <FounderSignature />
            <p className="font-display mt-2 text-base font-medium text-white">Viktor Mozsa</p>
            <p className="text-xs text-white/55">Founder &amp; CEO</p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="relative py-24">
      <div className="container max-w-5xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">11</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>Positions</span>
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Five positions we won't move on.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            Every agency has a deck of values. Most of them read like a horoscope. These are the
            five we'll lose business over.
          </p>
        </FadeInUp>

        <div className="mt-12 flex flex-col gap-4">
          {values.map((v, i) => (
            <ValueCard key={v.headline} index={i + 1} headline={v.headline} body={v.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="relative py-24">
      <div className="container max-w-6xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">12</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>Team</span>
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Who you'll work with.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
            One senior strategist per account. The rest of the team is small by design — open
            seats are real seats, not headcount theater.
          </p>
        </FadeInUp>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhereWeWork() {
  const chips = [
    { region: "Central EU", city: "Bratislava" },
    { region: "Southern EU", city: "Budapest" },
    { region: "US", city: "East Coast" },
  ];
  return (
    <section className="relative py-24">
      <div className="container max-w-4xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">13</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>Where</span>
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Where we work.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {chips.map((c) => (
              <li
                key={c.region}
                className="glass inline-flex items-center gap-3 rounded-full px-5 py-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  {c.region}
                </span>
                <span className="text-sm text-white/85">{c.city}</span>
                <PendingPill label="confirm city" />
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-xl text-sm text-white/55">
            Hybrid by design. Weekly client calls on your timezone, not ours.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

function TurnDowns() {
  return (
    <section className="relative py-24">
      <div className="container max-w-3xl">
        <FadeInUp>
          <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            <span className="font-semibold tabular-nums">14</span>
            <span aria-hidden className="text-accent/55">/</span>
            <span>No-fit</span>
          </span>
          <h2 className="font-display mt-6 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">
            Why we turn down work.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <ul className="mt-10 space-y-4">
            {turnDowns.map((t) => (
              <li
                key={t}
                className="flex gap-4 rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4 text-base text-white/80"
              >
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </FadeInUp>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="relative py-24">
      <div className="container max-w-4xl">
        <FadeInUp>
          <div className="glass relative overflow-hidden rounded-3xl p-8 text-center md:p-14">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 mask-radial" />

            <div className="relative">
              <h2 className="font-display text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
                Want to talk?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/65 md:text-lg">
                Audit call or written brief — either route gets a real human on the other end
                inside one business day.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Magnetic strength={0.3}>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-base font-medium text-bg transition hover:bg-accent-soft"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    Book a free call
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-base text-white/85 transition hover:bg-white/[0.06]"
                  >
                    Send us a brief
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
