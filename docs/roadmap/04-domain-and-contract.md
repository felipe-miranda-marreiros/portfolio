# Phase 4: domain model and Contract

**Goal:** turn the frozen v1 scope into the domain language, the invariants and the Contract that every app builds against.

**Depends on:** the gate in phase 1. **Parallel with:** 2b.

**Driver:** the Owner, interactively, with `grill-with-docs`.

## Work

1. **Domain modeling session** from `v1-scope.md`: decide which Content types exist, their fields and relationships. Resolve each term into `GLOSSARY.md` as it settles and write ADRs sparingly (hard to reverse, surprising, a real trade-off).
2. **Confirm or drop the provisional candidates** listed in the overview (Markdown, slugs, Skills as reusable references, ordering, Media and alt text).
3. **Write down the invariants** for the API and for the front-ends (starting points in [05-parallel-build.md](05-parallel-build.md)).
4. **Define the Contract** in `packages/contracts`:
   - Zod schemas are the single source of truth: Content shapes, invariants, operation inputs and outputs.
   - The API derives its OpenAPI document from them through Fastify's Zod integration. OpenAPI is documentation; no client is generated from it.
   - Typed fixture builders feed the front-end tests.
   - A small typed fetch client, built on the same schemas, is the only way the apps call the API.
5. **Confirm the test seams** for each app with the Owner before any test is written.

## Outputs

An updated `GLOSSARY.md`, new ADRs, `packages/contracts` (schemas, fixture builders, typed client), and the invariants as rules.

## Exit criteria

- [ ] Every term used by `v1-scope.md` is in the glossary.
- [ ] The Contract compiles, and every v1 operation is described by a schema.
- [ ] Fixture builders exist for every Content type in v1.
- [ ] The seams are confirmed.
