# Anurag.dev — Personal Portfolio

A premium, dark-first developer portfolio built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · MDX**. Every word, project, skill and link on the site comes from typed configuration files, so personalising it never means touching a React component.

> **Nothing on this site is invented.** Achievements and experience ship empty with designed empty states, project details ship as clearly-marked editable drafts, and social links are hidden until you add real URLs. Fill in the checklist at the bottom before you deploy.

---

## Table of contents

- [Quick start](#quick-start)
- [Commands](#commands)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Customising your content](#customising-your-content)
  - [Site identity (`site.ts`)](#1-site-identity-sitets)
  - [About section (`about.ts`)](#2-about-section-aboutts)
  - [Skills (`skills.ts`)](#3-skills-skillsts)
  - [Projects (`projects.ts`)](#4-projects-projectsts)
  - [Achievements & experience](#5-achievements--experience)
  - [Currently learning (`learning.ts`)](#6-currently-learning-learningts)
  - [Open source (`open-source.ts`)](#7-open-source-open-sourcents)
  - [Social links (`social-links.ts`)](#8-social-links-social-linksts)
  - [Navigation & section order](#9-navigation--section-order)
- [Publishing a blog post](#publishing-a-blog-post)
- [Logo & design assets](#logo--design-assets)
- [Résumé](#résumé)
- [Contact form configuration](#contact-form-configuration)
- [SEO & metadata](#seo--metadata)
- [Design tokens](#design-tokens)
- [Deploying to Vercel](#deploying-to-vercel)
- [Pre-launch checklist](#pre-launch-checklist)

---

## Quick start

```bash
pnpm install       # install dependencies
pnpm dev           # start dev server → http://localhost:3000
```

Then search the repo for `TODO(anurag)` — every field that needs your real
information is marked:

```bash
grep -rn "TODO(anurag)" src/
```

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `pnpm dev`          | Development server with hot reload                  |
| `pnpm build`        | Production build (also runs TypeScript checks)      |
| `pnpm start`        | Serve the production build                          |
| `pnpm lint`         | ESLint (Next.js + TypeScript rules)                 |
| `pnpm lint:fix`     | ESLint with auto-fix                                |
| `pnpm typecheck`    | Generate route types + `tsc --noEmit`               |
| `pnpm icons`        | Regenerate favicon/manifest PNGs from the SVG logo  |

## Tech stack

- **Next.js 16** (App Router, Turbopack, static prerendering)
- **TypeScript** — strict mode; typed content models in `src/types`
- **Tailwind CSS v4** — design tokens as CSS variables in `globals.css`
- **Motion (Motion for React)** — scroll reveals, filter transitions, nav indicator
- **next-themes** — class-based light/dark switching, no flash
- **next-mdx-remote** — file-based blog (one file = one post)
- **Lucide** — icons
- **gray-matter** — blog frontmatter

No database, no CMS, no API keys in the browser.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx              # Fonts, theme provider, header/footer, metadata, JSON-LD
│  ├─ page.tsx                # Home — assembles sections from config/site.ts
│  ├─ loading.tsx             # Route-level loading skeleton
│  ├─ not-found.tsx           # 404 page
│  ├─ icon.svg / favicon.ico  # Logo-based favicons (edit + regenerate)
│  ├─ apple-icon.png          # Apple touch icon
│  ├─ opengraph-image.tsx     # Social sharing image (auto-generated)
│  ├─ manifest.ts             # Web manifest
│  ├─ sitemap.ts / robots.ts  # SEO
│  ├─ api/contact/route.ts    # Contact endpoint (server-side only)
│  ├─ blog/
│  │  ├─ page.tsx             # Blog index (search + tag filter)
│  │  └─ [slug]/page.tsx      # Article page
│  └─ projects/[slug]/page.tsx# Project case-study page
├─ components/
│  ├─ brand/Logo.tsx          # AN monogram + wordmark (single source of truth)
│  ├─ layout/                 # Header, footer, theme toggle, back-to-top
│  ├─ sections/               # Hero, About, Skills, Projects, Timeline, …
│  ├─ projects/               # Project card, grid, filter, generated visuals
│  ├─ blog/                   # Post card, blog explorer
│  ├─ contact/ContactForm.tsx # Validated client form
│  ├─ skills/icons.ts         # Skill-category icon map
│  └─ ui/                     # Button, Badge, Section, Reveal, EmptyState…
├─ config/                    # ← ALL PERSONAL CONTENT LIVES HERE
│  ├─ site.ts                 # Identity, availability, résumé, sections, theme
│  ├─ about.ts                # Biography blocks
│  ├─ navigation.ts           # Header/footer navigation
│  ├─ skills.ts               # Skill categories + qualitative levels
│  ├─ projects.ts             # Projects + filter categories
│  ├─ achievements.ts         # Timeline (empty until you add entries)
│  ├─ experience.ts           # Work/academic timeline (empty until you add)
│  ├─ learning.ts             # "Now" section
│  ├─ open-source.ts          # GitHub username + hand-written highlights
│  └─ social-links.ts         # Social profiles (hidden until URLs added)
├─ content/blog/*.mdx         # Blog posts (one file per post)
├─ lib/                       # blog, github, validation, format, file utils
└─ types/                     # Shared TypeScript content models
public/
├─ images/                    # Portraits, project screenshots
├─ resume/Resume.pdf          # Your résumé (download button appears when present)
└─ icons/                     # Generated manifest icons
scripts/generate-icons.mjs    # `pnpm icons` — rebuild favicons from SVG
```

---

## Customising your content

### 1. Site identity (`src/config/site.ts`)

```ts
name, brand, title, tagline, description, email, location, url, signOff
availability: { enabled, label, href }   // hero status pill — set enabled:false to hide
resume: { url, label }                   // button renders only if the file exists
theme: { default: "dark"|"light"|"system", allowToggle }
sections: [{ id, enabled, order }, …]    // hide/reorder whole sections here
```

Reorder a section by changing `order`; disable it with `enabled: false`.
Heading numbering (`01 — About`, `02 — Skills`…) renumbers automatically.

### 2. About section (`src/config/about.ts`)

`eyebrow`, `heading`, `intro`, an array of `{ title, body }` blocks
(background, interests, philosophy, goals, focus) and an optional `portrait`
(`{ src, alt }` pointing at a file in `public/images/`). With no portrait, an
in-brand monogram avatar renders instead.

### 3. Skills (`src/config/skills.ts`)

```ts
{
  id: "ai-ml",
  title: "AI / Machine Learning",
  description: "…",
  icon: "brain",          // code | layout | server | database | brain | eye | cloud
  enabled: true,
  order: 50,
  skills: [{ name: "PyTorch", level: "learning", emphasis: true }],
}
```

`level` is one of `exploring · learning · comfortable · proficient` and renders
as a small text label — **no percentage meters**. Omit `level` to hide it.
Add new categories freely (add an icon key in `components/skills/icons.ts` if
you need a new icon).

### 4. Projects (`src/config/projects.ts`)

Each project supports: `slug` (URL), `title`, `tagline`, `description`,
`status` (`planned | in-progress | shipped | archived`), `categories`
(filter chips), `problem`, `solution`, `contribution`, `features`,
`challenges`, `tech`, `links` (`github/demo/docs` — empty string = hidden),
`image` (`{ src, alt }` or `null` for the generated brand visual), `accent`
(hue for the generated visual), `metrics`, `caseStudy`, `period`, plus
`enabled` / `featured` flags.

**Add a project:** copy an entry, change the `slug`, done — the card, filter,
detail page, sitemap and metadata all pick it up automatically.

Only add `metrics` you can verify. Set `status: "shipped"` only when it
actually is.

### 5. Achievements & experience

`src/config/achievements.ts` and `src/config/experience.ts` ship **empty**,
with commented examples inside. Entries support `title`, `description`,
`date`, `organization`, `category`, `link`, `credential`, `image` and
`enabled`. While empty, the sections show a designed empty state — add your
first verified entry and the timeline appears with no other changes.

### 6. Currently learning (`src/config/learning.ts`)

```ts
{ id, title, detail, status: "learning" | "building" | "completed", enabled, href }
```

### 7. Open source (`src/config/open-source.ts`)

```ts
githubUsername: "your-username"   // enables live, public GitHub API stats
showLiveStats: true
highlights: [{ name, description, stats, href, tech }]
```

The GitHub API call is server-side, unauthenticated, cached for 24 h, times
out after 6 s and **never fails the build** — if GitHub is down or
rate-limited the section falls back to your `highlights`, then to a polished
empty state. No tokens exist anywhere, so nothing can leak.

### 8. Social links (`src/config/social-links.ts`)

Set `href` (and `handle`) for each profile you use; `enabled: false` removes
it everywhere. **Empty links are never rendered — there are no dead
placeholders on the site.**

### 9. Navigation & section order

`src/config/navigation.ts` controls header/footer links. Items with a
`section` id hide themselves automatically when that section is disabled in
`site.ts`.

---

## Publishing a blog post

Create one file — that's the whole workflow:

```
src/content/blog/my-post.mdx
```

```mdx
---
title: "Understanding RAG pipelines"
description: "How embeddings, retrieval and prompting fit together."
date: "2026-11-01"
tags: ["AI", "RAG", "Python"]
category: "AI Engineering"
draft: false
---

Your Markdown (and JSX) starts here…
```

- Posts appear on `/blog` and the home-page writing section, sorted by date.
- Reading time and the sitemap entry are computed automatically.
- `draft: true` excludes the post from lists/search/sitemap but still builds
  it, so you can preview at `/blog/my-post` before publishing.
- MDX components: standard Markdown plus links (opened in a new tab
  automatically). Post styling lives in the `article-prose` utility in
  `globals.css`.

A sample draft (`hello-world.mdx`) ships with the repo — replace or delete it.

---

## Logo & design assets

The brand mark is an **AN monogram**: a geometric “A” (one continuous
chevron) crossed by an ascending signal trace ending in a node dot — a nod to
data pipelines and graph vertices. Geometry lives in **one place**:

```
src/components/brand/Logo.tsx   → MONOGRAM (paths, node, stroke width)
src/app/icon.svg                → favicon source (same geometry, hardcoded colours)
src/app/opengraph-image.tsx     → social image (same geometry, rebuilt as bars)
```

To restyle the logo, edit `MONOGRAM` and mirror the change in `icon.svg`, then
regenerate raster assets:

```bash
pnpm icons    # favicon.ico, apple-icon.png, public/icons/*
```

Light/dark: strokes use `currentColor` (so the mark adapts to the active
theme) and the node uses `var(--accent)`. Pass `accent="…"` to the `<Monogram>`
component for a fixed colour. `LogoWordmark` renders **Anurag.dev** with the
`.dev` in the accent colour.

Other assets:

- **Fonts** — Poppins (UI) + JetBrains Mono (code/labels) via `next/font`.
- **OG image fonts** — local TTFs in `src/assets/fonts/` (build never fetches
  external font hosts for the social card).
- **Project thumbnails** — drop a screenshot in `public/images/` and set
  `image: { src, alt }`; otherwise a deterministic, in-brand visual renders
  from the project's `accent` hue. Stock photos are never used.

## Résumé

Put your PDF at `public/resume/Resume.pdf`. The download button renders only
when the file exists, so there are never broken links. Different filename?
Change `resume.url` in `site.ts`.

## Contact form configuration

The form works out of the box with **zero configuration**: it validates,
filters spam, and then hands your email client a pre-filled draft (the UI
says exactly that — no fake "sent!" states).

To deliver messages to a real endpoint (Formspree, Web3Forms, Resend, your own
API…), copy the env template and set:

```bash
cp .env.example .env.local
```

```bash
CONTACT_ENDPOINT=https://api.formspree.io/f/xxxx   # server-side only
CONTACT_API_KEY=optional-bearer-token              # sent as Authorization header
```

Your endpoint receives `POST { name, email, message }` as JSON.

Spam protection: an invisible honeypot field (bots that fill it get a fake
success and no delivery) + server-side re-validation of every field. Never put
secrets in `NEXT_PUBLIC_*` variables — everything here stays on the server.

## SEO & metadata

- Per-page metadata (`generateMetadata`) with canonical URLs — set your real
  domain in `site.url` first.
- Auto-generated `opengraph-image` (logo, name, tagline), `sitemap.xml`,
  `robots.txt`, web manifest and `Person` / `BlogPosting` JSON-LD.
- Semantic landmarks, one `h1` per page, skip-to-content link, visible focus
  states, `aria-current` navigation, descriptive alt text.

## Design tokens

Edit `src/app/globals.css`:

- `:root` = light palette, `.dark` = dark palette
  (`--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--success`, …)
- Tailwind maps them in `@theme inline` (`bg-bg`, `text-ink`, `border-line`,
  `text-accent`…)
- Spacing/typography rhythm: sections use `py-20 md:py-28`, container
  `max-w-6xl`, headings `SectionHeading`.
- Motion: components check `prefers-reduced-motion` (Motion + a global CSS
  guard), so all animation switches off for users who ask for it.

## Deploying to Vercel

```bash
# 1. Push the repo to GitHub
# 2. vercel.com → Add New Project → import the repo
#    Framework: Next.js (auto-detected) · Package manager: pnpm
# 3. Add optional env vars (CONTACT_ENDPOINT / CONTACT_API_KEY)
# 4. Deploy
```

Or from the CLI: `pnpm dlx vercel`. After the first deploy, set `site.url` to
your production domain so canonical URLs, the sitemap and social cards point
to the right place.

## Pre-launch checklist

```bash
grep -rn "TODO(anurag)" src/
```

- [ ] `site.ts` — real email, location, production URL
- [ ] `social-links.ts` — GitHub + LinkedIn URLs (and username in `open-source.ts`)
- [ ] `about.ts` — review the biography in your own words; optional portrait
- [ ] `projects.ts` — rewrite draft problem/solution/contribution copy; add real repo/demo URLs; set honest statuses
- [ ] `achievements.ts` / `experience.ts` — add your verified entries
- [ ] `skills.ts` — adjust levels and proficiency labels to match reality
- [ ] Drop `public/resume/Resume.pdf` (or delete the résumé block)
- [ ] Replace/delete the sample draft post in `src/content/blog/`
- [ ] Optional: `CONTACT_ENDPOINT` in production env vars
- [ ] `pnpm lint && pnpm typecheck && pnpm build` — all green
