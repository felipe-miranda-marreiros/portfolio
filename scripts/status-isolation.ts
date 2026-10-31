/**
 * Approval isolation: a PR that changes a `Status:` line in the Vision or Roadmap changes nothing outside docs/.
 * Run directly as `bun scripts/status-isolation.ts [base] [head]` (default origin/main and HEAD), it diffs the
 * merge base of the two revisions against head and exits 1 on a violation.
 */
import { ROADMAP_PATH, VISION_PATH } from "./planning-docs.ts";

const STATUS_LINE_CHANGE = /^[+-]\s*Status:/m;

/**
 * Returns one error per file outside docs/ when the diff adds or removes a `Status:` line.
 * @param changedFiles every path the PR changes
 * @param statusDocsDiff the unified `git diff` of docs/VISION.md and docs/ROADMAP.md
 */
export function isolationErrors(changedFiles: string[], statusDocsDiff: string): string[] {
  if (!STATUS_LINE_CHANGE.test(statusDocsDiff)) return [];
  return changedFiles
    .filter((file) => !file.startsWith("docs/"))
    .map((file) => `${file}: changed outside docs/ in a PR that changes a 'Status:' line`);
}

function git(...args: string[]): string {
  const result = Bun.spawnSync(["git", ...args]);
  if (result.exitCode !== 0) throw new Error(`git ${args.join(" ")} failed: ${result.stderr.toString()}`);
  return result.stdout.toString();
}

if (import.meta.main) {
  const [base = "origin/main", head = "HEAD"] = process.argv.slice(2);
  const range = `${base}...${head}`;
  const changedFiles = git("diff", "--name-only", "--no-renames", range).split("\n").filter(Boolean);
  const errors = isolationErrors(changedFiles, git("diff", "--unified=0", range, "--", VISION_PATH, ROADMAP_PATH));
  for (const error of errors) console.error(`✖ ${error}`);
  if (errors.length > 0) {
    console.error("Move the Status change into its own PR (see Approval in .claude/rules/planning.md)");
    process.exit(1);
  }
}
