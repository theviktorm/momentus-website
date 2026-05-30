import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Tools | Momentus",
  description: "Free tools that show you exactly what we'd show a client on a call.",
};

const tools = [
  {
    href: "/tools/audit",
    n: "01",
    title: "AI Visibility Audit",
    one: "Same audit we run on minute 5 of a $20K call. Free.",
    chip: "Live",
    chipClass: "border-accent/40 bg-accent/10 text-accent",
  },
  {
    href: "/tools/roi",
    n: "02",
    title: "ROI Calculator",
    one: "Project the CPC drop + CAC restructure when GEO pre-sells your category.",
    chip: "Live",
    chipClass: "border-accent/40 bg-accent/10 text-accent",
  },
];

export default function ToolsIndex() {
  return (
    <>
      <Nav />
      <main className="pt-36 md:pt-44">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
              12 / Tools
            </span>
            <h1 className="font-display mt-5 text-balance text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
              Free tools. Real results.
            </h1>
            <p className="mt-6 text-white/65 md:text-lg">
              Same audits we run on prospect calls. No signup. We don&apos;t store your data unless you tell us to.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-2">
            {tools.map((t) => {
              const inner = (
                <article
                  className={`glass group relative flex h-full flex-col rounded-2xl p-8 transition ${
                    false ? "opacity-60" : "hover:-translate-y-1 hover:border-accent/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                      {t.n} / {false ? "Tool" : "Live tool"}
                    </span>
                    <span
                      className={`font-mono inline-block rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] ${t.chipClass}`}
                    >
                      {t.chip}
                    </span>
                  </div>
                  <h2 className="font-display mt-6 text-3xl tracking-tight md:text-4xl">{t.title}</h2>
                  <p className="mt-3 max-w-md text-white/70">{t.one}</p>
                  <div className="mt-auto pt-8">
                    <span className="inline-flex items-center gap-1.5 text-sm text-accent transition group-hover:gap-2.5">
                      {false ? "Notify me" : "Open tool"}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </article>
              );
              return false ? (
                <div key={t.title}>{inner}</div>
              ) : (
                <Link key={t.title} href={t.href} className="group block">
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-32" />
      </main>
      <Footer />
    </>
  );
}
