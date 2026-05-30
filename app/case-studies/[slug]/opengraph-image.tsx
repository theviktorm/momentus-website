import { ImageResponse } from "next/og";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";

export const runtime = "nodejs";
export const alt = "Momentus — Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pre-render one OG image per known case-study slug at build time.
 * Mirrors the slugs surfaced by `generateStaticParams` on the page.
 */
export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);

  // Defensive: unknown slug → render a generic card so the route never throws.
  const data = study ?? {
    brand: "Momentus",
    thesis: "GEO × Paid case study",
    region: "—",
    duration: "—",
    headline: { metric: "—", label: "case study" },
  };

  const FONT_STACK =
    "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          background: "#07070A",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(198,255,61,0.20), transparent 55%), radial-gradient(circle at bottom right, rgba(198,255,61,0.08), transparent 55%)",
          color: "#fff",
          fontFamily: FONT_STACK,
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <span style={{ color: "#C6FF3D" }}>MOMENTUS</span>
            <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
              ·
            </span>
            <span>CASE STUDY</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <span>{data.region}</span>
            <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
              ·
            </span>
            <span>{data.duration}</span>
          </div>
        </div>

        {/* Center row: metric (left) + brand/thesis (right) */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 32,
            gap: 56,
          }}
        >
          {/* Left: huge metric */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 620,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 140,
                lineHeight: 0.95,
                letterSpacing: -4,
                fontWeight: 600,
                color: "#C6FF3D",
              }}
            >
              {data.headline.metric}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 18,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              {data.headline.label}
            </div>
          </div>

          {/* Right: brand + thesis */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
              alignItems: "flex-end",
              maxWidth: 480,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: -1.5,
                lineHeight: 1.05,
                color: "#fff",
              }}
            >
              {data.brand}
            </div>
            <div
              style={{
                display: "-webkit-box" as unknown as "flex",
                fontSize: 24,
                lineHeight: 1.35,
                marginTop: 16,
                color: "rgba(255,255,255,0.65)",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as unknown as undefined,
                overflow: "hidden",
              }}
            >
              {data.thesis}
            </div>
          </div>
        </div>

        {/* Bottom-right URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 20,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            momentus.ai
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
