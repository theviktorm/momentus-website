"use client";
import { Marquee } from "./ui/marquee";

const words = [
  "Default brand status",
  "Citation share",
  "Entity trust",
  "Quality Score",
  "LTV : CAC",
  "Branded search",
  "Pre-sold demand",
  "Recommendation share of voice",
  "Signal coherence",
  "Authority compounding",
];

export function ValuesMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-10">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
        <Marquee className="[--duration:60s]">
          {words.map((w) => (
            <div key={w} className="font-display flex items-center gap-6 px-6 text-2xl tracking-tight md:text-3xl">
              <span className="text-white/85">{w}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
