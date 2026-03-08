---
layout: snippet.njk
title: "Post-Task Checks"
description: "Guidelines for performing post-task checks to ensure code quality and correctness only for unit tests and integration tests."
category: "error handling"
tags: ["post-task", "errors", "checks", "testing", "linting"]
language: "yaml"
date: 2026-03-09
---

````md
## Post-Task Checks

Use this after any code change unless the user explicitly says to skip checks.

## Scope

- Keep checks small and practical.
- Check only unit or integration validation.
- Do not run e2e or Playwright/Cypress/Selenium.
- Use `npx` for fallback commands.

## 1. Check repo commands first

Before running checks:

- read `package.json`
- read `README.md`
- find test, typecheck, and lint commands
- exclude any e2e, Playwright, or browser-test command

If a documented non-e2e command exists, use it.
If not, use the fallback commands below.

## 2. Run only what matches the changed files

### TypeScript / JavaScript

Run when `.ts`, `.tsx`, `.js`, `.jsx`, or config files changed.

```bash
npx tsc --noEmit --pretty
npx eslint . --max-warnings 0
```

For non-e2e tests, prefer the documented project command.

### Python

Run when `.py` files changed.

```bash
npx pyright
python3 -m ruff check .
```

If `ruff` is unavailable, use the repo's documented Python lint command.

### HTML / CSS

Run when `.html`, `.css`, `.scss`, or layout/styling files changed.

Prefer the documented lint command first.
If ESLint covers these files, run:

```bash
npx eslint . --max-warnings 0
```

If Stylelint is configured, run:

```bash
npx stylelint "**/*.{css,scss,html}"
```

## 3. Simple detection

- `tsconfig.json` present -> run TypeScript check
- ESLint config present -> run ESLint
- Python files or `pyproject.toml` present -> run Python checks
- HTML/CSS files changed -> run repo lint or supported fallback linters

## 4. If a check fails

1. fix the relevant files
2. rerun only the failing check
3. do not mark the task done until it passes or the user tells you to stop

## 5. Report format

```text
POST-TASK CHECK SUMMARY

Tests      ✅ passed / ⏭ skipped / ❌ failed
Typecheck  ✅ passed / ⏭ skipped / ❌ failed
Lint       ✅ passed / ⏭ skipped / ❌ failed
Python     ✅ passed / ⏭ skipped / ❌ failed
HTML/CSS   ✅ passed / ⏭ skipped / ❌ failed

Errors:
- path/to/file:line - short error summary

Status: READY or NEEDS FIXES
```

## 6. Fallback set

Use only the commands that apply:

```bash
npx tsc --noEmit --pretty
npx eslint . --max-warnings 0
npx vitest run
npx jest --runInBand
npx pyright
python3 -m ruff check .
npx stylelint "**/*.{css,scss,html}"
```

```

```
````
