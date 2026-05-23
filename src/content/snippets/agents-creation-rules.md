---
layout: snippet.njk
title: "AGENTS.md Creation Rules"
description: "Rules to follow when creating AGENTS.md files or instructions for agents in general."
category: "Agentic"
tags: ["agents"]
language: "yaml"
date: 2026-05-23
---

```md
> A distillation of what separates a reliable agent instruction file from one that produces inconsistent behaviour.

---

## The 11 rules that matter when creating agent instruction files

1. **Declare a precedence rule first.** When instructions conflict — and they will — the agent must know which section wins. Without it, behaviour is non-deterministic.
   - _Example:_ If section 1 and section 5 conflict, the lower section number (section 1) takes precedence.

2. **One canonical checklist, not two.** Every duplicate "definition of done" or "quality gate" creates a fork the agent must resolve silently. Merge them.
   - _Example:_ Avoid having a "Definition of Done" at the top and a different "Task Completion Checklist" at the bottom. Use exactly one unified set of checkboxes.

3. **Write only enforceable rules.** If a rule cannot be checked with observable output, remove it. "If you need to assume a file path, ask first" is checkable.
   - _Example:_ _Bad:_ "Work with deep reasoning." _Good:_ "If a required file path is absent from the workspace, halt and ask for clarification."

4. **Use imperative sentences. Cut the explanations.** Rules are instructions, not tutorials. Prose that explains _why_ a rule exists belongs in a README, not inside the instruction set itself. Shorter files are read more reliably.
   - _Example:_ _Bad:_ "Checking your code is important because bugs can hurt production systems." _Good:_ "Execute unit tests after every local change."

5. **Fix your section numbering.** An agent parsing `## 2` then `### 3.1` with no `## 3` heading will silently misroute context. Numbering must be linear and unbroken.
   - _Example:_ Ensure every `### 3.1` is nested directly underneath a parent `## 3` heading, rather than jumping headings.

6. **Spend your emphasis budget carefully.** `CRITICAL`, `HIGHLY IMPORTANT`, `ABSOLUTE`, and bold text all pull from the same finite pool of reader attention. If everything is critical, nothing is.
   - _Example:_ Instead of `**CRITICAL ENFORCEMENT PROTOCOL**`, simply write: "Halt if the linter fails."

7. **One trigger per action.** Contradictory triggers for the same behaviour (e.g. "write after every interaction" vs. "don't write after small steps") guarantee inconsistency. Pick one rule; delete the other.
   - _Example:_ "Write a breadcrumb entry only after completing a major task or a batch of 3–4 minor tasks."

8. **Examples beat descriptions.** A concrete good/bad example pair teaches format faster than three paragraphs of rules. Keep at least one for every template you define.
   - _Example:_ Show exactly how a 1-line log record should look alongside a multi-line output to avoid formatting errors.

9. **Length is a reliability variable.** Every line competes with task context inside the agent's context window. Treat file length as a budget — spend it only on rules that cannot be enforced by code or tooling.
   - _Example:_ Let ESLint enforce standard semicolon rules; do not write code-style formatting rules inside the agent workspace markdown instructions.

10. **One behaviour per rule.** A rule with multiple clauses ("do X and also Y when Z") creates partial compliance — the agent may satisfy one clause and silently skip the other. Split compound rules.
    - _Example:_ Avoid "Run checks and document outcomes." Use two sequential steps: "1. Run checks. 2. Log outcomes."

11. **Phrase rules positively.** "Ask before assuming a path" is parsed more reliably than "Do not proceed without confirming unless the path is obvious." Negation chains accumulate parsing errors.
    - _Example:_ _Bad:_ "Do not use non-environment files for secrets." _Good:_ "Store credentials exclusively in environment variables or configuration files."

---
```
