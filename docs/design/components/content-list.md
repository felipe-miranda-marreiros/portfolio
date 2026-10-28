# Content list

Code: `packages/ui/src/components/content-list/content-list.css`. CMS.

## Purpose

The index of one Content type (Experience, Skills, Media): what exists, its key detail, its status, and the actions on each item. Not for the Portfolio (that uses [experience entries](entry.md)).

## Anatomy

- **Table** `.ui-content-list` with a visually hidden `<caption>` naming the list.
- **Header row**: column names in caption type.
- **Rows**: a **title** cell (`.ui-content-list__title`), a **detail** cell (company and period, tabular numerals), a [status badge](status.md), and **actions** (`.ui-content-list__actions`): Edit (ghost link with icon) and Delete (ghost icon button).
- **Empty** `.ui-content-list__empty`: replaces the table.

## Layout

A table from 56rem; below it, the header hides and each row becomes a stacked block (title, detail, status, actions).

## States

| State | Look |
| --- | --- |
| Loaded | Rows separated by dividers |
| Row hover | `--color-surface-hover` on the row |
| Loading | Three rows of `line` [skeletons](skeleton.md) at the cells' sizes; the table has `aria-busy="true"` and a status "Loading experience" |
| Empty | "No experience yet", a sentence on what to do, and the primary action "Add experience" |
| Error | The page-level [inline message](message.md) (danger) with a retry, in place of the table |

Row selection and sorting are not in v1.

## Accessibility

- A real `<table>` with `scope="col"` headers and a caption, so screen readers announce columns.
- Edit's accessible name includes the item ("Edit AI Engineer"); the icon-only Delete has `aria-label="Delete AI Engineer"`.
- Delete always confirms in a [dialog](dialog.md).

## Content rules

Titles are the item's English title; details use the CMS's English formatting. The empty state names the type in the singular.

## Tokens

`--color-border`, `--color-text-muted`, `--color-text`, `--color-surface-hover`, `--border-width-divider`, `--space-inset-xs|sm|md`, `--space-stack-sm|xl`, `--text-body|caption|title`, `--font-weight-semibold`, `--duration-quick`, `--ease-out`.

## Markup

```html
<table class="ui-content-list">
  <caption class="ui-visually-hidden">Experience</caption>
  <thead><tr><th scope="col">Role</th><th scope="col">Company and period</th><th scope="col">Status</th><th scope="col"><span class="ui-visually-hidden">Actions</span></th></tr></thead>
  <tbody><tr>
    <td class="ui-content-list__title">AI Engineer</td>
    <td class="ui-content-list__detail">Ponte Labs · 2024 — Present</td>
    <td><span class="ui-status" data-status="draft">Draft</span></td>
    <td><div class="ui-content-list__actions"><!-- Edit, Delete --></div></td>
  </tr></tbody>
</table>
```
