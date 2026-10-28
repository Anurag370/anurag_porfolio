import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { BackToTop } from "@/components/layout/BackToTop";
import { Container } from "@/components/ui/Section";
import { site } from "@/config/site";
import { visibleFooterNav } from "@/config/navigation";
import { visibleSocialLinks } from "@/config/social-links";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const social = visibleSocialLinks();

  return (
    <footer className="border-t border-line bg-bg-alt">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" aria-label="Anurag.dev — home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {social.map((link) => (
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
          </div>

          {/* Navigation shortcuts */}
          <nav aria-label="Footer">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              Navigate
            </h2>
            <ul className="space-y-2.5">
              {visibleFooterNav().map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-faint">
              Elsewhere
            </h2>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-2">
                <BackToTop />
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.brand}. All rights reserved.
          </p>
          <p className="text-muted">{site.signOff}</p>
        </div>
      </Container>
    </footer>
  );
}
