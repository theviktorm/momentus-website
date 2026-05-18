"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./ui/logo";
import { CALENDLY_URL } from "@/lib/config";
import { track } from "@/lib/track";

const items = [
  { href: "#flywheel", label: "Flywheel" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#proof", label: "Proof" },
  { href: "#fit", label: "Fit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-3 py-2 transition-all",
            scrolled ? "glass shadow-glow" : "border border-transparent",
          )}
        >
          <Link href="#" className="flex items-center gap-2.5 pl-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent p-1 text-bg">
              <Logo />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Momentus</span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {items.map((it) => (
              <li key={it.href}>
                <a
                  href={it.href}
                  className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("cta_click", { location: "nav", label: "book_free_call" })}
            className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft md:text-[11px]"
          >
            <span className="hidden sm:inline">Book a free call</span>
            <span className="sm:hidden">Free call</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
