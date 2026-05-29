"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { BorderBeam } from "./ui/border-beam";
import { CALENDLY_URL } from "@/lib/config";
import { SectionEyebrow } from "./ui/section-eyebrow";

const services = [
  {
    title: "AI Visibility (GEO)",
    body: "Engineer how ChatGPT, Perplexity, Gemini and AI search interpret your brand. Separate signal layers per system, not one generic strategy.",
    bullets: ["Entity & schema engineering", "Per-platform signal stacks", "Citation reverse-engineering"],
    span: "md:col-span-2 md:row-span-2",
    visual: "geo",
    href: "/services/geo",
  },
  {
    title: "Paid that compounds",
    body: "Paid built to harvest AI-warmed demand. Higher CTR, lower CPC, conversions that convert because trust pre-existed.",
    bullets: ["Search & social paid", "Brand-search capture", "Quality Score engineering"],
    span: "md:col-span-2",
    visual: "paid",
    href: "/services/paid",
  },
  {
    title: "Total presence control",
    body: "Website, content, social, YouTube. One coherent, verifiable version of your brand everywhere AI looks.",
    bullets: ["Web & content systems", "Social signal alignment", "YouTube/video for AI"],
    span: "md:col-span-1",
    visual: "presence",
    href: "/services/geo-x-paid",
  },
  {
    title: "Proprietary tooling",
    body: "Internal tools that surface gaps, test AI perception in real time, and accelerate trust signals beyond traditional GEO timelines.",
    bullets: ["AI perception testing", "Citation tracking", "Real-time gap surfacing"],
    span: "md:col-span-1",
    visual: "tools",
    href: "/services/geo-x-paid",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="container">
        <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <SectionEyebrow id="services" />
            <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              Engineered for the answer engines.
            </h2>
          </div>
          <p className="max-w-md text-white/60">
            Four layers, run together. We do not give recommendations and walk away. We own the surface AI looks at.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`group relative ${s.span}`}
            >
              <Link
                href={s.href}
                className="glass relative block h-full overflow-hidden rounded-2xl p-7 transition hover:border-accent/40"
              >
                {i === 0 && <BorderBeam size={300} duration={14} />}
                <div className="relative z-10 flex h-full flex-col">
                  <Visual kind={s.visual} />
                  <h3 className="font-display mt-6 text-2xl tracking-tight md:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-white/65">{s.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70">
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm text-white/85 transition group-hover:text-accent">
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg transition hover:bg-accent-soft"
          >
            Book a free call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

function Visual({ kind }: { kind: string }) {
  if (kind === "geo") {
    return (
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-black/30 ring-line">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative grid h-full grid-cols-3 gap-2 p-4">
          {["ChatGPT", "Perplexity", "Gemini"].map((p, i) => (
            <div key={p} className="flex flex-col justify-between rounded-lg border border-white/10 bg-bg/60 p-3">
              <span className="text-[10px] uppercase tracking-widest text-white/40">{p}</span>
              <div className="space-y-1">
                <Bar value={[92, 78, 84][i]} />
                <span className="text-xs text-accent">#{i === 0 ? 1 : i === 1 ? 2 : 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "paid") {
    return (
      <div className="relative h-32 w-full overflow-hidden rounded-xl bg-black/30 ring-line">
        <div className="absolute inset-x-0 bottom-0 flex h-full items-end justify-around gap-2 p-4">
          {[40, 55, 35, 70, 50, 85, 65, 95].map((h, i) => (
            <div key={i} className="w-3 rounded-t bg-gradient-to-t from-accent/80 to-accent/30" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "presence") {
    return (
      <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black/30 ring-line">
        <div className="absolute inset-0 grid grid-cols-4 gap-1 p-2">
          {["Web", "YT", "Social", "Docs"].map((l) => (
            <div key={l} className="grid place-items-center rounded bg-white/5 text-[10px] uppercase tracking-widest text-white/55">
              {l}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-xl bg-black/30 ring-line">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="font-mono text-xs text-accent">{`> probe('chatgpt'): rank #1`}</div>
      </div>
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <div className="h-full rounded-full bg-accent" style={{ width: `${value}%` }} />
    </div>
  );
}
