# Phase 2: monorepo and rules

Two parts. 2a runs before the design, 2b after the gate.

## 2a: skeleton

**Goal:** the smallest monorepo in which Impeccable can build and run surfaces.

**Depends on:** phase 0. **Parallel with:** phase 3.

Work:

- Bun workspaces: `apps/{api,portfolio,cms}` and `packages/{contracts,ui}`.
- `apps/portfolio`: a minimal runnable Astro app with the `en` and `pt-br` route prefixes.
- `apps/cms`: a minimal runnable Vite + React app with TanStack Router.
- `packages/ui` and `packages/contracts`: empty, importable by both apps.
- `apps/api`: a placeholder only; the real API starts after the Contract exists.
- Root scripts that run each package's own commands; the existing `bun test`, `bun run lint` and hooks keep working.

Exit criteria:

- [x] `bun install` and each app's dev command work from a clean checkout.
- [x] The Portfolio and the CMS import from `packages/ui`.
- [x] Hooks and CI pass on the skeleton.

## 2b: rules, CI, shared UI

**Goal:** the deterministic and non-deterministic gates the build phase relies on.

**Depends on:** the gate in phase 1.

Work:

- **Rules** in `.claude/rules/`, path-scoped where possible:
  - API invariants and Portfolio/CMS invariants (listed in [05-parallel-build.md](05-parallel-build.md)).
  - The `packages/ui` import rule: the Portfolio and the CMS import UI from `packages/ui`. It is a rule, not a mapper or adapter layer.
  - Test seams and how to use `tdd`.
- **Rebase-only repository.** GitHub allows only "Rebase and merge", with linear history required on `main`. Update `issues-branches-and-prs.md` and `CLAUDE.md`, which currently describe a squash merge: the PR title becomes the review summary, and every commit is the history, so every commit must be conventional and atomic. Agents rebase onto `main` before asking for merge.
- **Local infrastructure:** a `docker compose` Postgres, and a setup script that creates one database per worktree (named from the worktree) and a throwaway database per test run.
- **CI:** a test workflow with a Postgres service, next to `pr.yml` and `lint.yml`.
- **`packages/ui`** set up under the chosen CSS framework, including the migration ticket if one is needed.
- `CLAUDE.md` and the README updated to describe the monorepo.

Exit criteria:

- [ ] Rules merged; `main` accepts rebase-and-merge only.
- [ ] A new worktree gets its own database with one command.
- [ ] CI runs tests against Postgres.
