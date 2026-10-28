import { Mail, MapPin, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/config/site";
import { visibleSocialLinks } from "@/config/social-links";

interface ContactProps {
  index: number;
}

export function Contact({ index }: ContactProps) {
  const socials = visibleSocialLinks();

  return (
    <Section id="contact" ariaLabelledBy="contact-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="contact-title"
            eyebrow={`${String(index + 1).padStart(2, "0")} — Contact`}
            title="Let's build something together."
            description="Internships, freelance work, open-source collaboration — or just a question about something I've built. My inbox is open."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Direct channels */}
          <Reveal delay={0.05}>
            <div className="space-y-5">
              <a
                href={`mailto:${site.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group:border-accent/40">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                    Email
                  </span>
                  <span className="mt-0.5 block font-medium text-ink transition-colors group-hover:text-accent">
                    {site.email}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                  <MapPin className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-mono text-2xs uppercase tracking-[0.14em] text-faint">
                    Based in
                  </span>
                  <span className="mt-0.5 block font-medium text-ink">
                    {site.location}
                  </span>
                </span>
              </div>

              {socials.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {socials.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="rounded-full border border-line bg-surface px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}

              <p className="flex items-start gap-2 pt-2 text-xs leading-relaxed text-faint">
                <MessageSquare className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                I usually reply within a couple of days. For anything urgent,
                email is the fastest way to reach me.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface p-6 md:p-8">
              <h3 className="mb-6 font-semibold tracking-tight text-ink">
                Send a message
              </h3>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
