/**
 * Public types for the Free AI Visibility Check tool (`/tools/audit`).
 *
 * These describe the shape that flows through the orchestrator + API:
 *
 *   AuditInput → run-audit() → AuditResult
 *               ↑
 *               currently stubbed by mock-engine.ts; the same shape will be
 *               returned by the real backend when the LLM probes are wired
 *               in (see TODO marker in mock-engine.ts).
 */

export type Platform =
  | "ChatGPT"
  | "Perplexity"
  | "Gemini"
  | "Claude"
  | "Copilot"
  | "Google AI Overview";

export type AuditInput = {
  /** Bare domain, e.g. "batz.hu". No protocol, no trailing slash. */
  domain: string;
  /** Display brand name, e.g. "Batz Hungary". */
  brand_name: string;
  /** A query a buyer would actually run, e.g. "best comfort shoes Europe". */
  query: string;
  /** ISO-2 country code, e.g. "SK", "US". Defaults to "US" client-side. */
  market: string;
};

export type Sentiment = "positive" | "neutral" | "negative";

export type CompetitorRank = {
  brand: string;
  /** 1-based position in this platform's answer. */
  position: number;
  /** 0–100 strength score inside this answer. */
  score: number;
  /** True for the brand the user is auditing — used to highlight in lists. */
  is_you: boolean;
};

export type PlatformResult = {
  platform: Platform;
  /** 1-based rank in the AI answer, or null if not mentioned at all. */
  your_position: number | null;
  citation_present: boolean;
  sentiment: Sentiment;
  /** Up to 5 brands, sorted by `position` ascending. */
  ranking: CompetitorRank[];
  /** 2–3 sentence excerpt of what the model says about the query. */
  sample_answer_excerpt: string;
  /** 2–3 URL strings the AI cites. Order matters — most prominent first. */
  cited_sources: string[];
};

export type AuditResult = {
  /** Stable hash-derived id for share URLs (`/tools/audit?id=...`). */
  id: string;
  input: AuditInput;
  /** ISO timestamp the audit was produced. */
  ran_at: string;
  /** 0–100 — blended presence + positioning across all platforms. */
  overall_score: number;
  /** One PlatformResult per probed platform. Currently 4. */
  platforms: PlatformResult[];
  /** One-line interpretation of the biggest gap, e.g. "You're mentioned by Perplexity but ranked 4th — competitors own the framing." */
  top_gap: string;
  /** One-line next step matching the scenario. */
  recommendation: string;
};

/** Scenario buckets the mock engine uses; not exposed to the API consumer. */
export type Scenario =
  | "dominant"
  | "mid-pack"
  | "mentioned-but-mis-positioned"
  | "absent";
