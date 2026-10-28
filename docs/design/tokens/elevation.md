# Elevation

Code: `packages/ui/src/tokens/elevation.css`. Depth is **tonal in dark** (a raised surface is a lighter grey) and **tone plus a soft shadow in light** ([themes](../foundations/themes.md#elevation)).

## Shadows

| Token | Dark | Light | Use |
| --- | --- | --- | --- |
| `--shadow-raised` | none (tone only: `--color-surface-raised`) | `--shadow-light-1` | Panels, cards in the CMS |
| `--shadow-overlay` | `--shadow-dark-2` | `--shadow-light-2` | Menus, dialogs, toasts |

Primitives: `--shadow-light-1` (two soft layers, 6% black), `--shadow-light-2` (8% and 14%), `--shadow-dark-2` (40% and 55%, so an overlay still separates from near-black). Every shadow has a vertical offset and a soft blur; no zero-offset glows, no hard offset shadows.

## Layers

| Token | Value | Use |
| --- | --- | --- |
| `--z-base` | 0 | Page content |
| `--z-sticky` | 100 | Sticky header |
| `--z-dropdown` | 200 | Menus, selects, popovers |
| `--z-overlay` | 300 | Scrim behind a dialog |
| `--z-modal` | 400 | Dialog |
| `--z-toast` | 500 | Toasts, above everything |

Components use these names only, never a raw `z-index`.
