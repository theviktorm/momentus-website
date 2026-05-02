"use client";
import { cn } from "@/lib/utils";

export function Spotlight({ className, fill = "#C6FF3D" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute z-0 opacity-50 blur-3xl", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822, -0.569, -0.569, 0.822, 3631.88, 2291.09)" fill={fill} fillOpacity="0.21"></ellipse>
      </g>
      <defs>
        <filter id="filter" x="0" y="0" width="3787" height="2842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
}
