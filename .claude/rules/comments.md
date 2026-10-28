# Comments

Don't bloat files with comments. Code should explain itself through clear names and structure.

- Write no comment that restates what the code does, narrates a change ("added", "now", "fixed"), or marks a section of a file.
- When something needs documenting (a module, function, class, type or exported constant), use a JSDoc block (`/** ... */`): what it is for, and `@param`, `@returns`, `@throws` when they add information. In TypeScript, don't repeat types in JSDoc.
- Use an inline comment (`//`) only when necessary: to explain a non-obvious why, such as a workaround, a hidden constraint or surprising behavior. Never to explain what.
- Never commit commented-out code; delete it, git keeps the history.
- Keep every comment short and accurate; update or delete it when the code changes.
- The same spirit applies to shell scripts, YAML and config files: only comments that earn their place.
