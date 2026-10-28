# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is a bare scaffold for a portfolio project. It contains only `package.json` (one devDependency, `@types/bun`) and `bun.lock`. There is no source code, build system, linter, or test setup yet, so there are no build/lint/test commands to document. Update this file once those exist.

## Commits

Follow Conventional Commits and keep commits small; the full rules are in `.claude/rules/commits.md`. Message format is enforced deterministically by a Husky `commit-msg` hook running commitlint (`@commitlint/config-conventional`, configured in `commitlint.config.mjs`); a non-conforming commit is rejected, so fix the message instead of bypassing with `--no-verify`. Hooks are installed by `bun install` via the `prepare` script. Branch names, issue titles and pull request titles follow the same convention, see `.claude/rules/issues-branches-and-prs.md`; branch names are enforced on push by a Husky `pre-push` hook, so create branches as `<type>/<kebab-description>` from the start.

CI (`.github/workflows/`) repeats these checks for pull requests (`pr.yml`: every commit message, the PR title, and the branch name) and checks issue titles (`issue-title.yml`). The branch-name rule lives only in `scripts/check-branch-name.sh`, shared by the hook and CI. Workflows install with `bun install --frozen-lockfile` and set `HUSKY=0`.

## Tooling

- Package manager and runtime: **Bun** (lockfile is `bun.lock`; use `bun install`, not npm/yarn/pnpm).
- `.gitignore` covers `node_modules/`, build output, env files, logs and coverage. `bun.lock` is tracked.
