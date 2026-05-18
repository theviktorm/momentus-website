import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Momentus — Take first place in AI citations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          background:
            "radial-gradient(900px 600px at 12% 14%, rgba(198,255,61,0.22), transparent 60%), #07070A",
          color: "#fff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Logo: three isometric cubes */}
        <svg
          width={92}
          height={92}
          viewBox="0 0 64 64"
          style={{ marginBottom: 36, color: "#C6FF3D" }}
        >
          <path d="M22 12 L34 6 L46 12 L46 22 L34 28 L22 22 Z" fill="currentColor" />
          <path d="M10 30 L22 24 L34 30 L34 40 L22 46 L10 40 Z" fill="currentColor" />
          <path d="M34 30 L46 24 L58 30 L58 40 L46 46 L34 40 Z" fill="currentColor" />
        </svg>

        <div
          style={{
            fontFamily: "Space Grotesk, Inter, sans-serif",
            fontSize: 80,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1,
            textAlign: "center",
            color: "#fff",
            display: "flex",
          }}
        >
          Take first place in AI citations
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            display: "flex",
          }}
        >
          GEO × Paid for the brands AI is about to choose
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 40,
            fontFamily: "monospace",
            fontSize: 18,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          momentus.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
