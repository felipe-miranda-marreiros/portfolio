# Motion

Code: `packages/ui/src/tokens/motion.css`. Primitives: `--duration-100`, `-200`, `-300`, `-600`, `-1600`.

| Token | Value | Use |
| --- | --- | --- |
| `--duration-instant` | 100ms | Press feedback |
| `--duration-quick` | 200ms | Hover, focus, small state changes |
| `--duration-moderate` | 300ms | Theme cross-fade, Locale swap, menus opening |
| `--duration-slow` | 600ms | The one authored moment on a page |
| `--duration-skeleton` | 1600ms | One shimmer cycle |
| `--duration-skeleton-delay` | 200ms | Wait before showing a skeleton (none for faster loads) |
| `--duration-spinner` | 600ms | One turn of a button's loading spinner (stopped under reduced motion) |

| Token | Curve | Use |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Things arriving or responding (default) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Loops and things moving between two places (shimmer) |

## Reduced motion

Under `prefers-reduced-motion: reduce` the token file sets `instant`, `quick`, `moderate` and `slow` to 0ms, so every component that uses them stops moving with no extra code. Skeletons stop shimmering in their own CSS and show a static `--color-skeleton-base` block. Smooth scrolling becomes a jump.

## Rules

- One authored moment per page (`slow`), never an entrance animation on every section.
- Content is visible by default; motion never hides a fact until it finishes ([principle 2](../foundations/principles.md#2-scan-before-story)).
- Animate `transform`, `opacity`, `clip-path` and colour; never layout properties.
