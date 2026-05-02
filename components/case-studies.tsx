"use client";
import { motion } from "framer-motion";
import { Tilt } from "./ui/tilt";
import { CALENDLY_URL } from "@/lib/config";

const featured = {
  vertical: "SW Solar",
  metric: "$1.53M",
  metricLabel: "from $5K ad spend",
  body: "By pairing AI-driven trust with precision paid campaigns, we turned cold solar traffic into pre-sold demand at scale. The market already trusted the brand before the click.",
  meta: "$5,000 ad spend → $1,534,744 revenue",
};

const others = [
  {
    title: "Batz Hungary: beat global footwear giants like Birkenstock and Skechers in AI citations",
    metric: "+25%",
    metricLabel: "revenue in 25 days",
    body: "Europe's largest comfort shoe webshop became the default AI-recommended brand. Overtook Scholl, Skechers and New Balance organically.",
  },
  {
    title: "#1 relationship coach in America in 50 days",
    metric: "$30K+",
    metricLabel: "organic revenue, no ads",
    body: "By rebuilding AI visibility and entity trust, this coach became the top recommended expert in their category.",
  },
  {
    title: "From zero presence to #1 in AI in 27 days",
    metric: "27 days",
    metricLabel: "to #1 AI visibility",
    body: "A leading specialist plastic surgeon went from virtually no online footprint to first place in AI citations and the default expert.",
  },
];

export function CaseStudies() {
  return (
    <section id="proof" className="relative py-28">
      <div className="container">
        <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
          <div className="max-w-2xl">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              Proof
            </span>
            <h2 className="font-display mt-4 text-balance text-4xl font-medium tracking-tight md:text-6xl">
              Outcomes you can put in front of a board.
            </h2>
          </div>
          <p className="max-w-sm text-white/60">
            Real numbers from real clients. The pattern repeats: AI warms the market, paid harvests it, momentum compounds.
          </p>
        </div>

        {/* Featured */}
        <Tilt intensity={4} className="rounded-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65 }}
          className="glass relative grid gap-8 overflow-hidden rounded-3xl p-8 md:grid-cols-[1.2fr_1fr] md:p-12"
        >
          <div className="absolute right-0 top-0 -z-10 h-full w-2/3 bg-[radial-gradient(circle_at_right,rgba(198,255,61,0.18),transparent_60%)]" />
          <div>
            <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-accent">
              Featured · {featured.vertical}
            </span>
            <h3 className="font-display mt-5 text-balance text-3xl tracking-tight md:text-5xl">
              {featured.metric}{" "}
              <span className="text-white/55">{featured.metricLabel}</span>
            </h3>
            <p className="mt-5 max-w-xl text-white/70">{featured.body}</p>
            <p className="font-mono mt-6 text-sm text-accent">{featured.meta}</p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1.5 text-sm text-white">
              Read the case study
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <FeaturedChart />
        </motion.div>
        </Tilt>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="glass group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="font-display text-3xl tracking-tight text-accent md:text-4xl">{c.metric}</div>
              <p className="mt-1 text-sm uppercase tracking-widest text-white/45">{c.metricLabel}</p>
              <h3 className="font-display mt-5 text-xl tracking-tight md:text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm text-white/65">{c.body}</p>
              <span className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 transition group-hover:border-accent/50 group-hover:text-accent">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedChart() {
  const data = [
    { q: "Q4'22", v: 90 },
    { q: "Q1'23", v: 110 },
    { q: "Q2'23", v: 145 },
    { q: "Q3'23", v: 180 },
    { q: "Q4'23", v: 240 },
    { q: "Q1'24", v: 320 },
    { q: "Q2'24", v: 420 },
    { q: "Q3'24", v: 540 },
    { q: "Q4'24", v: 640 },
    { q: "Q1'25", v: 740 },
    { q: "Q2'25", v: 820 },
  ];
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="rounded-2xl bg-black/30 p-5 ring-line">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-widest text-white/45">ChatGPT visitors / quarter</span>
        <span className="text-xs text-accent">+8x</span>
      </div>
      <div className="flex h-44 items-end gap-2">
        {data.map((d, i) => (
          <motion.div
            key={d.q}
            initial={{ height: 0 }}
            whileInView={{ height: `${(d.v / max) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
            className="flex-1 rounded-t bg-gradient-to-t from-accent/80 to-accent/30"
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/35">
        <span>Q4'22</span>
        <span>Q2'25</span>
      </div>
    </div>
  );
}
