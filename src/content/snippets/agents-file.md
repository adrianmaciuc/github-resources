---
layout: base.njk
title: "AGENTS.md file"
description: "My go to file for working with agents"
category: "Agentic"
tags: ["agents"]
language: "yaml"
date: 2026-03-01
---

```md
## Actions before everything

- All actions , plans or tasks should happen only after you read the codebase and have a higher level understanding of what the project does and its folder structure

## Quality Gates (before marking a task done)

- Deterministic acceptance tests (unit/integration) exist and pass.
- Performance/complexity is appropriate for expected scale.
- Security considerations addressed (inputs validated, secrets not hard-coded, least privilege).

## Fixing bugs

- When you fix a bug requested by the user, write that down into a markdown file or if breadcrumbs are available append to them. Write it in a way that is really short and descriptive for the future agents to read and not make the same mistake again.

## Breadcrumb pattern - HIGHLY IMPORTANT

Always ask the user if he wants to use the Breadcrumb Pattern before applying the below rules:

- The main absolute scope of this pattern is to keep track of development and learn not to make the same mistakes again
- Format of the information in breadcrumbs should be easily read by humans and agents as well
- Each project should have a breadcrumbs.md file
- Always keep the name `breadcrumbs.md` as default but if you have different scope create a `breadcrumb.md` file for that scope located in a descriptive folder (for example: for deployments you will have `deployments/breadcrumbs.md`)
- breadcrumbs.md file should be created inside the root documentation folder of the project or anywhere that matches with interaction with AI or agents folders
- After each interaction with the user the breadcrumb file has appended a very short summary with what just happened, highly technical but really easy to read
- Information added to the breadcrumb file should be related to development, adding new features, including successful adding and failed attempt to add
- Information added to the breadcrumb file should also include debugging and fixing errors, with very short details
- Breadcrumbs should include failures, errors, bugs, problems even if no solution found. But if solution was provided always include the solution to any problem
- Breadcrumbs should also include any troubleshooting notes

## Documentation practices

- Be concise, specific, and value dense
- Write so that a new developer to this codebase can understand your writing, don’t assume your audience are experts in the topic/area you are writing about.
  Whenever you make a summary, it has to be the shortest summary possible. Keep the details to a minimum.
- If you write a summary into a markdown file it has to be really short and tehnical but easy to read by a manager

## Performing tasks

- Before performing any task, make sure to understand the requirements and the context of the task. If you have any doubts, ask for clarification before proceeding.
- Always test your code after making changes, and make sure to check for any errors or unexpected behavior. If you encounter any issues, try to debug them using the appropriate tools and resources, and don't hesitate to ask for help if you need it. Remember that debugging is a crucial part of the development process, and it's important to approach it with deep reasoning and a problem-solving mindset.
- After each task done make sure to check for linters and type checkers errors, and fix them if there are any. This will help to maintain the code quality and prevent potential issues in the future.
- Always break down your tasks into smaller, manageable steps. This will help you to stay organized and focused, and it will also make it easier to identify any issues that may arise during the process.
- All tasks should be atomic, meaning that they should be small and focused on a single aspect of the project. This will help to maintain the code quality and prevent potential issues in the future.
```
