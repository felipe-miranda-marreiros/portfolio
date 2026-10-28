# Themes

Two themes, **dark** and **light**, both first-class. Neither is a fallback for the other: every token, component, state and skeleton is designed and checked in both.

## How they relate

- **Dark is the signature.** The direction was chosen in dark (near-black `#121212`, white type, a white work band), and new work is drawn dark first.
- **Light is its mirror, not a lighter copy.** Ground and ink swap (near-white `#f6f6f6`, near-black type), and the inverted band swaps with them: white on dark, black on light. Inverted regions are a token feature (`.ui-inverse`, see [color](../tokens/color.md#inverse-regions)), not a per-component trick. The structure, scale and spacing are identical; only the semantic colour tokens change.
- **Strict monochrome in both.** No hue carries identity in either theme. Status colours (success, warning, danger, info) are the only hues, have a dark and a light value each, and appear only in functional states.

## How they switch

- Themes are swapped only through **semantic tokens** (for example `--color-surface`, `--color-text`, `--color-text-muted`, `--color-surface-inverse`). Primitives never change; components never reference a primitive or a raw value, so a component needs no theme-specific code.
- **Both apps open in dark**, whatever the system preference (`prefers-color-scheme` is not read). This is the Owner's decision, recorded in the design-system rule.
- Light is always one click away: the theme switch sits in the top bar of every page. An explicit choice of light is remembered on that device and applied by a tiny inline script before first paint, so the page never flashes the wrong theme.
- The `color-scheme` property is set per theme, so native controls, scrollbars and form autofill follow it.
- Switching theme is the one place the Portfolio animates colour: a short cross-fade, removed under reduced motion.

## What follows the theme

Browser surfaces are part of the theme and are styled from the same tokens: text selection, the caret, focus rings, scrollbars, link underlines, and form autofill.

## Imagery

- The Owner's portrait is the same image in both themes. It is placed on the ground without a frame, so it must read on both near-black and near-white; the CMS warns when an uploaded portrait is very dark or very light at the edges.
- No image changes meaning between themes, and no image is used as a background behind text.

## Elevation

Monochrome on near-black can't rely on shadows, so depth is **tonal** in dark (raised surfaces are lighter: `#121212` then `#181818`) and uses soft shadows plus tone in light. The Elevation tokens step turns this into one scale that works in both.

## The CMS

The CMS has the same two themes and also opens in dark. It uses inversion only for the primary action and selection, so in dark it reads as quiet greys on near-black, and in light as greys on near-white.
