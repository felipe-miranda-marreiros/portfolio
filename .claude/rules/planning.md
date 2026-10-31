# Planning workflow

Work moves through stages, and only a human moves it to the next one. Vocabulary is in `GLOSSARY.md`; the reasoning is in `docs/adr/0001-planning-in-repo-execution-on-github.md`.

## Pipeline

```
/vision -> /grill-with-docs -> /roadmap -> /to-spec -> /to-tickets -> /implement
```

- `docs/VISION.md`: why, audience, goals, non-goals, constraints and open decisions. No technical decisions.
- `docs/adr/`: one ADR per hard-to-reverse decision, usually closing an open decision from the Vision.
- `docs/ROADMAP.md`: the Milestones, each with its status, its blockers and a link to its Spec.
- Specs are GitHub issues written by `/to-spec`, one per Milestone. Tickets are its sub-issues, written by `/to-tickets`, with blockers set as native GitHub issue dependencies.

## Roadmap format

```md
## M2: Project detail page
Status: in-progress
Blocked by: M1
Spec: #20
```

- `Status:` is `planned`, `in-progress` or `done`. `in-progress` means its turn has come: write the Spec.
- `Blocked by:` is `none` or a list of existing `M<n>` ids, with no cycles.
- `Spec:` is an issue reference, or `(not written)` until the Spec exists.

## Blockers

- Every Milestone and Ticket names its blockers or states that it has none.
- Blockers between Milestones live only in `docs/ROADMAP.md`. Blockers between Tickets live only as native GitHub dependencies. Never duplicate one in the other place.

## Approval

- Never change a `Status:` line in `docs/VISION.md` or `docs/ROADMAP.md`. Vision status (`draft` -> `approved`) and Milestone status change only through a PR the human merges.
- A PR that changes a `Status:` line touches nothing outside `docs/`.

## Picking up work

- Specify only a Milestone that is `in-progress`.
- Claim only a Ticket on the Frontier: open, labelled `ready-for-agent`, every native blocker closed, no assignee, and its Milestone `in-progress`. Check all five before claiming.
- Claim a Ticket by assigning it to yourself (`gh issue edit <n> --add-assignee @me`) before starting.
- One code PR closes exactly one Ticket, with a single `Closes #N`. `docs`, `chore`, `ci`, `build` and `revert` PRs are exempt.
- Never close an issue or remove a blocker (`gh issue close`, `gh issue edit --remove-blocked-by`). A Ticket closes only when its PR is merged, so its dependents unblock only then. A `PreToolUse` hook (`.claude/hooks/deny-issue-close.ts`) denies these commands and their `gh api` equivalents.
