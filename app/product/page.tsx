import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";
import { DashboardMock } from "../walkthrough/_components/DashboardMock";

export const metadata: Metadata = {
  title: "Product — the dashboard that watches the AIs that watch your brand | Momentus",
  description:
    "Every Momentus engagement runs on the same platform we built for ourselves. CSV in, visibility deltas out, alerts when competitors move, share-link dashboards for your CMO.",
};

const FEATURES = [
  {
    title: "Import",
    one: "Drop a Peec CSV or connect via API. Format auto-detects — prompt-level or URL-citation.",
    glyph: "↓",
  },
  {
    title: "Track",
    one: "Every prompt observation, every brand mention, every citation. Workspace-scoped, sentiment normalized.",
    glyph: "▦",
  },
  {
    title: "Alert",
    one: "Visibility drops, new competitors, sentiment flips, platform changes. Slack + email + webhooks.",
    glyph: "◉",
  },
  {
    title: "Share",
    one: "Read-only client share links. Per-workspace branding. No login. View count tracked.",
    glyph: "→",
  },
];

const ENGINES = [
  ["Insights", "Surfaces this-week-vs-last anomalies."],
  ["Prompt Tracker", "Citation lift per prompt over time."],
  ["Attack Map", "Competitor capability matrix."],
  ["Authority Score", "Domain-weighted citation ranking."],
  ["Citation Intelligence", "What each cited URL says about us."],
  ["Buyer Journey", "Prompt-stage classification by intent."],
  ["Revenue Priority", "Recommendations ranked by ARR impact."],
  ["Schema Engine", "Schema markup audit per page."],
  ["Reddit Engine", "Reddit-source citation analysis."],
  ["AI Overview", "Google AI Overview specific tracking."],
  ["Prompt Reclassify", "Re-categorize prompts as buyer intent shifts."],
] as const;

export default function ProductPage() {
  return (
    <>
      <Nav />
      <main className="pt-36 md:pt-44">
        {/* Hero */}
        <section className="container">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              13 / The product
            </span>
            <h1 className="font-display mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
              The dashboard that watches the AIs that watch your brand.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-white/65 md:text-lg">
              Every Momentus engagement runs on the same platform we built for ourselves. CSV in, visibility deltas out,
              alerts when competitors move, share-link dashboards for your CMO.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/walkthrough"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
              >
                Take the 3-minute tour
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm text-white/85 transition hover:bg-white/[0.06]"
              >
                Book a free call
              </a>
            </div>
          </div>

          {/* Hero mock */}
          <div className="relative mx-auto mt-16 max-w-6xl">
            <div className="absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-b from-accent/30 to-transparent blur-2xl" />
            <div className="aspect-[16/10] overflow-hidden rounded-2xl glass">
              <DashboardMock workspace="Momentus · Batz Hungary" activeNav="overview">
                <div className="grid h-full grid-cols-3 gap-3 p-4">
                  <div className="glass rounded-xl p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                      AI Visibility Score
                    </div>
                    <div className="font-display mt-2 text-5xl tracking-tight text-accent">87</div>
                    <div className="mt-1 text-xs text-white/55">Dominant in category</div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                      Citations · 30d
                    </div>
                    <div className="mt-3 space-y-1.5 text-sm">
                      <div className="flex justify-between"><span>ChatGPT</span><span className="text-accent">1,284</span></div>
                      <div className="flex justify-between"><span>Perplexity</span><span className="text-accent">692</span></div>
                      <div className="flex justify-between"><span>Gemini</span><span className="text-accent">418</span></div>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                      Alerts · open
                    </div>
                    <div className="mt-2 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2"><span className="text-red-400">●</span>Visibility drop on Perplexity</div>
                      <div className="flex items-center gap-2"><span className="text-amber-300">●</span>New competitor: Acme</div>
                    </div>
                  </div>
                </div>
              </DashboardMock>
            </div>
          </div>
        </section>

        {/* What it does */}
        <section className="container mt-32">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              What it does
            </span>
            <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              Four loops. One platform.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <article key={f.title} className="glass rounded-2xl p-7">
                <div className="font-display grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-2xl text-accent">
                  {f.glyph}
                </div>
                <h3 className="font-display mt-5 text-2xl tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm text-white/65">{f.one}</p>
              </article>
            ))}
          </div>
        </section>

        {/* What it isn't */}
        <section className="container mt-32">
          <div className="glass mx-auto max-w-3xl rounded-3xl p-8 md:p-12">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">What this isn&apos;t.</h2>
            <ul className="mt-8 space-y-5 text-pretty">
              {[
                "It isn't another analytics dashboard for vanity charts.",
                "It isn't a Slack bot that pings you 40 times a day.",
                "It isn't a black box. Every signal is traceable to the prompt that generated it.",
              ].map((line) => (
                <li key={line} className="flex gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="text-lg text-white/80 md:text-xl">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Engines */}
        <section className="container mt-32">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              Under the hood
            </span>
            <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              Eleven engines fire automatically on every import.
            </h2>
            <p className="mt-5 text-white/65">
              Inline, background, or scheduled — each engine has its own trigger, its own log, and its own
              traceable result. Re-run any of them on demand.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {ENGINES.map(([name, body]) => (
              <article
                key={name}
                className="glass relative flex flex-col gap-2 rounded-2xl p-5 transition hover:border-accent/30"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg tracking-tight">{name}</h3>
                  <span className="font-mono rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-accent">
                    Auto
                  </span>
                </div>
                <p className="text-sm text-white/65">{body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mt-32">
          <div className="glass mx-auto max-w-3xl rounded-3xl p-8 text-center md:p-14">
            <h2 className="font-display text-balance text-3xl tracking-tight md:text-5xl">
              Want a tour you can scroll through?
            </h2>
            <p className="mt-5 text-white/65 md:text-lg">
              Five scenes, three minutes, zero meetings. Or skip straight to a real audit on your data.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/walkthrough"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
              >
                Take the tour
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/85 transition hover:bg-white/[0.06]"
              >
                Book a free call
              </a>
            </div>
          </div>
        </section>
        <div className="h-32" />
      </main>
      <Footer />
    </>
  );
}
