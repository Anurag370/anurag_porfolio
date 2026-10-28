import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  /** Small mono eyebrow, e.g. "01 — Projects". */
  eyebrow: string;
  title: string;
  description?: string;
  /** Rendered on the right of the heading (filters, links…). */
  actions?: ReactNode;
  id?: string;
  className?: string;
}

/** Consistent heading block for every section: mono eyebrow → title → copy. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="text-2xl font-semibold tracking-tight text-balance text-ink sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
