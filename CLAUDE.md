# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is a scaffold for a portfolio project: there is no application source, build system or linter yet, only the tooling that enforces the conventions below (Husky hooks, commitlint, GitHub workflows, Claude Code rules, hook and skills).

## Commands

- `bun install`: installs dependencies and sets up the Husky hooks via the `prepare` script.
- `bun test`: runs the tests (currently `scripts/check-pr-body.test.ts`, which covers the PR body hook). Run a single test with `bun test -t "<name>"`.

## Commits

Follow Conventional Commits and keep commits small; the full rules are in `.claude/rules/commits.md`. Message format is enforced deterministically by a Husky `commit-msg` hook running commitlint (`@commitlint/config-conventional`, configured in `commitlint.config.mjs`); a non-conforming commit is rejected, so fix the message instead of bypassing with `--no-verify`. Hooks are installed by `bun install` via the `prepare` script. Branch names, issue titles and pull request titles follow the same convention, see `.claude/rules/issues-branches-and-prs.md`; branch names are enforced on push by a Husky `pre-push` hook, so create branches as `<type>/<kebab-description>` from the start.

CI (`.github/workflows/`) repeats these checks for pull requests (`pr.yml`: every commit message, the PR title, and the branch name) and checks issue titles (`issue-title.yml`). The branch-name rule lives only in `scripts/check-branch-name.sh`, shared by the hook and CI. Workflows install with `bun install --frozen-lockfile` and set `HUSKY=0`.

## File size

A Husky `pre-commit` hook (`scripts/check-file-size.ts`) rejects staged files over 5,000 tokens (bytes / 4, so about 20 KB), measuring the staged content only. Lockfiles, codegen, binaries and files marked `linguist-generated` or `linguist-vendored` in `.gitattributes` are skipped. Keep files small and split by responsibility up front; the error message lists the splitting steps.

## Language

English is the main language for code, comments, commits, branches, issues, PRs and docs. Other languages only for explicitly localized content. See `.claude/rules/language.md`.

## Comments

Keep files free of comment bloat: document with JSDoc (`/** */`) when something needs it, and use inline `//` comments only when necessary, to explain a non-obvious why. See `.claude/rules/comments.md`.

## Pull requests

Every PR body must follow the `pr` skill in `.claude/skills/pr/` (from [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/pr), MIT): invoke `/pr` before `gh pr create` or `gh pr edit --body`, and write `## Summary`, `## Evidence` and `## Merge Danger` sections. A `PreToolUse` hook in `.claude/settings.json` blocks `gh pr create`/`gh pr new`/`gh pr edit` when the body lacks them (and any `--fill`), and the `body` job in `pr.yml` checks it again in CI. Both use `missingSections` from `scripts/pr-body.ts`, the single definition of the required sections. Project skills live in `.claude/skills/` as real files (not symlinks: `core.symlinks` is off on Windows); `skills-lock.json` and `.agents/skills/` come from the skills installer. The skill mentions a `GLOSSARY.md` for domain language, which this repo doesn't have yet.

## Tooling

- Package manager and runtime: **Bun** (lockfile is `bun.lock`; use `bun install`, not npm/yarn/pnpm).
- `.gitignore` covers `node_modules/`, build output, env files, logs and coverage. `bun.lock` is tracked.
