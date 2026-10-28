import { Container } from "@/components/ui/Section";

/**
 * Route-level loading state — shown while dynamic content (blog posts,
 * project pages) resolves. Pure CSS, no client JS.
 */
export default function Loading() {
  return (
    <section className="pb-24 pt-32 md:pt-36" aria-busy="true" aria-live="polite">
      <Container>
        <div className="animate-pulse space-y-6" aria-hidden>
          <div className="h-3 w-28 rounded-full bg-surface-2" />
          <div className="h-10 w-2/3 max-w-lg rounded-lg bg-surface-2" />
          <div className="h-4 w-full max-w-2xl rounded bg-surface-2" />
          <div className="h-4 w-4/5 max-w-xl rounded bg-surface-2" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="aspect-[16/11] rounded-2xl border border-line bg-surface"
              />
            ))}
          </div>
        </div>
        <span className="sr-only">Loading…</span>
      </Container>
    </section>
  );
}
