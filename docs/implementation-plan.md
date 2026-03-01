# Implementation Plan — GitHub Resources (Option C: Eleventy + Pagefind)

> **Status**: Draft  
> **Date**: 2026-03-01  
> **Approach**: Static site on GitHub Pages, client-side JS only (search + copy)  
> **Process**: TDD-first + Breadcrumb Pattern enabled

---

## 1. Scope + Constraints

- **Hosting**: GitHub Pages (static only; no backend).
- **Runtime**: Plain HTML/CSS; minimal JS for search and copy-to-clipboard.
- **Content**: Markdown files in repo with frontmatter.
- **UX**: Full-width cards, readable titles/descriptions, fast copy/paste, searchable.
- **Quality**: TDD for components and utilities; keep output deterministic and accessible.

---

## 2. Architecture

- **SSG**: Eleventy (11ty)
- **Search**: Pagefind (static index generated at build time)
- **Syntax Highlighting**: Prism via `@11ty/eleventy-plugin-syntaxhighlight`
- **Copy Button**: Tiny vanilla JS snippet on code blocks
- **Styling**: Vanilla CSS or Tailwind (decide during Phase 1)
- **CMS (optional)**: github.dev or Sveltia CMS later

---

## 3. TDD Workflow (Mandatory)

1. **Write tests first** for each new utility or rendering behavior.
2. Implement the minimum code to pass.
3. Refactor only with tests green.
4. Repeat for each card layout, search logic, and copy behavior.

Recommended test setup for Option C:

- **Unit tests**: Vitest for utilities (frontmatter parsing, tag filters).
- **DOM tests**: @testing-library/dom + happy-dom for HTML behavior.

---

## 4. Breadcrumb Pattern (Mandatory)

- Create `docs/breadcrumbs.md`.
- After each user interaction, append a **short technical entry** with:
  - What changed (files/features).
  - Any errors/failures and their solutions.
  - User actions detected from git diff.

---

## 5. Implementation Phases (Step-by-Step)

### Phase 1 — Project Bootstrap (Day 1)

1. Initialize Node project.
2. Install Eleventy + syntax highlight plugin + test tooling.
3. Create `src/` structure for content, layouts, and partials.
4. Add Eleventy config with:
   - Markdown parser
   - Syntax highlight plugin
   - Collections for snippets
5. Add 3 sample snippets to validate rendering.
6. Write tests for:
   - Frontmatter validation
   - Snippet collection sorting
7. Verify `npm test` passes.

### Phase 2 — Core Rendering (Day 2)

1. Build **SnippetCard** partial (full-width layout).
2. Build index page listing cards.
3. Add base layout and global styles.
4. TDD for:
   - Card HTML structure
   - Tag rendering
   - Code block wrapping
5. Verify `npm test` passes.

### Phase 3 — Copy Button + Accessibility (Day 3)

1. Implement JS for copy-to-clipboard on code blocks.
2. Add ARIA labels and focus styles.
3. TDD for:
   - Copy button presence
   - Copy action behavior (mock clipboard)
4. Verify `npm test` passes.

### Phase 4 — Search (Day 3-4)

1. Add Pagefind indexing step to build pipeline.
2. Implement search input with client-side filtering.
3. TDD for:
   - Search results filtering logic
   - No-results state
4. Verify `npm test` passes.

### Phase 5 — GitHub Pages Deployment (Day 4)

1. Add GitHub Actions workflow for build + deploy.
2. Ensure output directory is `_site`.
3. Verify `base` path for project repo works.
4. Deploy and verify live URL.

### Phase 6 — Content Scaling (Ongoing)

1. Add contribution guide for snippet format.
2. Expand tag taxonomy.
3. Optional CMS integration if needed.

---

## 6. Proposed Repo Structure

```
github-resources/
├── docs/
│   ├── implementation-plan.md
│   └── breadcrumbs.md
├── src/
│   ├── content/
│   │   └── snippets/
│   ├── layouts/
│   ├── partials/
│   └── pages/
├── _site/                 # build output
├── .github/workflows/
│   └── deploy.yml
├── eleventy.config.js
├── package.json
└── README.md
```

Note: GitHub Pages serves the root `index.html` from the published output. With Eleventy, this is generated at `_site/index.html` from `src/pages/index.njk`.

---

## 7. Acceptance Criteria

- Site builds to static HTML and deploys to GitHub Pages.
- Each snippet renders as a full-width card with title, description, tags, and code block.
- Search works offline in-browser with static index.
- Copy button works on all code blocks.
- Tests pass in CI (`npm test`).

---

## 8. Risks + Mitigations

| Risk                                    | Impact | Mitigation                                                 |
| --------------------------------------- | ------ | ---------------------------------------------------------- |
| Search JS size grows with many snippets | Low    | Pagefind scales to 10k+ pages; index remains small         |
| Prism lacks language support            | Medium | Add Prism languages explicitly or replace with Shiki later |
| Copy button fails on older browsers     | Low    | Fallback: select + prompt copy                             |
| GitHub Pages base path breaks links     | Medium | Use Eleventy `pathPrefix` for project repo                 |
