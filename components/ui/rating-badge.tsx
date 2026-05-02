import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating?: number;
  reviews?: number;
  platform?: string;
  href?: string;
  className?: string;
}

/**
 * Third-party validation pill: "★★★★★ 4.9 · 47 reviews on Clutch"
 * NOTE: Swap rating/reviews/href with real Clutch/G2/Trustpilot data before launch.
 */
export function RatingBadge({
  rating = 4.9,
  reviews = 47,
  platform = "Clutch",
  href,
  className,
}: RatingBadgeProps) {
  const Element = href ? "a" : "div";
  const fullStars = Math.floor(rating);
  return (
    <Element
      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur transition hover:border-accent/40 hover:bg-white/[0.06]",
        className,
      )}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={cn(
              "transition",
              i < fullStars ? "fill-accent text-accent" : "fill-white/15 text-white/15",
            )}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-white">{rating.toFixed(1)}</span>
      <span className="text-xs text-white/55">
        {reviews} reviews on <span className="text-white/85">{platform}</span>
      </span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-accent">
        <path d="M7 17L17 7M9 7h8v8" />
      </svg>
    </Element>
  );
}
