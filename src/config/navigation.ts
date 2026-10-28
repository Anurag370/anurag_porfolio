import type { NavigationConfig, SectionId } from "@/types/content";
import { site } from "./site";

/**
 * Primary navigation.
 *
 * `href: "#projects"` scrolls to a home-page section; real routes like
 * "/blog" open a page. Entries with a `section` id automatically hide
 * themselves when that section is disabled in `site.ts`.
 */
export const navigation: NavigationConfig = {
  main: [
    { label: "About", href: "#about", section: "about" },
    { label: "Skills", href: "#skills", section: "skills" },
    { label: "Projects", href: "#projects", section: "projects" },
    { label: "Journey", href: "#achievements", section: "achievements" },
    { label: "Now", href: "#now", section: "now" },
    { label: "Blog", href: "#blog", section: "blog" },
    { label: "Contact", href: "#contact", section: "contact" },
  ],
  footer: [
    { label: "Projects", href: "/#projects", section: "projects" },
    { label: "Skills", href: "/#skills", section: "skills" },
    { label: "Experience", href: "/#experience", section: "experience" },
    { label: "Blog", href: "/#blog", section: "blog" },
    { label: "Contact", href: "/#contact", section: "contact" },
  ],
};

/** Look up whether a section is enabled + resolve nav entries for it. */
export function isSectionEnabled(id: SectionId): boolean {
  return site.sections.some((s) => s.id === id && s.enabled);
}

/** Footer nav filtered by section visibility (route items always shown). */
export function visibleFooterNav() {
  return navigation.footer.filter((item) => !item.section || isSectionEnabled(item.section));
}

/** Header nav filtered by section visibility. */
export function visibleMainNav() {
  return navigation.main.filter((item) => !item.section || isSectionEnabled(item.section));
}
