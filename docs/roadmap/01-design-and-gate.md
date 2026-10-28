# Phase 1: design and the gate

**Goal:** produce the approved visual design and, from it, the v1 scope and the CSS framework decision.

**Depends on:** 2a (Impeccable is code-first: it builds real surfaces in a runnable web project).

**Driver:** the Owner, interactively. Impeccable's comp rounds need the Owner's approval, so this phase is not parallel and not delegated.

## Inputs to give Impeccable

Only what is already known: a portfolio for a software engineer; bilingual (`en`, `pt-BR`); the CMS is English and quiet; Content comes from an API (fixtures during design); v1 stays minimal; Project list and detail are out of v1. Everything else is captured by Impeccable's own interview, not by us.

## Work

1. `init`: Impeccable writes `PRODUCT.md` at the repo root (audience, tone, brand).
2. `new-work` per surface the Owner wants for v1: Impeccable renders three comps under `.impeccable/mocks/`, the Owner approves one, then it builds the surface in code.
3. Surfaces are built with plain CSS. Shared components go in `packages/ui` and both apps import from it.
4. `critique`, `polish`, and `audit` as needed.
5. `document`: writes `DESIGN.md` at the root and `.impeccable/design.json`.

One design system covers both apps: one `PRODUCT.md`, one `DESIGN.md`. The Portfolio carries the expressive identity; the CMS is a utilitarian surface on the same tokens, with its own surface brief.

## The gate

When the design is approved, two decisions are made before anything else starts:

1. **CSS framework.** Based on the component inventory the design produced. Candidates from the research: Tailwind v4 alone, Tailwind v4 + shadcn/ui (copy-in code, documented monorepo flow, but React-only so hydrated components add JS to the Portfolio; its default primitive library needs checking), or staying on plain CSS. DaisyUI and Material UI fight a bespoke design. Record the result as an ADR. If the choice is not plain CSS, migrating the design's CSS is its own ticket.
2. **v1 scope freeze.** Write `docs/roadmap/v1-scope.md`: the surfaces, the components, and the Content each surface needs. Anything the design does not use goes to [backlog.md](backlog.md).

## Outputs

`PRODUCT.md`, `DESIGN.md`, `.impeccable/` (sidecar, mocks, config), shared components in `packages/ui`, the CSS-framework ADR, `docs/roadmap/v1-scope.md`.

## Exit criteria

- [ ] Every v1 surface has an approved comp and a built implementation.
- [ ] `DESIGN.md` and its sidecar are written.
- [ ] The CSS framework ADR is merged.
- [ ] `v1-scope.md` is merged, and the backlog lists everything left out.
