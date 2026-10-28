"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { visibleMainNav } from "@/config/navigation";
import { visibleSocialLinks } from "@/config/social-links";
import { cn } from "@/lib/utils";

/**
 * Sticky site header.
 *
 *  • Animated active indicator driven by an IntersectionObserver scroll spy
 *  • Hash links automatically resolve to "/#section" when you're on a
 *    sub-page, so navigation never dead-ends
 *  • Compact mobile menu with focus handling, Escape-to-close and
 *    scroll locking
 */

/** Static reference (stable identity — safe as an effect dependency). */
const NAV_ITEMS = visibleMainNav();

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const isHome = pathname === "/";

  /* Header elevation on scroll (effects run client-side only). */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy: highlight the section currently in view. */
  useEffect(() => {
    if (!isHome) return;
    const ids = NAV_ITEMS
      .map((item) => (item.href.startsWith("#") ? item.href.slice(1) : null))
      .filter((id): id is string => Boolean(id));

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
    // NAV_ITEMS is a static module constant — only re-run for route changes.
  }, [isHome]);

  /* Mobile menu: scroll lock + Escape + focus handling. */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /** Hash href that works from any route. */
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Link
            href="/"
            aria-label="Anurag.dev — home"
            className="rounded-lg transition-opacity hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* Desktop navigation with animated active indicator */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.href && isHome;
                return (
                  <li key={item.href}>
                    <Link
                      href={resolveHref(item.href)}
                      aria-current={isActive ? "location" : undefined}
                      className="relative rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink"
                    >
                      {isActive && !reduced ? (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute inset-0 rounded-full border border-accent/25 bg-accent-soft"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 32,
                          }}
                        />
                      ) : isActive ? (
                        <span className="absolute inset-0 rounded-full border border-accent/25 bg-accent-soft" />
                      ) : null}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href="/#contact"
              variant="secondary"
              size="sm"
              className="hidden md:inline-flex"
            >
              Get in touch
            </Button>

            {/* Mobile menu trigger */}
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-line-strong lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-bg md:top-[4.5rem] lg:hidden"
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Container className="py-6">
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={resolveHref(item.href)}
                        onClick={() => setMenuOpen(false)}
                        aria-current={
                          active === item.href && isHome ? "location" : undefined
                        }
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors",
                          active === item.href && isHome
                            ? "bg-accent-soft text-accent"
                            : "text-muted hover:bg-surface hover:text-ink",
                        )}
                      >
                        {item.label}
                        <span aria-hidden className="font-mono text-xs text-faint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                <div className="flex flex-wrap gap-2">
                  {visibleSocialLinks().map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <Button
                  href="/#contact"
                  size="sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
