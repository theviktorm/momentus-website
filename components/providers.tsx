"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // touch devices keep native momentum scroll
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: true,
    });

    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // anchor link interception so Lenis owns scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return <>{children}</>;
}
