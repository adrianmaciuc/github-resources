# PRD: GitHub Resources — Code Snippets Showcase

> **Status**: Draft  
> **Date**: 2026-03-01  
> **Author**: Architecture Planning  
> **Repository**: `github-resources`

---

## 1. Problem Statement

Developers frequently need quick access to reusable code snippets, configuration templates, and markdown references across projects. GitHub Gists exist but lack discoverability, visual organization, and a browsable showcase experience. We need a **static website hosted on GitHub Pages** that serves as a curated, searchable library of code resources — easy to browse, copy, and maintain.

---

## 2. Goals

| Priority | Goal |
|----------|------|
| **Must** | Static site deployable to GitHub Pages (no server) |
| **Must** | Code snippets with syntax highlighting + one-click copy |
| **Must** | Searchable content |
| **Must** | Card/section-based layout — full-width, scrollable, scannable |
| **Must** | Markdown-based content management (files in repo) |
| **Must** | Fast to deploy, simple to maintain |
| **Should** | Simple CMS or editor for content without `git push` |
| **Could** | Tagging / filtering by category or language |
| **Could** | Dark/light theme toggle |

---

## 3. Content Model

Each resource entry is a **markdown file** with structured frontmatter:

```yaml
---
title: "Docker Compose for PostgreSQL + Redis"
description: "Production-ready compose file with health checks, volumes, and env vars"
category: "DevOps"
tags: ["docker", "postgres", "redis"]
language: "yaml"
date: 2026-03-01
---
```

Followed by the code block(s) and optional notes. This model works identically across all proposed stacks.

**Content lives in**: `src/content/snippets/` (or equivalent per SSG)

---

## 4. UI / UX Specification

### Layout Concept

```
┌──────────────────────────────────────────────────────┐
│  [Logo]  GitHub Resources        [Search] [Filter v] │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │ Title: Docker Compose for PostgreSQL + Redis     ││
│  │ Description: Production-ready compose file...    ││
│  │ Tags: [docker] [postgres] [redis]                ││
│  │ ┌──────────────────────────────────────────────┐ ││
│  │ │ ```yaml                          [📋 Copy]  │ ││
│  │ │ version: "3.8"                              │ ││
│  │ │ services:                                   │ ││
│  │ │   postgres:                                 │ ││
│  │ │     image: postgres:16                      │ ││
│  │ │ ...                                         │ ││
│  │ └──────────────────────────────────────────────┘ ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
│  ┌──────────────────────────────────────────────────┐│
│  │ Title: Next Resource Card...                     ││
│  │ ...                                              ││
│  └──────────────────────────────────────────────────┘│
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Key UI Requirements

- **Full-width cards** — each snippet is a horizontal section spanning the page
- **Visual hierarchy**: Title (large) > Description (muted) > Tags (pills) > Code block
- **Code block**: syntax highlighted, max-height with scroll, copy button top-right
- **Search bar**: sticky top, filters results as you type (client-side, instant)
- **Category filter**: dropdown or sidebar pills for quick filtering
- **Responsive**: stacks cleanly on mobile, code blocks get horizontal scroll
- **Readable by managers**: clear titles, plain-English descriptions above every technical block

---

## 5. Stack Options Analysis

### Option A: Astro + Pagefind + Expressive Code (RECOMMENDED)

| Aspect | Detail |
|--------|--------|
| **SSG** | Astro v5+ |
| **Highlighting** | Shiki (built-in) + `astro-expressive-code` (copy button, line highlights, file tabs) |
| **Search** | Pagefind (static search index, ~100KB, zero backend) |
| **Styling** | Tailwind CSS v4 |
| **CMS** | Decap CMS / Sveltia CMS (web UI) + github.dev (developer editing) |
| **Deploy** | `withastro/action@v5` GitHub Action (zero config) |

#### Why Astro

- **Content Collections** with Zod schema validation — enforce frontmatter structure at build time, catch errors early
- **Zero client JS by default** — pages load instantly, only islands (search, copy button) ship JS
- **Any framework for interactive parts** — use React, Vue, Svelte, or vanilla JS for the search/filter component
- **40+ CMS integrations** documented — easiest to add a web-based editor later
- **Official GitHub Pages action** — literally 10 lines of workflow YAML

#### Pros

- Best balance of simplicity, performance, and extensibility
- Content Collections make it trivial to add new snippets (just drop a `.md` file)
- Expressive Code gives copy button, line highlighting, diffs, file tabs — all out of the box
- Pagefind generates a static search index at build time — no API, no backend, ~100KB total
- Island architecture means interactive components (search, filters) don't bloat the rest
- Huge ecosystem (57K stars, 1.46M npm downloads/week)
- Tailwind v4 is zero-config with Astro (just `@import "tailwindcss"`)

#### Cons

- Newer than Hugo/11ty — fewer battle-tested themes to start from (but we're building custom anyway)
- Content Layer API changed between v4 and v5 — some older tutorials outdated
- `base` path can trip up asset links on project-scoped GitHub Pages repos (known gotcha, easy fix)

#### Estimated Setup Time: 2-4 hours to first deploy

---

### Option B: VitePress (Fastest Path to Working Site)

| Aspect | Detail |
|--------|--------|
| **SSG** | VitePress v1.6+ |
| **Highlighting** | Shiki (built-in, best-in-class annotations) |
| **Search** | MiniSearch (built-in, zero config, local full-text) |
| **Styling** | Default theme + CSS overrides |
| **CMS** | github.dev only (no first-class CMS ecosystem) |
| **Deploy** | Standard GitHub Actions workflow |

#### Why VitePress

- **Built-in copy button** on every code block — zero config
- **Built-in local search** — zero config, fuzzy full-text via MiniSearch
- **Best code annotation syntax**: `// [!code highlight]`, `// [!code ++]`, `// [!code --]`, `// [!code focus]`, code groups (tabs), import from files
- Designed specifically for developer documentation — our use case is adjacent

#### Pros

- Fastest time to a working, good-looking site — literally `npm init vitepress` and start writing markdown
- Copy button + search + syntax highlighting all work with zero configuration
- Code annotations are unmatched — show diffs, focus lines, warnings inline
- Dev server is instant (Vite), HMR <100ms
- Vue components can be used inline in markdown for custom layouts

#### Cons

- **Vue 3 lock-in** — all customization requires Vue knowledge
- **Documentation-oriented layout** — sidebar + content layout is opinionated, converting to a cards/showcase layout requires significant CSS overrides or custom theme
- **No formal plugin system** — extending behavior means overriding theme components
- **Minimal CMS ecosystem** — no documented integrations with Decap, TinaCMS, etc.
- Layout customization ceiling is lower than Astro or 11ty — fighting the defaults

#### Estimated Setup Time: 1-2 hours to first deploy (but 4-8 hours to customize layout away from docs-style)

---

### Option C: Eleventy (11ty) + Pagefind (Maximum Simplicity)

| Aspect | Detail |
|--------|--------|
| **SSG** | Eleventy v3+ |
| **Highlighting** | PrismJS via `@11ty/eleventy-plugin-syntaxhighlight` (build-time, zero JS) |
| **Search** | Pagefind (post-build indexer) |
| **Styling** | Vanilla CSS or Tailwind |
| **CMS** | Decap CMS / Sveltia CMS / Front Matter CMS (VS Code) |
| **Deploy** | `peaceiris/actions-gh-pages@v3` |

#### Why 11ty

- **Zero-opinion, zero-magic** — no framework, no virtual DOM, just HTML generation
- Fastest JS-based SSG: 4K pages in 1.93s
- Smallest `node_modules` at 34 MB (Astro ~180MB, Next.js ~300MB)
- 7-layer data cascade — incredibly flexible data merging

#### Pros

- Absolute simplest mental model — templates in, HTML out, nothing hidden
- Zero client JS by default — lightest possible output
- Full control over HTML structure — no fighting a framework's layout opinions
- Any template language (Nunjucks, Liquid, Handlebars, WebC, JSX, etc.)
- Good CMS ecosystem (Decap, TinaCMS, Front Matter CMS all work well)
- Tiny dependency footprint

#### Cons

- **No built-in component model** — reusable UI elements need manual template partials or WebC
- **PrismJS highlighting is less accurate** than Shiki for some languages (no VS Code grammar support)
- **No built-in copy button** — requires manual JS snippet (~15 lines, not hard)
- **No built-in search** — needs Pagefind setup (straightforward but extra step)
- More manual wiring compared to Astro's Content Collections — you build your own data pipeline
- Smaller community momentum compared to Astro (trending flat vs. Astro trending up)

#### Estimated Setup Time: 3-6 hours to first deploy (more manual setup)

---

### Option D: Hugo + PaperMod Theme (Fastest Build, Steepest Learning Curve)

| Aspect | Detail |
|--------|--------|
| **SSG** | Hugo v0.157+ |
| **Highlighting** | Chroma (built-in, 250+ lexers, zero JS) |
| **Search** | Fuse.js via theme (PaperMod includes search) |
| **Styling** | Theme-based + CSS overrides |
| **CMS** | Decap CMS / Front Matter CMS / CloudCannon |
| **Deploy** | GitHub Actions (install Go binary + build) |

#### Why Hugo

- **Absurdly fast builds**: 4K pages in 0.68s, 250 pages in 0.07s
- Single binary — no `node_modules`, no npm, no dependency hell
- Mature ecosystem (87K stars), thousands of themes
- Built-in taxonomies, archetypes, shortcodes

#### Pros

- Build speed is unmatched — irrelevant at our scale but scales to 10K+ pages effortlessly
- No JavaScript ecosystem baggage — single Go binary
- PaperMod theme has built-in search, copy button, dark mode, archive page
- Chroma highlighting is fast and covers most languages
- Strong CMS support (CloudCannon is an official Hugo sponsor)

#### Cons

- **Go template syntax is painful** — steepest learning curve of all options
- **Customizing layouts requires understanding Hugo's lookup order** — non-trivial
- **Not in the JS ecosystem** — can't `npm install` solutions, harder to add interactive features
- Themes are opinionated — adapting PaperMod to our card-based layout means overriding many partials
- Error messages are cryptic (`<.Params.title>: can't evaluate field Params in type string`)
- No component model for interactive features — must write vanilla JS or include via `<script>`

#### Estimated Setup Time: 2-4 hours with theme, 8+ hours for heavy customization

---

## 6. Stack Comparison Matrix

| Criteria | Weight | Astro | VitePress | 11ty | Hugo |
|----------|--------|-------|-----------|------|------|
| **Setup simplicity** | HIGH | 9/10 | 10/10 | 7/10 | 6/10 |
| **Layout flexibility** | HIGH | 10/10 | 5/10 | 10/10 | 6/10 |
| **Code highlighting** | HIGH | 10/10 | 10/10 | 7/10 | 8/10 |
| **Copy button (OOTB)** | HIGH | 9/10 (plugin) | 10/10 | 4/10 | 7/10 (theme) |
| **Search (OOTB)** | MED | 8/10 (Pagefind) | 10/10 | 5/10 (manual) | 7/10 (theme) |
| **CMS options** | MED | 10/10 | 3/10 | 8/10 | 7/10 |
| **Build speed** | LOW | 8/10 | 9/10 | 9/10 | 10/10 |
| **Learning curve** | HIGH | Low | Low (Vue) | Low | High |
| **Ecosystem/community** | MED | Large, growing | Medium | Medium | Large, stable |
| **Weighted Score** | | **~9.1** | **~7.8** | **~7.0** | **~6.8** |

---

## 7. CMS Strategy (Content Editing Without `git push`)

### Recommended: Layered Approach

| Layer | Tool | Who | When |
|-------|------|-----|------|
| **Primary** | github.dev (press `.` on repo) | Developers | Daily edits — full VS Code in browser, multi-file, preview markdown |
| **Secondary** | Sveltia CMS (or Decap CMS) | Anyone | Web-based form UI, WYSIWYG markdown, media uploads |
| **Power users** | Front Matter CMS (VS Code ext) | Developers | Local editing with content dashboard, schema validation, live preview |

### Sveltia CMS Setup (Recommended over Decap)

- Drop-in Decap CMS replacement — same `config.yml` format
- Under 500KB bundle (vs Decap's ~1.5MB)
- Fixes 290+ Decap bugs
- First-class i18n with AI translation (if ever needed)
- **Auth on GitHub Pages**: Requires an OAuth proxy (Cloudflare Worker or similar — one-time 15-min setup) OR use GitHub's built-in `github.dev` editor for zero-infra editing

### Alternative: Pages CMS (pagescms.org)

- Web-based CMS specifically built for GitHub repos
- Free, open-source, self-hostable on Vercel
- v1.0 released Dec 2024 — actively maintained
- No config file needed in repo — configure via their web UI
- Good fallback if Sveltia/Decap auth proves annoying

---

## 8. Recommendation

### **Go with Option A: Astro + Pagefind + Expressive Code + Tailwind**

**Rationale:**

1. **Best layout flexibility** — we're building a custom card-based showcase, not a docs site. Astro gives full HTML/CSS control with zero framework opinions on layout
2. **Content Collections with Zod** — enforce snippet schema at build time, catch broken frontmatter before deploy
3. **Expressive Code** — copy button, line highlighting, file tabs, diffs all work out of the box on code blocks
4. **Pagefind** — static search index, ~100KB, zero backend, great UX
5. **CMS ready** — 40+ integrations; Sveltia CMS can be added in an afternoon
6. **Zero JS by default** — fast page loads, only search and copy button ship JavaScript
7. **Growing ecosystem** — 57K stars and accelerating (joined Cloudflare Jan 2026)
8. **Tailwind v4** — zero config with Astro, utility-first CSS for rapid UI development

**VitePress is the runner-up** if we ever want the absolute fastest path to a working site and can accept a docs-style layout. It has the best built-in code features but the worst layout flexibility for our card-based design.

---

## 9. Project Structure (Astro)

```
github-resources/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deploy via withastro/action
├── public/
│   └── admin/                      # Sveltia/Decap CMS (optional)
│       ├── index.html
│       └── config.yml
├── src/
│   ├── content/
│   │   ├── config.ts               # Content collection schema (Zod)
│   │   └── snippets/               # Markdown files — one per resource
│   │       ├── docker-compose-pg.md
│   │       ├── github-actions-node.md
│   │       └── ...
│   ├── components/
│   │   ├── SnippetCard.astro       # Full-width resource card
│   │   ├── SearchBar.astro         # Pagefind search widget
│   │   ├── TagFilter.astro         # Category/tag filter pills
│   │   └── Header.astro
│   ├── layouts/
│   │   └── Base.astro              # HTML shell, head, fonts
│   └── pages/
│       └── index.astro             # Homepage — list all snippets
├── astro.config.mjs
├── tailwind.config.mjs             # (if customization needed beyond v4 defaults)
├── package.json
└── README.md
```

---

## 10. Deployment Pipeline

```
Developer writes .md file
        │
        ▼
Push to main (or merge PR)
        │
        ▼
GitHub Actions triggers
        │
        ▼
withastro/action@v5 builds site
        │
        ▼
Pagefind indexes content (post-build)
        │
        ▼
Static files deployed to GitHub Pages
        │
        ▼
Live at https://<user>.github.io/github-resources/
```

**Build time estimate**: <10 seconds for hundreds of snippets.

---

## 11. Implementation Phases

### Phase 1: Foundation (Day 1)
- [ ] Initialize Astro project with Tailwind
- [ ] Define Content Collection schema for snippets
- [ ] Create base layout + SnippetCard component
- [ ] Add 3-5 sample snippets
- [ ] Deploy to GitHub Pages

### Phase 2: Core Features (Day 2-3)
- [ ] Integrate `astro-expressive-code` (copy button, line highlights)
- [ ] Add Pagefind search
- [ ] Implement tag filtering (client-side)
- [ ] Responsive design pass
- [ ] Dark/light mode toggle

### Phase 3: CMS + Polish (Day 4-5)
- [ ] Add Sveltia CMS (or Decap CMS) admin panel
- [ ] Set up OAuth proxy (if using CMS web UI)
- [ ] Add category index pages
- [ ] SEO meta tags + Open Graph
- [ ] Performance audit (Lighthouse)

### Phase 4: Content (Ongoing)
- [ ] Migrate existing snippets/gists
- [ ] Establish content contribution guidelines
- [ ] Add breadcrumbs.md for development tracking

---

## 12. Success Criteria

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| Time to first deploy | < 4 hours |
| Time to add a new snippet | < 5 minutes (create .md, push) |
| Search latency | < 100ms (client-side) |
| Page load (no cache) | < 1.5s |
| Works without JavaScript | Core content readable (search degrades gracefully) |

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| `base` path breaks assets on project repos | Medium | Set `base` in config, test in CI before merge |
| Sveltia CMS OAuth requires external service | Low | Use github.dev as primary editor; CMS is optional |
| Astro Content Layer API changes | Low | Pin Astro version, update intentionally |
| Pagefind index grows large (1000+ snippets) | Low | Pagefind handles 10K+ pages fine (~500KB index) |
| Code blocks overflow on mobile | Medium | CSS `overflow-x: auto` on all code containers |

---

## Appendix: Rejected Alternatives

| Stack | Reason for Rejection |
|-------|---------------------|
| **Next.js static export** | Heaviest bundle, slowest builds, `.nojekyll` workaround, overkill for static content |
| **Docusaurus** | Great for docs, but sidebar-oriented layout fights our card-based design; Prism-only (no Shiki) |
| **Jekyll** | Native GitHub Pages support but Ruby ecosystem, slow builds, limited modern tooling |
| **Gatsby** | Effectively abandoned (Netlify gutted the team), GraphQL overhead for simple content |
| **Prose.io** | Unmaintained since 2014 — not viable as CMS |
| **Forestry.io** | Shut down — redirects to TinaCMS |
