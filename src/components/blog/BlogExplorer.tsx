"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { PenLine, Search, X } from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";
import type { PostMeta } from "@/lib/blog";

interface BlogExplorerProps {
  posts: PostMeta[];
  tags: string[];
}

/**
 * Blog index: instant client-side search over title/description/tags plus
 * tag filtering. Renders three distinct empty states — no posts at all,
 * no search matches, and results.
 */
export function BlogExplorer({ posts, tags }: BlogExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesTag =
        !activeTag || post.frontmatter.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!needle) return true;
      const haystack = [
        post.frontmatter.title,
        post.frontmatter.description,
        post.frontmatter.category,
        ...post.frontmatter.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* Search + tags */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-faint"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles, topics, tags…"
            aria-label="Search articles"
            className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-11 text-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-faint transition-colors hover:text-ink"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </div>

        {tags.length > 0 ? (
          <div
            role="group"
            aria-label="Filter articles by tag"
            className="flex flex-wrap gap-2"
          >
            <button
              type="button"
              aria-pressed={activeTag === null}
              onClick={() => setActiveTag(null)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs transition-colors",
                activeTag === null
                  ? "border border-accent/30 bg-accent-soft text-accent"
                  : "border border-line bg-surface text-muted hover:border-line-strong hover:text-ink",
              )}
            >
              All tags
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs transition-colors",
                  activeTag === tag
                    ? "border border-accent/30 bg-accent-soft text-accent"
                    : "border border-line bg-surface text-muted hover:border-line-strong hover:text-ink",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <>
          <p className="mb-5 font-mono text-2xs uppercase tracking-[0.14em] text-faint">
            {results.length} {results.length === 1 ? "article" : "articles"}
          </p>
          <motion.ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            layout={!reduced}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((post) => (
                <motion.li
                  key={post.slug}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PostCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      ) : posts.length === 0 ? (
        <EmptyState
          icon={<PenLine className="size-5" />}
          title="The blog is warming up"
          description="No articles published yet. Posts are written as Markdown files in the repository — the first ones are on the way."
        />
      ) : (
        <EmptyState
          icon={<Search className="size-5" />}
          title="No articles match your search"
          description={`Nothing found for “${query || activeTag}”. Try a different keyword or clear the filters.`}
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              Clear filters
            </button>
          }
        />
      )}
    </div>
  );
}
