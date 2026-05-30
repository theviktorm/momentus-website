/**
 * Static, server-readable list of every searchable target in the command palette.
 *
 * Editorial rule: this file is the *source of truth* for what the palette can
 * reach. The palette client component imports `getPaletteItems()` at hydration
 * and never derives entries from the DOM. If you add a new route, tool, case
 * study or insight, add it here too.
 *
 * Insight + case study entries are hardcoded here (rather than read from disk
 * at build time) so the palette module stays free of `fs` imports and can be
 * pulled into a "use client" component without any bundler gymnastics.
 */

import { CASE_STUDIES } from "@/lib/case-studies";

export type PaletteIcon =
  | "page"
  | "tool"
  | "post"
  | "case"
  | "external"
  | "phone"
  | "email"
  | "arrow-up";

export type PaletteGroup =
  | "Pages"
  | "Tools"
  | "Insights"
  | "Case studies"
  | "Actions";

export type PaletteAction = "calendly" | "scroll-top" | "copy-email";

export type PaletteItem = {
  id: string;
  group: PaletteGroup;
  title: string;
  subtitle?: string;
  /** Internal route → Next router push; external → window.open in new tab. */
  href?: string;
  /** Mutually exclusive with `href`. */
  action?: PaletteAction;
  icon?: PaletteIcon;
  /** Extra match tokens — verticals, brand names, acronyms. */
  keywords?: string[];
};

// -----------------------------------------------------------------------------
// Pages — every public route, with the subtitle as the value prop.
// -----------------------------------------------------------------------------
const PAGES: PaletteItem[] = [
  {
    id: "page-home",
    group: "Pages",
    title: "Home",
    subtitle: "Take first place in AI citations",
    href: "/",
    icon: "page",
    keywords: ["home", "landing", "index", "momentus"],
  },
  {
    id: "page-services",
    group: "Pages",
    title: "Services",
    subtitle: "Three disciplines. One scoreboard.",
    href: "/services",
    icon: "page",
    keywords: ["services", "what we do", "offerings"],
  },
  {
    id: "page-services-geo",
    group: "Pages",
    title: "Services / GEO",
    subtitle: "Become the brand AI quietly recommends",
    href: "/services/geo",
    icon: "page",
    keywords: ["geo", "generative engine optimization", "ai citations"],
  },
  {
    id: "page-services-paid",
    group: "Pages",
    title: "Services / Paid",
    subtitle: "Paid that harvests trust, not paid that taxes it",
    href: "/services/paid",
    icon: "page",
    keywords: ["paid", "ads", "google ads", "meta ads", "ppc"],
  },
  {
    id: "page-services-geo-x-paid",
    group: "Pages",
    title: "Services / GEO × Paid",
    subtitle: "The full flywheel. Both halves, one team.",
    href: "/services/geo-x-paid",
    icon: "page",
    keywords: ["geo x paid", "flywheel", "full service", "combined"],
  },
  {
    id: "page-case-studies",
    group: "Pages",
    title: "Case studies",
    subtitle: "Proof, in receipts",
    href: "/case-studies",
    icon: "page",
    keywords: ["case studies", "clients", "results", "proof"],
  },
  {
    id: "page-insights",
    group: "Pages",
    title: "Insights",
    subtitle: "Writing on GEO, AI visibility, paid",
    href: "/insights",
    icon: "page",
    keywords: ["insights", "blog", "articles", "writing"],
  },
  {
    id: "page-product",
    group: "Pages",
    title: "Product",
    subtitle: "Inside the operating system",
    href: "/product",
    icon: "page",
    keywords: ["product", "platform", "software"],
  },
  {
    id: "page-walkthrough",
    group: "Pages",
    title: "Walkthrough",
    subtitle: "How an engagement runs, week by week",
    href: "/walkthrough",
    icon: "page",
    keywords: ["walkthrough", "process", "engagement"],
  },
  {
    id: "page-tools",
    group: "Pages",
    title: "Tools",
    subtitle: "Free utilities for marketers",
    href: "/tools",
    icon: "page",
    keywords: ["tools", "utilities", "free"],
  },
  {
    id: "page-about",
    group: "Pages",
    title: "About",
    subtitle: "Who we are, why we built Momentus",
    href: "/about",
    icon: "page",
    keywords: ["about", "team", "company", "story"],
  },
  {
    id: "page-contact",
    group: "Pages",
    title: "Contact",
    subtitle: "Talk to the team",
    href: "/contact",
    icon: "page",
    keywords: ["contact", "talk", "reach out", "email"],
  },
  {
    id: "page-changelog",
    group: "Pages",
    title: "Changelog",
    subtitle: "What shipped, when",
    href: "/changelog",
    icon: "page",
    keywords: ["changelog", "releases", "updates"],
  },
  {
    id: "page-privacy",
    group: "Pages",
    title: "Privacy",
    subtitle: "How we handle your data",
    href: "/privacy",
    icon: "page",
    keywords: ["privacy", "policy", "data", "gdpr"],
  },
];

// -----------------------------------------------------------------------------
// Tools — every interactive utility under /tools/*.
// -----------------------------------------------------------------------------
const TOOLS: PaletteItem[] = [
  {
    id: "tool-audit",
    group: "Tools",
    title: "AI Visibility Audit",
    subtitle: "See where you rank across ChatGPT, Perplexity, Gemini",
    href: "/tools/audit",
    icon: "tool",
    keywords: [
      "audit",
      "ai visibility",
      "citation share",
      "chatgpt",
      "perplexity",
      "gemini",
    ],
  },
  {
    id: "tool-roi",
    group: "Tools",
    title: "ROI Calculator",
    subtitle: "Model GEO + Paid economics in 60 seconds",
    href: "/tools/roi",
    icon: "tool",
    keywords: ["roi", "calculator", "economics", "math", "revenue"],
  },
];

// -----------------------------------------------------------------------------
// Insights — hardcoded slug list mirrors content/insights/*.mdx so this file
// stays Node-free and safe to import from a client component. If a post is
// added or removed under content/insights, mirror the change here.
// -----------------------------------------------------------------------------
const INSIGHT_SLUGS: { slug: string; title: string; dek: string }[] = [
  {
    slug: "audit-your-ai-citation-share",
    title: "Audit your AI citation share",
    dek: "How to measure where you actually rank across ChatGPT, Perplexity and Gemini.",
  },
  {
    slug: "geo-vs-seo-the-dictionary",
    title: "GEO vs SEO: the dictionary",
    dek: "Plain definitions for the terms people keep confusing.",
  },
  {
    slug: "the-quality-score-knock-on-effect",
    title: "The quality score knock-on effect",
    dek: "Why AI-warmed traffic quietly improves your paid quality scores.",
  },
  {
    slug: "what-we-changed-at-sw-solar-week-1",
    title: "What we changed at SW Solar — week 1",
    dek: "A diary of the first seven days inside a solar GEO engagement.",
  },
  {
    slug: "why-default-brand-status-compounds",
    title: "Why default brand status compounds",
    dek: "Once you're the answer, you stay the answer. The mechanics behind the moat.",
  },
];

const INSIGHTS: PaletteItem[] = INSIGHT_SLUGS.map((p) => ({
  id: `insight-${p.slug}`,
  group: "Insights",
  title: p.title,
  subtitle: p.dek,
  href: `/insights/${p.slug}`,
  icon: "post",
  keywords: ["insight", "post", "article", p.slug.replace(/-/g, " ")],
}));

// -----------------------------------------------------------------------------
// Case studies — derived from the shared CASE_STUDIES list so this stays in
// lockstep with the index + slug pages.
// -----------------------------------------------------------------------------
const CASES: PaletteItem[] = CASE_STUDIES.map((c) => ({
  id: `case-${c.slug}`,
  group: "Case studies",
  title: c.brand,
  subtitle: `${c.vertical} · ${c.headline.metric} ${c.headline.label}`,
  href: `/case-studies/${c.slug}`,
  icon: "case",
  keywords: [
    "case",
    "case study",
    c.slug.replace(/-/g, " "),
    c.vertical,
    c.region,
    c.duration,
    ...c.chips,
  ],
}));

// -----------------------------------------------------------------------------
// Actions — non-navigation commands.
// -----------------------------------------------------------------------------
const ACTIONS: PaletteItem[] = [
  {
    id: "action-calendly",
    group: "Actions",
    title: "Book a free call",
    subtitle: "Opens Calendly in a new tab",
    action: "calendly",
    icon: "phone",
    keywords: ["book", "call", "meeting", "calendly", "schedule", "demo"],
  },
  {
    id: "action-copy-email",
    group: "Actions",
    title: "Email Viktor",
    subtitle: "Copies viktor@momentus.ai to clipboard",
    action: "copy-email",
    icon: "email",
    keywords: ["email", "viktor", "copy", "contact"],
  },
  {
    id: "action-scroll-top",
    group: "Actions",
    title: "Scroll to top",
    subtitle: "Back to the top of the page",
    action: "scroll-top",
    icon: "arrow-up",
    keywords: ["scroll", "top", "up"],
  },
];

/**
 * Group display order — the palette renders groups in this sequence.
 */
export const GROUP_ORDER: PaletteGroup[] = [
  "Pages",
  "Tools",
  "Insights",
  "Case studies",
  "Actions",
];

/**
 * Returns every palette item. Stable across renders — safe to memoize on the
 * client behind a useMemo without a dep array beyond the initial mount.
 */
export function getPaletteItems(): PaletteItem[] {
  return [...PAGES, ...TOOLS, ...INSIGHTS, ...CASES, ...ACTIONS];
}

/** The email the `copy-email` action writes to clipboard. */
export const CONTACT_EMAIL = "viktor@momentus.ai";
