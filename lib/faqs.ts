/**
 * Source of truth for the homepage FAQ Q&As.
 * Lives outside components/faq.tsx so both the client accordion AND the
 * server-rendered FAQPage JSON-LD can import it without crossing the
 * client/server boundary (which React would otherwise proxy and break).
 */

export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Is GEO different from SEO?",
    a: "SEO ranks pages on Google's results list. GEO determines whether ChatGPT, Perplexity, Gemini, Claude, Copilot and Google AI Overview cite you when a buyer asks for the best in your category. Different signals, different surfaces, different timeline. We run both alongside paid because each multiplies the other.",
  },
  {
    q: "How long until I see citations?",
    a: "First measurable citation lift typically lands inside 21–45 days. The full flywheel — AI warms the market → paid harvests it → AI reinforces the winner — compounds over 90–180 days. We publish a 30-day signal report regardless of timing.",
  },
  {
    q: "Do you guarantee #1 placement?",
    a: "No. Any agency that does is selling you something that recommendation engines can yank tomorrow. We guarantee a defensible plan, transparent signal control, and weekly reports. If we don't think we can move you in 90 days, we say so during the audit.",
  },
  {
    q: "What's the minimum engagement?",
    a: "A 90-day initial sprint. We don't do month-to-month because AI citation patterns don't move on month-to-month attention spans. The audit (Book a free call) is genuinely free — it's our way of testing whether we'd be a fit.",
  },
  {
    q: "Who owns the data and the work?",
    a: "You do. Reports, audits, content, the dashboard data — yours. We don't gate or re-sell client data. If you bring this in-house later, we transfer the playbook.",
  },
  {
    q: "What if a competitor sees what's working and copies us?",
    a: "By the time they reverse-engineer it, AI's habit has formed around you. Default-brand status compounds. Signal coherence is hard to fake retroactively. The clients who win are the ones who move first, not the ones who move loudest.",
  },
];

/**
 * Precomputed {question, answer} shape for the FAQPage JSON-LD builder.
 * Built here (same module that owns FAQS) so server components don't have
 * to call `.map()` on FAQS across the RSC boundary — which Next.js refuses
 * when this module is also imported by a "use client" component.
 */
export const FAQS_QA: { question: string; answer: string }[] = FAQS.map((f) => ({
  question: f.q,
  answer: f.a,
}));
