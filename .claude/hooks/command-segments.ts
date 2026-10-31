/**
 * Splits a shell command into the segments that run as commands, for PreToolUse hooks that deny some of them.
 * Quoted text with spaces or separators is blanked so a body that mentions a denied command doesn't trigger it;
 * single-token quotes (an endpoint, `'state=closed'`) are unwrapped so they still count.
 * @returns the trimmed segments, split at `;`, `&`, `|`, newlines, parentheses and `$(`
 */
export function commandSegments(command: string): string[] {
  const unquoted = command.replace(/"((?:\\.|[^"\\])*)"|'([^']*)'/g, (_match, double, single) => {
    const inner: string = double ?? single;
    return /[\s;&|()]/.test(inner) ? '""' : inner;
  });
  return unquoted.split(/\$\(|[;&|\n()]/).map((segment) => segment.trim());
}
