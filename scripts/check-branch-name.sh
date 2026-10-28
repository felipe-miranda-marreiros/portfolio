#!/bin/sh
# Validate a branch name: <type>/<kebab-case-description> (see .claude/rules/issues-and-branches.md)
# Usage: check-branch-name.sh <branch>
branch=$1
pattern='^(feat|fix|docs|chore|ci|build|refactor|perf|style|test|revert)/[a-z0-9]+(-[a-z0-9]+)*$'

[ "$branch" = "main" ] && exit 0

if ! printf '%s\n' "$branch" | grep -Eq "$pattern"; then
  echo "✖ invalid branch name: '$branch'" >&2
  echo "  expected <type>/<kebab-case-description>, e.g. feat/claude-config" >&2
  echo "  types: feat fix docs chore ci build refactor perf style test revert" >&2
  exit 1
fi
