import { afterAll, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { missingSections } from "./pr-body.ts";

const hookPath = join(import.meta.dir, "..", ".claude", "hooks", "check-pr-body.ts");
const tempDir = mkdtempSync(join(tmpdir(), "pr-body-"));
afterAll(() => rmSync(tempDir, { recursive: true, force: true }));

const GOOD_BODY = "## Summary\nA\n## Evidence\nB\n## Merge Danger\nC";
const goodFile = join(tempDir, "good.md");
const badFile = join(tempDir, "bad.md");
writeFileSync(goodFile, GOOD_BODY);
writeFileSync(badFile, "just a body\n");

function hookExitCode(command: string): number {
  const result = Bun.spawnSync(["bun", hookPath], {
    stdin: new TextEncoder().encode(JSON.stringify({ tool_name: "Bash", tool_input: { command } })),
  });
  return result.exitCode;
}

describe("missingSections", () => {
  test("accepts a body with every section", () => {
    expect(missingSections(GOOD_BODY)).toEqual([]);
  });

  test("lists every section of an empty body", () => {
    expect(missingSections("")).toEqual(["Summary", "Evidence", "Merge Danger"]);
  });

  test("rejects a heading that only starts with a section name", () => {
    expect(missingSections("## Summarys\n## Evidence\n## Merge Danger")).toEqual(["Summary"]);
  });
});

describe("check-pr-body hook", () => {
  const allowed: [string, string][] = [
    ["non-gh command", "git status"],
    ["other gh command", "gh pr view 1"],
    ["gh text inside a quoted argument", 'git commit -m "mention gh pr create --fill here"'],
    ["inline body", `gh pr create --title "feat: x" --body "${GOOD_BODY.replaceAll("\n", "\\n")}"`],
    ["--body= form", `gh pr create --title "feat: x" --body="${GOOD_BODY.replaceAll("\n", "\\n")}"`],
    ["-b form", `gh pr create -t "feat: x" -b "${GOOD_BODY.replaceAll("\n", "\\n")}"`],
    ["heredoc body", `gh pr create --title "feat: x" --body "$(cat <<'EOF'\n${GOOD_BODY}\nEOF\n)"`],
    ["body that mentions --fill", `gh pr create --title "feat: x" --body "${GOOD_BODY} never use --fill"`],
    ["body file", `gh pr create --title t --body-file ${goodFile}`],
    ["edit without a body flag", 'gh pr edit 1 --title "feat: y"'],
  ];

  const denied: [string, string][] = [
    ["short body", 'gh pr create --title "feat: x" --body "adds things"'],
    ["no body flag", 'gh pr create --title "feat: x"'],
    ["--fill", "gh pr create --fill"],
    ["--fill with every heading in the title", 'gh pr create --fill --title "## Summary ## Evidence ## Merge Danger"'],
    ["--fill alongside a valid body", `gh pr create --fill --body "${GOOD_BODY}"`],
    ["headings only in the title", 'gh pr create --title "## Summary ## Evidence ## Merge Danger" --body "x"'],
    ["missing one section", 'gh pr create --body "## Summary\\n## Evidence"'],
    ["gh pr new alias", 'gh pr new --title "feat: x" --body "nope"'],
    ["body file without sections", `gh pr create --title t --body-file ${badFile}`],
    ["edit with a bad body", 'gh pr edit 1 --body "nope"'],
    ["chained after another command", 'cd x && gh pr create --body "nope"'],
  ];

  test.each(allowed)("allows %s", (_label, command) => {
    expect(hookExitCode(command)).toBe(0);
  });

  test.each(denied)("denies %s", (_label, command) => {
    expect(hookExitCode(command)).toBe(2);
  });
});
