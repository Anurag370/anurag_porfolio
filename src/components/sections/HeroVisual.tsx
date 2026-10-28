import { MONOGRAM } from "@/components/brand/Logo";

/**
 * Hero illustration — an animated geometric composition:
 * the AN monogram sits at the centre of a slowly rotating dashed orbit
 * wired to technology nodes, framed by viewfinder brackets and grounded by
 * a small terminal strip.
 *
 * Pure SVG + CSS (server-rendered, zero JS). All motion is disabled
 * automatically under `prefers-reduced-motion`.
 */

const CX = 220;
const CY = 190;

const NODES = [
  { x: 220, y: 40, label: "next.js", anchor: "middle" as const, dx: 0, dy: -14 },
  { x: 362.6, y: 143.6, label: "python", anchor: "start" as const, dx: 12, dy: 4 },
  { x: 308.2, y: 311.4, label: "pytorch", anchor: "start" as const, dx: 10, dy: 16 },
  { x: 131.8, y: 311.4, label: "fastapi", anchor: "end" as const, dx: -10, dy: 16 },
  { x: 77.4, y: 143.6, label: "react", anchor: "end" as const, dx: -12, dy: 4 },
];

/** Spokes from the centre ring (r=80) to just short of each node (r=145). */
const SPOKES = NODES.map((node) => {
  const ux = (node.x - CX) / 150;
  const uy = (node.y - CY) / 150;
  return {
    x1: CX + ux * 80,
    y1: CY + uy * 80,
    x2: CX + ux * 145,
    y2: CY + uy * 145,
  };
});

function Bracket({ x, y, flipX, flipY }: {
  x: number;
  y: number;
  flipX?: boolean;
  flipY?: boolean;
}) {
  return (
    <path
      d="M0 22 L0 0 L22 0"
      transform={`translate(${x} ${y}) scale(${flipX ? -1 : 1} ${flipY ? -1 : 1})`}
      stroke="var(--accent)"
      strokeWidth="2"
      fill="none"
      opacity="0.55"
      strokeLinecap="round"
    />
  );
}

export function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
      {/* Blueprint grid */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />

      <svg
        viewBox="0 0 440 400"
        className="relative w-full text-ink"
        role="img"
        aria-label="Illustration of the AN monogram at the centre of an orbit of technologies: Next.js, Python, PyTorch, FastAPI and React."
      >
        {/* Viewfinder brackets */}
        <Bracket x={16} y={16} />
        <Bracket x={424} y={16} flipX />
        <Bracket x={16} y={384} flipY />
        <Bracket x={424} y={384} flipX flipY />

        {/* Static guide ring */}
        <circle
          cx={CX}
          cy={CY}
          r={150}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {/* Rotating dashed orbit */}
        <circle
          className="animate-orbit"
          cx={CX}
          cy={CY}
          r={150}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="3 11"
          opacity="0.6"
        />

        {/* Spokes */}
        {SPOKES.map((spoke, index) => (
          <line
            key={index}
            x1={spoke.x1}
            y1={spoke.y1}
            x2={spoke.x2}
            y2={spoke.y2}
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
        ))}

        {/* Centre ring + monogram */}
        <circle
          cx={CX}
          cy={CY}
          r={78}
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="1"
          opacity="0.35"
        />
        <g transform={`translate(${CX - 51.2} ${CY - 51.2}) scale(1.6)`}>
          <path
            d={MONOGRAM.chevron}
            stroke="currentColor"
            strokeWidth={MONOGRAM.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={MONOGRAM.trace}
            stroke="currentColor"
            strokeWidth={MONOGRAM.strokeWidth - 1}
            strokeLinecap="round"
            fill="none"
            opacity={0.9}
          />
          <circle
            cx={MONOGRAM.node.cx}
            cy={MONOGRAM.node.cy}
            r={MONOGRAM.node.r}
            fill="var(--accent)"
          />
        </g>

        {/* Nodes + labels */}
        {NODES.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r={5}
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text
              className="font-mono"
              x={node.x + node.dx}
              y={node.y + node.dy}
              textAnchor={node.anchor}
              fontSize="11"
              fill="var(--text-muted)"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Ambient dots */}
        <circle className="animate-float" cx={62} cy={300} r={3} fill="var(--accent)" opacity="0.5" />
        <circle className="animate-float" cx={392} cy={64} r={2.5} fill="var(--accent-2)" opacity="0.6" style={{ animationDelay: "1.4s" }} />
        <circle cx={376} cy={252} r={2} fill="var(--text-faint)" opacity="0.7" />
        <circle cx={96} cy={86} r={2} fill="var(--text-faint)" opacity="0.7" />
      </svg>

      {/* Terminal strip */}
      <div className="relative flex items-center justify-between gap-3 border-t border-line bg-bg/70 px-4 py-3 font-mono text-xs">
        <p className="truncate">
          <span className="text-faint">~/anurag</span>{" "}
          <span className="text-accent">$</span>{" "}
          <span className="text-muted">pnpm build</span>{" "}
          <span className="animate-caret text-accent">▌</span>
        </p>
        <span className="hidden text-2xs uppercase tracking-[0.16em] text-faint sm:inline">
          ready
        </span>
      </div>
    </div>
  );
}
