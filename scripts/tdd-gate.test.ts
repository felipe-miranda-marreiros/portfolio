import { describe, expect, test } from "bun:test";
import { type Commit, isTestFile, type TddSources, tddErrors } from "./tdd-gate.ts";

const red = { sha: "a".repeat(40), subject: "test(nav): toggle dark mode", files: ["src/nav.test.ts"] };
const green = { sha: "b".repeat(40), subject: "feat(nav): add dark mode toggle", files: ["src/nav.ts"] };

/** Tests fail at the given shas and pass everywhere else; every run is recorded. */
function sources(failingAt: string[] = [red.sha]) {
  const runs: { sha: string; files?: string[] }[] = [];
  const fake: TddSources = {
    testsPass: (sha, files) => {
      runs.push({ sha, files });
      return !failingAt.includes(sha);
    },
  };
  return { fake, runs };
}

function commit(subject: string, files: string[], sha = subject.replace(/\W/g, "").padEnd(40, "0")): Commit {
  return { sha, subject, files };
}

describe("isTestFile", () => {
  test.each([
    ["src/nav.test.ts", true],
    ["src/nav.spec.tsx", true],
    ["scripts/gate.test.mjs", true],
    ["src/__tests__/nav.ts", true],
    ["src/__snapshots__/nav.test.ts.snap", true],
    ["fixtures/roadmap.md", true],
    ["src/nav.ts", false],
    ["src/testing.ts", false],
    ["package.json", false],
  ])("reads %p as %p", (path, expected) => {
    expect(isTestFile(path)).toBe(expected);
  });
});

describe("tddErrors", () => {
  test("passes a failing test commit followed by the code that makes the suite pass", () => {
    const { fake, runs } = sources();
    expect(tddErrors("feat(nav): add dark mode toggle", [red, green], fake)).toEqual([]);
    expect(runs).toEqual([
      { sha: red.sha, files: ["src/nav.test.ts"] },
      { sha: green.sha, files: undefined },
    ]);
  });

  test("passes vertical slices: test, feat, test, fix", () => {
    const red2 = commit("test(nav): keep the choice", ["src/nav.test.ts"]);
    const fix = commit("fix(nav): store the choice", ["src/nav.ts"]);
    const { fake } = sources([red.sha, red2.sha]);
    expect(tddErrors("feat(nav): add dark mode toggle", [red, green, red2, fix], fake)).toEqual([]);
  });

  test("rejects a feat commit with no test commit right before it", () => {
    const chore = commit("chore: bump deps", ["package.json"]);
    for (const commits of [[green], [chore, green]]) {
      const errors = tddErrors("feat(nav): add dark mode toggle", commits, sources().fake);
      expect(errors).toEqual([expect.stringContaining("right after a test commit")]);
    }
  });

  test("rejects horizontal slicing: two tests, then two code commits", () => {
    const red2 = commit("test(nav): keep the choice", ["src/nav.test.ts"]);
    const fix = commit("fix(nav): store the choice", ["src/nav.ts"]);
    const errors = tddErrors(
      "feat(nav): add dark mode toggle",
      [red, red2, green, fix],
      sources([red.sha, red2.sha]).fake,
    );
    expect(errors).toEqual([expect.stringContaining(fix.sha.slice(0, 7))]);
  });

  test("rejects a test commit whose tests already pass", () => {
    const errors = tddErrors("feat(nav): add dark mode toggle", [red, green], sources([]).fake);
    expect(errors).toEqual([expect.stringContaining("must fail")]);
  });

  test("rejects a feat or fix commit at which the suite fails", () => {
    const errors = tddErrors("fix(nav): add dark mode toggle", [red, green], sources([red.sha, green.sha]).fake);
    expect(errors).toEqual([expect.stringContaining("suite fails")]);
  });

  test("rejects a code commit that changes test files", () => {
    const sneaky = { ...green, files: ["src/nav.ts", "src/nav.test.ts"] };
    const errors = tddErrors("feat(nav): add dark mode toggle", [red, sneaky], sources().fake);
    expect(errors).toEqual([expect.stringContaining("changes test files")]);
  });

  test("rejects a test commit that changes code", () => {
    const mixed = { ...red, files: ["src/nav.test.ts", "src/nav.ts"] };
    const errors = tddErrors("feat(nav): add dark mode toggle", [mixed, green], sources().fake);
    expect(errors).toEqual([expect.stringContaining("only test files")]);
  });

  test("rejects a test commit with no test file to run", () => {
    const fixtureOnly = { ...red, files: ["fixtures/nav.json"] };
    const errors = tddErrors("feat(nav): add dark mode toggle", [fixtureOnly, green], sources().fake);
    expect(errors).toEqual([expect.stringContaining("no test file")]);
  });

  test("rejects a feat or fix PR with no feat or fix commit", () => {
    const refactor = commit("refactor(nav): extract the theme", ["src/nav.ts"]);
    for (const title of ["feat(nav): add dark mode toggle", "fix!: drop the old theme"]) {
      expect(tddErrors(title, [refactor], sources().fake)).toEqual([expect.stringContaining("at least one")]);
    }
  });

  test("leaves other commits and PR types alone without running tests", () => {
    const commits = [commit("docs: describe the nav", ["README.md"]), commit("ci: cache bun", [".github/x.yml"])];
    const { fake, runs } = sources();
    expect(tddErrors("docs: describe the nav", commits, fake)).toEqual([]);
    expect(runs).toEqual([]);
  });
});
