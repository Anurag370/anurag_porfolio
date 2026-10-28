import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  AN MONOGRAM — the Anurag.dev brand mark.
 *
 *  Design rationale
 *  ----------------
 *  A geometric capital "A" (the initial of Anurag) built from one
 *  continuous chevron stroke, crossed by an ascending "trace" that ends
 *  on a filled node dot:
 *
 *    • chevron      → the letter A, sharp and instantly readable at 16px
 *    • rising trace → a data/signal path (systems engineering)
 *    • node dot     → a graph vertex / circuit junction (AI & networks)
 *
 *  Hand-authored path data on a 64×64 grid — no font rendering, no
 *  copyrighted shapes. Fully editable: tweak the paths below and every
 *  usage (favicon, navbar, hero, OG image) updates together.
 *
 *  Colour: strokes use `currentColor` (adapts to light/dark automatically),
 *  the node uses `var(--accent)` so it always matches the brand accent.
 *  Override with the `accent` prop if you need a fixed colour.
 * ─────────────────────────────────────────────────────────────────────
 */

/** Shared geometry — also imported by `app/opengraph-image.tsx`. */
export const MONOGRAM = {
  /** The A: one continuous chevron. */
  chevron: "M11 53 L31.5 12 L52 53",
  /** Crossbar rendered as an ascending signal trace. */
  trace: "M16.5 42 L41.5 32",
  /** Node (junction) position + radius. */
  node: { cx: 41.5, cy: 32, r: 4.4 },
  strokeWidth: 6,
  viewBox: "0 0 64 64",
} as const;

interface MonogramProps {
  className?: string;
  /** Fixed accent colour; defaults to the theme's `--accent`. */
  accent?: string;
  /** Accessible label. Pass `aria-hidden` usage context to omit. */
  title?: string;
  /** Draw a subtle animated pulse on the node (hero usage). */
  active?: boolean;
}

/** The standalone monogram glyph. */
export function Monogram({
  className,
  accent,
  title,
  active = false,
}: MonogramProps) {
  return (
    <svg
      viewBox={MONOGRAM.viewBox}
      className={cn("shrink-0", className)}
      fill="none"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d={MONOGRAM.chevron}
        stroke="currentColor"
        strokeWidth={MONOGRAM.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={MONOGRAM.trace}
        stroke="currentColor"
        strokeWidth={MONOGRAM.strokeWidth - 1}
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle
        cx={MONOGRAM.node.cx}
        cy={MONOGRAM.node.cy}
        r={MONOGRAM.node.r}
        fill={accent ?? "var(--accent)"}
        className={active ? "animate-node-pulse" : undefined}
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  accent?: string;
  /** Accessible name; omit when the logo sits next to visible text. */
  title?: string;
}

/** Monogram + wordmark ("Anurag.dev"). Used in the navbar and footer. */
export function Logo({ className, markClassName, accent, title }: LogoProps) {
  const brand = "Anurag.dev";
  const dot = brand.indexOf(".");

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram
        className={cn("size-7", markClassName)}
        accent={accent}
        title={title}
      />
      <span className="text-[0.95rem] font-semibold tracking-tight">
        {dot === -1 ? (
          brand
        ) : (
          <>
            {brand.slice(0, dot + 1)}
            <span className="text-accent">{brand.slice(dot + 1)}</span>
          </>
        )}
      </span>
    </span>
  );
}
