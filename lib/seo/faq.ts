/**
 * FAQPage schema builder. Mirrors the visible Q&A on the homepage so that
 * AI assistants and Google can surface the same answers we already publish.
 */

export function faqJsonLd(qa: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
