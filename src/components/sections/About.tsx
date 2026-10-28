import { Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { Monogram } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/config/about";
import { site } from "@/config/site";
import { visibleSocialLinks } from "@/config/social-links";
import { publicFileExists } from "@/lib/file";

interface AboutProps {
  /** Position of this section among enabled sections (drives numbering). */
  index: number;
}

export function About({ index }: AboutProps) {
  const resumeExists = publicFileExists(site.resume.url);
  const socials = visibleSocialLinks();
  const github = socials.find((link) => link.id === "github");
  const linkedin = socials.find((link) => link.id === "linkedin");

  return (
    <Section id="about" ariaLabelledBy="about-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — About`}
            title={about.heading}
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          {/* Portrait / avatar card */}
          <Reveal delay={0.05}>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="bg-grid relative flex aspect-[4/5] items-center justify-center">
                {about.portrait ? (
                  <Image
                    src={about.portrait.src}
                    alt={about.portrait.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 30vw"
                    className="object-cover"
                  />
                ) : (
                  <>
                    <span
                      aria-hidden
                      className="absolute size-40 rounded-full bg-accent-soft blur-3xl"
                    />
                    <Monogram className="relative size-24 text-ink" active />
                  </>
                )}
              </div>
              <div className="border-t border-line px-5 py-4">
                <p className="font-semibold tracking-tight text-ink">
                  {site.name}
                </p>
                <p className="mt-0.5 text-sm text-muted">{site.title}</p>
              </div>
            </div>

            {/* Facts */}
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted">
                <dt className="sr-only">Location</dt>
                <MapPin className="size-4 shrink-0 text-accent" aria-hidden />
                <dd>{site.location}</dd>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <dt className="sr-only">Email</dt>
                <Mail className="size-4 shrink-0 text-accent" aria-hidden />
                <dd>
                  <a
                    href={`mailto:${site.email}`}
                    className="break-all transition-colors hover:text-accent"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              {github ? (
                <div className="flex items-center gap-3 text-muted">
                  <dt className="sr-only">GitHub</dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 shrink-0 text-accent"
                    aria-hidden
                  >
                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.42.36.79 1.08.79 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                  </svg>
                  <dd>
                    <a
                      href={github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all transition-colors hover:text-accent"
                    >
                      {github.href.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </dd>
                </div>
              ) : null}
              {linkedin ? (
                <div className="flex items-center gap-3 text-muted">
                  <dt className="sr-only">LinkedIn</dt>
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-4 shrink-0 text-accent"
                    aria-hidden
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45Z" />
                  </svg>
                  <dd>
                    <a
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all transition-colors hover:text-accent"
                    >
                      {linkedin.href.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>

            {/* Résumé — only renders when the file actually exists */}
            {resumeExists ? (
              <Button
                href={site.resume.url}
                variant="secondary"
                className="mt-6 w-full"
                download
              >
                <Download className="size-4" />
                {site.resume.label}
              </Button>
            ) : null}
          </Reveal>

          {/* Bio */}
          <div>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-ink md:text-xl">
                {about.intro}
              </p>
            </Reveal>

            <div className="mt-10 space-y-8">
              {about.blocks.map((block, blockIndex) => (
                <Reveal key={block.title} delay={0.12 + blockIndex * 0.05}>
                  <div className="border-l-2 border-accent/40 pl-5">
                    <h3 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
                      {block.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {block.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
