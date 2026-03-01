---
title: "GitHub Actions Node CI"
description: "CI workflow for Node projects with caching and tests"
category: "CI/CD"
tags: ["github-actions", "node", "ci"]
language: "yaml"
date: 2026-03-01
---

```yaml
name: CI

on:
  push:
    branches: ["main"]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm test
```
