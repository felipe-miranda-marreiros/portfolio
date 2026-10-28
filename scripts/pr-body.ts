/**
 * Single definition of what a PR body must contain, shared by the Claude Code hook and CI.
 * Run directly, it checks the PR_BODY environment variable and exits 1 if sections are missing.
 */

export const REQUIRED_SECTIONS = ["Summary", "Evidence", "Merge Danger"];

/** Returns the required section headings that `body` lacks. */
export function missingSections(body: string): string[] {
  return REQUIRED_SECTIONS.filter((section) => !new RegExp(String.raw`##\s+${section}\b`).test(body));
}

if (import.meta.main) {
  const missing = missingSections(process.env.PR_BODY ?? "");
  if (missing.length > 0) {
    const headings = missing.map((section) => `'## ${section}'`).join(", ");
    console.error(`✖ PR body is missing section(s): ${headings} (see .claude/skills/pr/SKILL.md)`);
    process.exit(1);
  }
}
