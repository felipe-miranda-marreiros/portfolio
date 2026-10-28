# Impeccable brief: design system first

Pinned constraints for every Impeccable run in Phase 1. They override Impeccable's default flow where they conflict. What the design system must contain and cannot be is in `.claude/rules/design-system.md`.

## Context

- A portfolio for a software engineer. Two surfaces share one design system: the Portfolio (public, bilingual `en` and `pt-BR`, Experience mode) and the CMS (Owner only, English, Operate mode, quiet and utilitarian on the same tokens).
- Light and dark themes, both first-class.
- Content comes from an API; use fixtures during design. v1 stays minimal; Project list and detail are out of v1.
- Shared UI lives in `packages/ui`. Plain CSS for now: the CSS framework is decided after the design, so nothing may depend on one.

## Build order and gates

Work moves bottom-up. Each step ends with my approval before the next starts. A step never consumes something the step below hasn't defined.

1. **Foundations**: principles, the mode of each surface, accessibility target, i18n rules, how the two themes relate.
2. **Tokens**: every category in the rule, as CSS custom properties in `packages/ui`, plus a specimen page that renders them in both themes.
3. **Components**: propose the v1 inventory and wait for approval, then build each one only from tokens, shown in all its states (skeleton included) and both themes on a component gallery page.
4. **Patterns**: loading, empty, error, forms, theme and language switching, composed from components.
5. **Pages**: only now, composed from components and patterns.

Direction comps under `.impeccable/mocks/` may come before step 1, to choose the visual world. They are references, not deliverables: no product page is built in code before step 5. The specimen and gallery pages are the only pages allowed before then, and they are dev tools, not product surfaces.

## Documentation layout

Impeccable's output goes into small files, one subject each. Every file stays under 5,000 tokens (a pre-commit hook rejects larger files); aim for under 300 lines.

- `DESIGN.md` at the root stays the file Impeccable reads: the token frontmatter, plus a short paragraph per canonical section that links to the detail files. No long prose here.
- `docs/design/README.md`: the index and the naming convention.
- `docs/design/foundations/`: `principles.md`, `accessibility.md`, `i18n.md`, `themes.md`.
- `docs/design/tokens/`: one file per category (`color.md`, `typography.md`, `spacing.md`, `sizing.md`, `radius.md`, `border.md`, `elevation.md`, `motion.md`, `layout.md`, `opacity.md`).
- `docs/design/components/`: one file per component, all with the same headings (from the rule's "Components" section).
- `docs/design/patterns/`: `loading.md` (skeletons), `empty.md`, `error.md`, `forms.md`, `theme-switcher.md`, `language-switcher.md`.
- Code mirrors the docs: `packages/ui/src/tokens/<category>.css`, `packages/ui/src/components/<name>/`.

Write in English; only localized sample copy is in `pt-BR`. When a step changes a decision, update the file that owns it instead of repeating it elsewhere.
