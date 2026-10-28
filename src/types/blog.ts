/**
 * Blog frontmatter model.
 *
 * Posts live in `src/content/blog/*.mdx`. Adding a post = adding a file.
 * See README → "Publishing a blog post".
 */

import type { ReactNode } from "react";

export interface PostFrontmatter {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-01-15". */
  date: string;
  tags: string[];
  category: string;
  /** Drafts are excluded from lists/sitemap but still buildable for preview. */
  draft?: boolean;
  /** Optional cover image path under /public. */
  cover?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Rendered MDX content (server only). */
  content: ReactNode;
  /** Estimated reading time in minutes. */
  readingTime: number;
}
