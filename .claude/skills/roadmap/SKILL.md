---
name: roadmap
description: Interview the user and write or revise the project's Roadmap of Milestones in docs/ROADMAP.md, then open it as a docs-only PR for the human to merge.
disable-model-invocation: true
---

Write or revise `docs/ROADMAP.md`, the stage after the Vision and its ADRs in `.claude/rules/planning.md`. Read that file, `GLOSSARY.md`, `docs/VISION.md`, `docs/adr/` and the existing `docs/ROADMAP.md`, if any, first.

## Before starting

If `docs/VISION.md` doesn't exist or its `Status:` line isn't `approved`, stop. Tell the user the Roadmap needs an approved Vision (`/vision`, then their Approval PR), and write nothing.

## Process

1. Interview the user with the `grilling` skill until every Milestone and its blockers are settled. Use the `domain-modeling` skill to keep the vocabulary sharp; don't reimplement either one.
2. Make each Milestone one shippable outcome that serves the Vision's goals, small enough for one Spec. Each names its blockers: `none` when it is Independent, otherwise the `M<n>` ids that must be done first, with no cycles.
3. Write the file with the template below. Number new Milestones after the highest existing id; never renumber or delete one unless the user asks. The only `##` headings are Milestones.
   - A new Milestone is `Status: planned` and `Spec: (not written)`.
   - Never change an existing `Status:` line. Never edit the `Spec:` line of a Milestone you didn't create in this session unless the user asks.
4. Run `bun run check:planning` and fix every error it reports.
5. Commit only files under `docs/` on a `docs/roadmap-<kebab-description>` branch, then open the PR with `/pr`.

## Glossary updates

`GLOSSARY.md` is at the repo root, outside `docs/`. A PR that adds or changes a `Status:` line may touch nothing outside `docs/` (`scripts/status-isolation.ts`), and every new Milestone adds one. So never commit `GLOSSARY.md` in the Roadmap PR. Commit glossary changes on their own `docs/glossary-<kebab-description>` branch from `main` and open a separate PR with `/pr`.

## Template

```md
# Roadmap

## M1: <shippable outcome>
Status: planned
Blocked by: none
Spec: (not written)

One or two sentences on what is true for the user once it ships.

## M2: <shippable outcome>
Status: planned
Blocked by: M1
Spec: (not written)

One or two sentences on what is true for the user once it ships.
```

## When done

Tell the user:

- Only they move a Milestone to `in-progress`, in a docs-only PR they merge, and only once its blockers are `done`.
- Next, once a Milestone is `in-progress`, run `/to-spec` for it.
