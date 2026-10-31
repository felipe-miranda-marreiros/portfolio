import { describe, expect, test } from "bun:test";
import type { Issue, SpecTickets } from "./frontier.ts";
import type { Milestone } from "./planning-docs.ts";
import { closedIssues, type GateSources, ticketGate, titleType } from "./ticket-gate.ts";

const REPO = "owner/portfolio";

const milestones: Milestone[] = [
  { id: "M1", title: "Done", status: "done", blockedBy: [], spec: 10 },
  { id: "M2", title: "Now", status: "in-progress", blockedBy: ["M1"], spec: 20 },
  { id: "M3", title: "Later", status: "planned", blockedBy: ["M2"], spec: null },
];

function ticket(number: number, overrides: Partial<Issue> = {}): Issue {
  return { number, title: `T${number}`, state: "open", labels: [], assignees: [], openBlockers: [], ...overrides };
}

const specTickets: SpecTickets = new Map([
  [10, [ticket(11)]],
  [20, [ticket(21), ticket(22, { openBlockers: [21] })]],
]);

function sources(overrides: Partial<GateSources> = {}): GateSources {
  return { roadmap: () => milestones, repo: () => REPO, specTickets: () => specTickets, ...overrides };
}

const unreachable = () => {
  throw new Error("should not be loaded");
};

describe("titleType", () => {
  test.each([
    ["feat: x", "feat"],
    ["fix(nav): x", "fix"],
    ["ci!: x", "ci"],
    ["Docs(readme)!: x", "docs"],
    ["update things", undefined],
    ["feat(: x", undefined],
  ])("reads %p as %p", (title, type) => {
    expect(titleType(title)).toBe(type);
  });
});

describe("closedIssues", () => {
  test.each([
    "close",
    "closes",
    "closed",
    "fix",
    "fixes",
    "fixed",
    "resolve",
    "resolves",
    "resolved",
    "CLOSES",
    "Fixes:",
  ])("reads the keyword %p", (keyword) => {
    expect(closedIssues(`${keyword} #21`, REPO)).toEqual([21]);
  });

  test("reads same-repo URLs and owner/name references, in any case", () => {
    const body = "Closes https://github.com/Owner/Portfolio/issues/21\nfixes owner/portfolio#22";
    expect(closedIssues(body, REPO)).toEqual([21, 22]);
  });

  test("ignores other repositories, references without a keyword, and words that contain one", () => {
    const body = "Closes other/repo#1, closes https://github.com/other/repo/issues/2, Refs #3, prefix #4, see #5";
    expect(closedIssues(body, REPO)).toEqual([]);
  });

  test("counts an issue closed twice once", () => {
    expect(closedIssues("Closes #21. Also fixes #21.", REPO)).toEqual([21]);
  });

  test("reads only the first issue of a list, like GitHub", () => {
    expect(closedIssues("Closes #21, #22", REPO)).toEqual([21]);
  });
});

describe("ticketGate", () => {
  test.each(["docs", "chore", "ci(hooks)", "build!", "revert"])("exempts %p PRs without loading anything", (type) => {
    const loadNothing = sources({ roadmap: unreachable, repo: unreachable, specTickets: unreachable });
    expect(ticketGate(`${type}: x`, "", loadNothing).ok).toBe(true);
  });

  test("is inactive while the base branch has no Roadmap", () => {
    const result = ticketGate("feat: x", "", sources({ roadmap: () => undefined, specTickets: unreachable }));
    expect(result).toEqual({ ok: true, reason: "no docs/ROADMAP.md on the base branch yet, so the gate is inactive" });
  });

  test("passes a code PR that closes one Ticket whose turn has come", () => {
    expect(ticketGate("feat(nav): x", "Closes #21", sources())).toEqual({ ok: true, reason: "closes Ticket #21" });
  });

  test("rejects a code PR that closes no issue", () => {
    expect(ticketGate("feat: x", "Refs #21", sources({ specTickets: unreachable }))).toEqual({
      ok: false,
      errors: ["a code PR closes exactly one Ticket with a single `Closes #N` in its body; found none"],
    });
  });

  test("rejects a code PR that closes several issues", () => {
    expect(ticketGate("fix: x", "Closes #21\nCloses #22", sources()).ok).toBe(false);
  });

  test("treats a title without a type as a code PR", () => {
    expect(ticketGate("update things", "", sources()).ok).toBe(false);
  });

  test("loads the Spec of every Milestone, so a Ticket of a done Milestone is reported", () => {
    let loaded: number[] = [];
    const recording = sources({
      specTickets: (specs) => {
        loaded = specs;
        return specTickets;
      },
    });
    expect(ticketGate("feat: x", "Closes #11", recording)).toEqual({
      ok: false,
      errors: ["#11: its Milestone M1 is done, not in-progress"],
    });
    expect(loaded).toEqual([10, 20]);
  });

  test("rejects a blocked Ticket", () => {
    expect(ticketGate("feat: x", "Closes #22", sources())).toEqual({
      ok: false,
      errors: ["#22: is blocked by open issue(s) #21"],
    });
  });
});
