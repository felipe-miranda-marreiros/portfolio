# Inline message

Code: `packages/ui/src/components/message/message.css`. CMS.

## Purpose

A persistent notice inside a page or form: what's true now and what to do about it. Not for transient confirmations ([toast](toast.md)) or questions that block ([dialog](dialog.md)).

## Anatomy

- **Box** `.ui-message`: 1px outline in the tone colour on the raised surface (never a thick coloured side stripe).
- **Icon** in the tone colour: `info`, `circle-check`, `triangle-alert` or `circle-alert`.
- **Title** `.ui-message__title`: the state in words.
- **Body** `.ui-message__body`: the detail or the fix, optionally with a list.

## Variants

| `data-tone` | Icon | Use |
| --- | --- | --- |
| `info` (default) | info | Neutral facts: "Changes aren’t live yet" |
| `success` | circle-check | A completed result that should stay visible: "Published" |
| `warning` | triangle-alert | Needs attention but doesn't block: "Missing Portuguese" |
| `danger` | circle-alert | Something failed: "Couldn’t save" |

## States

Static. Dismissible messages aren't in v1: a message disappears when its cause is gone.

## Accessibility

- Danger uses `role="alert"`; the others `role="status"`, so the change is announced politely.
- The title states the tone in words; the icon is decorative. Colour is never the only signal.

## Content rules

Title: a short sentence of what's true. Body: what to do next. "Couldn’t save / The connection dropped. Your changes are kept here; try again."

## Tokens

`--color-info|success|warning|danger`, `--color-surface-raised`, `--color-text`, `--color-text-muted`, `--border-width-control`, `--radius-surface`, `--space-inset-xs|sm|md|lg`, `--space-stack-xs`, `--size-icon-md`, `--text-body|label`.

Component token: `--message-tone`.

## Markup

```html
<div class="ui-message" data-tone="warning" role="status">
  <span class="ui-icon" aria-hidden="true"><!-- triangle-alert --></span>
  <p class="ui-message__title">Missing Portuguese</p>
  <p class="ui-message__body">Fill in every pt-BR field before publishing.</p>
</div>
```
