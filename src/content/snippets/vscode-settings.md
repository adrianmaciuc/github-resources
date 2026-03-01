---
title: "VS Code Settings (Productivity)"
description: "Focused editor defaults for formatting, linting, and file hygiene"
category: "Tooling"
tags: ["vscode", "settings", "editor"]
language: "json"
date: 2026-03-01
---

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": {
    "**/.DS_Store": true,
    "**/node_modules": true
  }
}
```
