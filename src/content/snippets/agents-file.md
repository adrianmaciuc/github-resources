---
layout: snippet.njk
title: "AGENTS.md file"
description: "My go to file for working with agents"
category: "Agentic"
tags: ["agents"]
language: "yaml"
date: 2026-03-01
---

```md
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
- After each user interaction, append a short technical summary of what happened.
- Include development work: features added, successful attempts, and failed attempts.
- Include debugging and error-fixing notes with short technical details.
- Include failures, errors, bugs, and problems even when no solution is found. If a solution exists, include it.
- Include troubleshooting notes when relevant.
- Capture both agent actions and user actions. Use git diff to identify user changes, and check previous breadcrumb entries to avoid duplicates.
- If the user says NO (or otherwise declines breadcrumbs), stop asking about breadcrumbs from that point onward and inform the user you will no longer ask.
- If breadcrumbs.md file already exists always append never replace

Breadcrumb entry template (recommended):

- Date/time: {Date/time} Task: {short description of the task} Change: {short description of the change} Failure/Error (if any): {short description of any failure or error that occurred} Fix/Outcome: {short description of how it was fixed or the outcome if no fix was needed}
- Example: 2026-03-01: Added copy-to-clipboard feature with TDD. Added copy button markup, client JS at src/assets/copy.js, passthrough copy config, and updated tests. `npm test` passing.

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
```
