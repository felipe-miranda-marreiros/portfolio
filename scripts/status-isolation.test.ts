import { describe, expect, test } from "bun:test";
import { isolationErrors } from "./status-isolation.ts";

const STATUS_DIFF = [
  "diff --git a/docs/ROADMAP.md b/docs/ROADMAP.md",
  "--- a/docs/ROADMAP.md",
  "+++ b/docs/ROADMAP.md",
  "@@ -3 +3 @@ Status: planned",
  "-Status: planned",
  "+Status: in-progress",
].join("\n");

const TEXT_DIFF = [
  "diff --git a/docs/VISION.md b/docs/VISION.md",
  "--- a/docs/VISION.md",
  "+++ b/docs/VISION.md",
  "@@ -7 +7 @@",
  "-Old goal.",
  "+New goal, mentioning Status: approved in prose.",
].join("\n");

describe("isolationErrors", () => {
  test("allows a Status change that only touches docs/", () => {
    expect(isolationErrors(["docs/ROADMAP.md", "docs/adr/0002-x.md"], STATUS_DIFF)).toEqual([]);
  });

  test("allows code changes when no Status line changes", () => {
    expect(isolationErrors(["docs/VISION.md", "src/index.ts"], TEXT_DIFF)).toEqual([]);
  });

  test("allows an empty diff", () => {
    expect(isolationErrors(["package.json"], "")).toEqual([]);
  });

  test("rejects a Status change alongside files outside docs/", () => {
    expect(isolationErrors(["docs/ROADMAP.md", "src/index.ts", "package.json"], STATUS_DIFF)).toEqual([
      "src/index.ts: changed outside docs/ in a PR that changes a 'Status:' line",
      "package.json: changed outside docs/ in a PR that changes a 'Status:' line",
    ]);
  });

  test("counts a new document's Status line as a change", () => {
    const created = "--- /dev/null\n+++ b/docs/VISION.md\n@@ -0,0 +1,3 @@\n+# Vision\n+\n+Status: draft";
    expect(isolationErrors(["docs/VISION.md", "README.md"], created)).toHaveLength(1);
  });
});
