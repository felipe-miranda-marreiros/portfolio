import { describe, expect, test } from "bun:test";
import { parseRoadmap, validatePlanningDocs, validateRoadmap, validateVision } from "./planning-docs.ts";

const SECTIONS = ["Why", "Audience", "Goals", "Non-goals", "Constraints", "Open decisions"];

function vision(status = "approved", sections = SECTIONS): string {
  return ["# Vision", "", `Status: ${status}`, "", ...sections.flatMap((s) => [`## ${s}`, "", "Text.", ""])].join("\n");
}

function milestone(id: string, status: string, blockedBy = "none", spec = "(not written)"): string {
  return [
    `## ${id}: Title of ${id}`,
    "",
    "What it delivers.",
    "",
    `Status: ${status}`,
    `Blocked by: ${blockedBy}`,
    `Spec: ${spec}`,
    "",
  ].join("\n");
}

function roadmap(...milestones: string[]): string {
  return ["# Roadmap", "", ...milestones].join("\n");
}

const APPROVED = vision();

describe("validateVision", () => {
  test.each(["draft", "approved"])("accepts a %s Vision", (status) => {
    expect(validateVision(vision(status))).toEqual([]);
  });

  test("accepts CRLF line endings", () => {
    expect(validateVision(APPROVED.replaceAll("\n", "\r\n"))).toEqual([]);
  });

  test("rejects a missing Status line", () => {
    expect(validateVision(APPROVED.replace("Status: approved\n", ""))).toEqual([
      "docs/VISION.md: needs exactly one 'Status:' line, found 0",
    ]);
  });

  test("rejects two Status lines", () => {
    expect(validateVision(`${APPROVED}\nStatus: draft\n`)).toEqual([
      "docs/VISION.md: needs exactly one 'Status:' line, found 2",
    ]);
  });

  test("rejects an unknown status", () => {
    expect(validateVision(vision("done"))).toEqual(["docs/VISION.md: Status 'done' is not draft or approved"]);
  });

  test("lists every missing section, without mistaking Non-goals for Goals", () => {
    expect(validateVision(vision("draft", ["Why", "Non-goals", "Constraints"]))).toEqual([
      "docs/VISION.md: missing section '## Audience'",
      "docs/VISION.md: missing section '## Goals'",
      "docs/VISION.md: missing section '## Open decisions'",
    ]);
  });
});

describe("parseRoadmap", () => {
  test("parses every Milestone", () => {
    const text = roadmap(
      milestone("M1", "done", "none", "#12"),
      milestone("M2", "planned", "M1, M3"),
      milestone("M3", "planned"),
    );
    expect(parseRoadmap(text)).toEqual({
      errors: [],
      milestones: [
        { id: "M1", title: "Title of M1", status: "done", blockedBy: [], spec: 12 },
        { id: "M2", title: "Title of M2", status: "planned", blockedBy: ["M1", "M3"], spec: null },
        { id: "M3", title: "Title of M3", status: "planned", blockedBy: [], spec: null },
      ],
    });
  });

  test("rejects a heading that is not a Milestone", () => {
    expect(parseRoadmap(roadmap(milestone("M1", "planned"), "## Notes\n")).errors).toEqual([
      "docs/ROADMAP.md: heading '## Notes' is not '## M<n>: <title>'",
    ]);
  });

  test("rejects a Roadmap without Milestones", () => {
    expect(parseRoadmap("# Roadmap\n").errors).toEqual(["docs/ROADMAP.md: has no Milestones"]);
  });

  test("rejects missing, repeated and malformed fields", () => {
    const text = roadmap(
      "## M1: First\nStatus: started\nBlocked by: M2 and M3\nSpec: 20\n",
      "## M2: Second\nStatus: planned\nStatus: planned\n",
    );
    expect(parseRoadmap(text).errors).toEqual([
      "docs/ROADMAP.md: M1: Status 'started' is not planned, in-progress or done",
      "docs/ROADMAP.md: M1: Blocked by 'M2 and M3' is not 'none' or a comma-separated list of M<n> ids",
      "docs/ROADMAP.md: M1: Spec '20' is not '#<n>' or '(not written)'",
      "docs/ROADMAP.md: M2: needs exactly one 'Status:' line, found 2",
      "docs/ROADMAP.md: M2: needs exactly one 'Blocked by:' line, found 0",
      "docs/ROADMAP.md: M2: needs exactly one 'Spec:' line, found 0",
    ]);
  });
});

describe("validateRoadmap", () => {
  test("accepts a valid Roadmap", () => {
    const text = roadmap(
      milestone("M1", "done", "none", "#12"),
      milestone("M2", "in-progress", "M1", "#20"),
      milestone("M3", "planned", "M1, M2"),
    );
    expect(validateRoadmap(text, APPROVED)).toEqual([]);
  });

  test("requires a Vision", () => {
    expect(validateRoadmap(roadmap(milestone("M1", "planned")), undefined)).toEqual([
      "docs/ROADMAP.md: requires docs/VISION.md with 'Status: approved'",
    ]);
  });

  test("requires the Vision to be approved", () => {
    expect(validateRoadmap(roadmap(milestone("M1", "planned")), vision("draft"))).toEqual([
      "docs/ROADMAP.md: requires docs/VISION.md with 'Status: approved'",
    ]);
  });

  test("rejects duplicate ids", () => {
    expect(validateRoadmap(roadmap(milestone("M1", "planned"), milestone("M1", "planned")), APPROVED)).toEqual([
      "docs/ROADMAP.md: M1 is defined more than once",
    ]);
  });

  test("rejects unknown blockers", () => {
    expect(validateRoadmap(roadmap(milestone("M1", "planned", "M9")), APPROVED)).toEqual([
      "docs/ROADMAP.md: M1: blocker M9 is not a Milestone",
    ]);
  });

  test("rejects a self-block", () => {
    expect(validateRoadmap(roadmap(milestone("M1", "planned", "M1")), APPROVED)).toEqual([
      "docs/ROADMAP.md: M1: blocks itself",
    ]);
  });

  test("rejects a cycle", () => {
    const text = roadmap(
      milestone("M1", "planned", "M3"),
      milestone("M2", "planned", "M1"),
      milestone("M3", "planned", "M2"),
    );
    expect(validateRoadmap(text, APPROVED)).toEqual(["docs/ROADMAP.md: blocker cycle M1 -> M3 -> M2 -> M1"]);
  });

  test.each(["in-progress", "done"])("rejects a Milestone %s before its blockers are done", (status) => {
    const text = roadmap(milestone("M1", "in-progress"), milestone("M2", status, "M1"));
    expect(validateRoadmap(text, APPROVED)).toEqual([
      `docs/ROADMAP.md: M2: is ${status} but its blocker M1 is in-progress`,
    ]);
  });
});

describe("validatePlanningDocs", () => {
  test("passes when neither document exists", () => {
    expect(validatePlanningDocs(undefined, undefined)).toEqual([]);
  });

  test("passes with only a draft Vision", () => {
    expect(validatePlanningDocs(vision("draft"), undefined)).toEqual([]);
  });

  test("reports Vision and Roadmap errors together", () => {
    expect(validatePlanningDocs(vision("final"), roadmap(milestone("M1", "planned")))).toEqual([
      "docs/VISION.md: Status 'final' is not draft or approved",
      "docs/ROADMAP.md: requires docs/VISION.md with 'Status: approved'",
    ]);
  });
});
