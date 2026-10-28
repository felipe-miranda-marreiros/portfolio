# Status badge

Code: `packages/ui/src/components/status/status.css`. CMS.

## Purpose

Shows whether a piece of Content is a Draft or Published ([glossary](../../../GLOSSARY.md)). Used in the [content list](content-list.md) and on edit pages. Not for other labels: that's the [chip](chip.md).

## Anatomy

A small rounded label with an optional leading icon and the status word.

## Variants

| `data-status` | Look | Why |
| --- | --- | --- |
| `draft` | Dashed outline, muted text "Draft" | Dashed means unfinished, everywhere in the system |
| `published` | Solid inverse fill, check icon, "Published" | The strongest monochrome signal for "live" |

Draft and Published differ by outline style, fill, icon and word, so the status never depends on colour.

## States

Static and not interactive. In a loading list it's a short `line` [skeleton](skeleton.md).

## Accessibility

- The word is the content; the icon is `aria-hidden`.
- In a table the column header says "Status", so the badge needs no extra label.

## Content rules

Exactly "Draft" or "Published", matching the glossary.

## Tokens

`--color-border-control`, `--color-text-muted`, `--color-surface-inverse`, `--color-text-inverse`, `--border-width-control`, `--border-style-draft|default`, `--radius-chip`, `--space-inset-xs|sm`, `--size-icon-sm`, `--text-label`.

## Markup

```html
<span class="ui-status" data-status="draft">Draft</span>
<span class="ui-status" data-status="published"><span class="ui-icon" aria-hidden="true"><!-- check --></span><span>Published</span></span>
```
