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
## Precedence rule

When sections conflict, lower section numbers take precedence. Later sections add detail; they do not override earlier ones.

---

## 1. Workflow — required for every task

Before starting, read the relevant parts of the codebase to understand scope. If a repository uses a monorepo structure, executing commands and logging documents must target the package root of the service where changes were made, not the root of the workspace. Follow this sequence in order:

1. **Understand** — Read existing files to map the workspace. Use an Explore sub-agent for unfamiliar structures.
2. **Clarify** — Halt and ask follow-up questions only if:
   - A required file/directory path is absent from the workspace.
   - Task requirements directly contradict existing codebase patterns.
   - Structural design decisions are not specified.
   - You have to make an assumption. An assumption is when your reasoning confidence is below 90% or you do not have direct evidence. If you have to guess, ask instead. Do not proceed with guesses or assumptions.
3. **Implement** — Apply changes in small, atomic steps. Break large tasks into sequential phases.
4. **Verify** — Run post-task checks (§6) after every change.
5. **Log breadcrumb** — Append an atomic log entry in `breadcrumbs.md` (§4).
6. **Log bug-fix** — If a bug was resolved, write a full entry in `bug-fixes.md` (§3).

---

## 2. Definition of done

Mark a task complete only when all criteria are met:

- [ ] Target requirements are fully implemented.
- [ ] Unit or integration tests exist and pass.
- [ ] Test coverage is limited strictly to unit/integration suites (exclude e2e/browser tests).
- [ ] Lint and type checks pass with zero warnings.
- [ ] Credentials/secrets are stored exclusively in environment variables or configuration files.
- [ ] Database/array traversals avoid nested loops ($O(N^2)$ complexity).
- [ ] Checklists in `breadcrumbs.md` (and `bug-fixes.md` if applicable) are appended.

---

## 3. Bug-fix tracking (`bug-fixes.md`)

Write an entry every time you resolve a bug or regression. Create the file next to `breadcrumbs.md` if it is missing.

### 3.1 Template

```
N. Date/time: YYYY-MM-DD HH:MM UTC | Area: <area> | Title: <title> | Files: <files> | Problem: <what broke and how it manifested> | Cause: <why it broke> | Fix: <what was changed and why it resolves the cause>
```

### 3.2 Example

```
1. Date/time: 2024-01-01 12:00 UTC | Area: authentication | Title: Login failure with special characters in password | Files: src/auth/login.ts, tests/auth/login.test.ts | Problem: Users with "@" in their password cannot log in. | Cause: Regex validation did not allow special characters. | Fix: Updated regex to permit all printable ASCII characters.
```

---

## 4. Breadcrumb tracking (`breadcrumbs.md`)

Record completed work to prevent redundant searches or repeating past development errors.

**Timing:** Commit a breadcrumb entry after completing a major task or a batch of 3–4 minor tasks. Avoid writing entries for individual micro-steps.

**Opt-out:** Stop prompting and writing breadcrumbs if the user explicitly declines.

Rules:

- Write one scannable, atomic entry per user-visible outcome (feature, review, search, or failed attempt).
- Restrict file paths to repo-relative paths only.
- Compare with `git diff` and existing logs to avoid duplicate entries.

### 4.1 Template

```
N. Date/time: YYYY-MM-DD HH:MM UTC | Type: <type> | Area: <area> | Task: <task> | Files: <files> | Change: <what changed> | Tests: <result> | Failure/Error: <error or N/A> | Fix/Outcome: <result>
```

### 4.2 Good example

```
1. Date/time: 2024-01-01 12:00 UTC | Type: feature | Area: authentication | Task: Added password strength meter to login page | Files: src/auth/login.tsx, src/components/PasswordStrengthMeter.tsx | Change: New component evaluates password strength on input; integrated into login form. | Tests: Unit tests added; all pass. | Failure/Error: N/A | Fix/Outcome: Users see real-time strength feedback.
```

### 4.3 Bad example — do not copy

```
- Date/time: 2026-03-15
- Type: documentation
- Task: Standardized breadcrumb file.
- Files: docs/breadcrumbs.md
- Fix/Outcome: Breadcrumb history now follows the documented format.
```

---

## 5. Documentation practices

- Write concisely for a developer unfamiliar with the codebase; avoid assuming domain knowledge.
- Keep output summaries strictly technical, micro-sized, and readable by engineering managers.

### 5.1 Implementation plans

- Structure plans as a sequential, checkbox-based tracking list (`- [ ]`).
- Mark verified or pre-existing steps as completed (`- [x]`) with a brief note.
- Offer manual verification steps after each phase: provide a one-paragraph change explanation alongside a step-by-step testing guide.

### 5.2 Planning and design documentation

Use active `context7` MCP tools or the `context7-cli` extension for planning and design tasks when they are registered in the current environment.

---

## 6. Post-task checks

Execute checks automatically after every code change unless specifically instructed to skip.

### 6.1 Check repo commands first

Read `package.json` and `README.md`. Prioritize documented, non-e2e scripts. Exclude e2e, browser-based, Playwright, or Cypress suites. If no project commands exist, use the fallbacks in §6.2.

### 6.2 Run checks matching changed files

| Changed files                        | Commands to run                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| `.ts`, `.tsx`, `.js`, `.jsx`, config | `npx tsc --noEmit --pretty` then `npx eslint . --max-warnings 0`                     |
| `.py`                                | `npx pyright` then `python3 -m ruff check .` (use repo command if `ruff` is missing) |
| `.html`, `.css`, `.scss`             | `npx eslint . --max-warnings 0` (or `npx stylelint` if configured)                   |

For test verification, prioritize the project's native command over `npx vitest run` or `npx jest --runInBand`.

### 6.3 Automation triggers

- `tsconfig.json` present → Execute TypeScript check.
- ESLint configuration present → Execute ESLint.
- Python files / configuration present → Execute Python checks.

### 6.4 Handling failures

1. If a test or linter check fails, run an integrated codebase search to check if the error is a project-wide configuration mismatch before attempting manual code modifications.
2. Fix the targeted codebase files.
3. Execute _only_ the failing check.
4. Repeat until validation passes. Halt execution only if instructed by the user.

### 6.5 Report format

```
POST-TASK CHECK SUMMARY

Tests      ✅ passed / ⏭ skipped / ❌ failed
Typecheck  ✅ passed / ⏭ skipped / ❌ failed
Lint       ✅ passed / ⏭ skipped / ❌ failed
Python     ✅ passed / ⏭ skipped / ❌ failed
HTML/CSS   ✅ passed / ⏭ skipped / ❌ failed

Errors:
- path/to/file:line — short error summary

Status: READY or NEEDS FIXES
```
````
