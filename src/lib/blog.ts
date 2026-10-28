import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { createElement, type AnchorHTMLAttributes } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { estimateReadingTime, formatDate } from "@/lib/format";
import type { PostFrontmatter } from "@/types/blog";

/**
 * File-based blog (MDX).
 *
 * Posts live in `src/content/blog/*.mdx` — adding a post is adding a file,
 * never editing a React component. Drafts (`draft: true`) are excluded from
 * lists, search and the sitemap, but still build so you can preview them
 * by visiting their URL directly.
 */

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
}

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.(mdx|md)$/.test(file))
    .sort();
}

function parsePost(fileName: string): PostMeta | null {
  const slug = fileName.replace(/\.mdx?$/, "");
  const source = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");

  try {
    const { data } = matter(source);
    if (!data.title || !data.date) return null;

    const frontmatter: PostFrontmatter = {
      title: String(data.title),
      description: String(data.description ?? ""),
      date: String(data.date),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      category: String(data.category ?? "General"),
      draft: Boolean(data.draft),
      cover: data.cover ? String(data.cover) : undefined,
    };

    return { slug, frontmatter, readingTime: estimateReadingTime(source) };
  } catch {
    return null;
  }
}

/** Published posts, newest first. */
export function getAllPosts(includeDrafts = false): PostMeta[] {
  return listMarkdownFiles()
    .map(parsePost)
    .filter((post): post is PostMeta => post !== null)
    .filter((post) => includeDrafts || !post.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

/** All distinct tags across published posts (for filtering). */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPosts().forEach((post) => post.frontmatter.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

const SLUG_PATTERN = /^[a-z0-9-]+$/i;

/** Compile a post by slug. Returns null when it doesn't exist. */
export async function getPostBySlug(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;

  const fileName = listMarkdownFiles().find(
    (file) => file.replace(/\.mdx?$/, "") === slug,
  );
  if (!fileName) return null;

  const meta = parsePost(fileName);
  if (!meta) return null;

  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { content } = matter(raw);

  const compiled = await compileMDX({
    source: content,
    components: {
      a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) =>
        createElement("a", {
          ...props,
          target: "_blank",
          rel: "noopener noreferrer",
        }),
    },
  });

  return { meta, content: compiled.content };
}

export { formatDate };
