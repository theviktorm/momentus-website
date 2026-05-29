"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./ui/logo";
import { CALENDLY_URL } from "@/lib/config";
import { track } from "@/lib/track";

const SERVICES = [
  {
    href: "/services/geo",
    n: "01",
    title: "GEO",
    one: "Become the brand AI quietly recommends.",
  },
  {
    href: "/services/paid",
    n: "02",
    title: "Paid",
    one: "Paid that harvests trust, not paid that taxes it.",
  },
  {
    href: "/services/geo-x-paid",
    n: "03",
    title: "GEO × Paid",
    one: "The full flywheel. Both halves, one team.",
  },
];

interface NavItem {
  label: string;
  /** Anchor (for homepage in-page) — used when current page is `/` */
  anchor: string;
  /** Optional fallback href when off-homepage */
  off?: string;
}

const ITEMS: NavItem[] = [
  { label: "Flywheel", anchor: "#flywheel", off: "/#flywheel" },
  { label: "Services", anchor: "#services", off: "/services" },
  { label: "Process", anchor: "#process", off: "/#process" },
  { label: "Proof", anchor: "#proof", off: "/#proof" },
  { label: "Fit", anchor: "#fit", off: "/#fit" },
];

export function Nav() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const resolveHref = (it: NavItem) => (isHome ? it.anchor : it.off || it.anchor);

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
            scrolled || !isHome ? "glass shadow-glow" : "border border-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent p-1 text-bg">
              <Logo />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Momentus</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {ITEMS.map((it) => {
              if (it.label === "Services") {
                return (
                  <li
                    key={it.label}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={resolveHref(it)}
                      className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                      onFocus={openServices}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                    >
                      {it.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={cn("transition", servicesOpen && "rotate-180")}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </Link>
                    <ServicesMenu open={servicesOpen} onClose={scheduleClose} onOpen={openServices} />
                  </li>
                );
              }
              return (
                <li key={it.label}>
                  <Link
                    href={resolveHref(it)}
                    className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("cta_click", { location: "nav", label: "book_free_call" })}
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft md:text-[11px]"
            >
              <span className="hidden sm:inline">Book a free call</span>
              <span className="sm:hidden">Free call</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <MobileMenu
          open={mobileOpen}
          isHome={isHome}
          items={ITEMS}
          resolveHref={resolveHref}
        />
      </div>
    </header>
  );
}

function ServicesMenu({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className={cn(
        "absolute left-1/2 top-full z-50 mt-3 w-[min(820px,90vw)] -translate-x-1/2 transition",
        open
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-1",
      )}
    >
      <div className="glass overflow-hidden rounded-3xl p-3 shadow-glow">
        <div className="grid gap-2 md:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex h-full flex-col justify-between gap-3 rounded-2xl border border-white/5 bg-black/30 p-5 transition hover:border-accent/40 hover:bg-black/40"
            >
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
              <div>
                <h3 className="font-display text-lg tracking-tight">{s.title}</h3>
                <p className="mt-1 text-xs text-white/60">{s.one}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/5 bg-black/20 px-4 py-2.5 text-xs text-white/55">
          <span>Three disciplines. One scoreboard.</span>
          <Link href="/services" className="text-accent hover:text-accent-soft">
            All services →
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({
  open,
  isHome,
  items,
  resolveHref,
}: {
  open: boolean;
  isHome: boolean;
  items: NavItem[];
  resolveHref: (it: NavItem) => string;
}) {
  if (!open) return null;
  return (
    <div className="mt-2 md:hidden">
      <div className="glass rounded-2xl p-3">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.label}>
              {it.label === "Services" ? (
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5">
                    <span>Services</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="text-white/45 transition group-open:rotate-180"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <ul className="mt-1 space-y-1 pl-2">
                    {SERVICES.map((s) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="flex items-baseline gap-3 rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5"
                        >
                          <span className="font-mono text-[10px] text-accent">{s.n} /</span>
                          <span>{s.title}</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/services"
                        className="block rounded-xl px-3 py-2 text-sm text-accent hover:bg-white/5"
                      >
                        All services →
                      </Link>
                    </li>
                  </ul>
                </details>
              ) : (
                <Link
                  href={resolveHref(it)}
                  className="block rounded-xl px-3 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                >
                  {it.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
