/**
 * Deterministic mock backend for the Free AI Visibility Check.
 *
 * Goals:
 *   - Same input → same output. We hash (domain + brand + query + market) once
 *     and use the hash to seed every downstream random choice. This means a
 *     prospect who runs the same audit twice gets identical results, and the
 *     share URL (`?id=...`) is reproducible.
 *   - Feel real. The output looks like what you'd see if you actually probed
 *     ChatGPT, Perplexity, Gemini and Google AI Overview by hand: different
 *     rankings per platform, different sentiment, different cited sources.
 *   - Easy swap. The single export is `runMockAudit(input)` matching the same
 *     `Promise<AuditResult>` signature the real backend will produce. When the
 *     real LLM probes ship, `lib/audit/run-audit.ts` swaps one function call.
 *
 * Realism rules baked in:
 *   - ChatGPT and Perplexity rarely score identically.
 *   - Sentiment varies per platform (Perplexity skews neutral, Gemini skews
 *     mildly positive, AI Overview is colder, ChatGPT is the most variable).
 *   - Cited sources differ per platform (Perplexity loves Wikipedia + Reddit,
 *     ChatGPT loves general-press, Gemini loves brand-own + YouTube, Overview
 *     loves Wikipedia + Britannica + .gov).
 *   - In `absent`, the user simply isn't in the top 5 — we fill with competitors.
 *
 * TODO: replace with real backend call to /api/peec/probe or
 * /api/observations/scan-now once LLM keys are wired in. Keep this file as the
 * dev fallback so the marketing site keeps working offline.
 */

import type {
  AuditInput,
  AuditResult,
  CompetitorRank,
  Platform,
  PlatformResult,
  Scenario,
  Sentiment,
} from "./types";

// ---------- deterministic helpers ---------------------------------------------------

/** djb2-ish hash → unsigned 32-bit int. Stable across runs. */
function hash32(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h) ^ str.charCodeAt(i);
  return h >>> 0;
}

/** Mulberry32 PRNG seeded from a single int. Returns 0..1. */
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, list: readonly T[]): T {
  return list[Math.floor(rng() * list.length) % list.length];
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function inRange(rng: () => number, lo: number, hi: number): number {
  return Math.round(lo + rng() * (hi - lo));
}

// ---------- input normalisation -----------------------------------------------------

function normaliseDomain(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

/** Stable id derived from input — used by the share URL `?id=...`. */
export function auditIdFor(input: AuditInput): string {
  const key = `${normaliseDomain(input.domain)}|${input.brand_name.trim().toLowerCase()}|${input.query.trim().toLowerCase()}|${(input.market || "us").toLowerCase()}`;
  return hash32(key).toString(36).padStart(7, "0");
}

// ---------- competitor pools -------------------------------------------------------

/**
 * Pool of plausible-sounding competitor brands. Generic enough to feel real
 * across categories. The mock picks 4 of these per audit and inserts the
 * user's brand somewhere in the ranking based on the scenario.
 */
const COMPETITOR_POOL = [
  "Northwind Group",
  "Kestrel Labs",
  "Plainsight",
  "Aurelia",
  "Lumen Works",
  "Riverside Co.",
  "Halcyon Brands",
  "Meridian Studio",
  "Field & Forge",
  "Stillwater",
  "Cobalt Edge",
  "Verity Standard",
  "Atlas Mark",
  "Crowley & Pike",
  "Forge Index",
  "True North Reports",
] as const;

const SOURCE_POOLS: Record<Platform, readonly string[]> = {
  ChatGPT: [
    "forbes.com/sites/marketshare/",
    "techcrunch.com/2024/",
    "hbr.org/insights/",
    "ft.com/content/",
    "linkedin.com/pulse/",
  ],
  Perplexity: [
    "en.wikipedia.org/wiki/",
    "reddit.com/r/buyitforlife/",
    "g2.com/categories/",
    "trustpilot.com/review/",
    "news.ycombinator.com/item",
  ],
  Gemini: [
    "youtube.com/watch?v=",
    "google.com/maps/place/",
    "blog.google/products/",
    "consumerreports.org/products/",
    "wirecutter.com/reviews/",
  ],
  Claude: [
    "stripe.com/blog/",
    "a16z.com/category/",
    "harvard.edu/research/",
    "economist.com/business/",
  ],
  Copilot: [
    "microsoft.com/insights/",
    "bing.com/search?q=",
    "linkedin.com/news/",
  ],
  "Google AI Overview": [
    "en.wikipedia.org/wiki/",
    "britannica.com/topic/",
    "consumer.ftc.gov/articles/",
    "investopedia.com/terms/",
  ],
};

/** Default set of platforms the mock probes. Order matters — UI renders in this order. */
const DEFAULT_PLATFORMS: readonly Platform[] = [
  "ChatGPT",
  "Perplexity",
  "Gemini",
  "Google AI Overview",
];

// ---------- scenario selection -----------------------------------------------------

function pickScenario(rng: () => number): Scenario {
  // Weighted so most prospects land in mid-pack or mentioned-but-mis-positioned
  // — that's the realistic "you have presence but not framing" reality. Pure
  // dominance and pure absence are the rarer extremes.
  const roll = rng();
  if (roll < 0.18) return "dominant";
  if (roll < 0.55) return "mid-pack";
  if (roll < 0.85) return "mentioned-but-mis-positioned";
  return "absent";
}

const SCORE_BANDS: Record<Scenario, [number, number]> = {
  dominant: [78, 92],
  "mid-pack": [45, 65],
  "mentioned-but-mis-positioned": [25, 40],
  absent: [5, 20],
};

// ---------- per-platform sentiment skew --------------------------------------------

function pickSentiment(rng: () => number, platform: Platform, scenario: Scenario): Sentiment {
  // Per-platform skew. Numbers are cumulative thresholds for [positive, neutral].
  const skews: Record<Platform, [number, number]> = {
    ChatGPT: [0.45, 0.85],
    Perplexity: [0.25, 0.85],
    Gemini: [0.55, 0.9],
    Claude: [0.4, 0.85],
    Copilot: [0.4, 0.85],
    "Google AI Overview": [0.2, 0.9],
  };
  // In absent/mis-positioned scenarios, push sentiment down a notch.
  const tilt = scenario === "absent" ? 0.25 : scenario === "mentioned-but-mis-positioned" ? 0.15 : 0;
  const [pos, neu] = skews[platform];
  const roll = rng();
  if (roll < pos - tilt) return "positive";
  if (roll < neu) return "neutral";
  return "negative";
}

// ---------- competitor ranking generator -------------------------------------------

function generateRanking(
  rng: () => number,
  brandName: string,
  scenario: Scenario,
  platformBias: number,
): { ranking: CompetitorRank[]; yourPosition: number | null } {
  // Pick 4 distinct competitors deterministically.
  const pool = [...COMPETITOR_POOL];
  // Fisher-Yates with our seeded rng.
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const competitors = pool.slice(0, 4);

  // Where does the brand land?
  let yourPosition: number | null;
  if (scenario === "dominant") {
    // 60% first place, 40% second place on this platform — modulated by bias
    // so platforms disagree slightly. Bias 0..1; lower = more likely first.
    yourPosition = platformBias < 0.6 ? 1 : 2;
  } else if (scenario === "mid-pack") {
    // 2nd to 4th depending on bias
    yourPosition = clamp(2 + Math.floor(platformBias * 3), 2, 4);
  } else if (scenario === "mentioned-but-mis-positioned") {
    // 4th or 5th most of the time, occasional not-present on one platform
    yourPosition = platformBias > 0.85 ? null : platformBias > 0.5 ? 5 : 4;
  } else {
    // absent: usually null, occasional 5th
    yourPosition = platformBias > 0.92 ? 5 : null;
  }

  // Build ranking of 5 entries.
  const entries: { brand: string; is_you: boolean }[] = competitors.map((b) => ({
    brand: b,
    is_you: false,
  }));
  if (yourPosition != null) {
    entries.splice(yourPosition - 1, 0, { brand: brandName, is_you: true });
  } else {
    // brand absent — add one more competitor to pad to 5
    entries.push({ brand: pool[4] ?? "Independent Index", is_you: false });
  }
  const top5 = entries.slice(0, 5);

  // Score from position with small jitter so bars aren't a perfect staircase.
  const ranking: CompetitorRank[] = top5.map((e, i) => {
    const base = 92 - i * 14;
    const jitter = Math.round((rng() - 0.5) * 8);
    return {
      brand: e.brand,
      position: i + 1,
      score: clamp(base + jitter, 18, 98),
      is_you: e.is_you,
    };
  });
  return { ranking, yourPosition: yourPosition };
}

// ---------- sample-answer excerpts -------------------------------------------------

function buildExcerpt(
  rng: () => number,
  platform: Platform,
  scenario: Scenario,
  brand: string,
  query: string,
  topCompetitor: string,
): string {
  const q = query.trim().replace(/[?.!]+$/, "");
  if (scenario === "dominant") {
    const t = [
      `For ${q}, ${brand} is the most consistently recommended option — cited across recent industry coverage and community discussion. ${topCompetitor} is the usual second-mention, typically framed as a comparable alternative rather than a leader.`,
      `When people ask about ${q}, ${brand} comes up first in nearly every well-cited answer. The framing focuses on track record and the depth of recent case work; ${topCompetitor} is mentioned afterward as a close peer.`,
      `${brand} is the default reference for ${q}. Most answers open with their work and cite either editorial coverage or their own published material before listing peers like ${topCompetitor}.`,
    ];
    return pick(rng, t);
  }
  if (scenario === "mid-pack") {
    const t = [
      `For ${q}, the most commonly listed options include ${topCompetitor}, several mid-market specialists, and ${brand}. ${brand} is described as a competent option but rarely framed as the lead recommendation.`,
      `When asked about ${q}, the answer typically opens with ${topCompetitor} as the lead reference, then mentions ${brand} in the second tier alongside two other comparable providers.`,
      `${brand} appears in answers to ${q} but is grouped with a handful of peer options. ${topCompetitor} owns the opening framing in most responses.`,
    ];
    return pick(rng, t);
  }
  if (scenario === "mentioned-but-mis-positioned") {
    const t = [
      `For ${q}, ${topCompetitor} dominates the framing. ${brand} is mentioned, but usually with a narrower scope than it actually has — referenced as a niche or regional option rather than a category contender.`,
      `${brand} surfaces in answers to ${q}, though typically as a footnote after ${topCompetitor} and the other large players. The framing tends to undersell the depth of work.`,
      `When ${q} comes up, ${topCompetitor} is the default reference. ${brand} appears late, with descriptions that don't reflect their actual positioning in the category.`,
    ];
    return pick(rng, t);
  }
  // absent
  const t = [
    `For ${q}, the answer centres on ${topCompetitor} and two or three other established names. ${brand} does not appear in the response.`,
    `Asked about ${q}, the model lists ${topCompetitor} and the usual industry suspects; ${brand} is not mentioned in any of the cited material.`,
    `${q} returns a clean list of well-known names led by ${topCompetitor}. ${brand} is absent from the answer and from the sources the model draws on.`,
  ];
  return pick(rng, t);
}

// ---------- cited sources generator ------------------------------------------------

function buildSources(
  rng: () => number,
  platform: Platform,
  brandSlug: string,
  querySlug: string,
): string[] {
  const pool = SOURCE_POOLS[platform];
  const n = 2 + Math.floor(rng() * 2); // 2 or 3
  const picks: string[] = [];
  const seen = new Set<string>();
  while (picks.length < n && picks.length < pool.length) {
    const base = pool[Math.floor(rng() * pool.length)];
    if (seen.has(base)) continue;
    seen.add(base);
    // Append a slug that matches the brand or the query so it looks like a real cite.
    const tail = rng() < 0.5 ? brandSlug : querySlug;
    picks.push(`${base}${tail}`);
  }
  return picks;
}

// ---------- overall score from platform results ------------------------------------

function computeOverallScore(scenario: Scenario, rng: () => number, platforms: PlatformResult[]): number {
  const [lo, hi] = SCORE_BANDS[scenario];
  // Anchor inside the band, then nudge based on how many platforms actually
  // mentioned the brand. This makes the score react sensibly even if the
  // platform bias randomly punished the brand harder than the scenario implies.
  const mentioned = platforms.filter((p) => p.your_position != null).length;
  const mentionBoost = (mentioned / platforms.length) * 6 - 3; // -3..+3
  const positiveCount = platforms.filter((p) => p.sentiment === "positive").length;
  const sentimentBoost = (positiveCount / platforms.length) * 4 - 2; // -2..+2
  const base = inRange(rng, lo, hi);
  return clamp(Math.round(base + mentionBoost + sentimentBoost), 0, 100);
}

// ---------- top-gap + recommendation lines -----------------------------------------

function buildTopGap(scenario: Scenario, brand: string, platforms: PlatformResult[], topCompetitor: string): string {
  const absentPlatforms = platforms.filter((p) => p.your_position == null).map((p) => p.platform);
  const negativeOn = platforms.find((p) => p.sentiment === "negative")?.platform;
  if (scenario === "dominant") {
    return `${brand} is the default reference across ${platforms.length} platforms — the open question is whether you defend that position before ${topCompetitor} closes the gap.`;
  }
  if (scenario === "mid-pack") {
    return `${brand} is in the consideration set, but ${topCompetitor} owns the opening framing — that's where the gap is, not in mentions.`;
  }
  if (scenario === "mentioned-but-mis-positioned") {
    if (negativeOn) {
      return `${brand} is mentioned, but the framing on ${negativeOn} works against you — that one line is doing more damage than the rankings suggest.`;
    }
    return `${brand} shows up, but the descriptions consistently undersell the work — the gap isn't visibility, it's positioning.`;
  }
  // absent
  if (absentPlatforms.length >= platforms.length - 1) {
    return `${brand} is invisible on the queries your buyers actually run — every answer they read recommends ${topCompetitor} or one of three others, not you.`;
  }
  return `${brand} is missing from ${absentPlatforms.join(" and ")} on this query — competitors get the recommendation, you don't get the chance.`;
}

function buildRecommendation(scenario: Scenario): string {
  switch (scenario) {
    case "dominant":
      return "Lock in the lead — run a defensive content + citation pass before competitors copy the framing.";
    case "mid-pack":
      return "Reframe the category narrative on the 10 queries your buyers run — ranking lifts when the framing changes.";
    case "mentioned-but-mis-positioned":
      return "Rewrite the framing on the 6 highest-volume queries and seed it across the sources these platforms cite.";
    case "absent":
      return "Start with citation seeding on Wikipedia, Reddit and 2 trade press outlets — these are the 4 platforms' actual sources.";
  }
}

// ---------- main entry -------------------------------------------------------------

export async function runMockAudit(input: AuditInput): Promise<AuditResult> {
  const domain = normaliseDomain(input.domain);
  const brand = input.brand_name.trim();
  const query = input.query.trim();
  const market = (input.market || "US").toUpperCase();

  // Seed everything from the canonical key. Same input → same output.
  const seedKey = `${domain}|${brand.toLowerCase()}|${query.toLowerCase()}|${market}`;
  const rng = makeRng(hash32(seedKey));

  const scenario = pickScenario(rng);
  const brandSlug = slugify(brand);
  const querySlug = slugify(query);

  const platforms: PlatformResult[] = DEFAULT_PLATFORMS.map((platform) => {
    // Each platform gets its own bias roll so positioning differs realistically.
    const bias = rng();
    const { ranking, yourPosition } = generateRanking(rng, brand, scenario, bias);
    const sentiment = pickSentiment(rng, platform, scenario);
    const topCompetitor = ranking.find((r) => !r.is_you)?.brand ?? "the lead competitor";
    return {
      platform,
      your_position: yourPosition,
      citation_present: yourPosition != null && rng() > 0.35,
      sentiment,
      ranking,
      sample_answer_excerpt: buildExcerpt(rng, platform, scenario, brand, query, topCompetitor),
      cited_sources: buildSources(rng, platform, brandSlug, querySlug),
    };
  });

  const topCompetitor =
    platforms.flatMap((p) => p.ranking).find((r) => !r.is_you)?.brand ?? "the lead competitor";

  const overall_score = computeOverallScore(scenario, rng, platforms);
  const top_gap = buildTopGap(scenario, brand, platforms, topCompetitor);
  const recommendation = buildRecommendation(scenario);

  return {
    id: auditIdFor(input),
    input: { ...input, domain, market },
    ran_at: new Date().toISOString(),
    overall_score,
    platforms,
    top_gap,
    recommendation,
  };
}

/** Exported for unit-test friendliness — read-only view of the bands. */
export const SCENARIO_BANDS_READONLY: Readonly<Record<Scenario, readonly [number, number]>> =
  SCORE_BANDS;
