# Portfolio

A portfolio project built to work with AI coding agents. There is no application source yet: this repository is the **harness**, the tooling that keeps an agent's work correct and consistent from the first line of code.

## Install and run

Requires [Bun](https://bun.sh).

```sh
bun install      # installs dependencies and sets up the Husky git hooks
bun test         # runs the tests
bun run lint     # Biome: format, lint, import order
bun run fix      # applies Biome's safe fixes
bun run check:planning  # validates docs/VISION.md and docs/ROADMAP.md
bun run frontier        # lists whose turn it is: Milestones to approve or specify, Tickets to claim
```

There is no app to start yet. Once the source lands, its run command goes here.

## Planning

Work moves through stages, and only a human moves it to the next one:

```
/vision -> /grill-with-docs -> /roadmap -> /to-spec -> /to-tickets -> /implement
```

The Vision (`docs/VISION.md`), ADRs (`docs/adr/`) and Roadmap (`docs/ROADMAP.md`) live in the repo; each Milestone of the Roadmap gets one Spec issue on GitHub, with its Tickets as sub-issues and native blockers. A stage advances when the human runs the `Approve` workflow, which commits the `Status:` change to `main`. Every Milestone and Ticket names its blockers, so several agents can work the Frontier in parallel. Vocabulary is in [`GLOSSARY.md`](GLOSSARY.md), the reasoning in [ADR-0001](docs/adr/0001-planning-in-repo-execution-on-github.md) and [ADR-0002](docs/adr/0002-approval-is-a-manual-workflow-run.md).

## Workflow and quality gates

An agent is probabilistic, so the harness uses two kinds of checks:

- **Deterministic**: scripts, hooks and CI. The same input always gives the same verdict, and a failure blocks the work.
- **Non-deterministic**: instructions, skills and subagents that steer the model and give a reviewer something to judge. They improve the odds but prove nothing.

![Workflow and quality gates](docs/workflow.svg)

The diagram source is [`docs/workflow.excalidraw`](docs/workflow.excalidraw); open it at [excalidraw.com](https://excalidraw.com) to edit.

### Deterministic

| Where | Tool | Checks |
| --- | --- | --- |
| Agent runs `gh pr create`/`edit` | `PreToolUse` hook (`.claude/hooks/check-pr-body.ts`) | PR body has `Summary`, `Evidence`, `Merge Danger`; no `--fill`; a code PR closes one Ticket whose turn has come |
| Agent runs `gh issue close` or removes a blocker | `PreToolUse` hook (`.claude/hooks/deny-issue-close.ts`) | Denied: a Ticket closes only when its PR merges |
| `git commit` | Husky `pre-commit` | Biome on staged files; no file over 5,000 tokens |
| `git commit` | Husky `commit-msg` + commitlint | Conventional Commits message |
| `git push` | Husky `pre-push` | Branch is `<type>/<kebab-description>` |
| Pull request | `pr.yml` | Every commit message, PR title, branch name, PR body; `ticket` job: a code PR closes exactly one Ticket on the Frontier of `main`'s Roadmap; `tdd` job: every `feat`/`fix` commit follows a `test` commit whose tests fail, and passes `bun test` |
| Pull request | `planning.yml` | Vision and Roadmap format; a PR changing a `Status:` line touches only `docs/` |
| Pull request / `main` | `lint.yml` | `biome ci .` |
| Pull request / `main` | `test.yml` | `bun test` |
| Issue opened | `issue-title.yml` | Conventional Commits title (comments, does not block) |
| Any time | `bun test` | Tests for the hooks, planning checks, Frontier, Ticket gate and test-first gate |
| Any time | `bun run frontier` | Whose turn it is, read from the Roadmap and GitHub |

### Non-deterministic

| Tool | Where | Purpose |
| --- | --- | --- |
| `CLAUDE.md` | root | Project guidance loaded into every session |
| Rules | `.claude/rules/` | Comments, commits, branches/issues/PRs, language, planning, TDD |
| `vision`, `roadmap` skills | `.claude/skills/` | Interview the user and write the Vision or Roadmap in the validated format |
| `grill-me`, `grill-with-docs`, `grilling` skills | `.claude/skills/` | Stress-test a plan; `grill-with-docs` also records ADRs and glossary terms |
| `domain-modeling` skill | `.claude/skills/domain-modeling/` | Glossary and ADRs |
| `to-spec`, `to-tickets`, `triage` skills | `.claude/skills/`, `docs/agents/` | Turn a Milestone into a Spec, Tickets and agent-ready briefs, using the tracker config in `docs/agents/` |
| `improve-codebase-architecture` skill | `.claude/skills/improve-codebase-architecture/` | Reports deepening opportunities |
| `implement`, `tdd` skills | `.claude/skills/` | Build from a spec or tickets, test first |
| `codebase-design` skill | `.claude/skills/codebase-design/` | Deep-module vocabulary for interfaces and seams |
| `ponytail` skill | `.claude/skills/ponytail/` | Smallest complete change, no unrequested abstractions |
| `impeccable` skill and subagents | `.claude/skills/impeccable/`, `.claude/agents/` | Frontend design, review and documentation |
| `code-review` skill | `.claude/skills/code-review/` | Reviews a diff for Standards and Spec |
| `pr` skill | `.claude/skills/pr/` | Writes the PR body the hook then verifies |

The two kinds work together: a rule or skill tells the agent what good looks like, and a deterministic gate rejects the work when it still misses.

## Conventions

Commits, branches, issues and PR titles follow [Conventional Commits](https://www.conventionalcommits.org). Fix a rejected message or branch name instead of bypassing with `--no-verify`. Details are in [`CLAUDE.md`](CLAUDE.md) and `.claude/rules/`.
