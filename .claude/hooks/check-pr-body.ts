/**
 * PreToolUse hook that blocks `gh pr create` and `gh pr edit` unless the PR body follows the
 * `pr` skill (`.claude/skills/pr`): Summary, Evidence and Merge Danger sections.
 * Exits 2 to deny the tool call.
 */
import { existsSync, readFileSync } from "node:fs";

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

// anchored to command position so `gh pr create` inside a quoted argument doesn't trigger it
const match = command.match(/(?:^|[;&|(\n]|\$\()\s*gh\s+pr\s+(create|edit)\b/);
if (!match) process.exit(0);

const bodyFile = command.match(/(?:--body-file|-F)[\s=]+["']?([^\s"']+)/)?.[1];
const setsBody = /(?:--body\b|-b\s|--body-file|-F\b|--fill)/.test(command);

if (match[1] === "edit" && !setsBody) process.exit(0);

const body = bodyFile && bodyFile !== "-" && existsSync(bodyFile) ? readFileSync(bodyFile, "utf8") : command;

const missing = ["Summary", "Evidence", "Merge Danger"].filter((s) => !new RegExp(String.raw`##\s+${s}\b`).test(body));
if (missing.length === 0) process.exit(0);

console.error(
  `PR body must follow the pr skill (.claude/skills/pr/SKILL.md). Missing section(s): ${missing.join(", ")}. ` +
    "Invoke /pr, then pass a body with '## Summary', '## Evidence' and '## Merge Danger'. " +
    "--fill and bodies read from stdin cannot be verified; pass the body inline or via --body-file.",
);
process.exit(2);
