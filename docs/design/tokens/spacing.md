# Spacing

Code: `packages/ui/src/tokens/spacing.css`. Base unit 4px (0.25rem); every primitive is a multiple of it.

## Primitives

`--space-1` 0.25rem · `--space-2` 0.5rem · `--space-3` 0.75rem · `--space-4` 1rem · `--space-6` 1.5rem · `--space-8` 2rem · `--space-10` 2.5rem · `--space-12` 3rem · `--space-16` 4rem · `--space-24` 6rem

## Semantic

Three kinds, so a component never guesses which step to use:

| Kind | Tokens | Use |
| --- | --- | --- |
| Inset: padding inside a component | `--space-inset-xs` 1 · `sm` 2 · `md` 4 · `lg` 6 | Chips (xs/sm), fields and rows (md), panels and buttons inline (lg) |
| Stack: vertical space between items | `--space-stack-xs` 1 · `sm` 2 · `md` 4 · `lg` 8 · `xl` 12 | Label to field (xs), field to help (sm), between fields (md), between groups (lg), before a heading (xl) |
| Gap: space between siblings in a row or grid | `--space-gap-sm` 3 · `md` 6 · `lg` 8 | Inline controls (sm), cards and columns (md), grid gutter (lg) |

Layout spacing is fluid:

| Token | Value | Use |
| --- | --- | --- |
| `--space-page-inline` | 1rem → 5vw → 6rem | Left and right page margin |
| `--space-page-block` | 1.5rem → 3vw → 2.5rem | Top and bottom margin of bars and bands |
| `--space-section` | 3rem → 8vw → 6rem | Between page sections |

More space above a heading than below it: a heading takes `stack-xl` (or `lg` in the CMS) above and `stack-md` below.
