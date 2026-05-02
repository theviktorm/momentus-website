import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#07070A",
        ink: "#0F0F14",
        line: "rgba(255,255,255,0.08)",
        accent: { DEFAULT: "#C6FF3D", soft: "#E4FF8E", deep: "#9BD300" },
        muted: "rgba(255,255,255,0.62)",
      },
      backgroundImage: {
        "grid-fade": "radial-gradient(ellipse at top, rgba(198,255,61,0.08), transparent 60%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-100% - var(--gap)))" } },
        "marquee-vertical": { from: { transform: "translateY(0)" }, to: { transform: "translateY(calc(-100% - var(--gap)))" } },
        "shine-pulse": { "0%,100%": { backgroundPosition: "0% 0%" }, "50%": { backgroundPosition: "100% 100%" } },
        "border-beam": { "100%": { "offset-distance": "100%" } },
        "fade-up": { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      animation: {
        marquee: "marquee var(--duration,40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration,40s) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "fade-up": "fade-up 0.6s cubic-bezier(.2,.7,.2,1) both",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
