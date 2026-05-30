/**
 * Service schema builder. Used by /services/* pages so retrieval systems
 * understand each offering as a distinct service node provided by the
 * Organization declared site-wide.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

export function serviceJsonLd(args: {
  url: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    url: args.url,
    provider: { "@id": `${BASE}/#organization` },
    areaServed: args.areaServed || ["Worldwide"],
  };
}
