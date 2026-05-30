import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "404 — Not on this surface | Momentus",
  description:
    "The page you're after isn't here. Try a case study, the free audit, or book a call.",
  robots: { index: false, follow: true },
};

type Suggestion = {
  n: string;
  title: string;
  copy: string;
  href: string;
  external?: boolean;
};

const SUGGESTIONS: Suggestion[] = [
  {
    n: "01",
    title: "Read a case study",
    copy: "How we moved brands from invisible to default in 90 days.",
    href: "/case-studies",
  },
  {
    n: "02",
    title: "Try the audit tool",
    copy: "Free GEO audit. Plain English. No credit card.",
    href: "/tools/audit",
  },
  {
    n: "03",
    title: "Book a free call",
    copy: "30 minutes. Strategy, not a sales pitch.",
    href: CALENDLY_URL,
    external: true,
  },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pb-24 pt-36 md:pt-44">
        <section className="container">
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="relative inline-flex select-none items-end justify-center">
              <span
                aria-hidden
                className="font-display block text-[clamp(8rem,22vw,18rem)] font-medium leading-none tracking-tighter text-white/95"
              >
                404
              </span>
              <span
                aria-hidden
                className="font-display ml-2 text-[clamp(4rem,10vw,8rem)] font-light leading-none tracking-tight text-accent"
              >
                /
              </span>
              <span className="font-mono absolute -bottom-2 right-[-0.5rem] translate-y-full whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent md:right-[-1.5rem] md:translate-y-2/3">
                Not on this surface
              </span>
            </div>

            <h1 className="font-display mt-20 text-balance text-3xl font-medium tracking-tight md:mt-24 md:text-5xl">
              This page didn&rsquo;t make it into AI&rsquo;s answer set.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/65 md:text-lg">
              Pages, like brands, fade if no one&rsquo;s pointing at them. This one might have
              moved, or never existed. Here&rsquo;s where to go next.
            </p>
          </div>

          <ul className="mx-auto mt-16 grid max-w-5xl gap-4 md:mt-20 md:grid-cols-3">
            {SUGGESTIONS.map((s) => {
              const inner = (
                <>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      {s.n} /
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-10">
                    <h2 className="font-display text-xl tracking-tight md:text-2xl">{s.title}</h2>
                    <p className="mt-2 text-sm text-white/60">{s.copy}</p>
                  </div>
                </>
              );
              return (
                <li key={s.n}>
                  {s.external ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="group glass relative flex h-full flex-col justify-between rounded-3xl p-6 transition hover:border-accent/40 hover:shadow-glow md:p-7"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={s.href}
                      data-cursor="link"
                      className="group glass relative flex h-full flex-col justify-between rounded-3xl p-6 transition hover:border-accent/40 hover:shadow-glow md:p-7"
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="mt-14 text-center text-sm text-white/45">
            Or head back{" "}
            <Link href="/" className="text-accent hover:text-accent-soft" data-cursor="link">
              home
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
