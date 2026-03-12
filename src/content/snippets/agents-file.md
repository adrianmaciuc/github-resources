---
layout: snippet.njk
title: "AGENTS.md file"
description: "My go to file for working with agents"
category: "Agentic"
tags: ["agents"]
language: "yaml"
date: 2026-03-01
---

````md
## Actions before everything

- All actions, plans, or tasks should happen only after reading the codebase and getting a high-level understanding of what the project does and its folder structure.

Quick execution order for agents:

1. Understand codebase and scope.
2. Clarify only if needed.
3. Implement atomic changes.
4. Run tests, lint, and type checks.
5. Document key outcomes (and breadcrumbs if enabled).

## Quality Gates (before marking a task done)

- Deterministic acceptance tests (unit/integration) exist and pass.
- Performance/complexity is appropriate for expected scale.
- Security considerations addressed (inputs validated, secrets not hard-coded, least privilege).

## Fixing bugs

- When you fix a bug requested by the user, write it in a markdown file, or append it to breadcrumbs if available.
- Keep it short and descriptive so future agents avoid the same mistake.

## Breadcrumb pattern - HIGHLY IMPORTANT

Always ask the user whether they want to use the Breadcrumb Pattern before applying the rules below:

- The primary purpose of this pattern is to track development and avoid repeating mistakes.
- Breadcrumb entries should be easy to read for both humans and agents.
- Each project should have a breadcrumbs.md file.
- Keep the default name `breadcrumbs.md`; if you need a scoped version, create `breadcrumb.md` in a descriptive folder (for example: deployments/breadcrumbs.md).
- Create breadcrumbs.md in the root documentation folder, or another folder intended for AI/agent collaboration.
- Do not write long-form narrative entries in breadcrumbs.md.
- Keep breadcrumbs atomic: one entry per user-visible fix, review, investigation, or failed attempt.
- After each relevant interaction, append a short technical entry with only the minimum retrieval context.
- Use breadcrumbs for development work, successful attempts, failed attempts, reviews, investigations, and troubleshooting milestones.
- Move explanation-heavy notes, debugging details, root-cause writeups, and remediation steps to bug-fixes.md.
- Create bug-fixes.md in the same documentation or AI-collaboration area as breadcrumbs.md when the project needs durable bug history.
- bug-fixes.md should store concise but explanation-friendly records for bugs, regressions, failures, and their fixes.
- Every breadcrumb entry must include `type` and `area`. These fields are required because they improve retrieval quality.
- Normalize test status to a small enum only: `passed`, `failed`, `partial`, `na`.
- Normalize file paths to repo-relative paths only.
- Include failures, errors, bugs, and problems even when no solution is found. If a solution exists, include the result and keep deep detail in bug-fixes.md when needed.
- Include troubleshooting notes when relevant.
- Capture both agent actions and user actions. Use git diff to identify user changes, and check previous breadcrumb entries to avoid duplicates.
- If the user says NO (or otherwise declines breadcrumbs), stop asking about breadcrumbs from that point onward and inform the user you will no longer ask.

Breadcrumb entry template (recommended):

- Date/time:
- Type:
- Area:
- Task:
- Files:
- Change:
- Tests:
- Failure/Error (if any):
- Fix/Outcome:

bug-fixes.md entry template (recommended):

- Date/time:
- Area:
- Title:
- Files:
- Problem:
- Cause:
- Fix:
- Tests:
- Follow-up:

## Documentation practices

- Be concise, specific, and value-dense.
- Write so that a new developer to this codebase can understand your writing, don’t assume your audience are experts in the topic/area you are writing about.
  Whenever you make a summary, it has to be the shortest summary possible. Keep the details to a minimum.
- If you write a summary into a markdown file, keep it short, technical, and easy to read by a manager.

## Performing tasks

- Before performing any task, make sure to understand the requirements and the context of the task. If you have any doubts, ask for clarification before proceeding.
- Always test your code after making changes, and make sure to check for any errors or unexpected behavior. If you encounter any issues, try to debug them using the appropriate tools and resources, and don't hesitate to ask for help if you need it. Remember that debugging is a crucial part of the development process, and it's important to approach it with deep reasoning and a problem-solving mindset.
- After each task, check for linter and type-checker errors, and fix any that appear. This helps maintain code quality and prevent future issues.
- Always break down your tasks into smaller, manageable steps. This will help you to stay organized and focused, and it will also make it easier to identify any issues that may arise during the process.
- All tasks should be atomic, meaning that they should be small and focused on a single aspect of the project. This will help to maintain the code quality and prevent potential issues in the future.

Definition of done:

- Requirements implemented.
- Tests/lint/type checks pass.
- Security checks completed.
- Documentation/breadcrumb note updated when applicable.

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
````

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
