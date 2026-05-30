"use client";
import { useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";
import type { RoiAssumptions, RoiInputs, Industry, Timeline } from "@/lib/roi/types";
import {
  DEFAULT_INPUTS,
  DEFAULT_ASSUMPTIONS,
  INDUSTRY_OPTIONS,
  calculateRoi,
  fmtUsd,
  fmtPct,
  fmtPctSigned,
} from "@/lib/roi/calculate";
import { AssumptionSlider } from "./_components/AssumptionSlider";
import { MetricBlock } from "./_components/MetricBlock";
import { SavingsChart } from "./_components/SavingsChart";
import { FormulaExplainer } from "./_components/FormulaExplainer";

export default function RoiPage() {
  const [inputs, setInputs] = useState<RoiInputs>(DEFAULT_INPUTS);
  const [assumptions, setAssumptions] = useState<RoiAssumptions>(DEFAULT_ASSUMPTIONS);

  const outputs = useMemo(() => calculateRoi(inputs, assumptions), [inputs, assumptions]);

  const update = <K extends keyof RoiInputs>(k: K, v: RoiInputs[K]) =>
    setInputs((p) => ({ ...p, [k]: v }));
  const updateA = <K extends keyof RoiAssumptions>(k: K, v: RoiAssumptions[K]) =>
    setAssumptions((p) => ({ ...p, [k]: v }));

  return (
    <>
      <Nav />
      <main className="pt-36 md:pt-44">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              Free tool · 60 seconds
            </span>
            <h1 className="font-display mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
              What GEO × Paid does to your CAC.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-white/65 md:text-lg">
              Industry-benchmark defaults. Every assumption adjustable. Same model we run for prospects in audit calls.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
            {/* Inputs column */}
            <div className="space-y-5">
              <section className="glass rounded-2xl p-6 md:p-7">
                <h2 className="font-display text-2xl tracking-tight">Your numbers</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <NumberField
                    label="Monthly paid spend"
                    prefix="$"
                    value={inputs.monthlySpend}
                    onChange={(v) => update("monthlySpend", v)}
                    min={5000}
                    max={5_000_000}
                    step={1000}
                  />
                  <NumberField
                    label="Current blended CAC"
                    prefix="$"
                    value={inputs.currentCac}
                    onChange={(v) => update("currentCac", v)}
                    min={10}
                    max={10000}
                  />
                  <NumberField
                    label="Customers / month"
                    value={inputs.currentCustomers}
                    onChange={(v) => update("currentCustomers", v)}
                    min={1}
                    max={50000}
                  />
                  <NumberField
                    label="Avg LTV"
                    prefix="$"
                    value={inputs.currentLtv}
                    onChange={(v) => update("currentLtv", v)}
                    min={10}
                    max={100000}
                  />
                </div>

                <div className="mt-6">
                  <AssumptionSlider
                    label="Current branded search %"
                    help="What share of your branded queries already convert."
                    value={inputs.brandedSharePct}
                    min={0}
                    max={100}
                    step={1}
                    format={(n) => `${n}%`}
                    onChange={(v) => update("brandedSharePct", v)}
                  />
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Industry"
                    value={inputs.industry}
                    options={INDUSTRY_OPTIONS}
                    onChange={(v) => update("industry", v as Industry)}
                  />
                  <RadioField
                    label="Audit timeline"
                    value={inputs.timeline}
                    options={[
                      { value: 90, label: "90d" },
                      { value: 180, label: "180d" },
                      { value: 365, label: "1yr" },
                    ]}
                    onChange={(v) => update("timeline", v as Timeline)}
                  />
                </div>
              </section>

              <section className="glass rounded-2xl p-6 md:p-7">
                <h2 className="font-display text-2xl tracking-tight">Assumptions</h2>
                <p className="mt-1 text-xs text-white/55">
                  Defaults calibrated from active engagements. Drag any of them — the model re-runs.
                </p>
                <div className="mt-5 space-y-5">
                  <AssumptionSlider
                    label="AI citation share lift"
                    help="Percentage-point increase in citation share across ChatGPT, Perplexity, Gemini."
                    value={assumptions.citationLiftPp}
                    min={5}
                    max={75}
                    step={1}
                    format={(n) => `+${n}pp`}
                    onChange={(v) => updateA("citationLiftPp", v)}
                  />
                  <AssumptionSlider
                    label="Branded search lift"
                    help="Relative lift in branded search volume from AI warming the market."
                    value={assumptions.brandedLiftPct}
                    min={0}
                    max={60}
                    step={1}
                    format={(n) => `+${n}%`}
                    onChange={(v) => updateA("brandedLiftPct", v)}
                  />
                  <AssumptionSlider
                    label="Quality Score → CPC reduction"
                    help="Higher-intent traffic raises Quality Score, which mechanically drops CPC."
                    value={assumptions.cpcReductionPct}
                    min={0}
                    max={45}
                    step={1}
                    format={(n) => `-${n}%`}
                    onChange={(v) => updateA("cpcReductionPct", v)}
                  />
                  <AssumptionSlider
                    label="Warmed traffic conversion lift"
                    help="Buyers who arrive already trusting you convert higher."
                    value={assumptions.convLiftPct}
                    min={0}
                    max={40}
                    step={1}
                    format={(n) => `+${n}%`}
                    onChange={(v) => updateA("convLiftPct", v)}
                  />
                </div>
              </section>
            </div>

            {/* Results column */}
            <div className="lg:sticky lg:top-28 space-y-4">
              <MetricBlock
                label="Monthly savings"
                value={outputs.monthlySavings}
                format={(n) => fmtUsd(n)}
                sublabel="vs current spend, same volume."
                tone="accent"
                shimmer
              />
              <MetricBlock
                label="Annual savings"
                value={outputs.annualSavings}
                format={(n) => fmtUsd(n)}
                sublabel="Compounding from month 4 onward."
                tone="accent"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <MetricBlock
                  label="New CAC"
                  value={outputs.newCac}
                  format={(n) => fmtUsd(n)}
                  sublabel={`Down from ${fmtUsd(inputs.currentCac)}.`}
                  delta={{ text: fmtPctSigned(outputs.cacDeltaPct, 0), positive: outputs.cacDeltaPct < 0 }}
                />
                <MetricBlock
                  label="LTV : CAC"
                  value={outputs.newLtvCac}
                  format={(n) => `${n.toFixed(1)}×`}
                  sublabel={`Up from ${outputs.currentLtvCac.toFixed(1)}×.`}
                  delta={{ text: fmtPctSigned(outputs.ltvCacDeltaPct, 0), positive: outputs.ltvCacDeltaPct > 0 }}
                />
              </div>

              <section className="glass rounded-2xl p-6 md:p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg tracking-tight">12-month savings ramp</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    {inputs.timeline}d engagement
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <SavingsChart ramp={outputs.monthlyRamp} timelineId={inputs.timeline} />
                </div>
              </section>

              <FormulaExplainer inputs={inputs} assumptions={assumptions} outputs={outputs} />

              <section className="glass relative overflow-hidden rounded-2xl border border-accent/25 p-6 md:p-7">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">Next move</span>
                <h3 className="font-display mt-3 text-2xl tracking-tight md:text-3xl">
                  Want this run on your real ad accounts?
                </h3>
                <p className="mt-3 text-sm text-white/65">
                  30-minute audit. We pull your actual data and re-run this model with your numbers instead of
                  industry defaults.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
                >
                  Book a free call
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </section>
            </div>
          </div>
        </div>
        <div className="h-32" />
      </main>
      <Footer />
    </>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/55">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="font-mono pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/40">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => {
            const v = Number(e.currentTarget.value);
            if (!Number.isNaN(v)) onChange(v);
          }}
          min={min}
          max={max}
          step={step}
          className={`w-full rounded-xl border border-white/10 bg-black/40 ${prefix ? "pl-7" : "pl-4"} py-3 pr-4 text-sm tabular-nums focus:border-accent/60 focus:outline-none`}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/55">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm focus:border-accent/60 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RadioField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number | string;
  onChange: (v: number | string) => void;
  options: { value: number | string; label: string }[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/55">{label}</label>
      <div className="flex gap-2">
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              className={`flex-1 rounded-xl border px-3 py-3 text-sm transition ${
                active
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-white/10 bg-black/40 text-white/70 hover:bg-white/5"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
