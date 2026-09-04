import { ImageResponse } from "next/og";

/**
 * The card people see when the link is pasted into a message, a post or a
 * search result preview. Drawn here rather than shipped as a file so it never
 * goes stale against the palette, and so it stays a few kilobytes.
 */
export const runtime = "nodejs";
export const alt = "DeSite grizzly screeners — SLG 56, SLG 78 and SLG 108";
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
          background: "linear-gradient(135deg, #02122d 0%, #052356 55%, #0A0A0A 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#38B6FF",
              color: "#052356",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", color: "#FFFFFF", fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>
            <span>DeSite</span>
            <span style={{ color: "#38B6FF" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#38B6FF",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 7,
              textTransform: "uppercase",
            }}
          >
            Spring Suspension
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -3,
              marginTop: 14,
            }}
          >
            Grizzly Screeners
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 34, marginTop: 22 }}>
            Bucket-fed topsoil, mulch and rock screening
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {["SLG 56", "SLG 78", "SLG 108"].map((m) => (
            <div
              key={m}
              style={{
                display: "flex",
                border: "2px solid rgba(56,182,255,0.45)",
                borderRadius: 999,
                padding: "12px 28px",
                color: "#FFFFFF",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {m}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
