"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";
import type { AuditInput, AuditResult, PlatformResult } from "@/lib/audit/types";

type State =
  | { kind: "form" }
  | { kind: "loading"; phase: string }
  | { kind: "result"; result: AuditResult }
  | { kind: "error"; message: string };

const PHASES = [
  "> probe('chatgpt')...",
  "> probe('perplexity')...",
  "> probe('gemini')...",
  "> probe('google-ai-overview')...",
  "> scoring...",
];

export default function AuditPage() {
  const [state, setState] = useState<State>({ kind: "form" });
  const [input, setInput] = useState<AuditInput>({
    domain: "",
    brand_name: "",
    query: "",
    market: "US",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // simple progressive phase ticker
    let i = 0;
    setState({ kind: "loading", phase: PHASES[0] });
    const phaseTick = setInterval(() => {
      i = Math.min(i + 1, PHASES.length - 1);
      setState({ kind: "loading", phase: PHASES[i] });
    }, 280);
    try {
      const r = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const j = await r.json();
      clearInterval(phaseTick);
      if (!r.ok || !j.ok) throw new Error(j.error || `HTTP ${r.status}`);
      setState({ kind: "result", result: j.result as AuditResult });
      // gentle scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      clearInterval(phaseTick);
      setState({
        kind: "error",
        message: e instanceof Error ? e.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <Nav />
      <main className="pt-36 md:pt-44">
        <div className="container">
          <AnimatePresence mode="wait">
            {state.kind === "form" || state.kind === "loading" || state.kind === "error" ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="mx-auto max-w-2xl"
              >
                <div className="text-center">
                  <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
                    Free tool · 60 seconds
                  </span>
                  <h1 className="font-display mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                    See where AI ranks your brand today.
                  </h1>
                  <p className="mx-auto mt-5 max-w-xl text-pretty text-white/65 md:text-lg">
                    Same audit we run for $20K clients on minute 5 of a call. Free. No signup.
                    We don&apos;t store the data unless you tell us to.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="glass relative mt-10 rounded-3xl p-6 md:p-10">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Your brand name"
                      placeholder="e.g. Batz Hungary"
                      value={input.brand_name}
                      onChange={(v) => setInput({ ...input, brand_name: v })}
                      required
                    />
                    <Field
                      label="Your domain"
                      placeholder="batz.hu"
                      value={input.domain}
                      onChange={(v) => setInput({ ...input, domain: v })}
                      required
                    />
                  </div>
                  <div className="mt-5">
                    <Field
                      label="A query your buyers run"
                      placeholder="best comfort shoes for plantar fasciitis Europe"
                      value={input.query}
                      onChange={(v) => setInput({ ...input, query: v })}
                      required
                    />
                  </div>
                  <div className="mt-5 grid gap-5 md:grid-cols-[200px_1fr] md:items-end">
                    <div>
                      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/55">
                        Market
                      </label>
                      <select
                        value={input.market}
                        onChange={(e) => setInput({ ...input, market: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-accent/60 focus:outline-none"
                      >
                        {["US", "UK", "DE", "FR", "ES", "IT", "NL", "SK", "HU", "PL", "CZ"].map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={state.kind === "loading"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft disabled:opacity-60"
                    >
                      {state.kind === "loading" ? (
                        <span className="font-mono text-sm normal-case tracking-normal">
                          {state.phase}
                        </span>
                      ) : (
                        <>
                          Run audit
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="transition group-hover:translate-x-0.5"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] text-white/55">
                    <span className="font-mono uppercase tracking-[0.18em]">What this checks:</span>
                    {["ChatGPT", "Perplexity", "Gemini", "Google AI Overview"].map((p) => (
                      <span
                        key={p}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono uppercase tracking-[0.18em]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  {state.kind === "error" && (
                    <p className="mt-4 text-sm text-red-400/85">{state.message}</p>
                  )}
                  <p className="mt-4 text-center text-[11px] text-white/40">
                    By submitting you agree to our friendly do-not-spam promise.
                  </p>
                </form>
              </motion.div>
            ) : (
              <ResultView key="result" result={state.result} onAgain={() => setState({ kind: "form" })} />
            )}
          </AnimatePresence>
        </div>
        <div className="h-32" />
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/55">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm placeholder:text-white/30 focus:border-accent/60 focus:outline-none"
      />
    </div>
  );
}

function ResultView({ result, onAgain }: { result: AuditResult; onAgain: () => void }) {
  const score = Math.round(result.overall_score);
  const tier =
    score >= 75 ? "Dominant" : score >= 55 ? "Default brand emerging" : score >= 35 ? "In the mix" : score >= 15 ? "Mentioned but mis-positioned" : "Below the radar";
  const ringColor = score >= 60 ? "stroke-accent" : score >= 35 ? "stroke-amber-400" : "stroke-red-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl"
    >
      {/* Header band */}
      <div className="glass rounded-3xl p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          {[result.input.brand_name, result.input.domain, result.input.query, result.input.market].map((c, i) => (
            <span
              key={i}
              className="font-mono rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 uppercase tracking-[0.18em] text-white/70"
            >
              {c}
            </span>
          ))}
        </div>
        <h1 className="font-display mt-5 text-balance text-3xl tracking-tight md:text-5xl">
          Here&apos;s where{" "}
          <span className="text-shimmer inline-block">{result.input.brand_name}</span>{" "}
          stands today.
        </h1>
      </div>

      {/* Score gauge + top_gap */}
      <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr] md:items-center">
        <div className="glass relative flex items-center justify-center rounded-3xl p-6">
          <svg viewBox="0 0 120 120" className="h-48 w-48 -rotate-90">
            <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={ringColor}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ duration: 1.6, ease: [0.22, 0.7, 0.2, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-6xl tracking-tight tabular-nums">{score}</div>
            <div className="font-mono mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
              AI Visibility Score
            </div>
          </div>
        </div>
        <div>
          <p className="font-display text-2xl leading-snug tracking-tight md:text-3xl">{result.top_gap}</p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">{tier}</p>
        </div>
      </div>

      {/* Platforms */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {result.platforms.map((p) => (
          <PlatformCard key={p.platform} p={p} />
        ))}
      </div>

      {/* Recommendation */}
      <div className="glass mt-6 overflow-hidden rounded-3xl border border-accent/25 p-6 md:p-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Next move</span>
        <p className="font-display mt-3 text-balance text-2xl tracking-tight md:text-3xl">
          {result.recommendation}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
          >
            Get the full 80-query audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={onAgain}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/85 transition hover:bg-white/[0.06]"
          >
            Run another audit
          </button>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-white/40">
        Audit id <span className="font-mono text-white/55">{result.id}</span> · ran {new Date(result.ran_at).toLocaleString()}
      </p>
    </motion.div>
  );
}

function PlatformCard({ p }: { p: PlatformResult }) {
  const sentimentColor =
    p.sentiment === "positive"
      ? "border-accent/40 bg-accent/10 text-accent"
      : p.sentiment === "negative"
      ? "border-red-400/40 bg-red-400/10 text-red-300"
      : "border-white/10 bg-white/5 text-white/70";

  return (
    <article className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl tracking-tight">{p.platform}</h3>
        <span
          className={`font-mono inline-block rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${sentimentColor}`}
        >
          {p.sentiment}
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        {p.your_position == null ? (
          <span className="font-display text-3xl text-white/50">Not mentioned</span>
        ) : (
          <>
            <span className="font-display text-5xl tabular-nums text-accent">#{p.your_position}</span>
            <span className="text-sm text-white/55">your position</span>
          </>
        )}
      </div>

      {p.ranking.length > 0 && (
        <ul className="mt-5 space-y-2">
          {p.ranking.map((r) => (
            <li
              key={r.brand}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                r.is_you ? "border border-accent/40 bg-accent/10" : ""
              }`}
            >
              <span className="w-4 text-right text-xs text-white/40">{r.position}</span>
              <span className={`flex-1 truncate ${r.is_you ? "text-accent" : "text-white/85"}`}>
                {r.brand}
              </span>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full ${r.is_you ? "bg-accent" : "bg-white/40"}`}
                  style={{ width: `${r.score}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs tabular-nums text-white/55">{r.score}%</span>
            </li>
          ))}
        </ul>
      )}

      {p.sample_answer_excerpt && (
        <p className="mt-5 border-l-2 border-accent/40 pl-3 text-sm italic leading-relaxed text-white/65">
          {p.sample_answer_excerpt}
        </p>
      )}

      {p.cited_sources.length > 0 && (
        <div className="mt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">Cited sources</span>
          <ul className="mt-2 flex flex-col gap-1">
            {p.cited_sources.map((u) => (
              <li key={u} className="truncate font-mono text-[11px] text-white/55">
                {u}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
