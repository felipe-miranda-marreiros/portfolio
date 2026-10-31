import { describe, expect, test } from "bun:test";
import { join } from "node:path";

const hookPath = join(import.meta.dir, "..", ".claude", "hooks", "deny-approval.ts");

function runHook(command: string) {
  return Bun.spawnSync(["bun", hookPath], {
    stdin: new TextEncoder().encode(JSON.stringify({ tool_name: "Bash", tool_input: { command } })),
  });
}

describe("deny-approval hook", () => {
  const allowed: [string, string][] = [
    ["non-gh command", "git status"],
    ["running another workflow", "gh workflow run test.yml"],
    ["viewing the approval workflow", "gh workflow view approve.yml"],
    ["listing approval runs", "gh run list --workflow approve.yml"],
    ["gh text inside a quoted argument", 'git commit -m "docs: the human runs gh workflow run approve"'],
    ["reading the workflow via api", "gh api repos/o/r/actions/workflows/approve.yml"],
    ["dispatching another workflow via api", "gh api -X POST repos/o/r/actions/workflows/test.yml/dispatches"],
  ];

  const denied: [string, string][] = [
    ["by file name", "gh workflow run approve.yml -f target=vision"],
    ["by workflow name", "gh workflow run Approve -f target=M2"],
    ["by quoted name", 'gh workflow run "Approve" -f target=M2'],
    ["without the extension", "gh workflow run approve"],
    ["with --repo first", "gh workflow -R o/r run approve.yml"],
    ["chained after another command", "git pull && gh workflow run approve.yml"],
    ["inside a subshell", "echo $(gh workflow run approve.yml)"],
    ["dispatching via api", "gh api -X POST repos/o/r/actions/workflows/approve.yml/dispatches -f ref=main"],
    [
      "dispatching via api with quotes",
      'gh api --method POST "/repos/{owner}/{repo}/actions/workflows/approve.yml/dispatches"',
    ],
  ];

  test.each(allowed)("allows %s", (_name, command) => {
    expect(runHook(command).exitCode).toBe(0);
  });

  test.each(denied)("denies %s", (_name, command) => {
    const result = runHook(command);
    expect(result.exitCode).toBe(2);
    expect(result.stderr.toString()).toContain("planning.md");
  });
});
