# Test-driven development

Every behavior change is built test first. Follow the `tdd` skill (`.claude/skills/tdd/`) for what a good test is, where seams go and the rules of the loop; this file says how the loop maps onto small commits (`commits.md`).

## One cycle, two commits

Each red → green cycle is a pair of commits, in this order:

1. `test[(scope)]: <behavior>`: the failing test, and nothing else. It changes only test files: `*.test.*`, `*.spec.*`, and anything under `__tests__/`, `__snapshots__/` or `fixtures/`.
2. `feat` or `fix`: only enough code to make that test pass. It changes no test files, and the whole suite passes after it.

- Commit the test as soon as it fails for the right reason, before writing any code.
- Work in vertical slices: test, feat, test, feat. Never commit several tests and then several code commits.
- A `feat` or `fix` PR has at least one pair. Never commit a behavior change under another type to skip the test.
- Refactors go in their own `refactor` commit, after green, with the tests unchanged and passing.
- Harness tooling committed as `ci` or `chore` follows the same order when it adds logic: its tests land in a `test` commit first.
- The red test commit is the one exception to "every commit leaves the project in a working state". To bisect, skip the `test` commits that come right before a `feat` or `fix` commit.

## Merging

Merge PRs with a rebase or a merge commit, never a squash: squashing folds each pair into one commit and erases the test-first history on `main`.

## Enforcement

- CI's `tdd` job (`pr.yml`) runs `scripts/tdd-gate.ts` from the base branch, so a PR can't edit the gate to pass. For every `feat` or `fix` commit in the PR, it checks that the commit right before it is a `test` commit with only test files, runs that commit's test files and requires them to fail, and requires `bun test` to pass at the `feat` or `fix` commit, which must not touch test files. It also fails a `feat` or `fix` PR that has no `feat` or `fix` commit.
- `test.yml` runs `bun test` on every PR and on `main`.
- The gate trusts commit types, which commitlint already checks. Choosing the right type is on the author.
