# Icon

Code: `packages/ui/src/components/icon/icon.css`. Source: [Lucide](https://lucide.dev) via `lucide-static` (ISC licence; the licence ships in the package and in every SVG's header comment).

## Purpose

A small pictogram that supports a label: the download arrow in Download CV, the sun and moon in the theme switch, the spinner, and the status icons in CMS messages. Never the only carrier of meaning, and never a Unicode glyph or emoji standing in for an icon.

## Anatomy

`<span class="ui-icon" aria-hidden="true">` wrapping the Lucide SVG unchanged: 24×24 viewBox, 2px stroke, round caps and joins, `currentColor`. One library, one stroke weight, everywhere.

## Sizes

| `data-size` | Size | Use |
| --- | --- | --- |
| (default) | `--size-icon-sm` (16px) | Inside buttons, switches, chips |
| `md` | `--size-icon-md` (20px) | Standalone, in messages and toasts |

## States

An icon has none of its own: it takes its colour from the text around it, so it follows the hover, disabled and theme states of its parent.

## Accessibility

Always `aria-hidden="true"`. The meaning lives in the parent's label: visible text, or `aria-label` on an icon-only button.

## Content rules

v1 uses: `download`, `sun`, `moon`, `loader-circle`; and for the CMS `check`, `circle-check`, `circle-alert`, `triangle-alert`, `info`, `x`, `upload`, `image`, `user`, `briefcase`, `list`, `plus`, `pencil`, `trash-2`, `external-link`, `log-out`. The checkbox inlines `check` as a CSS mask. Add an icon here before using it.

## Tokens

`--size-icon-sm`, `--size-icon-md`.

## Markup

```html
<span class="ui-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><!-- lucide download --></svg></span>
```
