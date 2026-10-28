import type { SocialLink } from "@/types/content";
import { site } from "./site";

/**
 * Social profiles.
 *
 * TODO(anurag): add your real profile URLs. An empty `href` (or
 * `enabled: false`) removes the link from every component — the site
 * never renders placeholder destinations.
 *
 * The email entry falls back to the address configured in `site.ts`.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Anurag370",
    enabled: true,
    handle: "Anurag370",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anurag-hom-roy",
    enabled: true,
    handle: "anurag-hom-roy",
  },
  { id: "twitter", label: "X", href: "", enabled: false, handle: "" },
  { id: "devto", label: "DEV Community", href: "", enabled: false, handle: "" },
  { id: "hashnode", label: "Hashnode", href: "", enabled: false, handle: "" },
  { id: "website", label: "Website", href: "", enabled: false, handle: "" },
  {
    id: "email",
    label: "Email",
    href: `mailto:${site.email}`,
    enabled: true,
    handle: site.email,
  },
];

/** Only enabled links with a real destination. */
export function visibleSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.enabled && link.href !== "");
}
