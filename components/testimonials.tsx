"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionEyebrow } from "./ui/section-eyebrow";

interface T {
  type: "quote" | "video";
  quote?: string;
  videoTitle?: string;
  name: string;
  role: string;
  initials: string;
  span?: string;
}

/**
 * Bento testimonials. The big slot is a VIDEO card (placeholder thumbnail
 * with play overlay) — swap with real client video when you have it.
 */
const items: T[] = [
  {
    type: "video",
    videoTitle: "How we became the default brand AI recommends",
    name: "Director of Growth",
    role: "DTC footwear · €40M",
    initials: "DG",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    type: "quote",
    quote: "Our CPC dropped 41% the same quarter our citation share doubled. The flywheel is real.",
    name: "VP Marketing",
    role: "B2B SaaS · $80M ARR",
    initials: "VM",
  },
  {
    type: "quote",
    quote: "I stopped explaining \"AI search\" to the board. The board now asks me about it.",
    name: "CMO",
    role: "Healthtech · Series C",
    initials: "CM",
  },
  {
    type: "quote",
    quote:
      "What I appreciate most is the discipline. They turn down work and they say no when it's not the right move.",
    name: "Founder & CEO",
    role: "Fintech · Pre-IPO",
    initials: "FC",
    span: "md:col-span-2",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="container">
        <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <SectionEyebrow id="operators" label="Operators talking" />
            <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              The people who actually own the number.
            </h2>
          </div>
          <p className="max-w-sm text-white/60">
            Direct quotes from CMOs, VPs and founders inside our portfolio. We do not run testimonial farms.
            Our clients are private; titles and segments are real.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {items.map((t, i) => (
            <motion.div
              key={t.name + i}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 0.65, 0.2, 1] }}
              className={`glass group relative overflow-hidden rounded-2xl transition ${t.span ?? "md:col-span-2"}`}
            >
              {t.type === "video" ? <VideoCard t={t} /> : <QuoteCard t={t} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ t }: { t: T }) {
  return (
    <figure className="relative h-full p-7">
      <span className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition group-hover:opacity-100" />
      <span className="font-display absolute right-6 top-2 text-7xl leading-none text-accent/15">&ldquo;</span>
      <blockquote className="font-display relative text-lg leading-snug tracking-tight md:text-2xl">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
          {t.initials}
        </span>
        <div>
          <div className="text-sm text-white">{t.name}</div>
          <div className="text-xs text-white/50">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function VideoCard({ t }: { t: T }) {
  return (
    <figure className="relative flex h-full min-h-[320px] flex-col">
      {/* Thumbnail area — abstract gradient placeholder. Replace with real client photo + Mux/Vimeo embed. */}
      <div className="relative flex-1 overflow-hidden rounded-t-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,255,61,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(155,211,0,0.25),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_100%)]" />
        {/* Diagonal noise pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.07] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>

        {/* Featured story chip */}
        <div className="absolute left-5 top-5">
          <span className="font-mono inline-block rounded-full border border-white/15 bg-bg/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            Featured client story · 2:14
          </span>
        </div>

        {/* Big play button */}
        <button
          aria-label="Play video"
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full bg-accent text-bg shadow-[0_20px_60px_-10px_rgba(198,255,61,0.55)] transition group-hover:scale-105">
            <Play size={28} fill="currentColor" className="ml-1" />
          </span>
        </button>

        {/* Title overlay at bottom of thumb */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
          <h3 className="font-display max-w-md text-pretty text-xl tracking-tight md:text-2xl">
            {t.videoTitle}
          </h3>
        </div>
      </div>

      <figcaption className="flex items-center gap-3 px-6 py-5">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 text-sm font-semibold text-accent">
          {t.initials}
        </span>
        <div className="min-w-0">
          <div className="text-sm text-white">{t.name}</div>
          <div className="text-xs text-white/50">{t.role}</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-xs text-white/45">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Verified
        </span>
      </figcaption>
    </figure>
  );
}
