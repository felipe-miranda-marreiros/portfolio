# Segmented switch

Code: `packages/ui/src/components/segmented/segmented.css`.

## Purpose

Chooses one of two or three options that are always visible: the theme (dark, light) and the Locale (EN, PT). Not for more than three options, and not for options that need a description: use radio buttons in a form for those.

## Anatomy

- **Track**: the pill with a decorative outline (`.ui-segmented`).
- **Segments**: two or three buttons or links, each a short label or an [icon](icon.md).
- **Selected segment**: inverse fill.

## Variants

| Use | Segments | Selected state | Why |
| --- | --- | --- | --- |
| Theme | `<button>` with icon and `aria-label` | `aria-pressed="true"` | Changes a setting on this page |
| Locale | `<a href>` to the same page in the other Locale, with `lang` and `aria-label` in its own language | `aria-current="true"` | Goes to another URL (`/en` ↔ `/pt-br`) |

One size: 32px segments on pointer layouts, 44px on coarse pointers.

## States

| State | Trigger | Look |
| --- | --- | --- |
| Default | | Muted label on the track |
| Hover | `:hover` | `--color-surface-hover`, label turns primary |
| Active | `:active` | `--color-surface-active` |
| Selected | `aria-pressed="true"` or `aria-current` | `--color-surface-selected` fill, `--color-text-selected` label |
| Focus | `:focus-visible` | 2px outline in `--color-focus` around the segment |
| Disabled | `disabled` | `--opacity-disabled` (not used in v1) |

Loading, error, empty and skeleton don't apply: both switches render with the page from known values.

## Accessibility

- Theme: a `role="group"` with `aria-label="Theme"`; each button has `aria-label` ("Dark theme", "Light theme") and `aria-pressed`.
- Locale: a `<nav aria-label="Language">`; each link has `lang`, an accessible name in its own language ("English", "Português") and `aria-current` on the current one.
- Tab moves between segments (they are separate buttons and links, not a roving radio group), so each is reachable and named on its own.
- Selection never relies on colour alone: the selected segment inverts fill and label.

## Content rules

Labels are two-letter codes or icons only, so `pt-BR` never lengthens them; the full names live in the accessible names.

## Tokens

`--color-border`, `--color-text-muted`, `--color-text`, `--color-surface-hover`, `--color-surface-active`, `--color-surface-selected`, `--color-text-selected`, `--color-focus`, `--size-control-sm`, `--size-control-md`, `--size-target-touch`, `--size-icon-sm`, `--space-1`, `--space-inset-sm`, `--radius-action`, `--border-width-divider`, `--text-label`, `--opacity-disabled`, `--duration-quick`, `--ease-out`.

## Markup

```html
<div class="ui-segmented" role="group" aria-label="Theme">
  <button type="button" aria-pressed="true" aria-label="Dark theme"><span class="ui-icon" aria-hidden="true"><!-- moon --></span></button>
  <button type="button" aria-pressed="false" aria-label="Light theme"><span class="ui-icon" aria-hidden="true"><!-- sun --></span></button>
</div>

<nav class="ui-segmented" aria-label="Language">
  <a href="/en" lang="en" aria-label="English" aria-current="true">EN</a>
  <a href="/pt-br" lang="pt-BR" aria-label="Português">PT</a>
</nav>
```
