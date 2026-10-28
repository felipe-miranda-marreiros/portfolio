# Skeleton

Code: `packages/ui/src/components/skeleton/skeleton.css`.

## Purpose

Stands in for content whose layout is known while it loads, at the same size as the loaded content, so nothing shifts when it arrives. Not for actions (saving, publishing): those use the button's loading state. Every data-driven component documents its own skeleton composed from these three primitives.

## Anatomy and shapes

| `data-shape` | Size | Stands in for |
| --- | --- | --- |
| `line` | Height 1em of the text it replaces, centred in the line box (`1lh`); width set by the consumer | A line of text: set it inside an element with the same text role, so it takes that role's size |
| `block` | Width and height set by the consumer | Images, fields, panels |
| `circle` | `--skeleton-size` (default `--size-portrait-md`) | Avatars |

## States

| State | Look |
| --- | --- |
| Waiting | Invisible for `--duration-skeleton-delay` (200ms), so fast loads never flash a skeleton |
| Loading | Fades in, then a shimmer sweeps across every `--duration-skeleton` (1.6s) |
| Reduced motion | A static `--color-skeleton-base` block: no fade, no shimmer |

## Accessibility

- Every skeleton shape is `aria-hidden="true"`.
- The loading region (the component or section being loaded) has `aria-busy="true"` while loading.
- A polite live region (`role="status"`, often [visually hidden](visually-hidden.md)) announces "Loading experience" once, then "Experience loaded" once.

## Content rules

Match the real content's shape: as many lines as the typical content has, the last line shorter. Never invent a shape the loaded component doesn't have.

## Tokens

`--color-skeleton-base`, `--color-skeleton-highlight`, `--radius-skeleton`, `--radius-avatar`, `--size-portrait-md`, `--duration-skeleton`, `--duration-skeleton-delay`, `--duration-quick`, `--ease-in-out`, `--ease-out`.

Component token: `--skeleton-size`.

## Markup

```html
<section aria-busy="true">
  <h2 class="title"><span class="ui-skeleton" data-shape="line" aria-hidden="true" style="width: 12ch"></span></h2>
  <span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>
  <p class="ui-visually-hidden" role="status">Loading experience</p>
</section>
```
