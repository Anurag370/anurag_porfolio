"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const WORDS = [
  "Full-Stack Development",
  "AI Engineering",
  "Computer Vision",
  "LLM Applications",
  "Backend Systems",
];

/**
 * Rotating interest line in the hero.
 *
 * Accessibility: the rotating visual is `aria-hidden` and paired with a
 * static screen-reader sentence, so the content is announced once instead
 * of repeatedly. With `prefers-reduced-motion` the rotation never starts.
 */
export function RotatingText() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % WORDS.length),
      2600,
    );
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs sm:text-sm">
      <span className="uppercase tracking-[0.16em] text-faint">
        Exploring
      </span>
      <span
        className="relative inline-flex h-5 min-w-[13.5rem] items-center overflow-hidden sm:min-w-[15rem]"
        aria-hidden="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={WORDS[index]}
            className="absolute left-0 font-medium text-accent"
            initial={reduced ? false : { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: -14, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">
        Exploring full-stack development, AI engineering, computer vision, LLM
        applications and backend systems.
      </span>
    </p>
  );
}
