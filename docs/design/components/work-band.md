# Work band

Code: `packages/ui/src/components/work-band/work-band.css`. Portfolio only.

## Purpose

The full-width inverted band that closes the first viewport with the Owner's stack: the technologies they work with, named in type at headline size. It's the boldest contrast move in the system ([principle 3](../foundations/principles.md#3-contrast-not-colour)) and answers "can they do our kind of work?" before the Visitor scrolls. Used once per page. Work history is not shown here; it's the list of `row` [entries](entry.md) below, so the page never shows the same roles twice.

## Anatomy

- **Band** (`.ui-work-band.ui-inverse`): a full-bleed [inverse region](../tokens/color.md#inverse-regions): white with black text on the dark theme, black with white text on the light theme.
- **Label** (`.ui-work-band__label`): an `<h2>`, "Stack" in both Locales, muted.
- **List** (`.ui-work-band__list`): a `<ul>` of technology names in the headline role, wrapping; each name stays on one line.

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | Label column (1 part) and the list (6 parts), the label on the list's first baseline |
| Below 56rem | Label, then the list |

## States

| State | Look |
| --- | --- |
| Loaded | As above |
| Loading | Two headline-height `line` [skeletons](skeleton.md) (full width, then 60%); the band has `aria-busy="true"` and a status "Loading stack" |
| Empty | The band is not rendered: an empty inverted band would be a loud nothing |

Not interactive: names are plain text, not links or chips.

## Accessibility

- `<section aria-labelledby>` pointing at its label, so it's a named region.
- A real list, so screen readers announce the count and each name.
- Inside the band every colour token is swapped, so contrast holds: black on white (18.73:1) and the muted grey on white (6.39:1) in dark theme; the light theme mirrors it.

## Content rules

- The names come from Content (Skill candidates, settled in roadmap phase 4), in the Owner's order. They're product names and don't translate.
- Text only: no logos or icons (a tech-logo grid is one of the looks the Owner ruled out).
- About 6 to 10 names keeps the band to two lines on desktop; past that it grows, and the band pushes below the first viewport.

## Tokens

`.ui-inverse` (all swapped colour roles), `--space-page-block`, `--space-page-inline`, `--space-stack-xs|md|xl`, `--space-gap-lg`, `--layout-gutter`, `--size-container-page`, `--text-label`, `--text-headline`, `--text-tracking-headline`, `--color-text-muted`.

## Markup

```html
<section class="ui-work-band ui-inverse" aria-labelledby="stack">
  <div class="ui-work-band__inner">
    <h2 class="ui-work-band__label" id="stack">Stack</h2>
    <ul class="ui-work-band__list">
      <li>React</li>
      <li>React Native</li>
    </ul>
  </div>
</section>
```
