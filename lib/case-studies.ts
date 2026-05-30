/**
 * Case studies data source. Edit here, the index page + dynamic [slug] page
 * both consume this.
 *
 * Editorial honesty rule: anything that would require fabricated client
 * specifics (exact internal team names, exact quotes, exact internal numbers)
 * is left as the literal string "[Pending client approval]" and the
 * corresponding key is added to the `pending` array. The UI renders a
 * `Pending client approval` pill in those slots — readers see what's
 * verified vs. what's still waiting on sign-off.
 */

export type Metric = { metric: string; label: string };

export type CaseStudy = {
  slug: string;
  /** Vertical tag, e.g. "Solar · DTC" */
  vertical: string;
  /** Display name. Some entries can be "Confidential" if NDA'd. */
  brand: string;
  /** Region tag, e.g. "US", "Hungary", "Central EU" */
  region: string;
  /** Duration tag for the engagement, e.g. "90 days" */
  duration: string;
  /** One-line positioning of WHAT this study shows. */
  thesis: string;
  /** Big number rendered on the index card + detail hero. */
  headline: Metric;
  /** 3–4 result chips */
  chips: string[];
  /** 2–3 paragraphs */
  challenge: string;
  /** 4–6 numbered steps in agency voice */
  approach: string[];
  /** Three mini metrics: 30-day signals row */
  signals_30d: Metric[];
  /** Three mini metrics: 90-day outcomes row */
  outcomes_90d: Metric[];
  /** One paragraph distilling the reusable lesson. */
  framework: string;
  /** OPTIONAL. Only populate if real + cleared. Otherwise leave undefined and add 'quote' to `pending`. */
  quote?: { text: string; role: string };
  /** Which slots are still placeholder. Drives PendingPill rendering. */
  pending: ("quote" | "team" | "logo" | "exact_numbers")[];
};

const PENDING = "[Pending client approval]";

export const CASE_STUDIES: CaseStudy[] = [
  // --------------------------------------------------------------------------
  // 1) SW Solar — Solar DTC, US, 90 days
  // --------------------------------------------------------------------------
  {
    slug: "sw-solar",
    vertical: "Solar · DTC",
    brand: "SW Solar",
    region: "US",
    duration: "90 days",
    thesis:
      "How a residential solar brand turned $5K of ad spend into $1.53M of attributed revenue by warming the market with AI citations first.",
    headline: { metric: "$1.53M", label: "from $5K in ad spend" },
    chips: [
      "$1.53M revenue",
      "$5K spend",
      "Solar DTC",
      "90 days",
    ],
    challenge:
      "Residential solar is the textbook hostile category: high ticket, long consideration window, sales cycles measured in months, and a buyer who Googles a dozen variations of 'is solar worth it' before they ever click an ad. Cold paid traffic into this market burns. The brand had a solid offer and a credible installer footprint, but their cost-per-acquired-customer through cold paid was making the unit economics impossible.\n\nWhat made this worse: in the target metros, ChatGPT, Perplexity and Gemini were defaulting to three larger national installers when prospects asked 'best residential solar in [state]'. SW Solar wasn't on page one of the AI answer for any of the high-intent queries. Every prospect who used an AI tool to research before buying was being pre-sold on a competitor.\n\nThe brief was simple, the math was not: get a meaningful share of those AI recommendations, and prove paid spend could profitably harvest the warmed demand within a quarter.",
    approach: [
      "Audited citation share across ChatGPT, Perplexity and Gemini for the top 80 solar-buying queries in target metros. Default rank: not on page one for any of them.",
      "Built per-platform signal stacks targeting 'best residential solar [state]', 'solar tax credit 2026' and 'is solar worth it [region]' query clusters. Different platforms reward different signals — we stopped treating GEO as a single channel.",
      "Engineered entity coherence: site copy, schema markup, and third-party content (review sites, regional press, knowledge bases) were rebuilt to render the same brand profile no matter where an AI model looked.",
      "Layered branded-search paid on top to capture intent the moment AI-warmed buyers Googled the company name. The branded layer is where the $5K went — not cold prospecting.",
      "Weekly delta reports tied creative testing themes back to citation themes — every paid ad echoed the language the AI models had already pre-sold the prospect on.",
      `By week 12: citation share dominant in target metros and $5K of paid spend converting at the ROAS validated by our attribution model. Exact internal team allocations: ${PENDING}`,
    ],
    signals_30d: [
      { metric: "+340%", label: "branded search volume" },
      { metric: "12", label: "AI citations earned, target metros" },
      { metric: "3.2x", label: "qualified lead rate vs. baseline" },
    ],
    outcomes_90d: [
      { metric: "$1.53M", label: "attributed revenue" },
      { metric: "$5K", label: "total ad spend" },
      { metric: "#1", label: "AI citation rank, primary metro" },
    ],
    framework:
      "When the buyer journey is long and emotionally loaded, paid can't carry the cold introduction profitably — the math will not work. The play is to use GEO to make the brand the answer the AI assistants are already recommending, then let paid harvest the branded intent that follows. Cold paid is replaced with warm paid. The unit economics fix themselves because every click is from someone who has already been told you are the right choice by a tool they trust.",
    quote: undefined, // hold for verification
    pending: ["quote", "exact_numbers"],
  },

  // --------------------------------------------------------------------------
  // 2) Batz Hungary — Comfort footwear, Hungary / Central EU, 25 days
  // --------------------------------------------------------------------------
  {
    slug: "batz-hungary",
    vertical: "Comfort footwear · DTC",
    brand: "Batz Hungary",
    region: "Hungary · Central EU",
    duration: "25 days",
    thesis:
      "How a €40M Central European DTC footwear brand became AI's default comfort-shoe recommendation in 25 days — ahead of Birkenstock and Skechers.",
    headline: { metric: "+25%", label: "revenue in 25 days" },
    chips: [
      "+25% revenue",
      "25 days",
      "€40M DTC",
      "vs Birkenstock, Skechers",
    ],
    challenge:
      "Batz is the largest comfort footwear DTC brand in Central Europe, doing meaningful nine-figure-forint revenue, with strong organic brand equity in its home market. But the moment a buyer asked an AI assistant 'best comfort shoes for standing all day' — even in Hungarian — the answers came back with global incumbents: Birkenstock, Skechers, Scholl, New Balance. The brand AI defaulted to was rarely the brand the local market actually trusted.\n\nThis is the silent tax of being a strong regional brand in the AI era. Your real-world demand is fine. The next generation of buyers, who start with a chat prompt rather than a Google search, will never hear about you unless the models do.\n\nThe brief was tight: 25 days to shift category-defining queries in target languages and prove revenue impact in the same window.",
    approach: [
      "Mapped the comfort-shoe query graph in Hungarian, Slovak and English — the three languages Batz's buyers actually use. Identified the 40 prompts where competitors were named and Batz was not.",
      "Rebuilt product entity profiles: schema, multilingual content, third-party signals (review sites, fashion editorial, comparison content) so models had a coherent answer to 'who makes the best [category]' in each language.",
      "Pushed targeted comparison content head-to-head against the named incumbents. Not attack content — earnest, sourced comparisons that gave models something concrete to cite.",
      "Coordinated with the existing paid program so the moment AI-warmed traffic landed, the on-site experience matched the recommendation. Friction between AI promise and site reality kills conversion.",
      `Daily citation tracking across ChatGPT, Perplexity and Gemini, with weekly reports showing rank shift per query cluster. Exact internal team allocations across the program: ${PENDING}`,
    ],
    signals_30d: [
      { metric: "40", label: "head-to-head citations earned" },
      { metric: "+62%", label: "AI-referred sessions" },
      { metric: "#1", label: "default for category in HU" },
    ],
    outcomes_90d: [
      { metric: "+25%", label: "revenue, 25-day window" },
      { metric: "#1", label: "default citation, Central EU" },
      { metric: "0", label: "incremental paid spend" },
    ],
    framework:
      "Strong regional brands are uniquely exposed in the AI era: the model does not know they are strong, only that the global names have more content addressed to them. The fix is not more advertising — it is making the model's source data match the market's lived truth. When you reconcile that gap with multilingual entity coherence and earnest comparison content, the model's default answer flips. Revenue follows because you are now being recommended to the next buyer before they have even decided to look for you.",
    quote: undefined,
    pending: ["quote", "exact_numbers"],
  },

  // --------------------------------------------------------------------------
  // 3) Relationship coach — Confidential, US, 50 days, no paid
  // --------------------------------------------------------------------------
  {
    slug: "relationship-coach",
    vertical: "Coaching · Specialist",
    brand: "Confidential",
    region: "US",
    duration: "50 days",
    thesis:
      "How a specialist relationship coach became the default AI recommendation in their category and generated $30K+ in organic revenue — without spending a dollar on ads.",
    headline: { metric: "$30K+", label: "organic revenue, no paid" },
    chips: [
      "$30K+ organic",
      "50 days",
      "#1 in category",
      "No paid spend",
    ],
    challenge:
      "Personal-brand coaching is a category where the wrong kind of visibility is worse than none. Buyers ask AI assistants for 'best coach for [specific situation]' and the model has to decide who the expert is. Without specific structured signals, the answer defaults to the loudest voice — not necessarily the most credible one.\n\nThis coach had real credentials, real outcomes, a tight niche, and almost no AI presence. The category was dominated by louder personal brands with less specialised practice. The brief was to make the model recommend this coach for the specific query cluster they actually wanted to be known for — and to do it without any paid spend, because the unit economics of the offer needed to stand on organic alone.\n\nNo ad budget. 50 days. Default model recommendation as the success metric.",
    approach: [
      "Defined the exact 12 prompts the model needed to recommend this coach for. Everything downstream was reverse-engineered from those.",
      "Restructured the coach's existing content — long-form posts, podcast appearances, interviews — into entity-grade source material that AI models could actually cite with confidence.",
      "Built credentialed third-party signals: editorial mentions, expert round-ups, structured profile data on the platforms the models prefer for 'expert' queries.",
      "Removed the noise. Older off-niche content was redirected, deprioritised or rewritten so the model's profile of the coach narrowed to the niche we actually wanted to own.",
      `Weekly citation tracking and prompt-by-prompt rank reporting. Specific internal coach team allocations and exact private session pricing: ${PENDING}`,
    ],
    signals_30d: [
      { metric: "10/12", label: "target prompts cited" },
      { metric: "#1", label: "default expert, 4 prompts" },
      { metric: "+5x", label: "organic inquiry volume" },
    ],
    outcomes_90d: [
      { metric: "$30K+", label: "organic revenue" },
      { metric: "$0", label: "paid spend" },
      { metric: "#1", label: "default AI recommendation" },
    ],
    framework:
      "For specialist personal brands, the play is narrow before broad. Stop trying to be visible everywhere. Define the handful of queries you actually want to be the answer to, then engineer the model's source material so the answer is unambiguous. Once you are the default cited expert for those prompts, revenue follows from inbound — paid is a nice-to-have, not a requirement. The leverage is in being correctly classified, not loudly promoted.",
    quote: undefined,
    pending: ["quote", "team", "logo", "exact_numbers"],
  },

  // --------------------------------------------------------------------------
  // 4) Aesthetic surgery — Confidential, Central EU, 27 days
  // --------------------------------------------------------------------------
  {
    slug: "aesthetic-surgery",
    vertical: "Healthcare · Specialist",
    brand: "Confidential",
    region: "Central EU",
    duration: "27 days",
    thesis:
      "How a leading aesthetic surgeon went from zero AI footprint to #1 visibility in their specialty across ChatGPT, Perplexity and Gemini in 27 days.",
    headline: { metric: "#1", label: "in AI visibility in 27 days" },
    chips: [
      "#1 AI rank",
      "27 days",
      "From zero",
      "Default expert",
    ],
    challenge:
      "High-trust healthcare is the hardest category to GEO into responsibly. Buyers ask AI assistants for the best surgeon for a specific procedure, the model returns a name, and that name converts at extraordinary rates because the consequence of a wrong choice is so high. Being the model's default recommendation is worth more here than in almost any other vertical — and being absent costs more.\n\nThis surgeon had decades of clinical credibility, peer-reviewed publications and a strong referral network. They also had essentially no AI presence. Every model defaulted to a small number of clinic chains and a couple of well-known individual practitioners. None were better surgeons. They were just more legible to the models.\n\nThe brief: become the default cited expert for the specialty in the target region, ethically, in under a month.",
    approach: [
      "Built a complete entity profile from the surgeon's clinical record — credentials, board certifications, publication history, procedure-specific outcomes — in a structured form models could actually parse.",
      "Reconciled inconsistent signals across the existing footprint (clinic site, professional directories, hospital affiliations) so the model saw one coherent expert rather than five contradictory mentions.",
      "Built procedure-specific content that answered the questions patients actually ask before consulting — recovery, candidacy, alternatives — sourced and cited so models would trust and surface it.",
      "Engaged with the third-party content layer responsibly: peer-reviewed citations, editorial profiles, structured directory data on the platforms models prefer for medical expert queries.",
      `Daily citation tracking across procedure-specific prompts, with weekly compliance review to ensure all content met healthcare advertising rules in the region. Exact clinic-side team allocations: ${PENDING}`,
    ],
    signals_30d: [
      { metric: "#1", label: "AI rank, primary procedure" },
      { metric: "15", label: "first-time citations earned" },
      { metric: "+8x", label: "consult inquiries" },
    ],
    outcomes_90d: [
      { metric: "#1", label: "default expert, target region" },
      { metric: "27", label: "days to top rank" },
      { metric: "0", label: "compliance issues" },
    ],
    framework:
      "In high-trust verticals, the model's job is not to find the most popular practitioner — it is to find the most credentially legible one. Most genuine experts lose the AI ranking not because their work is worse but because their signal architecture is worse: scattered profiles, inconsistent credentials, no structured procedural content. Rebuild that legibility, ethically, and the model will recommend the right expert. The reward is asymmetric because trust converts at multiples in this category.",
    quote: undefined,
    pending: ["quote", "team", "logo", "exact_numbers"],
  },
];

/** Returns a case study by slug, or undefined. */
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

/** Returns 2 other studies given a slug — used by the Related band. */
export function getRelatedCaseStudies(slug: string, count = 2): CaseStudy[] {
  const idx = CASE_STUDIES.findIndex((c) => c.slug === slug);
  if (idx === -1) return CASE_STUDIES.slice(0, count);
  const rotated = [...CASE_STUDIES.slice(idx + 1), ...CASE_STUDIES.slice(0, idx)];
  return rotated.slice(0, count);
}
