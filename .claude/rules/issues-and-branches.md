# Issue and branch conventions

Issues and branches follow the same Conventional Commits vocabulary as commit messages (see `commits.md`): the same types (`feat`, `fix`, `docs`, `chore`, `ci`, `build`, `refactor`, `perf`, `style`, `test`) and the same optional scope.

## Branches

```
<type>/[<scope>-]<short-description>
```

- `type` is a Conventional Commits type, followed by `/`.
- Description is lowercase kebab-case, short, and says what the branch does, e.g. `feat/claude-config`, `fix/header-overflow`, `docs/readme-setup`.
- Use the optional scope as a prefix of the description when it helps, e.g. `fix/parser-empty-input`.
- One branch per logical change, matching the small-commits rule; keep branches short-lived.
- Mark a breaking change in the PR/commit (`!` or `BREAKING CHANGE:`), not in the branch name.

## Issues

```
<type>[optional scope][!]: <description>
```

- The title is written like a commit header: required type, optional scope in parentheses, optional `!` for a breaking change, then `: ` and a short lowercase imperative description with no trailing period. Example: `feat(nav): add dark mode toggle`.
- The body is free-form: context, expected behavior, and acceptance criteria for `feat`; steps to reproduce, expected vs. actual behavior for `fix`.
- One issue per logical change. Split an issue whose title needs "and".
- Link related work with `Refs: #123` or `Closes: #123` in commit footers and PR descriptions.
- A branch resolving an issue uses the issue's type, and its commits and PR title use the issue's title.
