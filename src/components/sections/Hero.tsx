import { ArrowDownRight, ArrowUpRight, Send } from "lucide-react";
import { Monogram } from "@/components/brand/Logo";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { RotatingText } from "@/components/sections/RotatingText";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { site } from "@/config/site";
import { visibleSocialLinks } from "@/config/social-links";

/**
 * Hero — first screen.
 *
 * Server-rendered with staggered CSS entrance animations (no client JS
 * except the rotating interest line). Every element maps to `site.ts`
 * or `social-links.ts` config.
 */
export function Hero() {
  const { availability } = site;
  const socials = visibleSocialLinks();

  const rise = (delay: number) => ({ animationDelay: `${delay}s` });

  return (
    <Section
      id="hero"
      labelled={false}
      className="relative overflow-hidden pb-20 pt-28 md:pb-28 md:pt-36"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          {/* Copy column */}
          <div>
            {/* Availability indicator */}
            {availability.enabled ? (
              <div className="animate-rise" style={rise(0)}>
                {availability.href ? (
                  <a
                    href={availability.href}
                    className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    <span className="relative flex size-2" aria-hidden>
                      <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-success" />
                    </span>
                    {availability.label}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted">
                    <span className="relative flex size-2" aria-hidden>
                      <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-success" />
                    </span>
                    {availability.label}
                  </span>
                )}
              </div>
            ) : null}

            {/* Monogram */}
            <div className="animate-rise mt-8" style={rise(0.06)}>
              <Monogram className="size-14 text-ink" active title="Anurag monogram" />
            </div>

            {/* Name + headline */}
            <h1 className="animate-rise mt-6" style={rise(0.12)}>
              <span className="block text-5xl font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl">
                Anurag Hom Roy
              </span>
              <span className="mt-3 block text-lg font-medium leading-snug text-muted sm:text-xl md:text-2xl">
                Full-Stack Developer{" "}
                <span className="text-ink">&amp;</span>{" "}
                <span className="text-accent-gradient">AI Engineer</span>{" "}
                <span className="text-faint">in the making</span>
              </span>
            </h1>

            {/* Description */}
            <p
              className="animate-rise mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              style={rise(0.2)}
            >
              I design and build end-to-end products — React and Next.js on
              the front, FastAPI and SQL underneath — and I&apos;m going deeper
              into AI with PyTorch, computer vision and LLM-powered systems.
            </p>

            {/* Rotating interests */}
            <div className="animate-rise mt-5" style={rise(0.26)}>
              <RotatingText />
            </div>

            {/* CTAs */}
            <div
              className="animate-rise mt-9 flex flex-wrap items-center gap-3"
              style={rise(0.32)}
            >
              <Button href="#projects" size="lg">
                Explore My Projects
                <ArrowDownRight className="size-4" />
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Get in Touch
                <Send className="size-4" />
              </Button>
            </div>

            {/* Social links */}
            {socials.length > 0 ? (
              <div
                className="animate-rise mt-8 flex flex-wrap items-center gap-3"
                style={rise(0.38)}
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
                  Find me on
                </span>
                {socials.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Illustration column */}
          <div className="animate-rise" style={rise(0.2)}>
            <HeroVisual />
          </div>
        </div>
      </Container>
    </Section>
  );
}
