import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/config/site";

/**
 * Social sharing image (Open Graph + Twitter).
 *
 * The AN monogram is rebuilt from the exact path geometry in
 * `src/components/brand/Logo.tsx`, using rotated bars — satori-safe and
 * fully editable. Fonts are loaded from local TTFs so builds never depend
 * on external font hosts.
 */

export const alt = `${site.name} — ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const semiboldFont = readFileSync(
  path.join(process.cwd(), "src/assets/fonts/Poppins-SemiBold.ttf"),
);
const regularFont = readFileSync(
  path.join(process.cwd(), "src/assets/fonts/Poppins-Regular.ttf"),
);

/* ---------------------------- monogram geometry ---------------------------- */

const GRID = 64;
const BOX = 300;
const SCALE = BOX / GRID;

const INK = "#E9ECF1";
const ACCENT = "#7B6CFF";

/** A stroke of the monogram rendered as a rotated, rounded bar. */
function bar(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  strokeUnits: number,
) {
  const x1 = ax * SCALE;
  const y1 = ay * SCALE;
  const x2 = bx * SCALE;
  const y2 = by * SCALE;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
  const width = strokeUnits * SCALE;

  return {
    position: "absolute" as const,
    left: (x1 + x2) / 2 - width / 2,
    top: (y1 + y2) / 2 - length / 2,
    width,
    height: length,
    borderRadius: 999,
    backgroundColor: INK,
    transform: `rotate(${angle}deg)`,
  };
}

const chevronLeft = bar(11, 53, 31.5, 12, 6);
const chevronRight = bar(31.5, 12, 52, 53, 6);
const trace = bar(16.5, 42, 41.5, 32, 5);
const nodeRadius = 4.4 * SCALE;

/* --------------------------------- image --------------------------------- */

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 84px",
          gap: 72,
          backgroundColor: "#0D0E0F",
          color: INK,
          position: "relative",
          fontFamily: "Poppins",
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            right: -180,
            top: -260,
            width: 720,
            height: 720,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(123,108,255,0.32), rgba(123,108,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -220,
            bottom: -320,
            width: 640,
            height: 640,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(168,85,247,0.2), rgba(168,85,247,0) 70%)",
          }}
        />

        {/* Monogram */}
        <div
          style={{
            display: "flex",
            position: "relative",
            width: BOX,
            height: BOX,
            flexShrink: 0,
            borderRadius: 48,
            border: "2px solid rgba(255,255,255,0.08)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        >
          <div style={chevronLeft} />
          <div style={chevronRight} />
          <div style={trace} />
          <div
            style={{
              position: "absolute",
              left: 41.5 * SCALE - nodeRadius,
              top: 32 * SCALE - nodeRadius,
              width: nodeRadius * 2,
              height: nodeRadius * 2,
              borderRadius: 999,
              backgroundColor: ACCENT,
            }}
          />
        </div>

        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: 8,
              color: ACCENT,
            }}
          >
            ANURAG.DEV
          </div>
          <div
            style={{
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1,
              color: INK,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: "#9BA4B0",
              lineHeight: 1.2,
            }}
          >
            Full-Stack Developer · Aspiring AI Engineer
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 14,
            }}
          >
            <div
              style={{
                width: 6,
                height: 52,
                borderRadius: 999,
                backgroundColor: ACCENT,
              }}
            />
            <div
              style={{
                fontSize: 30,
                fontWeight: 400,
                color: INK,
                maxWidth: 560,
              }}
            >
              {site.tagline}
            </div>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            right: 84,
            bottom: 52,
            fontSize: 24,
            letterSpacing: 4,
            color: "#6A7280",
          }}
        >
          {site.brand.toUpperCase()}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Poppins", data: regularFont, weight: 400, style: "normal" },
        { name: "Poppins", data: semiboldFont, weight: 600, style: "normal" },
      ],
    },
  );
}
