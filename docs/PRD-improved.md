# PRD Improved: GitHub Resources — Code Snippets Showcase

> **Status**: In Development  
> **Date**: 2026-03-09  
> **Author**: Gemini CLI & Architecture Planning  
> **Repository**: `github-resources`

---

## 1. Problem Statement

Developers frequently need quick access to reusable code snippets, configuration templates, and markdown references across projects. GitHub Gists exist but lack discoverability, visual organization, and a browsable showcase experience. We need a **static website hosted on GitHub Pages** that serves as a curated, searchable library of code resources — easy to browse, copy, and maintain.

---

## 2. Goals (Updated)

| Priority | Goal | Status |
|----------|------|--------|
| **Must** | Static site deployable to GitHub Pages (no server) | ✅ Implemented (Eleventy) |
| **Must** | Code snippets with syntax highlighting + one-click copy | ✅ Implemented (PrismJS + copy.js) |
| **Must** | Searchable content | ✅ Implemented (Pagefind + Local fallback) |
| **Must** | Card/section-based layout — full-width, scrollable, scannable | ✅ Implemented (Hand-Drawn Aesthetic) |
| **Must** | Markdown-based content management (files in repo) | ✅ Implemented |
| **Must** | Fast to deploy, simple to maintain | ✅ Implemented (GitHub Actions) |
| **Should** | Simple CMS or editor for content without `git push` | 🏗️ Planned (Sveltia CMS) |
| **Should** | Dark/light theme toggle | 🏗️ Planned |
| **Could** | Tagging / filtering by category or language | 🏗️ Partially Implemented (Search) |
| **Could** | Better Syntax Highlighting (Shiki) | 🏗️ Planned |

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

Followed by the code block(s) and optional notes. 

**Content lives in**: `src/content/snippets/`

---

## 4. UI / UX Specification

### Aesthetic: "Hand-Drawn / Sketch"
The current implementation adopts a playful, hand-drawn aesthetic using custom fonts (`Kalam`, `Patrick Hand`) and wobbly borders to create a "sticky note" or "notebook" feel.

### Key UI Features
- **Wobbly Cards**: Each snippet is housed in a card with a unique rotation and irregular borders.
- **Tape Tags**: Tags are styled as pieces of tape, enhancing the physical notebook vibe.
- **Sticky Search**: Client-side search with Pagefind and a local fallback for offline-ready performance.
- **Instant Copy**: Copy button available on every snippet card.
- **Search Highlighting**: Search terms are highlighted in code blocks using a "highlighter yellow" style.

---

## 5. Current Technical Stack

| Component | Technology |
|-----------|------------|
| **SSG** | Eleventy (11ty) v3+ |
| **Highlighting** | `@11ty/eleventy-plugin-syntaxhighlight` (PrismJS) |
| **Search** | Pagefind (Static search) + Local JS Fallback |
| **Styling** | Vanilla CSS (Hand-Drawn Custom Theme) |
| **Testing** | Vitest + Happy DOM |
| **Deploy** | GitHub Actions (`deploy.yml`) |

### Rationale for Eleventy (Option C)
While Astro was recommended, Eleventy was chosen for its **maximum simplicity** and zero-JavaScript-by-default output. It allows for absolute control over HTML/CSS, which was essential for the highly custom "Hand-Drawn" theme.

---

## 6. Project Structure (Current)

```
github-resources/
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages deployment
├── docs/
│   ├── PRD.md                  # Original planning document
│   └── PRD-improved.md         # Current status & future roadmap
├── src/
│   ├── assets/                 # CSS, JS, Favicon
│   │   ├── copy.js             # One-click copy logic
│   │   ├── search.js           # Search integration
│   │   └── styles.css          # Hand-drawn theme
│   ├── content/snippets/       # Markdown source files
│   ├── layouts/                # Nunjucks layouts (base, snippet)
│   ├── pages/                  # Main landing pages
│   └── partials/               # Reusable components (snippet-card)
├── tests/                      # Automated tests
├── eleventy.config.js          # SSG configuration
└── package.json
```

---

## 7. Future Improvements & Roadmap

### 🚀 Phase 4: Enhanced UI/UX (Next Up)
- [ ] **Dark Mode**: Implement a dark theme version of the hand-drawn aesthetic (e.g., "Chalkboard" mode).
- [ ] **Interactive Tags**: Make tags clickable to instantly filter the list by that tag.
- [ ] **Sticky Header**: Keep the search bar visible while scrolling through long lists.

### 🛠️ Phase 5: Technical Refinement
- [ ] **Shiki Highlighting**: Migrate from PrismJS to Shiki for more accurate, VS-Code quality syntax highlighting.
- [ ] **SEO Optimization**: Add Open Graph images and better meta tags for social sharing.
- [ ] **Asset Minification**: Optimize CSS and JS for even faster load times.

### 📝 Phase 6: CMS & Content
- [ ] **Sveltia CMS**: Add `admin/config.yml` and integration for web-based editing.
- [ ] **Snippet Templates**: Add a "New Snippet" CLI tool or template file to ensure consistent frontmatter.

---

## 8. Success Criteria (Updated)

| Metric | Target | Current Status |
|--------|--------|----------------|
| Lighthouse Performance | > 95 | 🟢 On Track |
| Time to first deploy | < 4 hours | ✅ Met |
| Time to add a new snippet | < 2 minutes | ✅ Met |
| Search latency | < 50ms | ✅ Met |
| Aesthetic Uniqueness | "Feels like a notebook" | ✅ Met |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| PrismJS accuracy for obscure languages | Low | Upgrade to Shiki if needed |
| CSS complexity for Hand-Drawn style | Medium | Keep styles modular and well-commented |
| Pagefind index size | Low | Monitor build output; use `exclude_pattern` if needed |
