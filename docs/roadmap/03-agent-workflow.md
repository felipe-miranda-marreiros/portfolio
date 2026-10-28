# Phase 3: agent workflow with Orca

**Goal:** a written, proven loop for taking a GitHub issue to a merged PR using Orca worktrees, so no Phase 5 agent depends on guesswork.

**Depends on:** phase 0. **Parallel with:** 2a and 1.

Source: the [Orca docs](https://www.onorca.dev/docs). Everything about Orca below comes from them; items marked *verify* are not covered there.

## The loop (manual-first)

1. **Pick** an issue labeled `ready-for-agent` whose blockers are all closed.
2. **Create the worktree from the issue.** Orca's Create Worktree dialog accepts the issue link, pre-fills the task and links the issue. Its derived branch name may not satisfy our rule, so set the branch explicitly (Advanced, "Branch name") as `<type>/<kebab-description>`, using the issue's type. Start from a fresh `main`.
3. **Prepare the worktree.** Dependencies and secrets come through `orca.yaml` `worktree.sharedDirectories` (symlinked, gitignored directories such as `node_modules`) and `.worktreeinclude` (copied, literal paths, no globs). Then run the database setup script from phase 2b.
4. **Implement.** The agent runs `/implement` on the issue: it states the ticket, works with `/tdd` at the seams named in the ticket, runs typechecking and single tests often and the full suite once at the end, then runs `/code-review`, and commits in small conventional commits.
5. **Open the PR.** Invoke `/pr`, then `gh pr create` with `## Summary`, `## Evidence` and `## Merge Danger`. The title reuses the issue's title, and the body links it with `Closes #N`.
6. **Review.** The Owner reviews the diff in Orca (Source Control, with Annotate AI Diff for inline comments). Orca's "Fix broken checks" can hand failing checks back to an agent.
7. **Merge.** The agent rebases onto `main`; the Owner uses "Rebase and merge". Agents never merge. No auto-merge and no stacked PRs in v1.
8. **Clean up.** Delete the worktree; Orca deletes the branch with it.

Rules for parallel work:

- One ticket touches one app directory. `packages/contracts` and `packages/ui` change only in tickets about them.
- `bun.lock` conflicts are resolved by rebasing and re-running `bun install`, never by hand-merging.
- Every ticket starts from a fresh `main`.

## Optional upgrade: Orca orchestration

Orca's orchestration is marked experimental (Settings, Experimental). It models runs, tasks (pending, ready, dispatched, completed, failed, blocked), dispatch, messages and decision gates. Main commands: `orca orchestration run-create`, `task-create`, `worker-start --task <id> --worktree current|new-child --agent <agent>`, `check --wait`, `send --type worker_done`, `ask`, `gate-create`, `gate-resolve`. Workers must report `worker_done` with the task and dispatch IDs. `orca orchestration reset --all` affects runtime-global state, so never run it while a coordinator is active.

The roadmap does not depend on it. Try it only after the manual loop is proven, mapping GitHub blocking edges onto its task graph.

## To verify in the dry run

- How shared directories behave on Windows (the docs describe macOS clone-copy and symlinks elsewhere, not Windows).
- Whether the issue-derived branch name can be avoided or must always be overridden.
- How many worktrees and agents the machine runs comfortably (the docs give no limit).

## Exit criteria

- [ ] One trivial docs ticket completed the whole loop: issue, worktree, `/implement`, `/pr`, review, rebase-merge by the Owner.
- [ ] The *verify* items above are answered and written into this file.
