# Approval is a manual workflow run

Approving the Vision or moving a Milestone (`planned` -> `in-progress` -> `done`) is a run of the `Approve` workflow (`.github/workflows/approve.yml`) that the repository owner dispatches with a target, `vision` or a Milestone id. It runs `scripts/approve.ts`, which changes only that `Status:` line and requires the result to pass the planning checks, then commits straight to `main` with an `Approved-by:` footer. This replaces the part of ADR-0001 that made merging a Status-change PR the act of Approval: a PR whose only diff is one already-reviewed line was friction, and Milestones had no PR to carry it.

## Considered Options

- **A label on the PR that commits the change**: rejected because a Milestone's Approval has no PR to label, and a commit pushed by the workflow's token doesn't re-run the PR checks.
- **A local command that opens and merges the PR**: rejected because it keeps a PR nobody reviews and depends on the owner's machine.

## Consequences

The workflow checks that the dispatcher is the owner, but an agent using the owner's `gh` token would pass that check, so a `PreToolUse` hook (`.claude/hooks/deny-approval.ts`) denies agents dispatching it. The Approval commit reaches `main` without a PR, so the only checks it gets are the ones the script runs.
