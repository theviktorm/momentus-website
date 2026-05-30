/**
 * ROI calculator — input / output / assumption types.
 *
 * The calculator models the Momentus thesis:
 *   GEO pre-sells the market → branded search rises → Quality Score climbs
 *   → CPC drops → warmer traffic converts higher → LTV : CAC restructures.
 *
 * All money is in USD. All "percent" fields are decimals (0.12 = 12%), unless
 * the field name explicitly says `Pct` — those are 0–100 integers, used for
 * UI inputs to avoid float weirdness in sliders.
 */

export type Industry =
  | "b2b_saas"
  | "dtc"
  | "services"
  | "healthcare"
  | "fintech"
  | "other";

export type Timeline = 90 | 180 | 365;

/** Raw form values the user manipulates. */
export interface RoiInputs {
  /** Monthly paid spend, USD. */
  monthlySpend: number;
  /** Current blended CAC, USD. */
  currentCac: number;
  /** Current monthly customers acquired (derivable from spend / CAC, but editable). */
  currentCustomers: number;
  /** Current average LTV, USD. */
  currentLtv: number;
  /** Current branded search share, 0–100 integer (percent of total search demand). */
  brandedSharePct: number;
  industry: Industry;
  timeline: Timeline;
}

/** Adjustable engagement assumptions. Each is a delta the user can dial. */
export interface RoiAssumptions {
  /** AI citation share lift, percentage points (e.g. 35 = +35pp). UI: 5–75. */
  citationLiftPp: number;
  /** Branded search lift, relative percent (e.g. 22 = +22%). UI: 0–60. */
  brandedLiftPct: number;
  /** CPC reduction, relative percent — negative (e.g. -18 = -18%). UI: 0 to -45. */
  cpcReductionPct: number;
  /** AI-warmed conversion lift, relative percent (e.g. 14 = +14%). UI: 0–40. */
  convLiftPct: number;
}

/** The computed output. Every number a CFO would want to see. */
export interface RoiOutputs {
  // Current-state derived
  currentCpc: number;
  currentConvRate: number;
  currentLtvCac: number;

  // Post-engagement
  newBrandedShare: number; // 0–100, percent
  newCpc: number;
  newConvRate: number;
  newCustomers: number;
  newCac: number;
  newLtv: number; // we keep LTV constant — that's the conservative move
  newLtvCac: number;

  // The money
  monthlySavings: number;
  annualSavings: number;
  roiMultiple: number;

  // Deltas (relative, percent)
  cacDeltaPct: number; // negative = improvement
  ltvCacDeltaPct: number; // positive = improvement

  // 12-month ramp, one entry per month, USD saved that month.
  monthlyRamp: number[];
}

/** Industry-specific baseline tweaks. Conservative — calibrated from agency-side benchmarks. */
export interface IndustryBaseline {
  /** Baseline conversion rate for paid traffic (decimal). */
  baselineConvRate: number;
  /** Multiplier applied to assumption defaults — verticals where GEO works harder get a boost. */
  liftFactor: number;
  label: string;
}
