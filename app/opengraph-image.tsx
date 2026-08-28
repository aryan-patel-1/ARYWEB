import { ImageResponse } from "next/og";

export const alt = "AryWeb — Votre activité bien expliquée, votre site facile à utiliser";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "48px 58px",
          color: "#f2f0eb",
          background: "#05070b",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            paddingBottom: 26,
            borderBottom: "1px solid rgba(189,231,255,.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 29, fontWeight: 800, letterSpacing: -2 }}>
            ARY<span style={{ color: "#bde7ff" }}>WEB</span>
          </div>
          <div style={{ color: "#64c8ff", display: "flex", fontSize: 13, fontWeight: 700, letterSpacing: 3 }}>
            STUDIO WEB INDÉPENDANT
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 54 }}>
          <div style={{ width: 650, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 0.94, fontWeight: 750, letterSpacing: -5 }}>
              <span>Votre activité,</span>
              <span>bien expliquée.</span>
              <span style={{ marginTop: 18, color: "#bde7ff" }}>Votre site,</span>
              <span style={{ color: "#bde7ff" }}>facile à utiliser.</span>
            </div>
            <div style={{ marginTop: 34, color: "#aab7c4", display: "flex", fontSize: 18 }}>
              Sites web • cartes NFC • tarifs accessibles
            </div>
          </div>

          <div
            style={{
              width: 350,
              height: 410,
              padding: "24px 27px",
              color: "#101318",
              background: "#e9e6df",
              boxShadow: "18px 22px 0 rgba(22,135,255,.2)",
              transform: "rotate(-3deg)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontWeight: 800, letterSpacing: 2 }}>
              <span>ARYWEB</span><span>ÉDITION 01</span>
            </div>
            <div style={{ marginTop: 45, color: "#5b626a", display: "flex", fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
              UN SITE DOIT RÉPONDRE À
            </div>
            <div style={{ marginTop: 7, display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 0.83, fontWeight: 800, letterSpacing: -4 }}>
              <span>QUI ?</span>
              <span style={{ color: "#1687ff" }}>QUOI ?</span>
            </div>
            <div style={{ width: 190, height: 7, marginTop: 27, background: "#1687ff", display: "flex" }} />
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", fontSize: 30, lineHeight: 0.9, fontWeight: 800, letterSpacing: -1 }}>
              <span>ET ENSUITE,</span>
              <span style={{ color: "#1687ff" }}>COMMENT ?</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
