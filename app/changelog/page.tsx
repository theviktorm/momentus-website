import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Changelog | Momentus",
  description: "What we ship, when. Public log for clients and partners.",
};

type Entry = {
  date: string; // ISO YYYY-MM-DD
  human: string; // pretty date shown in UI
  title: string;
  bullets: string[];
  tag?: string;
};

const ENTRIES: Entry[] = [
  {
    date: "2026-05-19",
    human: "May 19, 2026",
    tag: "Wave 4",
    title: "Content depth, structured data, 404 polish",
    bullets: [
      "Long-form services briefs with JSON-LD Service schema on every page.",
      "Editorial 404 + global error boundary so dead links never feel dead-end.",
      "Public changelog so clients can see velocity at a glance.",
      "Subtle two-layer custom cursor on hover-capable devices.",
      "Sitemap + robots updated for every new route.",
    ],
  },
  {
    date: "2026-05-18",
    human: "May 18, 2026",
    tag: "Wave 3",
    title: "Mega-menu nav, page transitions, ROI calculator",
    bullets: [
      "Mega-menu under Services with one-liners for GEO, Paid, and the hybrid.",
      "Page-to-page transitions that respect reduced-motion preference.",
      "Interactive ROI calculator to model GEO + Paid contribution.",
      "SEO foundation: per-route metadata, OG inheritance, canonical URLs.",
    ],
  },
  {
    date: "2026-05-17",
    human: "May 17, 2026",
    tag: "Wave 2",
    title: "Insights blog, free audit tool, product walkthrough",
    bullets: [
      "/insights MDX-style blog with reading progress and post cards.",
      "Free GEO audit tool that returns a plain-English brief in seconds.",
      "Product walkthrough page for the Momentus dashboard.",
      "Plausible event tracking on every primary CTA.",
    ],
  },
  {
    date: "2026-05-15",
    human: "May 15, 2026",
    tag: "Wave 1",
    title: "Services, case studies, about, contact",
    bullets: [
      "Service detail pages for GEO, Paid, and GEO × Paid.",
      "Case studies index plus templated case-study layout.",
      "About page with team cards and the operating principles.",
      "Contact page with inline form and timezone-aware call booking.",
    ],
  },
  {
    date: "2026-05-12",
    human: "May 12, 2026",
    title: "Plausible analytics, OG image, /privacy",
    bullets: [
      "Plausible analytics wired site-wide, cookie-free.",
      "Dynamic Open Graph image generated at the edge.",
      "/privacy page with the full subprocessor list.",
    ],
  },
  {
    date: "2026-04-29",
    human: "April 29, 2026",
    title: "Marketing site v1 launched",
    bullets: [
      "Hero, flywheel, services overview, testimonials, FAQ, and CTA form.",
      "Brand system in place: Space Grotesk display, Inter body, accent green.",
      "Deployed to Railway with edge caching and instant rollbacks.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <main className="pb-24 pt-36 md:pt-44">
        <section className="container max-w-3xl">
          <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            Changelog
          </span>
          <h1 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            What we ship, when.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base text-white/65 md:text-lg">
            A public log of every notable release on momentus.ai and the Momentus product.
            Updated as work lands &mdash; not on a marketing calendar.
          </p>

          <ol className="mt-16 space-y-14 md:mt-20">
            {ENTRIES.map((e) => (
              <li key={e.date}>
                <article
                  className="relative border-l border-white/8 pl-6 md:pl-8"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-glow"
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <time
                      dateTime={e.date}
                      itemProp="datePublished"
                      className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55"
                    >
                      {e.human}
                    </time>
                    {e.tag ? (
                      <span className="font-mono rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.22em] text-accent">
                        {e.tag}
                      </span>
                    ) : null}
                  </div>
                  <h2
                    itemProp="name"
                    className="font-display mt-3 text-balance text-2xl font-medium tracking-tight md:text-3xl"
                  >
                    {e.title}
                  </h2>
                  <ul className="mt-5 space-y-2.5 text-pretty text-[15px] leading-relaxed text-white/75">
                    {e.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2.5 inline-block h-px w-3 flex-none bg-accent/60"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>

          <p className="mt-20 text-sm text-white/55">
            ←{" "}
            <Link className="text-accent" href="/" data-cursor="link">
              Back to momentus.ai
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
