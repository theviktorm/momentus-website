import { ImageResponse } from "next/og";

/**
 * Shared OG-image template for the three /services/* pages. Each service
 * page's `opengraph-image.tsx` is a thin wrapper that calls
 * `renderServiceOg` with its own hardcoded copy. Keeps the three modules
 * tiny while pinning a single visual treatment.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

const FONT_STACK =
  "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO =
  "ui-monospace, SFMono-Regular, Menlo, monospace";

export type ServiceOgProps = {
  /** "01" | "02" | "03" */
  num: string;
  /** "GEO" | "PAID" | "GEO × PAID" */
  serviceLabel: string;
  /** Big H1 of the page */
  headline: string;
  /** "/services/{slug}" */
  pathSuffix: string;
};

export function renderServiceOg(props: ServiceOgProps): ImageResponse {
  const { num, serviceLabel, headline, pathSuffix } = props;

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
            alignItems: "center",
            width: "100%",
            fontFamily: MONO,
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
          <span>SERVICE</span>
          <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
            ·
          </span>
          <span style={{ color: "#C6FF3D" }}>{num}</span>
          <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
            /
          </span>
          <span>{serviceLabel}</span>
        </div>

        {/* Centered headline */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "-webkit-box" as unknown as "flex",
              fontSize: 84,
              lineHeight: 1.04,
              letterSpacing: -3,
              fontWeight: 600,
              color: "#fff",
              maxWidth: 1060,
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical" as unknown as undefined,
              overflow: "hidden",
            }}
          >
            {headline}
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
              fontFamily: MONO,
              fontSize: 20,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            momentus.ai{pathSuffix}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
