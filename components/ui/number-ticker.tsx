"use client";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  decimalPlaces = 0,
  className,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimalPlaces?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix +
          Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces))) +
          suffix;
      }
    });
  }, [springValue, decimalPlaces, prefix, suffix]);

  return <span ref={ref} className={cn("inline-block tabular-nums", className)}>{prefix}0{suffix}</span>;
}
