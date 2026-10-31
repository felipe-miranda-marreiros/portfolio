/**
 * PreToolUse hook that blocks merging a pull request: `gh pr merge` in any form, and its `gh api` equivalents (a PUT
 * to `pulls/<n>/merge`, the `mergePullRequest` and `enablePullRequestAutoMerge` GraphQL mutations). Only the human
 * merges, with a rebase or a merge commit, so the test-first commit pairs reach `main`. Exits 2 to deny the tool call.
 */
import { commandSegments } from "./command-segments.ts";

const input = JSON.parse(await Bun.stdin.text());
const command: string = input.tool_input?.command ?? "";

const mergesPr = /^gh\s+pr\s+(?:(?:-R|--repo)[\s=]+\S+\s+)?merge(?:\s|$)/;
const putsMerge = /^gh\s+api\b(?=.*(?:-X\s*|--method[\s=]+)PUT\b).*pulls\/\d+\/merge\b/i;
const callsGraphql = /^gh\s+api\b.*\bgraphql\b/;
const mergeMutation = /\b(?:mergePullRequest|enablePullRequestAutoMerge)\b/;

const segments = commandSegments(command);
// commandSegments blanks the quoted GraphQL query, so the mutation is looked up in the whole command.
const mutatesMerge = segments.some((segment) => callsGraphql.test(segment)) && mergeMutation.test(command);

if (mutatesMerge || segments.some((segment) => mergesPr.test(segment) || putsMerge.test(segment))) {
  console.error(
    "Merging a pull request is denied: only a human merges PRs, with a rebase or a merge commit, never a squash. " +
      "See .claude/rules/issues-branches-and-prs.md.",
  );
  process.exit(2);
}
