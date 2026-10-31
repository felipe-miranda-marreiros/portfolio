import { describe, expect, test } from "bun:test";
import { join } from "node:path";

const hookPath = join(import.meta.dir, "..", ".claude", "hooks", "deny-issue-close.ts");

function runHook(command: string) {
  return Bun.spawnSync(["bun", hookPath], {
    stdin: new TextEncoder().encode(JSON.stringify({ tool_name: "Bash", tool_input: { command } })),
  });
}

describe("deny-issue-close hook", () => {
  const allowed: [string, string][] = [
    ["non-gh command", "git status"],
    ["gh issue view", "gh issue view 12"],
    ["gh issue create", 'gh issue create --title "feat: x" --body "never run gh issue close"'],
    ["adding a blocker", "gh issue edit 12 --add-blocked-by 3 --add-blocking 4"],
    ["claiming a ticket", "gh issue edit 12 --add-assignee @me"],
    ["a body mentioning the flag", 'gh issue edit 12 --body "never use --remove-blocked-by"'],
    ["gh text inside a quoted argument", 'git commit -m "docs: say so; gh issue close 3"'],
    ["gh pr merge", "gh pr merge 5 --squash"],
    ["listing dependencies via api", "gh api repos/o/r/issues/12/dependencies/blocked_by"],
    ["adding a dependency via api", "gh api -X POST repos/o/r/issues/12/dependencies/blocked_by -F issue_id=99"],
    ["deleting a label via api", "gh api -X DELETE repos/o/r/issues/12/labels/bug"],
    ["reopening via api", "gh api -X PATCH repos/o/r/issues/12 -f state=open"],
  ];

  const denied: [string, string][] = [
    ["gh issue close", "gh issue close 12"],
    ["gh issue close with a comment", 'gh issue close 12 --comment "done"'],
    ["gh issue close with --repo first", "gh issue --repo o/r close 12"],
    ["chained after another command", "git pull && gh issue close 12"],
    ["inside a subshell", "echo $(gh issue close 12)"],
    ["--remove-blocked-by", "gh issue edit 12 --remove-blocked-by 3"],
    ["--remove-blocking", "gh issue edit 12 --remove-blocking 4"],
    ["--remove-blocked-by= among other flags", "gh issue edit 12 --add-assignee @me --remove-blocked-by=3"],
    ["deleting a dependency via api", "gh api -X DELETE repos/o/r/issues/12/dependencies/blocked_by/99"],
    [
      "deleting a dependency via api with --method and quotes",
      'gh api --method DELETE "/repos/{owner}/{repo}/issues/12/dependencies/blocked_by/99"',
    ],
    ["closing via api", "gh api -X PATCH repos/o/r/issues/12 -f state=closed"],
    ["closing via api with a quoted field", "gh api repos/o/r/issues/12 -F 'state=closed'"],
  ];

  test.each(allowed)("allows %s", (_label, command) => {
    expect(runHook(command).exitCode).toBe(0);
  });

  test.each(denied)("denies %s", (_label, command) => {
    expect(runHook(command).exitCode).toBe(2);
  });

  test("points the denial at the planning rules", () => {
    expect(runHook("gh issue close 12").stderr.toString()).toContain(".claude/rules/planning.md");
  });
});
