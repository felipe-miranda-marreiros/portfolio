# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is a scaffold for a portfolio project: there is no application source or build system yet, only the tooling that enforces the conventions below (Husky hooks, commitlint, Biome, GitHub workflows, Claude Code rules, hook and skills).

## Commands

- `bun install`: installs dependencies and sets up the Husky hooks via the `prepare` script.
- `bun test`: runs the tests (currently `scripts/check-pr-body.test.ts` and `scripts/deny-issue-close.test.ts`, which cover the PR body and issue close hooks, and `scripts/planning-docs.test.ts` and `scripts/status-isolation.test.ts`, which cover the planning checks). Run a single test with `bun test -t "<name>"`.
- `bun run lint`: runs Biome (`biome check .`: format, lint, import order). `bun run fix` applies the safe fixes.
- `bun run check:planning`: validates `docs/VISION.md` and `docs/ROADMAP.md` (`scripts/planning-docs.ts`); passes when they don't exist.

## Commits

Follow Conventional Commits and keep commits small; the full rules are in `.claude/rules/commits.md`. Message format is enforced deterministically by a Husky `commit-msg` hook running commitlint (`@commitlint/config-conventional`, configured in `commitlint.config.mjs`); a non-conforming commit is rejected, so fix the message instead of bypassing with `--no-verify`. Hooks are installed by `bun install` via the `prepare` script. Branch names, issue titles and pull request titles follow the same convention, see `.claude/rules/issues-branches-and-prs.md`; branch names are enforced on push by a Husky `pre-push` hook, so create branches as `<type>/<kebab-description>` from the start.

CI (`.github/workflows/`) repeats these checks for pull requests (`pr.yml`: every commit message, the PR title, and the branch name) and checks issue titles (`issue-title.yml`). The branch-name rule lives only in `scripts/check-branch-name.sh`, shared by the hook and CI. Workflows install with `bun install --frozen-lockfile` and set `HUSKY=0`.

## Linting and formatting

[Biome](https://biomejs.dev) (`biome.json`) formats and lints code and config: 2 spaces, 120 columns, double quotes, LF. A Husky `pre-commit` hook runs `biome check --staged` and `lint.yml` runs `biome ci .` in CI. Markdown, vendored skills, `.agents/`, `.impeccable/`, `.rtk/` and `skills-lock.json` are excluded. `.gitattributes` forces LF checkouts so Windows (CRLF) and CI agree.

## File size

A Husky `pre-commit` hook (`scripts/check-file-size.ts`) rejects staged files over 5,000 tokens (bytes / 4, so about 20 KB), measuring the staged content only. Lockfiles, codegen, binaries and files marked `linguist-generated` or `linguist-vendored` in `.gitattributes` are skipped. Keep files small and split by responsibility up front; the error message lists the splitting steps.

## Language

English is the main language for code, comments, commits, branches, issues, PRs and docs. Other languages only for explicitly localized content. See `.claude/rules/language.md`.

## Comments

Keep files free of comment bloat: document with JSDoc (`/** */`) when something needs it, and use inline `//` comments only when necessary, to explain a non-obvious why. See `.claude/rules/comments.md`.

## Pull requests

Every PR body must follow the `pr` skill in `.claude/skills/pr/` (from [mattpocock/skills](https://github.com/mattpocock/skills/tree/main/skills/engineering/pr), MIT): invoke `/pr` before `gh pr create` or `gh pr edit --body`, and write `## Summary`, `## Evidence` and `## Merge Danger` sections. A `PreToolUse` hook in `.claude/settings.json` blocks `gh pr create`/`gh pr new`/`gh pr edit` when the body lacks them (and any `--fill`), and the `body` job in `pr.yml` checks it again in CI. Both use `missingSections` from `scripts/pr-body.ts`, the single definition of the required sections. Project skills live in `.claude/skills/` as real files (not symlinks: `core.symlinks` is off on Windows); `skills-lock.json` and `.agents/skills/` come from the skills installer. The skill's domain language comes from `GLOSSARY.md`.

## Planning

Work follows a staged pipeline: Vision (`docs/VISION.md`), ADRs (`docs/adr/`), Roadmap (`docs/ROADMAP.md`), then one Spec issue per Milestone and its Tickets as sub-issues with native blockers. Only a human advances a stage, by merging the PR that changes a `Status:` line; never change one yourself. Specify only an `in-progress` Milestone, claim a Ticket by assignee only when it is on the Frontier, close exactly one Ticket per code PR, and never close issues or remove blockers by hand (a `PreToolUse` hook, `.claude/hooks/deny-issue-close.ts`, denies it). Vocabulary is in `GLOSSARY.md`, the decision in `docs/adr/0001-planning-in-repo-execution-on-github.md`, the full rules in `.claude/rules/planning.md`. `planning.yml` enforces the formats with `scripts/planning-docs.ts` and keeps `Status:` changes out of code PRs with `scripts/status-isolation.ts`.

## Engineering skills

The other skills from [mattpocock/skills](https://github.com/mattpocock/skills) (MIT) cover planning and building: `grill-me`, `grill-with-docs` and `grilling` stress-test a plan; `domain-modeling` keeps the glossary and ADRs; `to-spec`, `to-tickets` and `triage` turn a plan into issues; `implement` and `tdd` build from them; `codebase-design` and `improve-codebase-architecture` deal with module design. `codebase-design`, `domain-modeling`, `grilling` and `tdd` trigger on their own; the rest set `disable-model-invocation` and run only as `/<name>`. `to-spec`, `to-tickets`, `triage` and `implement` need the issue tracker and label setup in `docs/agents/`, written once by `/setup-matt-pocock-skills`. Like `pr` and `code-review`, they are real copies of `.agents/skills/`, not the installer's symlinks.

## Ponytail

The `ponytail` skill (`.claude/skills/ponytail/`, from [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail), MIT, license kept beside it) makes coding tasks aim for the smallest complete change: reuse before writing, no unrequested abstractions, one small test for non-trivial logic. It triggers on coding tasks, or invoke `/ponytail lite|full|ultra|off`. Only `skills/ponytail/SKILL.md` is vendored, as a real file; the upstream plugin's hooks (mode tracker, status band, `~/.config` ledger, webhook) are deliberately not installed, and it is not in `skills-lock.json` because it didn't come from the skills installer. Where it conflicts with the rules here (comments, commits), the rules win.

## Impeccable

The `impeccable` skill (`.claude/skills/impeccable/`, from [impeccable.style](https://impeccable.style), Apache 2.0) handles frontend design work: shaping, critique, audit, polish and design-system docs (`PRODUCT.md`, `DESIGN.md`). It ships four subagents in `.claude/agents/impeccable-*.md` and a launcher, `scripts/impeccable` (`impeccable.cmd` on Windows), that runs a bundled engine binary; `impeccable detect <file|dir|url>` scans UI for anti-patterns. The skill folder is marked `linguist-vendored` so the file-size hook skips it, and its `.impeccable/` project state is excluded from Biome. Run `/impeccable init` to write `PRODUCT.md` before the first design task.

## Tooling

- Package manager and runtime: **Bun** (lockfile is `bun.lock`; use `bun install`, not npm/yarn/pnpm).
- `.gitignore` covers `node_modules/`, build output, env files, logs and coverage. `bun.lock` is tracked.

## Agent skills

### Issue tracker

Specs and Tickets live as GitHub issues in this repo, managed with `gh`: Tickets are sub-issues of their Spec with native blockers, claimed by assignee, and closed only by a merged PR. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default labels, unchanged: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.

<!-- rtk-instructions v2 -->
# Command output

Command output here is condensed to save tokens, keeping every signal and
dropping costly noise. Treat it as the complete result: run commands
normally, and batch related commands into one call to avoid extra turns.
Truncated results state their recovery path in their own output. Re-run a
command as `rtk bypass <cmd>` only when its result is unusable: empty when
output was clearly expected, contradicting its exit code, or garbled.
<!-- /rtk-instructions -->