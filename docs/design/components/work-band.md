# Work band

Code: `packages/ui/src/components/work-band/work-band.css`. Portfolio only.

## Purpose

The full-width inverted band that closes the first viewport with the Owner's latest roles: the boldest contrast move in the system ([principle 3](../foundations/principles.md#3-contrast-not-colour)), and the facts a hiring Visitor checks first. Used once per page, for the most recent roles only (up to three); the complete history is a list of `row` [entries](entry.md) below.

## Anatomy

- **Band** (`.ui-work-band.ui-inverse`): a full-bleed [inverse region](../tokens/color.md#inverse-regions): white with black text on the dark theme, black with white text on the light theme.
- **Label** (`.ui-work-band__label`): an `<h2>`, "Lately" / "Ultimamente", muted.
- **List** (`.ui-work-band__list`): an `<ol>` of up to three `compact` entries, newest first.

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | Label column (1 part) and three entry columns (2 parts each) |
| Below 56rem | Label, then entries stacked |

## States

| State | Look |
| --- | --- |
| Three entries | As above |
| One or two entries | The same columns; the empty columns stay empty, so the label never drifts |
| Loading | Three compact entry skeletons; the band has `aria-busy="true"` and a status "Loading experience" |
| Empty | The band is not rendered: no Published experience means nothing to show, and an empty inverted band would be a loud nothing |

Not interactive itself; any links inside follow the [link](link.md) states with the inverted focus colour.

## Accessibility

- `<section aria-labelledby>` pointing at its label, so it's a named region.
- Inside the band every colour token is swapped, so contrast holds: black on white (18.73:1) and the muted grey on white (6.39:1) in dark theme; the light theme mirrors it.

## Content rules

The band shows the latest three Published roles by start date; the label is a UI string. Entries follow the [experience entry](entry.md) rules.

## Tokens

`.ui-inverse` (all swapped colour roles), `--space-page-block`, `--space-page-inline`, `--space-stack-lg|xl`, `--layout-gutter`, `--size-container-page`, `--text-label`, `--color-text-muted`.

## Markup

```html
<section class="ui-work-band ui-inverse" aria-labelledby="lately">
  <div class="ui-work-band__inner">
    <h2 class="ui-work-band__label" id="lately">Lately</h2>
    <ol class="ui-work-band__list">
      <li><!-- compact experience entry --></li>
    </ol>
  </div>
</section>
```
