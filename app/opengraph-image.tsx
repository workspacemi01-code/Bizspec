import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { hero, site } from "@/lib/content";

/**
 * The social preview card — what a link to the site looks like when it is
 * pasted into WhatsApp, LinkedIn or Slack.
 *
 * Built from the same words and the same logo as the site, so a shared link
 * and the page it opens are recognisably the same company. Satori (which
 * renders this) supports a subset of CSS and no custom properties, so the
 * brand colours are written out literally here.
 */
export const alt = "Bizspec — build better systems, run better businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = readFileSync(join(process.cwd(), "public/brand/bizspec-mark.png"));
const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12304d",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={markSrc} width={72} height={72} alt="" style={{ borderRadius: 12 }} />
          <span style={{ color: "#ffffff", fontSize: 40, fontWeight: 700, letterSpacing: -0.5 }}>
            BIZSPEC
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2.5,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            {hero.headline}
          </span>
          <span style={{ color: "#a9c0d6", fontSize: 30, marginTop: 24, maxWidth: 880 }}>
            {site.tagline}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 4, background: "#336799" }} />
          <span style={{ color: "#8fa8c0", fontSize: 24, letterSpacing: 1 }}>
            {site.regions.join("  ·  ")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
