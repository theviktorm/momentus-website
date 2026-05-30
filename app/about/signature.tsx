"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PendingPill } from "@/components/ui/pending-pill";

/**
 * FounderSignature — handwritten-style SVG with a stroke-dash animation that
 * draws the signature over ~3s. The animation restarts every time the element
 * scrolls back into view (no `once: true`). The path is a stand-in until a
 * real founder signature SVG lands.
 */
export function FounderSignature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  return (
    <div ref={ref} className="relative inline-flex items-end gap-3">
      <svg
        viewBox="0 0 360 110"
        className="h-20 w-auto text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-label="Viktor Mozsa signature"
      >
        <motion.path
          d="M10 78 C 18 30, 30 26, 38 64 C 42 80, 52 86, 60 60 C 66 40, 72 36, 78 70 L 86 30 L 96 78 L 108 32 M 122 50 C 138 36, 148 78, 132 80 C 120 80, 122 56, 138 52 C 154 48, 160 76, 152 82 M 176 50 C 168 60, 168 78, 180 80 C 192 80, 196 56, 184 52 C 174 50, 170 64, 184 76 L 198 60 M 212 32 L 212 84 M 212 60 C 222 50, 236 50, 244 64 C 252 78, 244 86, 232 80 M 262 78 C 260 60, 270 50, 282 56 C 296 64, 286 82, 272 82 M 304 84 C 304 60, 308 44, 320 50 C 332 56, 326 82, 312 82 M 344 50 C 340 60, 340 78, 354 76"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 3, ease: [0.4, 0.0, 0.2, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>
      <PendingPill label="real signature SVG" className="mb-1" />
    </div>
  );
}
