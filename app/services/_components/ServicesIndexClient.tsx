"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Aurora } from "@/components/ui/aurora";
import { Spotlight } from "@/components/ui/spotlight";
import { Magnetic } from "@/components/ui/magnetic";
import { Tilt } from "@/components/ui/tilt";
import { track } from "@/lib/track";

interface Service {
  n: string;
  slug: string;
  title: string;
  full: string;
  one: string;
  chips: readonly string[];
  stat: { value: string; label: string };
  href: string;
}

export function ServicesIndexClient({
  services,
  sub,
  calendlyUrl,
}: {
  services: Service[];
  sub: string;
  calendlyUrl: string;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 md:pt-40">
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
            Services
          </motion.div>
          <h1 className="font-display mx-auto max-w-4xl text-balance text-center text-4xl font-medium leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
            Three disciplines. One agency.
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-center text-base text-white/65 md:text-lg"
          >
            {sub}
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="relative pb-12">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <Tilt intensity={3}>
                  <Link
                    href={s.href}
                    className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition hover:border-accent/40"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs text-accent">{s.n} /</span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                        {s.full}
                      </span>
                    </div>
                    <h2 className="font-display mt-6 text-3xl tracking-tight md:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm text-white/70 md:text-base">{s.one}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] text-white/70"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-xl border border-accent/20 bg-accent/[0.06] p-4">
                      <div className="text-[10px] uppercase tracking-widest text-white/55">
                        What you'll see in 30 days
                      </div>
                      <div className="mt-1 flex items-baseline gap-3">
                        <span className="font-display text-3xl tracking-tight text-accent md:text-4xl">
                          {s.stat.value}
                        </span>
                        <span className="text-xs text-white/65">{s.stat.label}</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-1.5 text-sm text-white/85 transition group-hover:text-accent">
                        Learn more
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
                  </Link>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20">
        <div className="container">
          <div className="glass relative flex flex-col items-start justify-between gap-6 rounded-3xl p-8 md:flex-row md:items-center md:p-12">
            <div className="max-w-xl">
              <h2 className="font-display text-balance text-2xl tracking-tight md:text-4xl">
                Not sure which lever moves first?
              </h2>
              <p className="mt-3 text-white/65">
                Book a free audit. We'll show you the ranking on your top 50 queries, the
                gaps your paid is leaving on the table, and the realistic 90-day path.
              </p>
            </div>
            <Magnetic strength={0.3}>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("cta_click", { location: "services_index:bottom", label: "book_free_audit" })
                }
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-4 text-base font-medium text-bg transition hover:bg-accent-soft"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Book a free audit
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
          </div>
        </div>
      </section>
    </>
  );
}
