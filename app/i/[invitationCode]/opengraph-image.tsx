import { ImageResponse } from "next/og";
import { wedding } from "@/lib/wedding";

export const alt = `${wedding.groom} and ${wedding.bride} wedding invitation`;
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
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          color: "#f4ede2",
          background:
            "radial-gradient(ellipse at 50% 45%, #4b1420 0%, #210b10 47%, #090708 100%)",
          fontFamily: "Georgia, serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 26,
            border: "1px solid rgba(224, 189, 121, .68)",
            display: "flex"
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 36,
            border: "1px solid rgba(224, 189, 121, .22)",
            display: "flex"
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            border: "1px solid rgba(224, 189, 121, .13)",
            borderRadius: "50%",
            display: "flex"
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1
          }}
        >
          <div
            style={{
              color: "#d8b36e",
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase"
            }}
          >
            With joy &amp; blessings
          </div>
          <div style={{ marginTop: 32, fontSize: 72, fontWeight: 400 }}>
            {wedding.groom} <span style={{ color: "#d8b36e", fontStyle: "italic" }}>&amp;</span> {wedding.bride}
          </div>
          <div
            style={{
              width: 120,
              height: 1,
              marginTop: 28,
              marginBottom: 24,
              background: "#d8b36e",
              display: "flex"
            }}
          />
          <div style={{ color: "#e3d4c1", fontSize: 22, letterSpacing: 7 }}>
            WEDDING INVITATION
          </div>
          <div style={{ color: "#c5a878", fontSize: 16, letterSpacing: 5, marginTop: 16 }}>
            HOMECOMING CELEBRATION
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
