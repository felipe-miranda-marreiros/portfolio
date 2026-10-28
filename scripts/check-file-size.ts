/**
 * Pre-commit check that rejects staged files larger than MAX_TOKENS, estimated as bytes / 4.
 * Only staged content is measured. Lockfiles, generated or vendored files and binaries are skipped.
 */

const MAX_TOKENS = 5000;
const BYTES_PER_TOKEN = 4;
const BINARY_SNIFF_BYTES = 8000;

const IGNORED_PATHS = [
  /(^|\/)[^/]*\.lockb?$/,
  /(^|\/)[^/]*-lock\.(json|ya?ml)$/,
  /(^|\/)npm-shrinkwrap\.json$/,
  /\.(generated|gen|min)\.[^/]+$/,
  /\.map$/,
  /(^|\/)__generated__\//,
  /(^|\/)__snapshots__\//,
];

type Oversized = { path: string; tokens: number };

function git(...args: string[]): Buffer | null {
  const result = Bun.spawnSync(["git", ...args]);
  return result.exitCode === 0 ? result.stdout : null;
}

function stagedPaths(): string[] {
  const output = git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z");
  return output ? output.toString().split("\0").filter(Boolean) : [];
}

/** Paths flagged `linguist-generated` or `linguist-vendored` in the index's .gitattributes. */
function markedAsNotAuthored(paths: string[]): Set<string> {
  const marked = new Set<string>();
  if (paths.length === 0) return marked;

  const output = git("check-attr", "--cached", "-z", "linguist-generated", "linguist-vendored", "--", ...paths);
  const fields = output ? output.toString().split("\0") : [];
  for (let i = 0; i + 2 < fields.length; i += 3) {
    if (fields[i + 2] === "set" || fields[i + 2] === "true") marked.add(fields[i]);
  }
  return marked;
}

function findOversized(): Oversized[] {
  const candidates = stagedPaths().filter((path) => !IGNORED_PATHS.some((pattern) => pattern.test(path)));
  const notAuthored = markedAsNotAuthored(candidates);
  const oversized: Oversized[] = [];

  for (const path of candidates) {
    if (notAuthored.has(path)) continue;

    const blob = git("cat-file", "blob", `:${path}`);
    if (!blob || blob.subarray(0, BINARY_SNIFF_BYTES).includes(0)) continue;

    const tokens = Math.ceil(blob.byteLength / BYTES_PER_TOKEN);
    if (tokens > MAX_TOKENS) oversized.push({ path, tokens });
  }
  return oversized;
}

function errorMessage(files: Oversized[]): string {
  const list = files.map(({ path, tokens }) => `  ${path}  (~${tokens} tokens)`).join("\n");

  return `✖ Commit rejected: staged file(s) over ${MAX_TOKENS} tokens (estimated as bytes / 4):

${list}

Large files cost more to read and edit. Split each one:

  1. Read the file and list its distinct responsibilities: groups of functions, types, constants,
     components, tests or doc sections that change for the same reason.
  2. Create one new file per responsibility next to the original, named for what it contains
     (user-validation.ts, not part2.ts or utils.ts).
  3. Move each group into its new file and add the imports and exports it needs.
  4. If other code imports the original path, keep the original as a thin entry point that only
     re-exports from the new files, so those imports keep working.
  5. Aim for every resulting file to be well under ${MAX_TOKENS} tokens, ideally around ${Math.round(MAX_TOKENS * 0.6)}.
  6. Run the project's checks, then \`git add\` the original and all new files and commit again.

How to split by file type:

  - Code: by responsibility or feature, with one component, class or primary export per file.
  - Tests: one test file per unit under test.
  - Markdown and docs: one file per top-level heading, linked from a short index file.
  - JSON, YAML and data: one file per entity or section.

If a file is not authored by hand (codegen, vendored code), do not split it. Mark it in
.gitattributes instead, for example: \`path/to/file linguist-generated\`

Do not bypass this check with --no-verify.`;
}

const oversized = findOversized();
if (oversized.length > 0) {
  console.error(errorMessage(oversized));
  process.exit(1);
}
