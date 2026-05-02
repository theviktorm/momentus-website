"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface CinemaBandProps {
  src: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  className?: string;
}

/**
 * Cinematic video band with copy STACKED ABOVE — never overlaid on the video.
 * The video sits clean below, edge-feathered into the section background.
 * Subtle parallax on scroll for richness.
 */
export function CinemaBand({ src, eyebrow, title, body, className }: CinemaBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yVideo = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div ref={ref} className={cn("mt-16", className)}>
      {/* Copy block — sits above, like a section sub-header */}
      {(eyebrow || title || body) && (
        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 0.65, 0.2, 1] }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          {eyebrow && (
            <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-accent md:text-xs">
              {eyebrow}
            </span>
          )}
          {title && (
            <h3 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              {title}
            </h3>
          )}
          {body && (
            <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-white/65 md:text-lg">
              {body}
            </p>
          )}
        </motion.div>
      )}

      {/* Video band — pristine, no overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 0.65, 0.2, 1] }}
        className="relative isolate mx-auto w-full overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9]"
      >
        <motion.div style={{ y: yVideo }} className="absolute -inset-y-10 inset-x-0">
          <iframe
            src={src}
            title="GEO × Paid loop"
            loading="lazy"
            className="h-full w-full"
            style={{ border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </motion.div>

        {/* Edge feathering — bleeds into section bg, no card silhouette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 95% 80% at 50% 50%, transparent 55%, rgba(7,7,10,0.5) 85%, rgba(7,7,10,0.95) 100%)",
          }}
        />

        {/* Accent vignette + hairline */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] [background:radial-gradient(circle_at_50%_120%,rgba(198,255,61,0.18),transparent_55%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10" />
      </motion.div>
    </div>
  );
}
