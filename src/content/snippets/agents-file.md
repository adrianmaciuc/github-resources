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
## 1. Instructions for Agents

- All actions, plans, or tasks should happen only after reading the codebase and getting a high-level understanding of what the project does and its folder structure.

**CRITICAL** Order of actions: Each step uses a sub-agent. The main agent waits for the sub-agent to finish before moving to the next step.

1. Understand codebase and scope.
2. If any of your outputs require you to make an assumption, ask follow-up questions to reach at least 90% confidence before proceeding.
3. Implement changes.
4. Run tests, lint, and type checks.
5. Document key outcomes in `breadcrumbs.md` and/or `bug-fixes.md`.

EACH task performed should adhere to the above order of actions every single time. This ensures that you have a good understanding of the codebase, that your assumptions are validated, that your changes are properly tested, and that your work is documented for future reference.

## 2. Quality Gates (before marking a task done)

- Deterministic acceptance tests (unit/integration) exist and pass.
- Established checks are marked as passed according to the implementation docs.
- Performance/complexity is appropriate for expected scale.
- Security considerations addressed (inputs validated, secrets not hard-coded, least privilege).

### 3.1 Bug-fixes history tracking - HIGHLY IMPORTANT

- Every time you fix a bug or regression, document it in `bug-fixes.md` with a concise but explanation-friendly entry. This should include the problem, root cause, and remediation steps. This helps build a knowledge base of issues and solutions for future reference and learning.
- Each project should have a `bug-fixes.md` file, if not create one in the same documentation or AI-collaboration area as `breadcrumbs.md`.
- `bug-fixes.md` entries are twice as big in size as `breadcrumbs.md` entries on average, due to the need for more detailed explanations, root cause analysis, and remediation steps.

### 3.2 `bug-fixes.md` entry template:

- Incremental numbering
- Date/time:
- Area:
- Title:
- Files:
- Problem:
- Cause:
- Fix:

Example of `bug-fixes.md` entry:
``

1. Date/time: 2024-01-01 12:00 UTC | Area: authentication | Title: Login failure with special characters in password | Files: src/auth/login.ts, tests/auth/login.test.ts | Problem: Users with "@" symbol in their passwords cannot log in due to regex validation. | Cause: The regex pattern used for password validation did not account for special characters. | Fix: Updated the regex pattern to include special characters.
   ``

Follow strictly the templates and guidelines above to ensure consistency and usefulness of the bug-fixes documentation. The examples are crucial for understanding the format.

## 4. Breadcrumb pattern - HIGHLY IMPORTANT

Always use the Breadcrumb Pattern applying the rules below:

- The primary purpose of this pattern is to track development and avoid repeating mistakes.
- Breadcrumb entries should be easy to read for both humans and agents.
- Each project should have a `breadcrumbs.md` file.
- Keep the default name `breadcrumbs.md`; if you need a scoped version, create `breadcrumb.md` in a descriptive folder (for example: `deployments/breadcrumbs.md`).
- Create `breadcrumbs.md` in the documentation folder, or another folder intended for AI/agent collaboration.
- Do not write long-form narrative entries in `breadcrumbs.md`.
- Keep breadcrumbs atomic: one entry per user-visible fix, review, investigation, failed attempt or similar.
- After each relevant interaction, append a short technical entry with only the minimum retrieval context.
- Use breadcrumbs for development work, successful attempts, failed attempts, reviews, investigations, and troubleshooting milestones.
- Normalize file paths to repo-relative paths only.
- Include failures, errors, bugs, and problems even when no solution is found. If a solution exists, include the result and keep deep detail in `bug-fixes.md` when needed.
- Include troubleshooting notes when relevant.
- Capture both agent actions and user actions. Use git diff to identify user changes, and check previous breadcrumb entries to avoid duplicates.
- If the user says NO (or otherwise declines breadcrumbs), stop asking about breadcrumbs from that point onward and inform the user you will no longer ask.

### 4.1 Breadcrumb entry template:

- Incremental numbering
- Date/time:
- Type:
- Area:
- Task:
- Files:
- Change:
- Tests:
- Failure/Error (if any):
- Fix/Outcome:

Good Example of `breadcrumbs.md` entry:
``

1. Date/time: 2024-01-01 12:00 UTC | Type: improve user experience | Area: authentication | Task: Implemented password strength meter on the login page | Files: src/auth/login.tsx, src/components/PasswordStrengthMeter.tsx | Change: Added a new component to evaluate and display password strength based on common criteria. Integrated it into the login form. | Tests: Added unit tests for the PasswordStrengthMeter component, all tests pass. | Failure/Error: N/A | Fix/Outcome: Users can now see the strength of their passwords in real-time, improving security awareness.
   ``

Bad example of `breadcrumbs.md` entry:
``

- Date/time: 2026-03-15
- Type: documentation
- Area: process
- Task: Standardized the breadcrumb file to match the project breadcrumb pattern.
- Files: docs/breadcrumbs.md
- Change: Removed the custom heading and rule prose, and normalized the file to atomic template-based entries.
- Tests: na
- Fix/Outcome: Breadcrumb history now follows the documented retrieval-friendly format.
  ``

Follow strictly the templates and guidelines above to ensure consistency and usefulness of the breadcrumbs. The examples are crucial for understanding the format.

## 5. Documentation practices

- Be concise, specific, and value-dense.
- Write so that a new developer to this codebase can understand your writing, don’t assume your audience are experts in the topic/area you are writing about.
  Whenever you make a summary, it has to be the shortest summary possible. Keep the details to a minimum.
- If you write a summary into a markdown file, keep it short, technical, and easy to read by a manager.

### 5.1 Implementation plans

- Each plan should have a clear tracking mechanism to monitor progress and ensure accountability. This can be achieved by breaking down the plan into smaller, actionable steps and using a checklist format to track completion.
- Use ✅ **Implementation tracking:** Each item includes a checkbox.
- If you (or a future agent) verify that a step is already implemented, mark it as `- [x]` and optionally add a short note. Keep this list updated as the codebase evolves.

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
````
