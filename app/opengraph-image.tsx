import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "SonoJS"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0B1220",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 56,
            height: 8,
            borderRadius: 999,
            background: "#396EF0",
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            lineHeight: 1.05,
          }}
        >
          SonoJS
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            color: "#94A3B8",
            maxWidth: 820,
            lineHeight: 1.35,
          }}
        >
          Agent-friendly React components for Tailwind apps
        </div>
      </div>
    ),
    { ...size }
  )
}
