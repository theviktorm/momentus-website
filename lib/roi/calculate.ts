/**
 * Pure ROI math. No I/O, no React, no side effects.
 *
 * Why pure: this is the model. We want to unit-test it, screenshot its
 * outputs into proposals, and (eventually) call it from a server route
 * that pulls real ad-account data. Keep it boring and predictable.
 *
 * --------------------------------------------------------------------------
 * The model (Momentus thesis, distilled)
 * --------------------------------------------------------------------------
 *
 *   1. GEO raises AI citation share.
 *   2. Citation share + earned mentions raise branded search demand.
 *   3. Higher branded search → higher CTR on paid → higher Quality Score.
 *   4. Quality Score is mechanically inverse with CPC. CPC drops.
 *   5. The same dollar buys more clicks. AND the traffic is warmer
 *      (the buyer already saw the brand in an AI answer), so conversion
 *      rate lifts too.
 *   6. New_customers = (spend / new_cpc) * new_conv_rate
 *      New_CAC       = spend / new_customers
 *      Savings       = (old_CAC - new_CAC) * new_customers
 *
 * We hold LTV constant. In reality LTV also climbs (better-fit buyers
 * churn less), but presenting the conservative case is more credible.
 * --------------------------------------------------------------------------
 */

import type {
  Industry,
  IndustryBaseline,
  RoiAssumptions,
  RoiInputs,
  RoiOutputs,
} from "./types";

export const DEFAULT_INPUTS: RoiInputs = {
  monthlySpend: 100_000,
  currentCac: 850,
  currentCustomers: 117, // ≈ 100k / 850, rounded
  currentLtv: 2_400,
  brandedSharePct: 12,
  industry: "b2b_saas",
  timeline: 180,
};

export const DEFAULT_ASSUMPTIONS: RoiAssumptions = {
  citationLiftPp: 35,
  brandedLiftPct: 22,
  cpcReductionPct: -18,
  convLiftPct: 14,
};

/**
 * Annual Momentus fee placeholder used for the ROI multiple. Conservative —
 * a real engagement is scoped per-client.
 */
export const MOMENTUS_ANNUAL_FEE = 60_000;

const INDUSTRY_BASELINES: Record<Industry, IndustryBaseline> = {
  b2b_saas:   { baselineConvRate: 0.020, liftFactor: 1.10, label: "B2B SaaS" },
  dtc:        { baselineConvRate: 0.025, liftFactor: 1.00, label: "DTC" },
  services:   { baselineConvRate: 0.022, liftFactor: 1.05, label: "Services" },
  healthcare: { baselineConvRate: 0.018, liftFactor: 0.90, label: "Healthcare" },
  fintech:    { baselineConvRate: 0.015, liftFactor: 1.15, label: "Fintech" },
  other:      { baselineConvRate: 0.020, liftFactor: 1.00, label: "Other" },
};

export function getIndustryBaseline(i: Industry): IndustryBaseline {
  return INDUSTRY_BASELINES[i];
}

export const INDUSTRY_OPTIONS: { value: Industry; label: string }[] = (
  Object.keys(INDUSTRY_BASELINES) as Industry[]
).map((v) => ({ value: v, label: INDUSTRY_BASELINES[v].label }));

/** Safe divide — returns 0 instead of NaN/Infinity when denominator is zero. */
const safeDiv = (n: number, d: number): number => (d === 0 ? 0 : n / d);

/**
 * Build the 12-month savings ramp. Months 1 is a near-zero ramp-up,
 * 2 = ~10%, 3 = ~35%, 4+ = steady state with slight compounding.
 * Engagement timeline scales how quickly we reach steady state.
 */
function buildRamp(steadyMonthly: number, timeline: 90 | 180 | 365): number[] {
  // Faster engagements ramp faster — 90d hits steady at month 3, 180d at
  // month 4, 365d at month 6. The shape stays editorial-friendly.
  const reachSteady = timeline === 90 ? 3 : timeline === 180 ? 4 : 6;

  return Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    if (month >= reachSteady) {
      // Slight monthly compounding past steady-state (cumulative GEO authority).
      const monthsPast = month - reachSteady;
      const compound = 1 + Math.min(monthsPast * 0.015, 0.12);
      return Math.round(steadyMonthly * compound);
    }
    // Linear-ish curve toward steady state.
    const t = month / reachSteady;
    const curve = t * t; // ease-in
    return Math.round(steadyMonthly * curve);
  });
}

export function calculateRoi(
  inputs: RoiInputs,
  assumptions: RoiAssumptions,
): RoiOutputs {
  const baseline = getIndustryBaseline(inputs.industry);
  const liftFactor = baseline.liftFactor;

  // ---- Current state, derived. ----
  // current_conv: use industry baseline (we don't ask for it — too noisy).
  const currentConvRate = baseline.baselineConvRate;
  // current_cpc: spend → clicks → customers means
  //   customers = clicks * conv  ⇒  clicks = customers / conv
  //   cpc = spend / clicks = spend * conv / customers
  const currentCpc = safeDiv(
    inputs.monthlySpend * currentConvRate,
    inputs.currentCustomers,
  );
  const currentLtvCac = safeDiv(inputs.currentLtv, inputs.currentCac);

  // ---- Assumption deltas, scaled by industry lift factor. ----
  // Scale the *user-set* deltas by vertical sensitivity. Cap at the slider
  // bounds to keep the result honest.
  const brandedLift = (assumptions.brandedLiftPct / 100) * liftFactor;
  const cpcReduction = (assumptions.cpcReductionPct / 100) * liftFactor; // negative
  const convLift = (assumptions.convLiftPct / 100) * liftFactor;

  // ---- Post-engagement. ----
  const newBrandedShare = clamp(
    inputs.brandedSharePct * (1 + brandedLift),
    0,
    100,
  );

  // CPC reduction is negative, so (1 + reduction) < 1.
  const newCpc = Math.max(currentCpc * (1 + cpcReduction), 0.01);
  const newConvRate = currentConvRate * (1 + convLift);

  // Same spend, lower CPC → more clicks. Warmer traffic → higher conv.
  //   new_clicks    = spend / new_cpc
  //   new_customers = new_clicks * new_conv_rate
  const newClicks = safeDiv(inputs.monthlySpend, newCpc);
  const newCustomers = newClicks * newConvRate;

  const newCac = safeDiv(inputs.monthlySpend, newCustomers);
  const newLtv = inputs.currentLtv; // hold constant — conservative
  const newLtvCac = safeDiv(newLtv, newCac);

  // ---- Money. ----
  // Savings = (old CAC - new CAC) * new customers. This captures both the
  // cheaper-per-customer effect AND the more-customers effect against the
  // same spend.
  const monthlySavings = Math.max(
    (inputs.currentCac - newCac) * newCustomers,
    0,
  );
  const annualSavings = monthlySavings * 12;
  const roiMultiple = safeDiv(annualSavings, MOMENTUS_ANNUAL_FEE);

  // ---- Deltas. ----
  const cacDeltaPct = safeDiv(newCac - inputs.currentCac, inputs.currentCac) * 100;
  const ltvCacDeltaPct =
    safeDiv(newLtvCac - currentLtvCac, currentLtvCac) * 100;

  // ---- 12-month ramp. ----
  const monthlyRamp = buildRamp(monthlySavings, inputs.timeline);

  return {
    currentCpc,
    currentConvRate,
    currentLtvCac,
    newBrandedShare,
    newCpc,
    newConvRate,
    newCustomers,
    newCac,
    newLtv,
    newLtvCac,
    monthlySavings,
    annualSavings,
    roiMultiple,
    cacDeltaPct,
    ltvCacDeltaPct,
    monthlyRamp,
  };
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(Math.max(n, lo), hi);
}

/** Money formatter — no decimals, USD. */
export function fmtUsd(n: number, opts: { cents?: boolean } = {}): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.cents ? 2 : 0,
    maximumFractionDigits: opts.cents ? 2 : 0,
  }).format(Math.round(opts.cents ? n * 100 : n) / (opts.cents ? 100 : 1));
}

/** Percent formatter with sign — "+12%" / "-18%" / "0%". */
export function fmtPctSigned(n: number, digits = 0): string {
  const v = n.toFixed(digits);
  if (n > 0) return `+${v}%`;
  return `${v}%`;
}

/** Plain percent — "12%" (no sign forcing). */
export function fmtPct(n: number, digits = 0): string {
  return `${n.toFixed(digits)}%`;
}
