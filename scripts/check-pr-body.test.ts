import { afterAll, describe, expect, test } from "bun:test";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { denyReason, type HookSources } from "../.claude/hooks/check-pr-body.ts";
import type { Milestone } from "./planning-docs.ts";
import { missingSections } from "./pr-body.ts";

const hookPath = join(import.meta.dir, "..", ".claude", "hooks", "check-pr-body.ts");
const tempDir = mkdtempSync(join(tmpdir(), "pr-body-"));
afterAll(() => rmSync(tempDir, { recursive: true, force: true }));

const GOOD_BODY = "## Summary\nA\n## Evidence\nB\n## Merge Danger\nC";
const goodFile = join(tempDir, "good.md");
const badFile = join(tempDir, "bad.md");
const closingFile = join(tempDir, "closing.md");
writeFileSync(goodFile, GOOD_BODY);
writeFileSync(badFile, "just a body\n");
writeFileSync(closingFile, `${GOOD_BODY}\nCloses #21`);

function hookExitCode(command: string): number {
  const result = Bun.spawnSync(["bun", hookPath], {
    stdin: new TextEncoder().encode(JSON.stringify({ tool_name: "Bash", tool_input: { command } })),
  });
  return result.exitCode;
}

const unreachable = () => {
  throw new Error("should not be loaded");
};

const noRoadmap: HookSources = {
  roadmap: () => undefined,
  repo: unreachable,
  specTickets: unreachable,
  pr: () => ({ title: "feat: x", body: GOOD_BODY }),
};

const milestones: Milestone[] = [{ id: "M1", title: "Now", status: "in-progress", blockedBy: [], spec: 20 }];
const openTicket = { title: "T", state: "open", labels: [], assignees: [] } as const;

function withRoadmap(overrides: Partial<HookSources> = {}): HookSources {
  return {
    roadmap: () => milestones,
    repo: () => "owner/repo",
    specTickets: () =>
      new Map([
        [
          20,
          [
            { ...openTicket, number: 21, openBlockers: [] },
            { ...openTicket, number: 22, openBlockers: [21] },
          ],
        ],
      ]),
    pr: unreachable,
    ...overrides,
  };
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
    expect(denyReason(command, noRoadmap)).toBeUndefined();
  });

  test.each(denied)("denies %s", (_label, command) => {
    expect(denyReason(command, noRoadmap)).toBeDefined();
  });

  test("exits 0 to allow and 2 to deny", () => {
    expect(hookExitCode("git status")).toBe(0);
    expect(hookExitCode('gh pr create --title "docs: x" --body "nope"')).toBe(2);
  });
});

describe("check-pr-body hook ticket gate", () => {
  const create = (title: string, file = goodFile) => `gh pr create --title "${title}" --body-file ${file}`;

  test("allows a code PR that closes a Ticket on the Frontier", () => {
    expect(denyReason(create("feat: x", closingFile), withRoadmap())).toBeUndefined();
  });

  test("allows an exempt PR without loading anything", () => {
    const loadNothing = withRoadmap({ roadmap: unreachable, repo: unreachable, specTickets: unreachable });
    expect(denyReason(create("ci(hooks)!: x"), loadNothing)).toBeUndefined();
  });

  test("denies a code PR that closes no issue", () => {
    expect(denyReason(create("feat: x"), withRoadmap())).toContain("closes exactly one Ticket");
  });

  test("denies a code PR that closes a blocked Ticket", () => {
    expect(denyReason(`gh pr create -t "fix: x" -b "${GOOD_BODY} Closes #22"`, withRoadmap())).toContain(
      "#22: is blocked by open issue(s) #21",
    );
  });

  test("checks a new body against the PR's current title", () => {
    const sources = withRoadmap({ pr: () => ({ title: "feat: x", body: "" }) });
    expect(denyReason(`gh pr edit 5 --body "${GOOD_BODY}"`, sources)).toContain("closes exactly one Ticket");
    expect(denyReason(`gh pr edit 5 --body "${GOOD_BODY} fixes #21"`, sources)).toBeUndefined();
  });

  test("checks a new title against the PR's current body", () => {
    let selector: string | undefined;
    const sources = withRoadmap({
      pr: (s) => {
        selector = s;
        return { title: "docs: x", body: "no ticket" };
      },
    });
    expect(denyReason('gh pr edit 5 --title "feat: x"', sources)).toContain("closes exactly one Ticket");
    expect(selector).toBe("5");
    expect(denyReason('gh pr edit --title "docs: y"', sources)).toBeUndefined();
  });

  test("ignores an edit that changes neither title nor body", () => {
    expect(denyReason("gh pr edit 5 --add-label bug", withRoadmap())).toBeUndefined();
  });

  test("denies with the error when gh fails", () => {
    const failing = withRoadmap({
      specTickets: () => {
        throw new Error("gh api issues/20/sub_issues failed: HTTP 401");
      },
    });
    expect(denyReason(create("feat: x", closingFile), failing)).toContain("HTTP 401");
  });
});
