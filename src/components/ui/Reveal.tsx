"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Delay in seconds (stagger siblings). */
  delay?: number;
  /** Initial offset in px. */
  y?: number;
  className?: string;
}

/**
 * Scroll-triggered entrance. Plays once, never causes layout shift
 * (only opacity/transform), and renders instantly for users who prefer
 * reduced motion.
 */
export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
