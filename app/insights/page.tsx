import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/ui/post-card";
import { getAllInsights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights | Momentus",
  description:
    "Editorial thinking on GEO, AI citation share, paid efficiency, and how the recommendation layer is rewriting category dynamics. Written for CMOs.",
  openGraph: {
    title: "Insights | Momentus",
    description:
      "Editorial thinking on GEO, AI citation share, paid efficiency, and how the recommendation layer is rewriting category dynamics.",
    type: "website",
  },
};

export default function InsightsIndex() {
  const posts = getAllInsights();

  return (
    <>
      <Nav />
      <main className="pb-28 pt-36 md:pt-44">
        <section className="container max-w-4xl">
          <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            11 / Insights
          </span>
          <h1 className="font-display mt-5 text-balance text-5xl font-medium tracking-tight md:text-7xl">
            Things we actually believe.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-white/65 md:text-xl">
            Not for the algorithm. For the strategy decks you&apos;ll write next quarter.
          </p>
        </section>

        <section className="container mt-16 max-w-4xl space-y-6 md:mt-24">
          {posts.length === 0 ? (
            <p className="text-white/55">No posts yet.</p>
          ) : (
            posts.map((p) => <PostCard key={p.slug} post={p} />)
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
