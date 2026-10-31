/**
 * Single definition of the test-first rule (see .claude/rules/tdd.md), run by CI's `tdd` job: every `feat` or `fix`
 * commit comes right after a `test` commit whose tests fail, touches no test files, and leaves the whole suite passing;
 * a feat or fix PR has at least one such commit. Run directly as `bun scripts/tdd-gate.ts <base> <head>` with PR_TITLE
 * set; it checks out each commit it tests in TDD_REPO (default the current directory), so CI points it at a separate
 * checkout of the PR.
 */
import { resolve } from "node:path";
import { output, titleType } from "./ticket-gate.ts";

/** Commit and PR types that change behavior, so they need a failing test first. */
export const CODE_TYPES = ["feat", "fix"];

export const TDD_HELP =
  "See .claude/rules/tdd.md: commit the failing test as `test`, then the code as `feat` or `fix`.";

export interface Commit {
  sha: string;
  subject: string;
  /** Paths the commit adds or modifies. */
  files: string[];
}

const RUNNABLE_TEST = /\.(test|spec)\.[cm]?[jt]sx?$/;

/** Whether a path belongs to the tests: a test file, a snapshot or a fixture. */
export function isTestFile(path: string): boolean {
  return RUNNABLE_TEST.test(path) || /(^|\/)(__tests__|__snapshots__|fixtures)\//.test(path);
}

/** What the gate reads, injectable so it can be decided without git or running tests. */
export interface TddSources {
  /** Whether the given test files, or the whole suite when none are given, pass at `sha`. */
  testsPass: (sha: string, files?: string[]) => boolean;
}

/** Returns why the PR's commits break the test-first rule; empty when they follow it. */
export function tddErrors(prTitle: string, commits: Commit[], sources: TddSources): string[] {
  const errors: string[] = [];
  const label = (commit: Commit) => `${commit.sha.slice(0, 7)} "${commit.subject}"`;
  const isCode = (commit: Commit) => CODE_TYPES.includes(titleType(commit.subject) ?? "");
  const codeCommits = commits.filter(isCode);

  for (const commit of codeCommits) {
    const previous = commits[commits.indexOf(commit) - 1];
    if (commit.files.some(isTestFile)) {
      errors.push(`${label(commit)} changes test files; commit the test first, in its own test commit`);
    }
    if (!previous || titleType(previous.subject) !== "test") {
      errors.push(`${label(commit)} must come right after a test commit holding its failing test`);
      continue;
    }
    if (!previous.files.every(isTestFile)) {
      errors.push(`${label(previous)} must change only test files, so its code lands in ${label(commit)}`);
    }
    const tests = previous.files.filter((path) => RUNNABLE_TEST.test(path));
    if (tests.length === 0) {
      errors.push(`${label(previous)} has no test file to run before ${label(commit)}`);
    } else if (sources.testsPass(previous.sha, tests)) {
      errors.push(`${label(previous)} passes; its tests must fail before ${label(commit)} makes them pass`);
    }
    if (!sources.testsPass(commit.sha)) errors.push(`the test suite fails at ${label(commit)}`);
  }

  const prType = titleType(prTitle);
  if (prType && CODE_TYPES.includes(prType) && codeCommits.length === 0) {
    errors.push(`a ${prType} PR needs at least one feat or fix commit, each right after its failing test commit`);
  }
  return errors;
}

/** The PR's commits from `base` to `head`, oldest first, read from the repo at `repo`. */
export function prCommits(base: string, head: string, repo: string): Commit[] {
  const log = output(["git", "-C", repo, "log", "--reverse", "--no-merges", "--format=%H %s", `${base}..${head}`]);
  return log
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [sha, ...subject] = line.split(" ");
      const diff = ["git", "-C", repo, "diff-tree", "--no-commit-id", "--name-only", "-r", "--diff-filter=d", sha];
      return { sha, subject: subject.join(" "), files: output(diff).split("\n").filter(Boolean) };
    });
}

/** The real sources: checks out `sha` in `repo`, installs its dependencies and runs `bun test` there. */
export function liveSources(repo: string): TddSources {
  return {
    testsPass: (sha, files = []) => {
      output(["git", "-C", repo, "checkout", "--quiet", "--detach", sha]);
      output(["bun", "install", "--frozen-lockfile", "--cwd", repo]);
      console.log(`▶ bun test ${files.join(" ")} at ${sha.slice(0, 7)}`);
      const run = Bun.spawnSync(["bun", "test", ...files.map((path) => `./${path}`)], {
        cwd: repo,
        stdio: ["ignore", "inherit", "inherit"],
      });
      return run.exitCode === 0;
    },
  };
}

if (import.meta.main) {
  const [base, head] = process.argv.slice(2);
  try {
    if (!base || !head) throw new Error("usage: bun scripts/tdd-gate.ts <base> <head>");
    const repo = resolve(process.env.TDD_REPO || ".");
    const errors = tddErrors(process.env.PR_TITLE ?? "", prCommits(base, head, repo), liveSources(repo));
    if (errors.length === 0) {
      console.log("✔ every feat and fix commit follows its failing test and passes the suite");
    } else {
      for (const error of errors) console.error(`✖ ${error}`);
      console.error(TDD_HELP);
      process.exit(1);
    }
  } catch (error) {
    console.error(`✖ ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
}
