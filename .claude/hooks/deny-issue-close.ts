/**
 * PreToolUse hook that blocks closing an issue or removing an issue blocker by hand: `gh issue close`,
 * `gh issue edit --remove-blocked-by`/`--remove-blocking`, and their `gh api` equivalents.
 * A Ticket closes only when its PR is merged, so its dependents unblock only then.
 * Exits 2 to deny the tool call.
 */
import { commandSegments } from "./command-segments.ts";

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

const issue = String.raw`^gh\s+issue\s+(?:(?:-R|--repo)[\s=]+\S+\s+)?`;
const closesIssue = new RegExp(`${issue}close\\b`);
const removesBlocker = new RegExp(`${issue}edit\\b.*\\s--remove-block(?:ed-by|ing)\\b`);

function isDenied(segment: string): boolean {
  if (closesIssue.test(segment) || removesBlocker.test(segment)) return true;
  if (!/^gh\s+api\b/.test(segment)) return false;
  const deletes = /(?:-X\s*|--method[\s=]+)DELETE\b/i.test(segment);
  if (deletes && /issues\/\d+\/dependencies\/blocked_by\b/.test(segment)) return true;
  return /issues\/\d+(?![/\w])/.test(segment) && /state=closed\b/.test(segment);
}

if (commandSegments(command).some(isDenied)) {
  console.error(
    "Closing an issue or removing a blocker by hand is denied: a Ticket closes only when its PR is merged, " +
      "so its dependents unblock only then. See .claude/rules/planning.md.",
  );
  process.exit(2);
}
