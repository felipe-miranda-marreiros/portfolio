/**
 * PreToolUse hook that blocks dispatching the approval workflow: `gh workflow run approve` (by file or name) and its
 * `gh api` equivalent. Approval is reserved to the human, and the workflow can't tell an agent using the human's
 * token from the human. Exits 2 to deny the tool call.
 */
import { commandSegments } from "./command-segments.ts";

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

const runsApproval = /^gh\s+workflow\s+(?:(?:-R|--repo)[\s=]+\S+\s+)?run\s+approve(?:\.yml)?(?:\s|$)/i;
const dispatchesApproval = /^gh\s+api\b.*actions\/workflows\/approve\.yml\/dispatches\b/;

if (commandSegments(command).some((segment) => runsApproval.test(segment) || dispatchesApproval.test(segment))) {
  console.error(
    "Dispatching the approval workflow is denied: only the human approves the Vision or a Milestone. " +
      "See .claude/rules/planning.md.",
  );
  process.exit(2);
}
