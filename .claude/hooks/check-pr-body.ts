/**
 * PreToolUse hook that blocks `gh pr create` and `gh pr edit` unless the PR body follows the
 * `pr` skill (`.claude/skills/pr`): Summary, Evidence and Merge Danger sections, and the PR
 * passes the Ticket gate (`scripts/ticket-gate.ts`) against the Roadmap on origin/main.
 * Exits 2 to deny the tool call.
 */
import { existsSync, readFileSync } from "node:fs";
import { missingSections } from "../../scripts/pr-body.ts";
import { GATE_HELP, type GateSources, liveSources, output, ticketGate } from "../../scripts/ticket-gate.ts";

const BODY_HELP = "See .claude/skills/pr/SKILL.md; invoke /pr before writing the body.";

/** The gate's sources, plus the current title and body of the PR that `gh pr edit [selector]` targets. */
export interface HookSources extends GateSources {
  pr: (selector: string | undefined) => { title: string; body: string };
}

function unquote(value: string): string {
  if (value.startsWith("'")) return value.slice(1, -1);
  return value.startsWith('"') ? value.slice(1, -1).replace(/\\(.)/g, "$1") : value;
}

/** Returns why `command` must be denied, or undefined to allow it. */
export function denyReason(command: string, sources: HookSources): string | undefined {
  // anchored to command position so `gh pr create` inside a quoted argument doesn't trigger it
  const subcommand = command.match(/(?:^|[;&|(\n]|\$\()\s*gh\s+pr\s+(create|new|edit)\b/)?.[1];
  if (!subcommand) return undefined;

  // flags are only looked for outside quotes, so a body that mentions `--fill` isn't mistaken for the flag
  const unquoted = command.replace(/"(?:\\.|[^"\\])*"|'[^']*'/g, '""');

  if (/(?:^|\s)--fill(?:-first|-verbose)?(?=\s|$)/.test(unquoted)) {
    return `--fill builds the PR body from commits, which skips the required sections. ${BODY_HELP}`;
  }

  const setsBody = /(?<=\s)(?:--body|-b|--body-file|-F)(?=[\s="']|$)/.test(unquoted);
  const titleFlag = /(?<=\s)(?:--title|-t)[\s=]+("(?:\\.|[^"\\])*"|'[^']*'|\S+)/g;
  const titleArg = command.match(new RegExp(titleFlag.source))?.[1];
  const isEdit = subcommand === "edit";
  if (isEdit && !setsBody && titleArg === undefined) return undefined;

  const bodyFile = command.match(/(?<=\s)(?:--body-file|-F)[\s=]+["']?([^\s"']+)/)?.[1];
  const withoutTitle = command.replace(titleFlag, "");
  const body = bodyFile && bodyFile !== "-" && existsSync(bodyFile) ? readFileSync(bodyFile, "utf8") : withoutTitle;

  const missing = isEdit && !setsBody ? [] : missingSections(body);
  if (missing.length > 0) {
    const headings = missing.map((section) => `'## ${section}'`).join(", ");
    return (
      `PR body is missing section(s): ${headings}. Pass the body inline or with --body-file; ` +
      `bodies read from stdin cannot be verified. ${BODY_HELP}`
    );
  }

  try {
    const current = isEdit && (!setsBody || titleArg === undefined) ? sources.pr(editSelector(command)) : undefined;
    const title = titleArg === undefined ? (current?.title ?? "") : unquote(titleArg);
    const result = ticketGate(title, setsBody ? body : (current?.body ?? ""), sources);
    if (!result.ok) return `PR fails the Ticket gate: ${result.errors.join("; ")}. ${GATE_HELP}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `Could not check the Ticket gate, and CI's ticket job would fail too: ${message}`;
  }
  return undefined;
}

function editSelector(command: string): string | undefined {
  return command.match(/\bgh\s+pr\s+edit\s+(?!-)([^\s;&|)]+)/)?.[1];
}

if (import.meta.main) {
  const input = JSON.parse(await Bun.stdin.text());
  const sources: HookSources = {
    ...liveSources("origin/main"),
    pr: (selector) => JSON.parse(output(["gh", "pr", "view", ...(selector ? [selector] : []), "--json", "title,body"])),
  };
  const reason = denyReason(input.tool_input?.command ?? "", sources);
  if (reason) {
    console.error(reason);
    process.exit(2);
  }
}
