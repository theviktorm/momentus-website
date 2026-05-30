"use client";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Top-of-page reading progress bar (3px accent), scoped to a single article.
 * Sits below the global ScrollProgress hairline so both can coexist.
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-[1px] z-[55] h-[3px] origin-left bg-accent shadow-[0_0_20px_rgba(198,255,61,0.6)]"
      aria-hidden
    />
  );
}
