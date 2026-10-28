# Chip

Code: `packages/ui/src/components/chip/chip.css`.

## Purpose

A short, non-interactive label that stands out from the text around it: the period of the current role in the work band ("2024 — Present"). Not clickable and not a status indicator: Draft and Published use the CMS [status badge](status-badge.md).

## Anatomy

A small rounded rectangle with a label and an optional leading [icon](icon.md).

## Variants

| Variant | `data-variant` | Use |
| --- | --- | --- |
| Inverse | (none) | Emphasis: the current role's period |
| Outline | `outline` | A quieter label beside an inverse one |

Inside an inverted region (the work band), the chip inverts with it: black on the white band in dark theme, white on the black band in light theme.

## States

Static: no hover, focus, active, disabled or loading. In a loading region it's replaced by a `line` [skeleton](skeleton.md) the width of a period.

## Accessibility

- A `<span>`; its text is read in place. Never the only way the current role is identified: it's also listed first and its period ends with "Present".
- Tabular numerals keep periods aligned across entries.

## Content rules

One short phrase, one line: a period ("2022 — 2024", "2024 — Atual") or a single word. Periods are formatted with `Intl` ([i18n](../foundations/i18n.md#dates-and-numbers)).

## Tokens

`--color-surface-inverse`, `--color-text-inverse`, `--color-border-control`, `--color-text`, `--radius-chip`, `--border-width-control`, `--space-inset-xs|sm`, `--size-icon-sm`, `--text-label`.

## Markup

```html
<span class="ui-chip">2024 — Present</span>
```
