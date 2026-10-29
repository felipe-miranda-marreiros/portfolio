# Design system

One design system for the Portfolio and the CMS. What it must contain is set by `.claude/rules/design-system.md`; the build order and gates by [impeccable-brief.md](impeccable-brief.md). The chosen visual direction (monochrome "Voz") is recorded in the Portfolio home surface brief, `apps/portfolio/.impeccable/surfaces/`. `DESIGN.md` at the repo root is written last, from the built system.

## Index

| Step | Files | Status |
| --- | --- | --- |
| 1 Foundations | [principles](foundations/principles.md), [accessibility](foundations/accessibility.md), [i18n](foundations/i18n.md), [themes](foundations/themes.md) | Approved |
| 2 Tokens | [color](tokens/color.md), [typography](tokens/typography.md), [spacing](tokens/spacing.md), [sizing](tokens/sizing.md), [radius](tokens/radius.md), [border](tokens/border.md), [elevation](tokens/elevation.md), [motion](tokens/motion.md), [layout](tokens/layout.md), [opacity](tokens/opacity.md); specimen at `packages/ui/specimen` (`bun run dev:ui`, http://localhost:5174) | Approved |
| 3 Components | Shared: [button](components/button.md), [link](components/link.md), [segmented switch](components/segmented.md), [chip](components/chip.md), [avatar](components/avatar.md), [skip link](components/skip-link.md), [skeleton](components/skeleton.md), [visually hidden](components/visually-hidden.md), [icon](components/icon.md). Portfolio: [site header](components/site-header.md), [introduction](components/intro.md), [experience entry](components/entry.md), [work band](components/work-band.md), [site footer](components/site-footer.md). CMS: [app shell](components/app-shell.md), [breadcrumb](components/breadcrumb.md), [section overview](components/overview.md), [text field and text area](components/field.md), [locale field pair](components/locale-pair.md), [date field](components/date-field.md), [checkbox](components/checkbox.md), [image upload](components/upload.md), [status badge](components/status.md), [content list](components/content-list.md), [dialog](components/dialog.md), [toast](components/toast.md), [inline message](components/message.md), [form error summary](components/error-summary.md). Gallery at `/gallery/` (`bun run dev:ui`) | Approved |
| 4 Patterns | [loading](patterns/loading.md), [empty](patterns/empty.md), [error](patterns/error.md), [forms](patterns/forms.md), [theme switching](patterns/theme-switcher.md) (code: `packages/ui/src/theme/`), [language switching](patterns/language-switcher.md). Working demos at `/patterns/` (`bun run dev:ui`) | Awaiting approval |
| 5 Pages | Portfolio home: `apps/portfolio/src/pages/[locale]/index.astro` (`bun run dev:portfolio`), on fixtures in `apps/portfolio/src/fixtures/`. CMS: sign in, Experience list and editor, Profile, Skills in `apps/cms/src/routes/` (`bun run dev:cms`), on an in-memory API in `apps/cms/src/api/`; add `?slow`, `?fail` or `?empty` to review states | In progress |

When a later step changes a decision, update the file that owns it instead of restating it.

## Token naming

Tokens are plain CSS custom properties, in three tiers. Nothing skips a tier: components use semantic or component tokens, semantic tokens use primitives, and only primitives hold raw values.

```
--{category}-{name}[-{variant}][-{state}]     primitive and semantic
--{component}-{property}[-{variant}][-{state}] component
```

- **Category** is one of: `color`, `font`, `text`, `space`, `size`, `radius`, `border`, `shadow`, `z`, `duration`, `ease`, `opacity`, `breakpoint`, `layout`. Breakpoints are documented as tokens but used as literal media queries, because custom properties don't work inside `@media`.
- **Single-tier scales.** Layers (`--z-*`), opacities, breakpoints and the grid column count are named scales with nothing to alias, so they hold their values directly.
- **Primitives** name the raw value on a scale: `--color-gray-950`, `--space-4`, `--radius-2`, `--duration-200`.
- **Semantic tokens** name the job: `--color-text-muted`, `--color-surface-raised`, `--color-surface-inverse`, `--space-stack-md`, `--space-inset-sm`, `--radius-control`, `--duration-quick`. Themes redefine semantic tokens only.
- **Component tokens** exist only when a component needs its own knob, and are named after the component: `--button-height-md`, `--chip-padding-inline`.
- **Variants** use t-shirt steps (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`) or a role name (`inverse`, `raised`). **States** come last: `-hover`, `-active`, `-selected`, `-disabled`.
- Names are lowercase kebab-case, in English, and say what a value is for, never what it looks like: `--color-text-muted`, not `--color-light-gray`.

## Code layout

- Tokens: `packages/ui/src/tokens/<category>.css`, mirrored by `docs/design/tokens/<category>.md`.
- Components: `packages/ui/src/components/<name>/`, mirrored by `docs/design/components/<name>.md`.
- Every file stays under the 5,000-token pre-commit limit; aim for under 300 lines.
