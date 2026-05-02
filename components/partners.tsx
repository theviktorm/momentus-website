"use client";
import { Marquee } from "./ui/marquee";
import { RatingBadge } from "./ui/rating-badge";

const logos = [
  "Batz Hungary",
  "Emineo Private Clinic",
  "Aesthetic Plastic Surgery",
  "Oktogon Medical",
  "SW Solar",
  "True Health",
  "Furora",
  "Life Bridge Coaching",
  "Divit",
];

export function Partners() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-12">
      <div className="container">
        <div className="mb-6 flex flex-col items-center justify-center gap-3 md:flex-row md:gap-6">
          <p className="font-mono text-center text-xs uppercase tracking-[0.22em] text-white/55">
            Trusted by teams that depend on being the safe choice
          </p>
          <span aria-hidden className="hidden h-3 w-px bg-white/15 md:block" />
          <RatingBadge rating={4.9} reviews={47} platform="Clutch" />
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />
          <Marquee pauseOnHover className="[--duration:55s]">
            {logos.map((l) => (
              <div
                key={l}
                className="font-display flex items-center px-8 text-2xl tracking-tight text-white/55 transition hover:text-white md:text-3xl"
              >
                {l}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
