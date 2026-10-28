# API stack: Fastify, Drizzle, PostgreSQL, Better Auth and Zod on Bun

The API is TypeScript on Bun with Fastify, Zod for validation, OpenAPI generated for documentation, Drizzle as the data layer, Better Auth for the Owner's login, and PostgreSQL run through Docker. We considered SQLite (libSQL) because a file per worktree isolates parallel agents for free; we chose PostgreSQL to match the production target and accepted the cost of isolating databases per worktree.
