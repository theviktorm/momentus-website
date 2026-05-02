"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent via-accent-soft to-accent"
    />
  );
}
