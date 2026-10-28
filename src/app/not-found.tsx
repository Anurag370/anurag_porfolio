import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pb-24 pt-32">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <Monogram className="mx-auto size-16 text-ink" active />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Error 404
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            This page returned null.
          </h1>
          <p className="mt-4 leading-relaxed text-muted">
            The link you followed doesn&apos;t exist — maybe the page was
            renamed, or the route was never committed.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button href="/">Back to home</Button>
            <Button href="/blog" variant="secondary">
              Read the blog
            </Button>
          </div>
          <p className="mt-6 text-xs text-faint">
            Looking for a project?{" "}
            <Link href="/#projects" className="text-accent hover:underline">
              Browse them here
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
