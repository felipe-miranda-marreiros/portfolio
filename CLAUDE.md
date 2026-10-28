# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is a bare scaffold for a portfolio project. It contains only `package.json` (one devDependency, `@types/bun`) and `bun.lock`. There is no source code, build system, linter, or test setup yet, so there are no build/lint/test commands to document. Update this file once those exist.

## Tooling

- Package manager and runtime: **Bun** (lockfile is `bun.lock`; use `bun install`, not npm/yarn/pnpm).
- `.gitignore` covers `node_modules/`, build output, env files, logs and coverage. `bun.lock` is tracked.
