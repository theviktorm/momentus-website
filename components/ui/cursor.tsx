"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const RING_SIZE = 32;
const DOT_SIZE = 6;
const LINK_SELECTOR =
  'a, button, [role="button"], [data-cursor="link"], summary, label[for], input[type="submit"], input[type="button"]';

export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // 1:1 dot follows the cursor exactly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring lags behind via spring
  const ringX = useSpring(dotX, { damping: 22, stiffness: 220, mass: 0.45 });
  const ringY = useSpring(dotY, { damping: 22, stiffness: 220, mass: 0.45 });

  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setEnabled(mql.matches);
    apply();
    mql.addEventListener?.("change", apply);
    return () => mql.removeEventListener?.("change", apply);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const isLink = (el: Element | null): boolean => {
      if (!el) return false;
      return !!el.closest(LINK_SELECTOR);
    };

    const onOver = (e: MouseEvent) => {
      setHovering(isLink(e.target as Element));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    // Hide native cursor only when the custom cursor is active
    const prevBodyCursor = document.body.style.cursor;
    document.body.style.cursor = "none";
    // Make sure interactive elements don't fight us with their own cursors
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-momentus-cursor", "");
    styleEl.textContent = `
      html, body, a, button, [role="button"], summary, label, input, textarea, select { cursor: none !important; }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.style.cursor = prevBodyCursor;
      styleEl.parentNode?.removeChild(styleEl);
    };
  }, [enabled, dotX, dotY]);

  if (reduce || !enabled) return null;

  return (
    <>
      {/* Outline ring — lags behind via spring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border transition-[border-color,transform] duration-200 ease-out"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovering ? "rgb(198 255 61)" : "rgba(255,255,255,0.45)",
          transform: hovering ? "scale(1.6)" : "scale(1)",
          mixBlendMode: "difference",
        }}
      />
      {/* Solid dot — 1:1 with cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[71] rounded-full bg-accent"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
