# Accessibility

The target is **WCAG 2.2 AA** in both apps, both themes and both Locales. A component is not done until it meets this in every state, including its skeleton.

## Contrast

- Body text and placeholders: at least 4.5:1. Large text (24px, or 18.66px bold): at least 3:1.
- Control boundaries that identify a control (input borders, checkbox outlines, switch tracks) and focus indicators: at least 3:1 against what surrounds them. Decorative dividers are exempt, but a divider is never the only thing marking where a field is.
- Every text/background pair is recorded with its ratio in the colour token docs, in both themes. Measured so far, from the chosen direction:

| Text | Background | Ratio | Use |
| --- | --- | --- | --- |
| `#ffffff` | `#121212` | 18.73 | Dark: primary text |
| `#b3b3b3` | `#121212` | 8.93 | Dark: secondary text |
| `#ffffff` | `#181818` | 17.76 | Dark: text on raised surfaces |
| `#b3b3b3` | `#181818` | 8.47 | Dark: secondary text on raised surfaces |
| `#121212` | `#ffffff` | 18.73 | Dark: text on the inverted band, black chip |
| `#5f5f5f` | `#ffffff` | 6.39 | Dark: secondary text on the inverted band |
| `#121212` | `#f6f6f6` | 17.33 | Light: primary text |
| `#5f5f5f` | `#f6f6f6` | 5.91 | Light: secondary text |

The current hairline greys (`#2a2a2a` on `#121212`, 1.31; `#dedede` on `#f6f6f6`, 1.24) are decoration only. Control borders get their own, stronger token in the Tokens step.

## Focus

- Every interactive element shows a visible focus indicator on keyboard focus (`:focus-visible`), never removed without a replacement.
- The indicator is a solid outline in the current ink colour (white on dark, black on light, black on the inverted band), at least 2px thick with an offset, so it never depends on colour to be seen.
- Focus is never hidden by sticky headers or overlays (WCAG 2.4.11).
- Focus order follows reading order. Overlays move focus in and return it on close.

## Targets

- Pointer targets are at least 24×24px (WCAG 2.5.8), with spacing so neighbouring targets don't overlap.
- On touch layouts, primary controls are at least 44×44px: buttons, the language and theme switches, navigation links.
- Nothing requires dragging; any drag interaction has a single-pointer alternative.

## Motion

- `prefers-reduced-motion: reduce` removes movement: transitions become instant or a short opacity fade, skeletons stop shimmering and show a static block, smooth scrolling becomes a jump.
- Nothing flashes more than three times a second. No autoplaying motion longer than five seconds without a pause control.

## Colour is never the only signal

Monochrome makes this the default, but status colours exist in forms and messages, so: every state (error, success, Draft, Published, current role) also carries text, an icon, a shape or a position. The current role is marked by its chip and by being first, not by colour.

## Structure and semantics

- Native elements first: `<button>`, `<a>`, `<input>`, `<nav>`, `<main>`, headings in order with one `<h1>` per page.
- A skip link to the main content on every page.
- `<html lang>` matches the Locale (`en` or `pt-BR`); content in the other Locale inside a page carries its own `lang`.
- Images: the portrait has a meaningful `alt` where it stands alone; where it sits next to the Owner's name, its `alt` is empty so screen readers don't read the name twice.
- Toggle groups (language, theme) expose their state (`aria-pressed` or radio semantics) and have an accessible group name.
- Loading regions use `aria-busy` and a polite live region (see the skeleton rules in `.claude/rules/design-system.md`).

## Resize and reflow

- Text scales to 200% without loss of content or function.
- Every page reflows to 320 CSS px wide with no horizontal scrolling (except data tables in the CMS, which scroll inside their own region).
- Display type is sized with `clamp()` so it shrinks with the viewport but never below a readable floor.

## Checking

Each component and page is checked with the keyboard alone, with a screen reader on one platform, at 320px and at 200% zoom, in both themes and both Locales. Automated checks (axe or equivalent) run on the specimen and gallery pages, but they don't replace the manual pass.
