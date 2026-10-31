import { describe, expect, test } from "bun:test";
import { join } from "node:path";

const hookPath = join(import.meta.dir, "..", ".claude", "hooks", "deny-pr-merge.ts");

function runHook(command: string) {
  return Bun.spawnSync(["bun", hookPath], {
    stdin: new TextEncoder().encode(JSON.stringify({ tool_name: "Bash", tool_input: { command } })),
  });
}

describe("deny-pr-merge hook", () => {
  const allowed: [string, string][] = [
    ["non-gh command", "git status"],
    ["gh pr view", "gh pr view 5"],
    ["gh pr create", 'gh pr create --title "ci: x" --body-file body.md'],
    ["gh pr checks", "gh pr checks 5 --watch"],
    ["listing merged PRs", 'gh pr list --search "is:merged"'],
    ["merging a local branch", "git merge feature-branch"],
    ["fast-forwarding main", "git pull --ff-only && git merge --ff-only origin/main"],
    ["a commit message mentioning it", 'git commit -m "docs: never run gh pr merge 5 --squash"'],
    ["a PR body mentioning it", 'gh pr edit 5 --body "only a human runs gh pr merge; never an agent"'],
    ["reading a PR via api", "gh api repos/o/r/pulls/5"],
    ["checking if merged via api", "gh api repos/o/r/pulls/5/merge"],
    ["a graphql query", "gh api graphql -f query='query { viewer { login } }'"],
  ];

  const denied: [string, string][] = [
    ["gh pr merge on the current branch", "gh pr merge"],
    ["gh pr merge by number", "gh pr merge 5"],
    ["gh pr merge with flags", "gh pr merge 5 --rebase --delete-branch"],
    ["gh pr merge --auto", "gh pr merge --auto --merge"],
    ["gh pr merge --squash", "gh pr merge 5 --squash"],
    ["gh pr merge with --repo first", "gh pr --repo o/r merge 5"],
    ["chained after &&", "git pull && gh pr merge 5 --rebase"],
    ["chained after ;", "git status; gh pr merge 5"],
    ["piped into", "echo y | gh pr merge 5"],
    ["inside a subshell", "echo $(gh pr merge 5)"],
    ["merging via api", "gh api -X PUT repos/o/r/pulls/5/merge -f merge_method=rebase"],
    ["merging via api with --method and quotes", 'gh api --method PUT "/repos/{owner}/{repo}/pulls/5/merge"'],
    [
      "the mergePullRequest mutation",
      "gh api graphql -f query='mutation { mergePullRequest(input: {pullRequestId: \"x\"}) { clientMutationId } }'",
    ],
    [
      "the enablePullRequestAutoMerge mutation",
      "gh api graphql -f query='mutation { enablePullRequestAutoMerge(input: {pullRequestId: \"x\"}) { clientMutationId } }'",
    ],
  ];

  test.each(allowed)("allows %s", (_name, command) => {
    expect(runHook(command).exitCode).toBe(0);
  });

  test.each(denied)("denies %s", (_name, command) => {
    expect(runHook(command).exitCode).toBe(2);
  });

  test("says only a human merges, never with a squash", () => {
    const stderr = runHook("gh pr merge 5").stderr.toString();
    expect(stderr).toContain("only a human merges");
    expect(stderr).toContain("never a squash");
  });
});
