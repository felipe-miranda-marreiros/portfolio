# Border

Code: `packages/ui/src/tokens/border.css`. Primitives: `--border-width-1` 1px, `--border-width-2` 2px.

| Token | Value | Use |
| --- | --- | --- |
| `--border-width-divider` | 1px | Decorative dividers, in `--color-border` |
| `--border-width-control` | 1px | Field and control outlines, in `--color-border-control` |
| `--border-width-focus` | 2px | Focus outline, in `--color-focus` |
| `--border-focus-offset` | `--space-1` (4px) | Gap between a control and its focus outline |
| `--border-style-default` | solid | Everything structural |
| `--border-style-draft` | dashed | A Draft in the CMS, so Draft and Published differ by shape, not colour |

Borders are structure, not decoration: the Portfolio uses almost none (inversion and space separate regions), the CMS uses them for fields and lists.
