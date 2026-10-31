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

Work happens on the prototype (see Prototype), which every Impeccable command targets. Each step lands in its own PRs.

1. **Design system.** `/impeccable document --seed` sets the Portfolio's Visual language with the prototype as the
   first surface. Then build the tokens (color, typography, spacing, radii, shadows, motion, and the state tokens: focus
   ring, disabled, error) and refine them with `typeset`, `colorize` and `layout`. Run `document` in scan mode to write
   the real tokens into `DESIGN.md`. Repeat for About me's Visual language as a second token set over the same
   components.
2. **Components.** Build one component per PR in the prototype (buttons, inputs, lists, forms, errors), each complete
   with every state it has: default, hover, focus, active, disabled, and loading, error or success where they apply. A
   component without its states is not done. Review with `critique` and `audit`; use `generate` or `live` for variants
   once the prototype runs.
3. **States pass.** Across the whole prototype: `polish` for missing or inconsistent states, `harden` for long content,
   missing content and both languages, `animate` for state transitions, `colorize` for state contrast, and `audit` for
   WCAG 2.2 AA.
4. **Pages.** Compose prototype Pages from the prototype's components. `extract` applies only from here on.

## Prototype

The prototype is the design phase's reference, not the final front end: the place where the design system, the
components and their states are built and consulted. The final front end is built later, on the stack the ADRs choose,
following the prototype.

- It is HTML, CSS and JavaScript, with no framework and no build step.
- Its code is not production code: the final front end reimplements it rather than reusing it, so `tdd.md` doesn't apply
  to it. Its commits use the `docs(prototype)` type and scope.
- It is split by folder so no file grows large:

```
prototype/
├── index.html          # links to every token and component page
├── tokens.css          # @imports every file in tokens/
├── tokens/             # one CSS file per token group (color.css, typography.css, spacing.css, ...)
└── components/
    └── button/
        ├── button.css  # the component's styles, from tokens only
        ├── button.js   # only when the component has behavior
        └── index.html  # the component in every state
```

- One folder per component, with its own files and its own prototype page; never put several components in one file.
- Each page links only the files it needs: `tokens.css` and its components' files.
- Prototype pages may hold placeholder text to show a component; components themselves still hold none.

## Impeccable artifacts

Impeccable keeps its work in the repository, and these files are committed with the PR that produces them:

| File | Written by | Holds |
| --- | --- | --- |
| `PRODUCT.md` | `init` | Product context |
| `DESIGN.md` | `document`, the documenter subagent | Token primitives and how to apply them |
| `.impeccable/design.json` | `document` | Shadows, motion, focus rings and other tokens `DESIGN.md` can't hold |
| `.impeccable/surfaces/<slug>.md` | `new-work`, `shape` | Each surface's brief and direction contract |
| `.impeccable/critique/` | `critique` | Critique snapshots, which `polish` reads as its backlog |
| `.impeccable/config.json` | `init`, `hooks` | Shared settings: hook, detector ignores, build path |

- Briefs, snapshots and the seed are keyed by the target's path. `prototype/index.html` is the primary target from the
  first `document --seed`, with component pages as related targets; moving it orphans its brief.
- The CSS in `prototype/tokens/` is the source of truth. `DESIGN.md` and `.impeccable/design.json` are generated from
  it with `/impeccable document`, never edited by hand.
- A direction contract stays in its brief. Never copy it into the prototype, not even as an HTML comment or a `data-*`
  attribute.
- Per-developer and working state (`config.local.json`, the hook cache, `live/`, `review/`, `build/`, `mocks/`,
  `questions/`) is not committed; `.gitignore` lists it.
- `DESIGN.md` and `.impeccable/**` are marked `linguist-generated` in `.gitattributes`, so the file size hook skips
  them: they are tool output that can't be split.
