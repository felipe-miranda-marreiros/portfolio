import { describe, expect, test } from "bun:test";
import {
  awaitingSpec,
  type Issue,
  milestoneFrontier,
  type SpecTickets,
  ticketErrors,
  ticketFrontier,
} from "./frontier.ts";
import type { Milestone, MilestoneStatus } from "./planning-docs.ts";

function milestone(
  id: string,
  status: MilestoneStatus,
  blockedBy: string[] = [],
  spec: number | null = null,
): Milestone {
  return { id, title: `Title of ${id}`, status, blockedBy, spec };
}

function ticket(number: number, overrides: Partial<Issue> = {}): Issue {
  return {
    number,
    title: `Ticket ${number}`,
    state: "open",
    labels: ["ready-for-agent"],
    assignees: [],
    openBlockers: [],
    ...overrides,
  };
}

const ids = (milestones: Milestone[]) => milestones.map((m) => m.id);

describe("milestoneFrontier", () => {
  test("lists planned Milestones whose blockers are all done", () => {
    const milestones = [
      milestone("M1", "done"),
      milestone("M2", "in-progress", ["M1"], 10),
      milestone("M3", "planned", ["M1"]),
      milestone("M4", "planned", ["M1", "M2"]),
      milestone("M5", "planned"),
    ];
    expect(ids(milestoneFrontier(milestones))).toEqual(["M3", "M5"]);
  });

  test("excludes a Milestone whose blocker is not in the Roadmap", () => {
    expect(milestoneFrontier([milestone("M1", "planned", ["M9"])])).toEqual([]);
  });
});

describe("awaitingSpec", () => {
  test("lists in-progress Milestones without a Spec", () => {
    const milestones = [
      milestone("M1", "in-progress"),
      milestone("M2", "in-progress", [], 20),
      milestone("M3", "planned"),
      milestone("M4", "done"),
    ];
    expect(ids(awaitingSpec(milestones))).toEqual(["M1"]);
  });
});

describe("ticketFrontier", () => {
  const milestones = [milestone("M1", "done", [], 10), milestone("M2", "in-progress", ["M1"], 20)];

  test("lists open, ready, unblocked, unassigned sub-issues of in-progress Specs", () => {
    const specTickets: SpecTickets = new Map([
      [10, [ticket(11)]],
      [
        20,
        [
          ticket(21),
          ticket(22, { state: "closed" }),
          ticket(23, { labels: ["needs-triage"] }),
          ticket(24, { openBlockers: [21] }),
          ticket(25, { assignees: ["someone"] }),
          ticket(26, { labels: ["bug", "ready-for-agent"] }),
        ],
      ],
    ]);
    expect(ticketFrontier(milestones, specTickets)).toEqual([
      { milestone: milestones[1], ticket: ticket(21) },
      { milestone: milestones[1], ticket: ticket(26, { labels: ["bug", "ready-for-agent"] }) },
    ]);
  });

  test("is empty when no Spec's sub-issues were loaded", () => {
    expect(ticketFrontier(milestones, new Map())).toEqual([]);
  });
});

describe("ticketErrors", () => {
  const milestones = [milestone("M1", "done", [], 10), milestone("M2", "in-progress", ["M1"], 20)];

  test("accepts a sub-issue of an in-progress Spec with no open blocker", () => {
    const specTickets: SpecTickets = new Map([[20, [ticket(21, { assignees: ["me"], labels: [] })]]]);
    expect(ticketErrors(21, milestones, specTickets)).toEqual([]);
  });

  test("rejects an issue that is not a sub-issue of any Spec", () => {
    expect(ticketErrors(5, milestones, new Map([[20, [ticket(21)]]]))).toEqual([
      "#5 is not a sub-issue of any Spec in docs/ROADMAP.md",
    ]);
  });

  test("rejects a Ticket whose Milestone is not in-progress", () => {
    expect(ticketErrors(11, milestones, new Map([[10, [ticket(11)]]]))).toEqual([
      "#11: its Milestone M1 is done, not in-progress",
    ]);
  });

  test("rejects a Ticket with open blockers", () => {
    expect(ticketErrors(21, milestones, new Map([[20, [ticket(21, { openBlockers: [22, 23] })]]]))).toEqual([
      "#21: is blocked by open issue(s) #22, #23",
    ]);
  });
});
