# Experience entry

Code: `packages/ui/src/components/entry/entry.css`. Portfolio; the CMS list shows the same data in its own row component.

## Purpose

One role in the Owner's work history: when, what, where, and optionally what it involved. The unit a hiring Visitor scans ([principle 2](../foundations/principles.md#2-scan-before-story)).

## Anatomy

- **Period** (`.ui-entry__period`): a `<time>` with a machine-readable `datetime`; inside a [chip](chip.md) for the current role.
- **Role** (`.ui-entry__role`): `<h3>` in the title role.
- **Organisation** (`.ui-entry__org`): company and place, muted.
- **Summary** (`.ui-entry__summary`, optional): one or two sentences, body role, up to 66ch.

## Variants

| `data-variant` | Layout | Use |
| --- | --- | --- |
| (none) | Stacked: period, role, organisation | Narrow spaces and demos |
| `row` | From 56rem: period / role and organisation / summary in three columns (1 : 2 : 3). Stacked below | The full experience list |

## States

| State | Look |
| --- | --- |
| Past role | Period as muted text |
| Current role | `data-current`; period in an inverse chip, ending with "Present" / "Atual" |
| Loading | Three [skeleton](skeleton.md) lines at the period, title and organisation sizes, so the swap doesn't move anything |
| No summary | The summary is left out; the row keeps its columns |

Not interactive: no hover, focus, active, disabled or selected. Empty is a list state (no entries), handled by the [empty pattern](../patterns/empty.md).

## Accessibility

- Each entry is an `<article>` inside a list (`<ol>`, newest first), with the role as its heading, so screen readers can jump between entries.
- The period is real `<time>` with `datetime` ("2022-01/2024-02"); the current role is identified by text ("Present"), its position first, and the chip, never by colour.
- Reading order matches visual order: period, role, organisation, summary.

## Content rules

- Role and organisation are Content in both Locales. Long `pt-BR` titles wrap to two lines ("Engenheiro de Software Sênior"); never truncate.
- Periods are formatted with `Intl` ([i18n](../foundations/i18n.md#dates-and-numbers)), years by default.
- Summaries stay under about 200 characters in `pt-BR`.

## Tokens

`--text-body`, `--text-label`, `--text-title`, `--text-tracking-title`, `--text-measure`, `--font-weight-regular`, `--color-text-muted`, `--space-stack-xs|sm|md`, `--layout-gutter`, plus the chip's tokens.

## Markup

```html
<article class="ui-entry" data-variant="row" data-current>
  <p class="ui-entry__period"><time datetime="2024-03"><span class="ui-chip">2024 — Present</span></time></p>
  <h3 class="ui-entry__role">AI Engineer</h3>
  <p class="ui-entry__org">Ponte Labs · São Paulo</p>
</article>
```
