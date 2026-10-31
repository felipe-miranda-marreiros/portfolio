# Issue tracker: GitHub

Specs and Tickets for this repo live as GitHub issues in `felipe-miranda-marreiros/portfolio`. Use the `gh` CLI (2.94+, which has the sub-issue and dependency flags) for all operations. The planning rules in `.claude/rules/planning.md` take precedence over anything here; vocabulary is in `GLOSSARY.md`.

## Shape of the work

- A **Spec** is a parent issue, one per Milestone in `docs/ROADMAP.md`, written by `/to-spec` only when that Milestone is `in-progress`.
- A **Ticket** is a sub-issue of its Spec, written by `/to-tickets`, with its Blockers set as native GitHub issue dependencies.
- Blockers between Milestones live only in `docs/ROADMAP.md`; Blockers between Tickets live only as native dependencies. Never record one in the other place, and never fall back to a `Blocked by: #n` line in place of a native dependency.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc or `--body-file` for multi-line bodies. Titles follow `.claude/rules/issues-branches-and-prs.md` (`<type>[scope]: <description>`).
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,assignees,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,assignees,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], assignees: [.assignees[].login], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Make a Ticket a sub-issue of its Spec**: `gh issue create --parent <spec> ...`, or `gh issue edit <spec> --add-sub-issue <ticket>` afterwards.
- **Blocking**: GitHub's native issue dependencies. Add an edge with `gh issue create --blocked-by <n>,<n> ...` or `gh issue edit <ticket> --add-blocked-by <blocker>`. A Ticket is unblocked when every Blocker is closed. Never remove an edge (`--remove-blocked-by`).
- **Count open blockers**: `gh api repos/felipe-miranda-marreiros/portfolio/issues/<n> --jq .issue_dependencies_summary.blocked_by` (open Blockers only; 0 means startable). `gh issue view <n> --json blockedBy` also lists closed Blockers, so filter it: `--jq '[.blockedBy.nodes[] | select(.state == "OPEN")] | length'`.
- **Claim a Ticket**: `gh issue edit <n> --add-assignee @me`, before starting, and only when the Ticket is on the Frontier (see below).
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: agents never close issues (`gh issue close` is denied). A Ticket closes when the PR carrying its single `Closes #N` is merged, so its dependents unblock only then. When a skill says to close an issue (for example `/triage` on `wontfix`), post the explanation with `gh issue comment`, apply the label, and leave the issue open for a human to close.

`gh` infers the repo from `git remote -v`. File issues only into `felipe-miranda-marreiros/portfolio`; never into `mattpocock/skills` (the repo these skills come from). Before the first `gh issue create` of a session, check the target with `gh repo view --json nameWithOwner`.

## The Ticket Frontier

A Ticket may be claimed only when all of these hold:

1. It is open.
2. It is labelled `ready-for-agent` (see `docs/agents/triage-labels.md`).
3. Every native Blocker is closed (open blocker count is 0).
4. It has no assignee.
5. Its Spec's Milestone is `in-progress` in `docs/ROADMAP.md`.

Check all five before claiming. Several agents may work the Frontier in parallel, each on a different Ticket.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number>`, then `gh pr view <number> --comments` (off a TTY, `--comments` prints only the comments, not the body), and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- **Comment / label**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`. Closing follows the same rule as issues: leave it to a human.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either: resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue: a Spec as a parent issue, Tickets as its sub-issues with native Blockers.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.
