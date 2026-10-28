"use client";

import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "motion/react";

/** Smooth back-to-top control used in the footer. */
export function BackToTop() {
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
      }
      className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
      Back to top
    </button>
  );
}
