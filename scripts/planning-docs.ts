/**
 * Single definition of the Vision and Roadmap formats (see .claude/rules/planning.md), run by CI and reusable by
 * other scripts. Run directly, it validates docs/VISION.md and docs/ROADMAP.md, each optional, and exits 1 on errors.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const VISION_PATH = "docs/VISION.md";
export const ROADMAP_PATH = "docs/ROADMAP.md";
export const VISION_SECTIONS = ["Why", "Audience", "Goals", "Non-goals", "Constraints", "Open decisions"];
export const MILESTONE_STATUSES = ["planned", "in-progress", "done"] as const;

export type MilestoneStatus = (typeof MILESTONE_STATUSES)[number];

/** One Roadmap item. `blockedBy` is empty for `Blocked by: none`; `spec` is null while `(not written)`. */
export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  blockedBy: string[];
  spec: number | null;
}

const BLOCKED_BY = /^(none|M\d+(\s*,\s*M\d+)*)$/;
const NOT_WRITTEN = "(not written)";

function lines(text: string): string[] {
  return text.split(/\r?\n/);
}

function fieldValues(section: string[], name: string): string[] {
  const prefix = `${name}:`;
  return section.filter((line) => line.startsWith(prefix)).map((line) => line.slice(prefix.length).trim());
}

function isMilestoneStatus(value: string): value is MilestoneStatus {
  return (MILESTONE_STATUSES as readonly string[]).includes(value);
}

/** Returns the errors in a Vision: its single `Status:` line and its required `##` sections. */
export function validateVision(text: string): string[] {
  const all = lines(text);
  const errors: string[] = [];
  const statuses = fieldValues(all, "Status");
  if (statuses.length !== 1) {
    errors.push(`${VISION_PATH}: needs exactly one 'Status:' line, found ${statuses.length}`);
  } else if (statuses[0] !== "draft" && statuses[0] !== "approved") {
    errors.push(`${VISION_PATH}: Status '${statuses[0]}' is not draft or approved`);
  }
  for (const section of VISION_SECTIONS) {
    if (!all.some((line) => line.trimEnd() === `## ${section}`)) {
      errors.push(`${VISION_PATH}: missing section '## ${section}'`);
    }
  }
  return errors;
}

/**
 * Parses the `## M<n>: <title>` sections of a Roadmap and checks their fields, but not the blockers between them.
 * @returns the Milestones whose fields are valid, and the format errors
 */
export function parseRoadmap(text: string): { milestones: Milestone[]; errors: string[] } {
  const errors: string[] = [];
  const sections: { id: string; title: string; body: string[] }[] = [];
  let current: string[] | undefined;
  for (const line of lines(text)) {
    if (!/^##\s/.test(line)) {
      current?.push(line);
      continue;
    }
    const match = /^## (M\d+): (.+?)\s*$/.exec(line);
    if (match?.[1] && match[2]) {
      current = [];
      sections.push({ id: match[1], title: match[2], body: current });
    } else {
      current = undefined;
      errors.push(`${ROADMAP_PATH}: heading '${line.trim()}' is not '## M<n>: <title>'`);
    }
  }
  if (sections.length === 0) errors.push(`${ROADMAP_PATH}: has no Milestones`);

  const milestones: Milestone[] = [];
  for (const { id, title, body } of sections) {
    const errorCount = errors.length;
    const fail = (message: string) => errors.push(`${ROADMAP_PATH}: ${id}: ${message}`);
    const field = (name: string): string | undefined => {
      const values = fieldValues(body, name);
      if (values.length !== 1) fail(`needs exactly one '${name}:' line, found ${values.length}`);
      return values.length === 1 ? values[0] : undefined;
    };

    const status = field("Status");
    if (status !== undefined && !isMilestoneStatus(status)) {
      fail(`Status '${status}' is not planned, in-progress or done`);
    }
    const blockedBy = field("Blocked by");
    if (blockedBy !== undefined && !BLOCKED_BY.test(blockedBy)) {
      fail(`Blocked by '${blockedBy}' is not 'none' or a comma-separated list of M<n> ids`);
    }
    const spec = field("Spec");
    const specNumber = spec === undefined ? undefined : /^#(\d+)$/.exec(spec)?.[1];
    if (spec !== undefined && spec !== NOT_WRITTEN && specNumber === undefined) {
      fail(`Spec '${spec}' is not '#<n>' or '${NOT_WRITTEN}'`);
    }

    if (errors.length > errorCount || status === undefined || blockedBy === undefined) continue;
    milestones.push({
      id,
      title,
      status: status as MilestoneStatus,
      blockedBy: blockedBy === "none" ? [] : blockedBy.split(",").map((blocker) => blocker.trim()),
      spec: specNumber === undefined ? null : Number(specNumber),
    });
  }
  return { milestones, errors };
}

function findCycle(byId: Map<string, Milestone>): string[] | undefined {
  const finished = new Set<string>();
  const path: string[] = [];
  const visit = (id: string): string[] | undefined => {
    if (path.includes(id)) return [...path.slice(path.indexOf(id)), id];
    if (finished.has(id)) return undefined;
    path.push(id);
    for (const blocker of byId.get(id)?.blockedBy ?? []) {
      const cycle = blocker === id || !byId.has(blocker) ? undefined : visit(blocker);
      if (cycle) return cycle;
    }
    path.pop();
    finished.add(id);
    return undefined;
  };
  for (const id of byId.keys()) {
    const cycle = visit(id);
    if (cycle) return cycle;
  }
  return undefined;
}

function blockerErrors(milestones: Milestone[]): string[] {
  const byId = new Map<string, Milestone>();
  const duplicates = new Set<string>();
  for (const milestone of milestones) {
    if (byId.has(milestone.id)) duplicates.add(milestone.id);
    byId.set(milestone.id, milestone);
  }
  if (duplicates.size > 0) return [...duplicates].map((id) => `${ROADMAP_PATH}: ${id} is defined more than once`);

  const errors: string[] = [];
  for (const { id, status, blockedBy } of milestones) {
    for (const blockerId of blockedBy) {
      const blocker = byId.get(blockerId);
      if (blockerId === id) {
        errors.push(`${ROADMAP_PATH}: ${id}: blocks itself`);
      } else if (!blocker) {
        errors.push(`${ROADMAP_PATH}: ${id}: blocker ${blockerId} is not a Milestone`);
      } else if (status !== "planned" && blocker.status !== "done") {
        errors.push(`${ROADMAP_PATH}: ${id}: is ${status} but its blocker ${blockerId} is ${blocker.status}`);
      }
    }
  }
  const cycle = findCycle(byId);
  if (cycle) errors.push(`${ROADMAP_PATH}: blocker cycle ${cycle.join(" -> ")}`);
  return errors;
}

/**
 * Returns the errors in a Roadmap: its format, its blockers, and whether its Vision is approved.
 * @param vision the Vision's text, or undefined when docs/VISION.md doesn't exist
 */
export function validateRoadmap(text: string, vision: string | undefined): string[] {
  const statuses = vision === undefined ? [] : fieldValues(lines(vision), "Status");
  const errors =
    statuses.length === 1 && statuses[0] === "approved"
      ? []
      : [`${ROADMAP_PATH}: requires ${VISION_PATH} with 'Status: approved'`];
  const { milestones, errors: formatErrors } = parseRoadmap(text);
  return [...errors, ...(formatErrors.length > 0 ? formatErrors : blockerErrors(milestones))];
}

/** Validates whichever of the two documents exist; passing undefined means the file doesn't exist. */
export function validatePlanningDocs(vision: string | undefined, roadmap: string | undefined): string[] {
  return [
    ...(vision === undefined ? [] : validateVision(vision)),
    ...(roadmap === undefined ? [] : validateRoadmap(roadmap, vision)),
  ];
}

if (import.meta.main) {
  const read = (path: string): string | undefined => {
    const file = join(import.meta.dir, "..", path);
    return existsSync(file) ? readFileSync(file, "utf8") : undefined;
  };
  const errors = validatePlanningDocs(read(VISION_PATH), read(ROADMAP_PATH));
  for (const error of errors) console.error(`✖ ${error}`);
  if (errors.length > 0) {
    console.error("See the planning formats in .claude/rules/planning.md");
    process.exit(1);
  }
}
