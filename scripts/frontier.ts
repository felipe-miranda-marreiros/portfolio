/**
 * Single definition of whose turn it is (see .claude/rules/planning.md): the Milestone Frontier, the Milestones
 * awaiting a Spec, the Ticket Frontier, and whether one issue is a Ticket that may be closed now. Run directly, it
 * prints the three lists from docs/ROADMAP.md and GitHub, and exits 1 on an invalid Roadmap or a gh failure.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { type Milestone, parseRoadmap, ROADMAP_PATH } from "./planning-docs.ts";

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

interface GitHubIssue {
  number: number;
  title: string;
  state: string;
  labels: { name: string }[];
  assignees: { login: string }[];
  issue_dependencies_summary?: { blocked_by: number } | null;
}

/**
 * Returns every item of a paginated list endpoint of the current repo, through `gh api`.
 * @throws when gh fails or isn't installed
 */
function ghList<T>(path: string): T[] {
  const args = ["gh", "api", "--paginate", "--slurp", `repos/{owner}/{repo}/${path}?per_page=100`];
  const result = Bun.spawnSync(args, { stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(`gh api ${path} failed: ${result.stderr.toString().trim()}`);
  return (JSON.parse(result.stdout.toString()) as T[][]).flat();
}

function openBlockers(issue: GitHubIssue): number[] {
  // the summary counts open blockers only, so 0 saves a request
  if (issue.state !== "open" || issue.issue_dependencies_summary?.blocked_by === 0) return [];
  return ghList<GitHubIssue>(`issues/${issue.number}/dependencies/blocked_by`)
    .filter((blocker) => blocker.state === "open")
    .map((blocker) => blocker.number);
}

/**
 * Fetches the sub-issues of each Spec, with the open blockers of the open ones.
 * @throws when a gh call fails
 */
export function loadSpecTickets(specs: number[]): SpecTickets {
  return new Map(
    specs.map((spec) => [
      spec,
      ghList<GitHubIssue>(`issues/${spec}/sub_issues`).map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state === "open" ? "open" : "closed",
        labels: issue.labels.map((label) => label.name),
        assignees: issue.assignees.map((assignee) => assignee.login),
        openBlockers: openBlockers(issue),
      })),
    ]),
  );
}

/**
 * Reads the Milestones of docs/ROADMAP.md, or returns undefined when it doesn't exist.
 * @throws when the Roadmap is invalid
 */
export function readRoadmap(): Milestone[] | undefined {
  const file = join(import.meta.dir, "..", ROADMAP_PATH);
  if (!existsSync(file)) return undefined;
  const { milestones, errors } = parseRoadmap(readFileSync(file, "utf8"));
  if (errors.length > 0) throw new Error(`${errors.join("\n")}\nRun bun run check:planning to see every error.`);
  return milestones;
}

function printList(heading: string, items: string[]): void {
  console.log(heading);
  for (const item of items.length > 0 ? items : ["none"]) console.log(`  ${item}`);
}

if (import.meta.main) {
  try {
    const milestones = readRoadmap();
    if (!milestones) {
      console.log(`No ${ROADMAP_PATH} yet, so there is no Milestone or Ticket to pick up.`);
      process.exit(0);
    }
    const specs = milestones.flatMap((m) => (m.status === "in-progress" && m.spec !== null ? [m.spec] : []));
    const tickets = ticketFrontier(milestones, loadSpecTickets(specs));
    const label = (m: Milestone) => `${m.id}: ${m.title}`;
    printList("Milestone Frontier (a human may approve one):", milestoneFrontier(milestones).map(label));
    printList("Milestones awaiting a Spec (run /to-spec):", awaitingSpec(milestones).map(label));
    printList(
      "Ticket Frontier (an agent may claim one):",
      tickets.map(({ milestone, ticket }) => `#${ticket.number} ${ticket.title} (${milestone.id})`),
    );
  } catch (error) {
    console.error(`✖ ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}
