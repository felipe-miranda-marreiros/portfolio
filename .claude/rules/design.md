# Design

Frontend design work uses the `impeccable` skill (`.claude/skills/impeccable/`), with product context in `PRODUCT.md`.

## Components before Pages

- Build the design system and its components first; compose Pages only from components that already exist.
- Never build a Page, or a Section of one, before the components it needs exist. A Page that needs a missing component
  waits for that component's PR.
- A component takes every visual value from design tokens, never from hardcoded values, so About me's Visual language
  can restyle the shared navigation, language toggle and Footer through tokens alone.
- A component renders Content it is given and holds no visible text of its own (see `PRODUCT.md`).

## Workflow

Work happens on a component catalog, a style guide page that every Impeccable command targets until Pages exist. Each
step lands in its own PRs.

1. **Design system.** `/impeccable document --seed` sets the Portfolio's Visual language with the catalog as the first
   surface. Then build the tokens (color, typography, spacing, radii, shadows, motion, and the state tokens: focus
   ring, disabled, error) and refine them with `typeset`, `colorize` and `layout`. Run `document` in scan mode to write
   the real tokens into `DESIGN.md`. Repeat for About me's Visual language as a second token set over the same
   components.
2. **Components.** Build one component per PR on the catalog (buttons, inputs, lists, forms, errors), each complete with
   every state it has: default, hover, focus, active, disabled, and loading, error or success where they apply. A
   component without its states is not done. Review with `critique` and `audit`; use `generate` or `live` for variants
   once the catalog runs.
3. **States pass.** Across the whole catalog: `polish` for missing or inconsistent states, `harden` for long content,
   missing content and both languages, `animate` for state transitions, `colorize` for state contrast, and `audit` for
   WCAG 2.2 AA.
4. **Pages.** Compose Pages from the catalog's components. `extract` applies only from here on.

Components with behavior, such as the language toggle, follow `tdd.md`.
