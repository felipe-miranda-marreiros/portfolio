# Opacity

Code: `packages/ui/src/tokens/opacity.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--opacity-disabled` | 0.45 | A disabled control at its normal colours, with `cursor: not-allowed` |
| `--opacity-scrim` | 0.72 | Strength of `--color-scrim` behind dialogs |

A disabled control also exposes `disabled` or `aria-disabled`, so its state never depends on its faded look alone. Opacity is never used to make secondary text: that is `--color-text-muted`, which keeps a measured contrast ratio.
