# Phase 5: parallel build

**Goal:** build v1 with many agents at once, each on an independent ticket.

**Depends on:** 2b, 3 and 4 all complete.

## From scope to tickets

1. `/to-spec` turns the frozen scope and the Contract into specs, published to GitHub Issues with the `ready-for-agent` label. Seams are agreed with the Owner first.
2. `/to-tickets` cuts them into tickets with blocking edges.

Slicing, because the apps must not block each other:

- Per Content type, tickets are **per app**: one for the API, one for the CMS screen, one for the Portfolio page.
- Each is demoable on its own, against Contract fixtures.
- All three are blocked only by that type's **Contract ticket**.
- A final **integration ticket** per Content type wires the real API into both apps.
- Order Contract tickets so that a type other types reference comes first.
- A wide mechanical change is sequenced expand-contract, not forced into one slice.

Every ticket has: a Conventional Commits title (`feat(cms): ...`), the type for its branch, the seams it is tested at, acceptance criteria in the glossary's vocabulary, and its blocking edges.

## Definition of done

- Built test-first with `/tdd` at the agreed seam.
- `bun run lint` and the full test suite pass.
- `/code-review` run, findings addressed.
- PR created with `/pr` (Summary, Evidence, Merge Danger) and linked to the issue.
- Rebased onto `main` and merged by the Owner.

Conflict rules and the loop itself are in [03-agent-workflow.md](03-agent-workflow.md).

## Test seams

| App | Seam | Catches | Misses |
| --- | --- | --- | --- |
| API | HTTP, via Fastify `inject`, real Postgres test database, no mocked repositories | wiring, validation, auth, SQL | pure unit edge cases (add a seam only when a rule is complex enough) |
| CMS | Route level, Vitest + Testing Library, API replaced by MSW serving Contract fixtures | what the Owner sees and does, form validation, publish flow | visual regressions |
| Portfolio | Page level, per Locale, Vitest with Astro container rendering, MSW fixtures | rendered output per Locale | visual regressions |
| All | A small Playwright suite across the real API, Portfolio and CMS, as one late ticket | integration | exhaustive cases |

No unit tests of individual components.

## Invariants

Back-end (the API enforces; the Contract describes):

- Content is Published only when complete in every Locale.
- Public endpoints return only Published Content.
- Owner endpoints require a session; there is no public sign-up.
- Further rules (slug uniqueness, deletion of referenced Content, Media alt text) are provisional until phase 4.

Front-end (rules for both apps):

1. UI is imported only from `packages/ui`.
2. Forms validate with the Contract's Zod schemas and never redefine them.
3. The API is called only through the Contract's typed client.
4. The Portfolio renders Published Content only, takes Content text only from the API, and sets hardcoded strings through i18next.
5. Every Portfolio route is locale-prefixed.
6. CMS strings are plain English constants.

## Exit criteria

- [ ] Every v1 ticket is closed.
- [ ] The Playwright integration suite passes locally.
- [ ] The Owner can create, publish and view Content in both Locales end to end on a local machine.
