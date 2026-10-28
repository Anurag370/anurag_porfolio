import Image from "next/image";
import { Monogram } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/types/content";

/** Fallback hue per category when a project has no custom `accent`. */
const CATEGORY_HUES: Record<string, number> = {
  "full-stack": 235,
  "ai-ml": 275,
  backend: 200,
  automation: 35,
  "open-source": 150,
};

interface ProjectVisualProps {
  /** Used for accessible alt text when a real screenshot exists. */
  title?: string;
  slug: string;
  accent?: number;
  categories: string[];
  image: ProjectImage | null;
  /** Position in the list — rendered as a mono index. */
  index?: number;
  className?: string;
}

/**
 * Project thumbnail.
 *
 * Renders the project's real screenshot when `image` is configured,
 * otherwise generates a deterministic in-brand visual from the project's
 * accent hue — never stock photography.
 */
export function ProjectVisual({
  slug,
  accent,
  categories,
  image,
  index,
  className,
}: ProjectVisualProps) {
  const hue =
    accent ?? CATEGORY_HUES[categories[0]] ?? 235;

  if (image) {
    return (
      <div className={cn("relative aspect-[16/10] w-full overflow-hidden border-b border-line", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden border-b border-line",
        className,
      )}
      style={{
        background: `radial-gradient(120% 130% at 12% 0%, hsl(${hue} 70% 55% / 0.3), transparent 55%),
          radial-gradient(110% 110% at 95% 100%, hsl(${(hue + 45) % 360} 75% 60% / 0.18), transparent 60%),
          var(--surface-2)`,
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-50" />
      <Monogram className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-ink opacity-15" />
      <span className="absolute bottom-3 left-4 font-mono text-xs font-medium uppercase tracking-[0.22em] text-ink/70">
        {slug}
      </span>
      {typeof index === "number" ? (
        <span className="absolute right-4 top-3 font-mono text-2xs uppercase tracking-[0.16em] text-ink/50">
          P-{String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
    </div>
  );
}
