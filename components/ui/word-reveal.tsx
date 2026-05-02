"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlight?: string[]; // words to render in accent color
  italic?: string[]; // words rendered italic
}

/** Word-by-word reveal: each word slides up + blur-out → 0 with stagger. */
export function WordReveal({ text, className, delay = 0, highlight = [], italic = [] }: WordRevealProps) {
  const words = text.split(" ");
  return (
    <span className={cn("inline-block", className)}>
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?;:]/g, "");
        const isAccent = highlight.includes(clean);
        const isItalic = italic.includes(clean);
        return (
          <motion.span
            key={`${w}-${i}`}
            initial={{ y: "0.6em", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 0.65, 0.2, 1],
              delay: delay + i * 0.06,
            }}
            className={cn(
              "inline-block whitespace-pre",
              isAccent && "text-accent",
              isItalic && "italic",
            )}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        );
      })}
    </span>
  );
}

/** Wrap arbitrary children, animating opacity+blur on viewport entry. */
export function FadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.65, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
