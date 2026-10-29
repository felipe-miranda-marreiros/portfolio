# Section overview

Code: `packages/ui/src/components/overview/overview.css`. CMS.

## Purpose

The landing page of a CMS section, such as Portfolio: one row per page in the section, what it holds, its state, and anything waiting on the Owner. It's how the Owner moves inside a section, since the [app shell](app-shell.md) rail lists sections only. Not a dashboard: no metrics, charts or activity, and not a list of Content items (that's the [content list](content-list.md)).

## Anatomy

- **List** `.ui-overview`: a `<ul>` with dividers between rows.
- **Row** `.ui-overview__item`: a link to the page, holding:
  - **Name** `.ui-overview__name`: the page title, body size, semibold.
  - **Description** `.ui-overview__description`: what the page holds, one line in caption type.
  - **State** `.ui-overview__state`: what's there ("Published", "3 roles", "7 skills", "Not started", "None yet") and what's pending, as a Draft [status badge](status.md) ("1 Draft").
  - **Chevron**: a muted `chevron-right` icon, decorative.

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | Name and description, then state, then the chevron, on one line |
| Below 56rem | Name and description, state under them; the chevron stays at the end |

Rows keep a fixed order (the order the Owner fills them in on first setup), whatever their state.

## States

| State | Look |
| --- | --- |
| Loaded | As above |
| Hover | `--color-surface-hover` on the row |
| Focus | Focus ring around the row |
| Loading | Name and description render at once; each state is a `line` [skeleton](skeleton.md). The list has `aria-busy="true"` and a status announces "Loading your Portfolio" |
| Empty (first setup) | Each state reads "Not started" or "None yet", and an info [message](message.md) above the list says what to do first ([empty states](../patterns/empty.md#first-setup)) |
| Error | The danger [message](message.md) with "Try again" replaces the list |

## Accessibility

- Each row is one link, so the whole row is the target and its name, description and state are read together.
- Pending work is written out ("1 Draft"), never shown by colour alone.

## Content rules

Names match the page titles. Descriptions stay under about 60 characters. States use counts with their noun ("3 roles"), and words for nothing yet ("Not started" for a single item, "None yet" for a list).

## Tokens

`--color-border`, `--color-text`, `--color-text-muted`, `--color-surface-hover`, `--border-width-divider`, `--space-inset-sm|md`, `--space-gap-md`, `--space-stack-sm`, `--text-body|caption|label`, `--font-weight-semibold|regular`, `--duration-quick`, `--ease-out`, plus the status badge's and icon's tokens.

## Markup

```html
<ul class="ui-overview">
  <li>
    <a class="ui-overview__item" href="/portfolio/experience">
      <span>
        <span class="ui-overview__name">Experience</span>
        <span class="ui-overview__description">Your roles, newest first, with the stack each one used</span>
      </span>
      <span class="ui-overview__state">3 roles <span class="ui-status" data-status="draft">1 Draft</span></span>
      <span class="ui-icon" aria-hidden="true"><!-- chevron-right --></span>
    </a>
  </li>
</ul>
```
