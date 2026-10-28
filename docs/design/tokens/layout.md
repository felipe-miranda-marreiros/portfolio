# Layout

Code: `packages/ui/src/tokens/layout.css`.

## Breakpoint

| Token | Value | Meaning |
| --- | --- | --- |
| `--breakpoint-md` | 56rem (896px) | Below it: one column, the work band stacks, the header collapses its section links |

Custom properties don't work in media queries, so components write the literal: `@media (width < 56rem)`. One breakpoint is all v1 needs; fluid type and spacing (`clamp()`) handle everything between 320px and 1600px. A second breakpoint is added only when a component needs it, and then here first.

## Grid

| Token | Value | Use |
| --- | --- | --- |
| `--layout-columns` | 12 | Page grid columns |
| `--layout-gutter` | `--space-gap-lg` (2rem) | Gap between grid columns |

The introduction spans about two thirds of the grid (8 of 12 columns), the minimum column width for display type ([typography](typography.md#scale)).

## Containers

The page is capped at `--size-container-page` (1600px) and padded by `--space-page-inline`. Body text never runs wider than `--text-measure` (66ch).
