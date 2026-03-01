# GitHub Resources

https://adrianmaciuc.github.io/github-resources/

Static code snippet showcase for GitHub Pages. Built with Eleventy and designed for fast copy/paste, searchable content, and simple markdown-based management.

## Requirements

- Node.js 18+ (recommended)
- npm 9+

## Local Development

```bash
npm install
```

Run tests:

```bash
npm test
```

Run locally:

```bash
npm run serve
```

Open `http://localhost:8080`.

Build the site:

```bash
npm run build
```

Clean build (recommended for Pagefind indexing):

```bash
npm run build:clean
```

The static output is generated in `_site/`.

## Content Authoring

Add a new snippet as a markdown file in `src/content/snippets/`.

Frontmatter example:

```yaml
---
title: "GitHub Actions Node CI"
description: "CI workflow for Node projects with caching and tests"
category: "CI/CD"
tags: ["github-actions", "node", "ci"]
language: "yaml"
date: 2026-03-01
---
```

## Deploy to GitHub Pages

This project is a static site. GitHub Pages serves the root `index.html` from the build output folder (`_site/index.html`).

### Option A: GitHub Actions (Recommended)

1. Create a workflow file at `.github/workflows/deploy.yml`.
2. Use the following template:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

3. In GitHub repo settings, set Pages source to **GitHub Actions**.

### Option B: Manual Build + Deploy Branch

1. Build locally:

```bash
npm run build
```

2. Commit and push `_site/` to a `gh-pages` branch.
3. In GitHub repo settings, set Pages source to `gh-pages`.

## Breadcrumb Pattern

Development notes are kept in `docs/breadcrumbs.md`. Add a short technical entry after each change.
