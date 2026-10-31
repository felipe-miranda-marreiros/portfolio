/**
 * Single definition of whose turn it is (see .claude/rules/planning.md): the Milestone Frontier, the Milestones
 * awaiting a Spec, the Ticket Frontier, and whether one issue is a Ticket that may be closed now.
 */
import { type Milestone, ROADMAP_PATH } from "./planning-docs.ts";

export const READY_LABEL = "ready-for-agent";

/** The parts of a GitHub issue the Frontier depends on. `openBlockers` holds the numbers of its open native blockers. */
export interface Issue {
  number: number;
  title: string;
  state: "open" | "closed";
  labels: string[];
  assignees: string[];
  openBlockers: number[];
}

/** The sub-issues (Tickets) of each Spec, keyed by the Spec's issue number. */
export type SpecTickets = Map<number, Issue[]>;

function ticketsOf(milestone: Milestone, specTickets: SpecTickets): Issue[] {
  return milestone.spec === null ? [] : (specTickets.get(milestone.spec) ?? []);
}

/** Returns the planned Milestones whose blockers are all done: what a human may approve next. */
export function milestoneFrontier(milestones: Milestone[]): Milestone[] {
  const done = new Set(milestones.filter((m) => m.status === "done").map((m) => m.id));
  return milestones.filter((m) => m.status === "planned" && m.blockedBy.every((id) => done.has(id)));
}

/** Returns the in-progress Milestones whose Spec is not written yet: run `/to-spec` on them. */
export function awaitingSpec(milestones: Milestone[]): Milestone[] {
  return milestones.filter((m) => m.status === "in-progress" && m.spec === null);
}

/** Returns the Tickets an agent may claim now, with their Milestone. */
export function ticketFrontier(
  milestones: Milestone[],
  specTickets: SpecTickets,
): { milestone: Milestone; ticket: Issue }[] {
  return milestones
    .filter((milestone) => milestone.status === "in-progress" && milestone.spec !== null)
    .flatMap((milestone) => ticketsOf(milestone, specTickets).map((ticket) => ({ milestone, ticket })))
    .filter(
      ({ ticket }) =>
        ticket.state === "open" &&
        ticket.labels.includes(READY_LABEL) &&
        ticket.openBlockers.length === 0 &&
        ticket.assignees.length === 0,
    );
}

/**
 * Returns why issue `number` is not a Ticket that may be closed now. Its label and assignee don't matter: a Ticket
 * with a PR is already claimed.
 */
export function ticketErrors(number: number, milestones: Milestone[], specTickets: SpecTickets): string[] {
  for (const milestone of milestones) {
    const ticket = ticketsOf(milestone, specTickets).find((t) => t.number === number);
    if (!ticket) continue;
    const errors: string[] = [];
    if (milestone.status !== "in-progress") {
      errors.push(`#${number}: its Milestone ${milestone.id} is ${milestone.status}, not in-progress`);
    }
    if (ticket.openBlockers.length > 0) {
      errors.push(`#${number}: is blocked by open issue(s) ${ticket.openBlockers.map((n) => `#${n}`).join(", ")}`);
    }
    return errors;
  }
  return [`#${number} is not a sub-issue of any Spec in ${ROADMAP_PATH}`];
}
