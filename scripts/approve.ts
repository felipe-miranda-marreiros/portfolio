/**
 * Moves the Vision or one Milestone to its next status, the act of Approval (see .claude/rules/planning.md).
 * Run directly as `bun scripts/approve.ts <vision|M<n>>` by the `approve.yml` workflow: it rewrites the file and
 * prints the commit message, or prints the errors and exits 1.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  type MilestoneStatus,
  parseRoadmap,
  ROADMAP_PATH,
  VISION_PATH,
  validatePlanningDocs,
  validateVision,
} from "./planning-docs.ts";

/** The file to write, its new text, and the commit message that records the Approval. */
export interface Approval {
  path: string;
  text: string;
  message: string;
}

export type ApprovalResult = { approval: Approval } | { errors: string[] };

const NEXT: Record<MilestoneStatus, MilestoneStatus | undefined> = {
  planned: "in-progress",
  "in-progress": "done",
  done: undefined,
};

function approveVision(vision: string | undefined): ApprovalResult {
  if (vision === undefined) return { errors: [`${VISION_PATH} doesn't exist`] };
  const errors = validateVision(vision);
  if (errors.length > 0) return { errors };
  const draft = /^Status: draft(\r?)$/m;
  if (!draft.test(vision)) return { errors: [`${VISION_PATH} is already approved`] };
  const text = vision.replace(draft, "Status: approved$1");
  return { approval: { path: VISION_PATH, text, message: "docs(vision): approve the vision" } };
}

function advanceMilestone(id: string, vision: string | undefined, roadmap: string | undefined): ApprovalResult {
  if (roadmap === undefined) return { errors: [`${ROADMAP_PATH} doesn't exist`] };
  const current = parseRoadmap(roadmap).milestones.find((milestone) => milestone.id === id);
  if (!current) return { errors: [`${id} is not a Milestone of ${ROADMAP_PATH}`] };
  const next = NEXT[current.status];
  if (!next) return { errors: [`${id} is already done`] };

  const lines = roadmap.split("\n");
  const start = lines.findIndex((line) => line.startsWith(`## ${id}: `));
  const end = lines.findIndex((line, index) => index > start && /^##\s/.test(line));
  const statusLine = lines.findIndex(
    (line, index) => index > start && (end === -1 || index < end) && line.startsWith("Status:"),
  );
  const line = lines[statusLine];
  if (line !== undefined) lines[statusLine] = line.replace(current.status, next);
  const text = lines.join("\n");

  const errors = validatePlanningDocs(vision, text);
  if (errors.length > 0) return { errors };
  const message = next === "done" ? `docs(roadmap): mark ${id} done` : `docs(roadmap): start ${id}`;
  return { approval: { path: ROADMAP_PATH, text, message } };
}

/**
 * Computes the Approval of `target`: a draft Vision becomes approved, a Milestone moves from planned to in-progress
 * or from in-progress to done. The result must pass the planning checks.
 * @param target `vision`, or a Milestone id such as `M2`
 * @param vision the Vision's text, or undefined when docs/VISION.md doesn't exist
 * @param roadmap the Roadmap's text, or undefined when docs/ROADMAP.md doesn't exist
 */
export function approve(target: string, vision: string | undefined, roadmap: string | undefined): ApprovalResult {
  if (target === "vision") return approveVision(vision);
  if (/^M\d+$/.test(target)) return advanceMilestone(target, vision, roadmap);
  return { errors: [`target '${target}' is not 'vision' or a Milestone id such as M2`] };
}

if (import.meta.main) {
  const root = join(import.meta.dir, "..");
  const read = (path: string): string | undefined => {
    const file = join(root, path);
    return existsSync(file) ? readFileSync(file, "utf8") : undefined;
  };
  const result = approve(process.argv[2] ?? "", read(VISION_PATH), read(ROADMAP_PATH));
  if ("errors" in result) {
    for (const error of result.errors) console.error(`✖ ${error}`);
    process.exit(1);
  }
  writeFileSync(join(root, result.approval.path), result.approval.text);
  console.log(result.approval.message);
}
