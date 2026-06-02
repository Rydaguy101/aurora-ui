import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site-config";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #050505 0%, #12082a 50%, #041018 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>{SITE.name}</div>
        <div style={{ marginTop: 16, fontSize: 28, color: "rgba(255,255,255,0.75)" }}>
          {SITE.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
