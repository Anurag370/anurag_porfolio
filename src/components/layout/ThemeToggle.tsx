"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { site } from "@/config/site";

/**
 * Detects client-side mounting without setState-in-effect (React's
 * recommended `useSyncExternalStore` pattern) so the icon never
 * mismatches during hydration.
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Light/dark toggle. Hidden when `site.theme.allowToggle` is false. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!site.theme.allowToggle) return null;

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[18px]" />
        ) : (
          <Moon className="size-[18px]" />
        )
      ) : (
        <span className="size-[18px]" aria-hidden />
      )}
    </button>
  );
}
