"use client";
import type { RoiInputs, RoiAssumptions, RoiOutputs } from "@/lib/roi/types";
import { fmtUsd, fmtPctSigned, fmtPct } from "@/lib/roi/calculate";

export function FormulaExplainer({
  inputs,
  assumptions,
  outputs,
}: {
  inputs: RoiInputs;
  assumptions: RoiAssumptions;
  outputs: RoiOutputs;
}) {
  return (
    <details className="glass group rounded-2xl">
      <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm text-white/80 transition hover:text-white">
        <span className="font-mono uppercase tracking-[0.22em] text-[11px] text-accent">How we got here</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition group-open:rotate-180">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="space-y-3 border-t border-white/5 px-5 py-5 text-sm leading-relaxed text-white/70">
        <p>
          You spend <b className="text-white">{fmtUsd(inputs.monthlySpend)}</b> per month to acquire{" "}
          <b className="text-white">{inputs.currentCustomers.toLocaleString()}</b> customers at a blended CAC of{" "}
          <b className="text-white">{fmtUsd(inputs.currentCac)}</b>. Implied baseline CPC: <b className="font-mono text-white">{fmtUsd(outputs.currentCpc, { cents: true })}</b>.
        </p>
        <p>
          GEO lifts AI citation share by{" "}
          <b className="text-accent">+{assumptions.citationLiftPp} pp</b>, which historically drives branded
          search up <b className="text-accent">{fmtPctSigned(assumptions.brandedLiftPct, 0)}</b>. The
          higher-intent traffic raises Quality Score, dropping CPC{" "}
          <b className="text-accent">{fmtPctSigned(-assumptions.cpcReductionPct, 0)}</b> to{" "}
          <b className="font-mono text-white">{fmtUsd(outputs.newCpc, { cents: true })}</b>.
        </p>
        <p>
          Pre-sold buyers convert <b className="text-accent">{fmtPctSigned(assumptions.convLiftPct, 0)}</b>{" "}
          higher: {fmtPct(outputs.currentConvRate * 100, 2)} → {fmtPct(outputs.newConvRate * 100, 2)}. Same
          spend, lower CPC, higher conversion → <b className="text-white">{Math.round(outputs.newCustomers).toLocaleString()}</b>{" "}
          customers per month at a new CAC of <b className="text-white">{fmtUsd(outputs.newCac)}</b>.
        </p>
        <p>
          That&apos;s <b className="text-accent">{fmtUsd(outputs.monthlySavings)}/month</b> saved at the same
          customer volume — <b className="text-accent">{fmtUsd(outputs.annualSavings)}/year</b> on a 12-month
          compounding ramp.
        </p>
        <p className="border-t border-white/5 pt-3 text-[12px] text-white/45">
          Numbers above use industry-benchmark assumptions calibrated from active engagements. Run this on your real ad
          accounts in an audit call for a model-grade projection — we&apos;ll replace the defaults with your numbers.
        </p>
      </div>
    </details>
  );
}
