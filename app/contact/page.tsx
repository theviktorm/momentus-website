import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Aurora } from "@/components/ui/aurora";
import { Spotlight } from "@/components/ui/spotlight";
import { WordReveal, FadeInUp } from "@/components/ui/word-reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { CALENDLY_URL } from "@/lib/config";
import { BriefForm } from "./brief-form";

export const metadata: Metadata = {
  title: "Contact | Momentus",
  description:
    "Book an audit call, send a brief, or call us directly. Real humans, EU + US, replying within hours.",
};

const phones = [
  { region: "Northern EU", number: "+421 917 301 868" },
  { region: "Southern EU", number: "+36 30 178 3642" },
  { region: "US", number: "+1 484 983 8442" },
];

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="pb-24">
        <Hero />
        <ThreeColumns />
        <PrivacyPromise />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pb-12 pt-36 md:pt-44">
      <Aurora />
      <Spotlight className="-top-40 left-1/2 -translate-x-1/2" />
      <div className="absolute inset-0 -z-10 grid-bg mask-radial opacity-40" />
      <div className="container relative max-w-4xl">
        <span className="font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
          <span className="font-semibold tabular-nums">15</span>
          <span aria-hidden className="text-accent/55">/</span>
          <span>Contact</span>
        </span>
        <h1 className="font-display mt-6 max-w-3xl text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
          <WordReveal text="Three ways in. Real humans on the other end." />
        </h1>
        <FadeInUp delay={0.3}>
          <p className="mt-8 max-w-2xl text-pretty text-lg text-white/65 md:text-xl">
            Pick the route that fits where you are. We reply by end of next business day —
            usually sooner.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}

function ThreeColumns() {
  return (
    <section className="relative py-20">
      <div className="container">
        <div className="grid gap-6 lg:grid-cols-3">
          <AuditCall />
          <BriefColumn />
          <DirectLines />
        </div>
      </div>
    </section>
  );
}

function AuditCall() {
  return (
    <FadeInUp>
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 md:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          Audit call · 30 minutes
        </span>
        <h2 className="font-display mt-4 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Where you stand, on the call.
        </h2>
        <p className="mt-4 flex-1 text-pretty text-base text-white/70">
          Where you stand in AI recommendations today, who AI already treats as default in your
          space, and what it would take for you to be one of them. Then the honest answer: yes,
          no, or here's the thing to fix first.
        </p>
        <div className="mt-8">
          <Magnetic strength={0.25}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
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
          <p className="mt-3 text-xs text-white/45">
            You hear back within hours. Not days.
          </p>
        </div>
      </div>
    </FadeInUp>
  );
}

function BriefColumn() {
  return (
    <FadeInUp delay={0.05}>
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 md:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
          Or — send us a brief
        </span>
        <h2 className="font-display mt-4 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Tell us where you are.
        </h2>
        <p className="mt-4 text-pretty text-base text-white/70">
          Where you are and what would make the next 90 days a clear win. We respond by end of
          next business day.
        </p>
        <div className="mt-6">
          <BriefForm />
        </div>
      </div>
    </FadeInUp>
  );
}

function DirectLines() {
  return (
    <FadeInUp delay={0.1}>
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 md:p-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
          Or — call us
        </span>
        <h2 className="font-display mt-4 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
          Direct lines.
        </h2>
        <ul className="mt-6 space-y-4">
          {phones.map((p) => (
            <li
              key={p.number}
              className="flex items-center justify-between gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                {p.region}
              </span>
              <a
                href={`tel:${p.number.replace(/\s+/g, "")}`}
                className="font-display text-lg font-medium tracking-tight text-white transition hover:text-accent"
              >
                {p.number}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 border-t border-white/8 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Email</p>
          <a
            href="mailto:viktor@momentus.ai"
            className="font-display mt-1 inline-block text-lg font-medium tracking-tight text-white transition hover:text-accent"
          >
            viktor@momentus.ai
          </a>
        </div>
        <p className="mt-auto pt-6 text-xs text-white/45">
          EU business hours, unless we're stuck on a fire for a client.
        </p>
      </div>
    </FadeInUp>
  );
}

function PrivacyPromise() {
  return (
    <section className="relative py-16">
      <div className="container">
        <p className="mx-auto max-w-2xl text-center text-sm text-white/55">
          We don't sell your data. We don't subscribe you to anything. If you go quiet, we go
          quiet.
        </p>
      </div>
    </section>
  );
}
