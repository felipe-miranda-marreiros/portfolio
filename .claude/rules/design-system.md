# Design system

One design system covers the Portfolio and the CMS. These rules bind every design task, including Impeccable runs, and override a tool's default flow where they conflict. The Phase 1 build order and documentation layout are in `docs/design/impeccable-brief.md`.

## What it must contain

### Foundations

- Design principles: 3 to 5, each one a trade-off it settles.
- The mode of each surface (the Portfolio is expressive, the CMS is quiet and utilitarian), and what changes between them (density, expression, motion) while the tokens stay shared.
- Accessibility: WCAG 2.2 AA, visible focus everywhere, 24px minimum targets (44px on touch), `prefers-reduced-motion` honored, no information carried by color alone.
- i18n: layouts take `pt-BR` text running about 30% longer than `en` with no truncation or overflow; no text in images; dates and numbers formatted per locale.
- Themes: light and dark, both first-class. Semantic tokens carry both themes. Both apps open in dark whatever the system preference; an explicit choice of light overrides it and is remembered.

### Tokens

Three tiers, and nothing skips a tier:

- **Primitive**: raw values (`--color-sand-100`, `--space-4`). Never used directly by components.
- **Semantic**: what a value is for (`--color-text-muted`, `--color-surface-raised`, `--space-stack-md`). Themes swap these.
- **Component**: optional, only when a component needs its own knob (`--button-height-md`).

Required categories:

- **Color**: palette ramps; semantic roles for background, surface levels, text (primary, muted, inverse), border, accent, focus ring, and status (success, warning, danger, info); interaction states (hover, active, selected, disabled). Every text/background pair is checked for contrast in both themes and the ratio recorded.
- **Typography**: families with fallbacks and a loading strategy (self-hosted, `font-display`, subsets with `pt-BR` glyphs); a fluid type scale with its ratio; weights; line heights; letter spacing; reading measure; roles (display, headline, title, body, label, code).
- **Spacing**: a base unit and scale; separate tokens for component insets, stacks and layout gaps.
- **Sizing**: control heights, icon sizes, minimum targets, container widths.
- **Radius**: a scale, and which component uses which step.
- **Border**: widths and styles.
- **Elevation**: a shadow scale (or a declared flat model with tonal layers) that works in both themes, plus a z-index scale for layers (base, sticky, dropdown, overlay, modal, toast).
- **Motion**: durations, easings, and the reduced-motion rule.
- **Layout**: breakpoints, grid, containers.
- **Opacity**: disabled, overlays, scrims.

Tokens are plain CSS custom properties. Naming is one convention for all categories, written down once.

### Components

Start from the smallest inventory v1 needs; anything not in v1 goes to `docs/roadmap/backlog.md`. For each component, document:

- Purpose, and when not to use it.
- Anatomy: its named parts.
- Variants and sizes.
- States: default, hover, focus-visible, active, disabled, loading, error, empty, selected (those that apply), and its skeleton, in both themes.
- Accessibility: semantic element and role, keyboard behavior, ARIA, focus order.
- Content rules: label length, wrapping, behavior with longer `pt-BR` text.
- The tokens it uses. Components contain no raw values: no hex, px or ms literals outside token files.

### Skeleton loading

Skeletons are part of the design system, not decoration added per page.

- **Primitives**: a text line, a block and a circle, built from skeleton tokens (base color, highlight color, radius, animation duration) defined for both themes.
- **One skeleton per data-driven component**, with the same box size as the loaded component, so swapping it in causes no layout shift.
- **When to use it**: a skeleton for content whose layout is known; a spinner or inline progress only for actions (submitting, saving); nothing for loads under about 200ms (delay showing it).
- **Motion**: a subtle shimmer or pulse; under `prefers-reduced-motion` a static block.
- **Accessibility**: the loading region gets `aria-busy="true"`, skeleton shapes are `aria-hidden`, and a polite live region announces the loading and the loaded state once each.
- Shown on the component gallery next to each component's loaded state.

### Patterns

Loading (skeleton, progress, optimistic updates), empty states, error states (inline, page, retry), forms (labels, help, validation timing, error summary), theme switching and language switching.

## What it cannot be

- A page or a mood board. Pages consume the system; they don't define it.
- Components without tokens, or tokens without a semantic role.
- One-off values or per-page overrides. A missing value means a missing token: add it to the system, then use it.
- Invented tokens nothing uses, or unused scale steps kept "just in case".
- Coupled to a CSS framework. The framework is decided after the design.
- Documentation without code, or code without documentation. Every token and component exists in `packages/ui` and in the docs.
- Visual-only. Accessibility, i18n, both themes and loading states are required at the component level, not left for a later pass.
