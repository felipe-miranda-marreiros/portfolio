---
name: design-review
description: Use before opening or updating a pull request that touches design (prototype/, DESIGN.md, PRODUCT.md, .impeccable/ or .claude/rules/design.md), or when the user asks to review a design change for inconsistencies. Runs the design-review agent in a subagent.
---

Review a design change for inconsistencies between the Owner's decisions, the tokens, the design docs and the
prototype. The `design-review` agent (`.claude/agents/design-review.md`) does the review in its own context; this skill
decides when to run it and what to do with its findings.

## Process

1. Find the base and the change. The base is `main` unless the user names another. List the design files the branch
   changes:

   ```bash
   git diff --name-only <base>...HEAD -- prototype DESIGN.md PRODUCT.md .impeccable .claude/rules/design.md
   ```

   If the list is empty and the user didn't ask for a review, stop: the change doesn't touch design.
2. Run the agent with the Agent tool, `subagent_type: "design-review"`. Pass the base ref, the branch, and the PR number
   if a PR is open (`gh pr view --json number`). Don't pass your own conclusions: the review is useful because it
   isn't anchored on yours.
3. Relay the findings to the user in the agent's three buckets, in the user's language, with each finding's
   `file:line`.
4. Ask the user about every **Owner decides** finding, in any bucket, before changing anything it touches.
5. Fix every **Fix before merge** finding:
   - Fix in authority order, top down: the decision (only with the Owner), then the tokens, then the prototype. A lower
     source that contradicts a higher one changes to match it, never the reverse.
   - Then regenerate `DESIGN.md` and `.impeccable/design.json` with `/impeccable document`. Never hand-edit them to make
     a finding disappear.
   - Follow the commit rules: one change per commit, `docs(prototype)` for prototype code.
6. Run the agent once more when the fixes changed the tokens, the prototype or a decision; a run costs about 100k
   tokens, so a fix that only rewords the docs doesn't need one. Don't fix the **Fix in the PR that needs it** findings
   now: list them so the user can carry them into those PRs.
7. Record the result in the PR's `## Evidence`: the number of findings per bucket, which were fixed, and which were
   deferred and to where.
