import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  /** Lucide icon component (already sized). */
  icon: ReactNode;
  title: string;
  description: string;
  /** Optional CTA, e.g. a link to docs explaining how to add content. */
  action?: ReactNode;
  className?: string;
}

/**
 * Polished placeholder for sections without content yet — shown instead
 * of fabricated entries.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong bg-surface/60 px-6 py-14 text-center",
        className,
      )}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
