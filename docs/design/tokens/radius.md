# Radius

Code: `packages/ui/src/tokens/radius.css`. Three steps: `--radius-1` 0.375rem (6px), `--radius-2` 0.625rem (10px), `--radius-full` (pill or circle).

| Token | Step | Used by |
| --- | --- | --- |
| `--radius-chip` | 1 | Chips (the current-year chip), small badges |
| `--radius-skeleton` | 1 | Skeleton lines and blocks |
| `--radius-field` | 2 | Inputs, text areas, selects |
| `--radius-surface` | 2 | Panels, menus, dialogs |
| `--radius-action` | full | Buttons, segmented switches |
| `--radius-avatar` | full | The portrait and avatar, skeleton circles |

Actions are pills and everything that holds content is a soft rectangle; the two never swap.
