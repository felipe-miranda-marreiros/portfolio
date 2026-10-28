# Issue, branch and pull request conventions

Issues, branches and pull requests follow the same Conventional Commits vocabulary as commit messages (see `commits.md`): the same types (`feat`, `fix`, `docs`, `chore`, `ci`, `build`, `refactor`, `perf`, `style`, `test`, `revert`) and the same optional scope.

## Branches

```
<type>/[<scope>-]<short-description>
```

- `type` is a Conventional Commits type, followed by `/`.
- Enforced by the Husky `pre-push` hook (`.husky/pre-push`) and again in CI (`.github/workflows/pr.yml`), both via `scripts/check-branch-name.sh`, which rejects branches not matching `^(type)/[a-z0-9]+(-[a-z0-9]+)*$`; `main`, tags and branch deletions are exempt. Change the rule only in that script. Rename with `git branch -m` instead of bypassing with `--no-verify`.
- Description is lowercase kebab-case (letters, digits and single hyphens only), short, and says what the branch does, e.g. `feat/claude-config`, `fix/header-overflow`, `docs/readme-setup`.
- Use the optional scope as a prefix of the description when it helps, e.g. `fix/parser-empty-input`.
- One branch per logical change, matching the small-commits rule; keep branches short-lived.
- Mark a breaking change in the PR/commit (`!` or `BREAKING CHANGE:`), not in the branch name.

## Issues

```
<type>[optional scope][!]: <description>
```

- Checked by `.github/workflows/issue-title.yml` with commitlint; a non-conforming title gets a one-time comment asking to edit it (the issue is not blocked or closed).
- The title is written like a commit header: required type, optional scope in parentheses, optional `!` for a breaking change, then `: ` and a short lowercase imperative description with no trailing period. Example: `feat(nav): add dark mode toggle`.
- The body is free-form: context, expected behavior, and acceptance criteria for `feat`; steps to reproduce, expected vs. actual behavior for `fix`.
- One issue per logical change. Split an issue whose title needs "and".
- Link related work with `Refs: #123` or `Closes: #123` in commit footers and PR descriptions.
- A branch resolving an issue uses the issue's type, and the PR title reuses the issue's title.

## Pull requests

```
<type>[optional scope][!]: <description>
```

- The title is a Conventional Commits header, same format as an issue title. It matters most because a squash merge turns it into the commit message on `main`.
- Enforced by the `title` job in `.github/workflows/pr.yml` (commitlint), alongside the per-commit and branch-name checks; fix the title with `gh pr edit --title` instead of merging a failing PR.
- The type matches the branch type (`feat/claude-config` -> `feat...`); the scope, if any, matches the branch scope.
- One PR per logical change, kept small: a PR that needs "and" in its title should be split. Its commits stay small and conventional too.
- The body explains what and why, and links issues with `Closes #123` or `Refs #123`.
- Mark breaking changes with `!` in the title and a `BREAKING CHANGE:` line in the body.
