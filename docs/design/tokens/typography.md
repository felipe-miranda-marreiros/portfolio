# Typography

Code: `packages/ui/src/tokens/typography.css`.

## Families and loading

| Token | Face | Use |
| --- | --- | --- |
| `--font-display` | Funnel Display (variable, 300–800) | Display, headline, title: the Owner's voice |
| `--font-text` | Funnel Sans (variable, 300–800) | Body, lead, label, caption |
| `--font-code` | System monospace stack | Code and token names only, never as a "technical" costume |

- Self-hosted from `@fontsource-variable/funnel-display` and `funnel-sans` (SIL OFL), imported by the token file, so both apps bundle the files; no request goes to a font host.
- Two subsets, chosen per glyph by `unicode-range`: Latin (all `pt-BR` letters) and Latin Extended. About 17 KB per face for Latin.
- `font-display: swap`. Each face has a metric-matched local fallback (`Funnel Display Fallback`, `Funnel Sans Fallback`, built on Arial) with `size-adjust` and ascent/descent overrides measured against the real faces, so the swap does not move the layout.

## Scale

A fluid scale: fixed sizes for UI text, `clamp()` for the reading and display sizes. Text steps rise by roughly a major third (1.25); display jumps beyond the scale on purpose.

| Token | Size | Notes |
| --- | --- | --- |
| `--text-size-xs` | 0.8125rem (13px) | Captions, notes |
| `--text-size-sm` | 0.9375rem (15px) | Labels, navigation, meta |
| `--text-size-md` | 1.0625rem (17px) | Body |
| `--text-size-lg` | 1.25 → 1.5rem | Lead paragraph |
| `--text-size-xl` | 1.375 → 1.625rem | Titles, role names in the work band |
| `--text-size-2xl` | 2 → 3.25rem | Headlines, section titles |
| `--text-size-display` | 3.25 → 7rem | The introduction (the Portfolio only) |

Display type needs a wide column: at 7rem the longest common `pt-BR` word in the introduction ("engenheiro") is about 690px wide. Set display only in a column at least 60% of the viewport; anything narrower uses headline.

Weights: `--font-weight-regular` 400, `--font-weight-semibold` 600, `--font-weight-heavy` 650. Line heights: `--text-leading-tight` 0.96 (display, headline), `--text-leading-snug` 1.35 (titles, lead, labels), `--text-leading-normal` 1.5 (body). Tracking: `--text-tracking-display` -0.035em, `--text-tracking-headline` -0.02em, `--text-tracking-title` -0.01em, `--text-tracking-normal` 0. Measure: `--text-measure` 66ch for body, `--text-measure-lead` 40ch for the lead. Links: `--text-underline-offset` 0.22em.

## Roles

Each role is a `font` shorthand: `font: var(--text-headline)`. Tracking isn't part of the shorthand, so components pair a role with its tracking token.

| Role | Weight / size / leading / family | Tracking | Use |
| --- | --- | --- | --- |
| `--text-display` | heavy / display / tight / display | display | The introduction sentence |
| `--text-headline` | heavy / 2xl / tight / display | headline | Section and page titles |
| `--text-title` | semibold / xl / snug / display | title | Role names, panel titles |
| `--text-lead` | regular / lg / snug / text | normal | The statement under the introduction |
| `--text-body` | regular / md / normal / text | normal | Running text, form values |
| `--text-label` | semibold / sm / snug / text | normal | Buttons, navigation, field labels |
| `--text-caption` | regular / xs / snug / text | normal | Notes, help text, meta |
| `--text-code` | regular / sm / normal / code | normal | Code |

The CMS uses title and below; display is reserved for the Portfolio ([surfaces](../foundations/principles.md#surfaces)). Numerals in dates and lists add `font-variant-numeric: tabular-nums`.
