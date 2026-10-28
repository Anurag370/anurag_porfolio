import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Horizontal container matching the site grid. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/** Standard section wrapper with consistent rhythm and anchor offset. */
export function Section({
  id,
  children,
  className,
  ariaLabelledBy,
  labelled = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
  labelled?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelled ? ariaLabelledBy : undefined}
      className={cn("scroll-mt-24 py-20 md:py-28", className)}
    >
      {children}
    </section>
  );
}
