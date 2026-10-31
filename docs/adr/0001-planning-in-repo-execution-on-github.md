# Planning lives in the repo, execution lives on GitHub

The Vision and Roadmap are markdown files in `docs/`, while Specs and Tickets are GitHub issues created by the unmodified `to-spec` and `to-tickets` skills. Each blocker lives in exactly one place: blockers between Milestones only in `docs/ROADMAP.md`, blockers between Tickets only as native GitHub issue dependencies. Milestone and Vision statuses change only through a pull request a human merges, so merging is the act of Approval and an agent can never advance a stage on its own.

## Considered Options

- **Everything on GitHub (Projects, Milestones, native dependencies between Spec issues)**: rejected because `to-spec` doesn't set blockers and the vendored skills aren't modified, and because a hook or CI job can't read a reviewed, versioned plan from issue state an agent can edit with `gh`.
- **Everything in the repo (local-markdown tracker)**: rejected because Tickets would lose native blocking, sub-issues and `Closes #N`, which CI already relies on.
- **Strict sequence with one item in progress**: rejected in favour of explicit blockers, so several agents can work the Frontier in parallel.

## Consequences

Each Milestone transition costs one small planning PR, and a Ticket closed outside a merge would unblock its dependents early, so agents are denied `gh issue close`.
