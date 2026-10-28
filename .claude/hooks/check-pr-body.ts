/**
 * PreToolUse hook that blocks `gh pr create` and `gh pr edit` unless the PR body follows the
 * `pr` skill (`.claude/skills/pr`): Summary, Evidence and Merge Danger sections.
 * Exits 2 to deny the tool call.
 */
import { existsSync, readFileSync } from "node:fs";
import { missingSections } from "../../scripts/pr-body.ts";

function deny(reason: string): never {
  console.error(`${reason} See .claude/skills/pr/SKILL.md; invoke /pr before writing the body.`);
  process.exit(2);
}

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

// anchored to command position so `gh pr create` inside a quoted argument doesn't trigger it
const subcommand = command.match(/(?:^|[;&|(\n]|\$\()\s*gh\s+pr\s+(create|new|edit)\b/)?.[1];
if (!subcommand) process.exit(0);

// flags are only looked for outside quotes, so a body that mentions `--fill` isn't mistaken for the flag
const unquoted = command.replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, '""');

if (/(?:^|\s)--fill(?:-first|-verbose)?(?=\s|$)/.test(unquoted)) {
  deny("--fill builds the PR body from commits, which skips the required sections.");
}

const setsBody = /(?<=\s)(?:--body|-b|--body-file|-F)(?=[\s="']|$)/.test(unquoted);
if (subcommand === "edit" && !setsBody) process.exit(0);

const bodyFile = command.match(/(?<=\s)(?:--body-file|-F)[\s=]+["']?([^\s"']+)/)?.[1];
const withoutTitle = command.replace(/(?<=\s)(?:--title|-t)[\s=]+("(?:\\.|[^"\\])*"|'[^']*'|\S+)/g, "");
const body = bodyFile && bodyFile !== "-" && existsSync(bodyFile) ? readFileSync(bodyFile, "utf8") : withoutTitle;

const missing = missingSections(body);
if (missing.length > 0) {
  const headings = missing.map((section) => `'## ${section}'`).join(", ");
  deny(
    `PR body is missing section(s): ${headings}. Pass the body inline or with --body-file; ` +
      "bodies read from stdin cannot be verified.",
  );
}
