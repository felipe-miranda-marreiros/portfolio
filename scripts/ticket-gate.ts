/**
 * Single definition of "one PR, one Ticket" (see .claude/rules/planning.md), shared by CI's `ticket` job and the PR
 * hook: a code PR closes exactly one Ticket, and only a Ticket whose turn has come. Run directly, it checks PR_TITLE
 * and PR_BODY against the Roadmap on ROADMAP_REF (default origin/main) and exits 1 when the PR fails the gate.
 */
import { join } from "node:path";
import { loadSpecTickets, roadmapMilestones, type SpecTickets, ticketErrors } from "./frontier.ts";
import { type Milestone, ROADMAP_PATH } from "./planning-docs.ts";

/** PR types that close no Ticket. */
export const EXEMPT_TYPES = ["docs", "chore", "ci", "build", "revert"];

export const GATE_HELP = "See 'Picking up work' in .claude/rules/planning.md and run bun run frontier.";

/** Returns the lowercased Conventional Commits type of a PR title, or undefined when it has none. */
export function titleType(title: string): string | undefined {
  return title.match(/^\s*([a-z]+)(?:\([^()]*\))?!?:/i)?.[1].toLowerCase();
}

const CLOSING_REF =
  /\b(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?):?\s+(?:https?:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/issues\/|([\w.-]+\/[\w.-]+)#|#)(\d+)\b/gi;

/**
 * Returns the distinct issues of `repo` (`owner/name`) that a PR body closes, read like GitHub's closing keywords:
 * close, closes, closed, fix, fixes, fixed, resolve, resolves or resolved, in any case and optionally followed by a
 * colon, then `#N`, `owner/name#N` or `https://github.com/owner/name/issues/N`. Issues of other repos are ignored.
 */
export function closedIssues(body: string, repo: string): number[] {
  const issues = new Set<number>();
  for (const [, urlRepo, refRepo, number] of body.matchAll(CLOSING_REF)) {
    const target = urlRepo ?? refRepo;
    if (target === undefined || target.toLowerCase() === repo.toLowerCase()) issues.add(Number(number));
  }
  return [...issues];
}

/** What the gate reads, injectable so it can be decided without git or the network. */
export interface GateSources {
  /** The Milestones of the base branch's Roadmap, or undefined when it has none. */
  roadmap: () => Milestone[] | undefined;
  /** The `owner/name` of the repo. */
  repo: () => string;
  specTickets: (specs: number[]) => SpecTickets;
}

export type GateResult = { ok: true; reason: string } | { ok: false; errors: string[] };

/**
 * Decides whether a PR passes the gate, loading only what the decision needs.
 * @throws when a source fails
 */
export function ticketGate(title: string, body: string, sources: GateSources): GateResult {
  const type = titleType(title);
  if (type !== undefined && EXEMPT_TYPES.includes(type)) return { ok: true, reason: `${type} PRs are exempt` };
  const milestones = sources.roadmap();
  if (!milestones) return { ok: true, reason: `no ${ROADMAP_PATH} on the base branch yet, so the gate is inactive` };
  const issues = closedIssues(body, sources.repo());
  if (issues.length !== 1) {
    const found = issues.length === 0 ? "none" : issues.map((n) => `#${n}`).join(", ");
    return {
      ok: false,
      errors: [`a code PR closes exactly one Ticket with a single \`Closes #N\` in its body; found ${found}`],
    };
  }
  const [ticket] = issues;
  const errors = ticketErrors(ticket, milestones, sources.specTickets(milestones.flatMap((m) => m.spec ?? [])));
  return errors.length > 0 ? { ok: false, errors } : { ok: true, reason: `closes Ticket #${ticket}` };
}

/**
 * Runs a command from the repo root and returns its trimmed stdout.
 * @throws when it exits non-zero
 */
export function output(args: string[]): string {
  const result = Bun.spawnSync(args, { cwd: join(import.meta.dir, ".."), stderr: "pipe" });
  if (result.exitCode !== 0) throw new Error(`${args.join(" ")} failed: ${result.stderr.toString().trim()}`);
  return result.stdout.toString().trim();
}

/**
 * Reads the Milestones of the Roadmap committed on `ref`, or returns undefined when `ref` has none.
 * @throws when `ref` doesn't exist or its Roadmap is invalid
 */
export function roadmapAt(ref: string): Milestone[] | undefined {
  if (output(["git", "ls-tree", "--name-only", ref, "--", ROADMAP_PATH]) === "") return undefined;
  return roadmapMilestones(output(["git", "show", `${ref}:${ROADMAP_PATH}`]));
}

/** The real sources: the Roadmap on `ref`, and the repo and Tickets from GitHub through gh. */
export function liveSources(ref: string): GateSources {
  return {
    roadmap: () => roadmapAt(ref),
    repo: () =>
      process.env.GITHUB_REPOSITORY ||
      output(["gh", "repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"]),
    specTickets: loadSpecTickets,
  };
}

if (import.meta.main) {
  const ref = process.env.ROADMAP_REF || "origin/main";
  try {
    const result = ticketGate(process.env.PR_TITLE ?? "", process.env.PR_BODY ?? "", liveSources(ref));
    if (result.ok) {
      console.log(`✔ ${result.reason}`);
    } else {
      for (const error of result.errors) console.error(`✖ ${error}`);
      console.error(`${GATE_HELP} Once a blocker closes or the Milestone is approved on ${ref}, re-run this job.`);
      process.exit(1);
    }
  } catch (error) {
    console.error(`✖ ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}
