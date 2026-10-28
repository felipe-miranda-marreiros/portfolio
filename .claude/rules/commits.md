# Commit conventions

Sources: [Make Small Commits](https://dev.to/oculus42/make-small-commits-22cd), [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).

## Small commits

- One logical change per commit. If the message needs "and" or several sentences, split it.
- Every commit leaves the project in a working state.
- Review the diff before committing and stage selectively (`git add -p`) so unrelated edits land in separate commits.
- Commit often; don't let work pile up uncommitted.
- Keep refactors in their own commits, separate from feature or fix work.
- Squash only commits that share a single theme; never combine unrelated ones.
- Keep branches short-lived.

## Message format (Conventional Commits)

```
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- `type` is required: `feat` (new feature, SemVer MINOR), `fix` (bug fix, SemVer PATCH), or one of `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, `revert`.
- `scope` is an optional noun in parentheses, e.g. `fix(parser):`.
- `description` is required: a short summary right after `: `, lowercase, imperative, no trailing period.
- Body is free-form and starts after one blank line; explain what and why, not how.
- Footers start after one blank line, formatted `Token: value` (tokens use hyphens, e.g. `Reviewed-by`, `Refs: #123`).
- Breaking changes (SemVer MAJOR): add `!` before the colon, and/or a footer `BREAKING CHANGE: <description>` (uppercase). Allowed on any type.
- Be consistent in casing of types and scopes.
