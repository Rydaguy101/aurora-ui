import { ImageResponse } from "next/og";

import { COMPONENT_COUNT, SITE } from "@/lib/site-config";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #050505 0%, #12082a 45%, #041018 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, opacity: 0.9 }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Build interfaces that feel alive
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,0.72)" }}>
            {COMPONENT_COUNT}+ animated components · WebGL heroes · AI-ready CLI & MCP
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "rgba(255,255,255,0.55)" }}>
          <span>Next.js</span>
          <span>·</span>
          <span>Tailwind</span>
          <span>·</span>
          <span>Framer Motion</span>
          <span>·</span>
          <span>Radix UI</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
