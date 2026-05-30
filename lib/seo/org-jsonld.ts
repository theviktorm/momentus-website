/**
 * Site-wide structured data: Organization + WebSite.
 * Mounted as JSON-LD <script> tags from app/layout.tsx.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Momentus",
  url: BASE,
  logo: `${BASE}/icon.png`,
  description:
    "Specialist GEO × Paid agency. We engineer how AI assistants cite your brand, then run paid that harvests the trust it creates.",
  sameAs: [],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+421-917-301-868",
      contactType: "sales",
      areaServed: "EU",
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-484-983-8442",
      contactType: "sales",
      areaServed: "US",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  name: "Momentus",
  url: BASE,
  inLanguage: "en",
  publisher: { "@id": `${BASE}/#organization` },
};
