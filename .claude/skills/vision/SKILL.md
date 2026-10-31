---
name: vision
description: Interview the user and write or revise the project's Vision in docs/VISION.md, then open it as a docs-only PR for the human to merge.
disable-model-invocation: true
---

Write or revise `docs/VISION.md`, the first stage of the pipeline in `.claude/rules/planning.md`. Read that file, `GLOSSARY.md` and the existing `docs/VISION.md`, if any, first.

## Process

1. Interview the user with the `grilling` skill until every section below is settled. Use the `domain-modeling` skill to keep the vocabulary sharp; don't reimplement either one.
2. Keep technical decisions out of the Vision (stack, hosting, frameworks, data storage, architecture). When one comes up, record it as a question under `## Open decisions`. ADRs close those later, through `/grill-with-docs`.
3. Write the file with the template below. Every heading must appear exactly as shown, and `Status:` must be the only line that starts with `Status:`.
   - A new Vision is always `Status: draft`.
   - When revising, leave the existing `Status:` line as it is. Never set `approved`, and never change it in either direction.
4. Run `bun run check:planning` and fix every error it reports.
5. Commit only files under `docs/` on a `docs/vision-<kebab-description>` branch, then open the PR with `/pr`.

## Glossary updates

`GLOSSARY.md` is at the repo root, outside `docs/`. A PR that adds or changes a `Status:` line may touch nothing outside `docs/` (`scripts/status-isolation.ts`), and a new Vision adds one. So never commit `GLOSSARY.md` in the Vision PR. Commit glossary changes on their own `docs/glossary-<kebab-description>` branch from `main` and open a separate PR with `/pr`.

## Template

```md
# Vision

Status: draft

## Why

The problem, and why it is worth solving now.

## Audience

Who it is for, and what they need from it.

## Goals

- Outcomes that show the project worked.

## Non-goals

- What it deliberately won't do.

## Constraints

- Limits on time, budget, people or scope that are not technical choices.

## Open decisions

- Questions still open, including every technical decision, each to be closed by an ADR.
```

## When done

Tell the user:

- Merging the PR records the Vision as `draft`. Only they approve it, by running the `Approve` workflow on `main` with target `vision` (from GitHub Actions, or `gh workflow run approve.yml -f target=vision`).
- Next, run `/grill-with-docs` to close the Open decisions with ADRs. `/roadmap` needs an approved Vision.
