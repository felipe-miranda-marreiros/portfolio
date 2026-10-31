/**
 * PreToolUse hook that blocks closing an issue or removing an issue blocker by hand: `gh issue close`,
 * `gh issue edit --remove-blocked-by`/`--remove-blocking`, and their `gh api` equivalents.
 * A Ticket closes only when its PR is merged, so its dependents unblock only then.
 * Exits 2 to deny the tool call.
 */

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

// quoted text with spaces or separators is blanked so a body that mentions `gh issue close` doesn't
// trigger it; single-token quotes (an endpoint, `'state=closed'`) are unwrapped so they still count
const unquoted = command.replace(/"((?:\\.|[^"\\])*)"|'([^']*)'/g, (_match, double, single) => {
  const inner: string = double ?? single;
  return /[\s;&|()]/.test(inner) ? '""' : inner;
});

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

// split at command boundaries so `gh` only counts in command position
if (unquoted.split(/\$\(|[;&|\n()]/).some((segment) => isDenied(segment.trim()))) {
  console.error(
    "Closing an issue or removing a blocker by hand is denied: a Ticket closes only when its PR is merged, " +
      "so its dependents unblock only then. See .claude/rules/planning.md.",
  );
  process.exit(2);
}
