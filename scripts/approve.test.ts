import { describe, expect, test } from "bun:test";
import { approve } from "./approve.ts";

const SECTIONS = ["Why", "Audience", "Goals", "Non-goals", "Constraints", "Open decisions"];

function vision(status: string): string {
  return ["# Vision", "", `Status: ${status}`, "", ...SECTIONS.flatMap((s) => [`## ${s}`, "", "Text.", ""])].join("\n");
}

function milestone(id: string, status: string, blockedBy = "none"): string {
  return [`## ${id}: Title of ${id}`, `Status: ${status}`, `Blocked by: ${blockedBy}`, "Spec: (not written)", ""].join(
    "\n",
  );
}

function roadmap(...milestones: string[]): string {
  return ["# Roadmap", "", ...milestones].join("\n");
}

const APPROVED = vision("approved");

describe("approve the Vision", () => {
  test("moves a draft Vision to approved and changes nothing else", () => {
    expect(approve("vision", vision("draft"), undefined)).toEqual({
      approval: { path: "docs/VISION.md", text: APPROVED, message: "docs(vision): approve the vision" },
    });
  });

  test("rejects an approved Vision", () => {
    expect(approve("vision", APPROVED, undefined)).toEqual({ errors: ["docs/VISION.md is already approved"] });
  });

  test("rejects a missing Vision", () => {
    expect(approve("vision", undefined, undefined)).toEqual({ errors: ["docs/VISION.md doesn't exist"] });
  });
});

describe("advance a Milestone", () => {
  test("starts a planned Milestone and changes no other Milestone", () => {
    const before = roadmap(milestone("M1", "planned"), milestone("M2", "planned"));
    expect(approve("M1", APPROVED, before)).toEqual({
      approval: {
        path: "docs/ROADMAP.md",
        text: roadmap(milestone("M1", "in-progress"), milestone("M2", "planned")),
        message: "docs(roadmap): start M1",
      },
    });
  });

  test("marks an in-progress Milestone done", () => {
    const before = roadmap(milestone("M1", "done"), milestone("M2", "in-progress", "M1"));
    expect(approve("M2", APPROVED, before)).toEqual({
      approval: {
        path: "docs/ROADMAP.md",
        text: roadmap(milestone("M1", "done"), milestone("M2", "done", "M1")),
        message: "docs(roadmap): mark M2 done",
      },
    });
  });

  test("rejects a done Milestone", () => {
    expect(approve("M1", APPROVED, roadmap(milestone("M1", "done")))).toEqual({ errors: ["M1 is already done"] });
  });

  test("rejects starting a Milestone whose blocker isn't done", () => {
    const before = roadmap(milestone("M1", "in-progress"), milestone("M2", "planned", "M1"));
    expect(approve("M2", APPROVED, before)).toEqual({
      errors: ["docs/ROADMAP.md: M2: is in-progress but its blocker M1 is in-progress"],
    });
  });

  test("rejects a Milestone the Roadmap doesn't have", () => {
    expect(approve("M9", APPROVED, roadmap(milestone("M1", "planned")))).toEqual({
      errors: ["M9 is not a Milestone of docs/ROADMAP.md"],
    });
  });

  test("rejects a missing Roadmap", () => {
    expect(approve("M1", APPROVED, undefined)).toEqual({ errors: ["docs/ROADMAP.md doesn't exist"] });
  });

  test("rejects a Roadmap whose Vision isn't approved", () => {
    expect(approve("M1", vision("draft"), roadmap(milestone("M1", "planned")))).toEqual({
      errors: ["docs/ROADMAP.md: requires docs/VISION.md with 'Status: approved'"],
    });
  });
});

test.each(["", "Vision", "m1", "M", "M1 ", "approve"])("rejects the target %p", (target) => {
  expect(approve(target, APPROVED, undefined)).toEqual({
    errors: [`target '${target}' is not 'vision' or a Milestone id such as M2`],
  });
});
