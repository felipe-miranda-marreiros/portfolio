# Colour

Code: `packages/ui/src/tokens/color.css`. Strict monochrome ([principle 3](../foundations/principles.md#3-contrast-not-colour)): one neutral grey ramp carries everything; four status hues exist only for functional states. Dark is the default; `data-theme="light"` on any element swaps the semantic tokens below it.

## Primitives

| Token | Value | | Token | Value |
| --- | --- | --- | --- | --- |
| `--color-gray-0` | `#ffffff` | | `--color-gray-600` | `#5f5f5f` |
| `--color-gray-50` | `#f6f6f6` | | `--color-gray-800` | `#2a2a2a` |
| `--color-gray-100` | `#ececec` | | `--color-gray-850` | `#1f1f1f` |
| `--color-gray-200` | `#dedede` | | `--color-gray-900` | `#181818` |
| `--color-gray-400` | `#b3b3b3` | | `--color-gray-950` | `#121212` |
| `--color-gray-500` | `#858585` | | | |

Status hues, a light step for dark theme and a deep step for light theme: `--color-red-300` `#ff8080` / `--color-red-700` `#c0262d`, `--color-green-300` `#5ccf8a` / `--color-green-700` `#1f7a45`, `--color-amber-300` `#f5b83d` / `--color-amber-700` `#8a5a00`, `--color-blue-300` `#6ea8ff` / `--color-blue-700` `#1f5fbf`.

## Semantic roles

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--color-bg` | gray-950 | gray-50 | Page ground |
| `--color-surface-raised` | gray-900 | gray-0 | Panels, inputs, menus |
| `--color-surface-hover` | gray-850 | gray-100 | Hover on rows, items, ghost controls |
| `--color-surface-active` | gray-800 | gray-200 | Pressed state |
| `--color-surface-inverse` | gray-0 | gray-950 | The inverted band, chips, selection |
| `--color-surface-selected` | = inverse | = inverse | Selected item (CMS navigation, options) |
| `--color-text` | gray-0 | gray-950 | Primary text, icons |
| `--color-text-muted` | gray-400 | gray-600 | Secondary text |
| `--color-text-inverse` | gray-950 | gray-0 | Text on inverse surfaces |
| `--color-text-inverse-muted` | gray-600 | gray-400 | Secondary text on inverse surfaces |
| `--color-text-selected` | = text-inverse | = text-inverse | Text on a selected item |
| `--color-border` | gray-800 | gray-200 | Decorative dividers only |
| `--color-border-control` | gray-500 | gray-500 | Borders that identify a control |
| `--color-focus` | = text | = text | Focus outline |
| `--color-focus-inverse` | = text-inverse | = text-inverse | Focus outline on inverse surfaces |
| `--color-action` | gray-0 | gray-950 | Primary action fill |
| `--color-action-hover` | gray-200 | gray-800 | Primary action hover |
| `--color-action-active` | gray-400 | gray-600 | Primary action pressed |
| `--color-on-action` | gray-950 | gray-0 | Primary action label |
| `--color-danger` | red-300 | red-700 | Errors, destructive actions |
| `--color-success` | green-300 | green-700 | Saved, Published |
| `--color-warning` | amber-300 | amber-700 | Needs attention |
| `--color-info` | blue-300 | blue-700 | Neutral notices |
| `--color-skeleton-base` | gray-850 | gray-200 | Skeleton fill |
| `--color-skeleton-highlight` | gray-800 | gray-100 | Skeleton shimmer |
| `--color-skeleton-inverse-base` | gray-200 | gray-850 | Skeleton fill inside an inverse region |
| `--color-skeleton-inverse-highlight` | gray-100 | gray-800 | Skeleton shimmer inside an inverse region |
| `--color-scrim` | gray-950 at `--opacity-scrim` | same | Behind overlays |

Disabled is not a colour: a disabled control keeps its colours at `--opacity-disabled` (see [opacity.md](opacity.md)). Status colours are never the only signal: they always come with text or an icon.

## Inverse regions

Add `class="ui-inverse"` to an element to swap ground and ink inside it, whatever the theme: the [work band](../components/work-band.md) is white on the dark theme and black on the light theme. The region redefines `--color-bg`, `--color-text`, `--color-text-muted`, the inverse pair, the selected pair, both focus colours and the skeleton colours from the page's values, which each theme root records as `--page-*`. Components inside need no special code: a chip, a link or a focus ring just uses its usual tokens. Other roles (action, status, borders) are not swapped, so actions and form controls don't belong inside an inverse region.

## Contrast

Measured live on the specimen page (`bun run dev:ui`); every pair passes.

| Foreground | Background | Dark | Light | Min |
| --- | --- | --- | --- | --- |
| text | bg | 18.73 | 17.33 | 4.5 |
| text-muted | bg | 8.93 | 5.91 | 4.5 |
| text | surface-raised | 17.76 | 18.73 | 4.5 |
| text-muted | surface-raised | 8.47 | 6.39 | 4.5 |
| text-muted | surface-hover | 7.86 | 5.41 | 4.5 |
| text-inverse | surface-inverse | 18.73 | 18.73 | 4.5 |
| text-inverse-muted | surface-inverse | 6.39 | 8.93 | 4.5 |
| on-action | action | 18.73 | 18.73 | 4.5 |
| on-action | action-hover | 13.92 | 14.35 | 4.5 |
| on-action | action-active | 8.93 | 6.39 | 4.5 |
| danger | bg | 7.72 | 5.46 | 4.5 |
| success | bg | 9.59 | 4.95 | 4.5 |
| warning | bg | 10.53 | 5.48 | 4.5 |
| info | bg | 7.77 | 5.64 | 4.5 |
| border-control | bg | 5.08 | 3.41 | 3 |
| border-control | surface-raised | 4.81 | 3.69 | 3 |
| border-control | surface-hover | 4.47 | 3.12 | 3 |
| focus | bg | 18.73 | 17.33 | 3 |
| focus-inverse | surface-inverse | 18.73 | 18.73 | 3 |

`--color-border` (1.31 dark, 1.24 light) is below 3:1 on purpose: it is decoration and never the only boundary of a control.
