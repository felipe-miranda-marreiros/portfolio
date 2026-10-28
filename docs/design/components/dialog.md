# Dialog

Code: `packages/ui/src/components/dialog/dialog.css`. CMS.

## Purpose

Asks for confirmation before an action that's hard to undo or visible to the public: Publish, Delete, Remove portrait. Not for forms, information, or anything that doesn't need to interrupt ([inline message](message.md) or [toast](toast.md) instead).

## Anatomy

- **Dialog** `.ui-dialog`: a native `<dialog>` on the raised surface with the overlay shadow, at most `--size-dialog` (32rem) wide.
- **Backdrop**: `--color-scrim` behind it.
- **Title** `.ui-dialog__title`: the question, naming the item.
- **Body** `.ui-dialog__body`: the consequence.
- **Actions** `.ui-dialog__actions`: Cancel (ghost) then the confirming action (primary, or danger for destructive ones), right-aligned.

## Variants

Confirm (primary action) and destructive confirm (danger action).

## States

| State | Look |
| --- | --- |
| Opening | Fades in and rises `--space-2` over `--duration-moderate`; instant under reduced motion |
| Open | Page behind is inert and dimmed |
| Busy | The confirming button shows its loading state; Cancel stays available |
| Closing | Fades out |

## Accessibility

- Opened with `showModal()`: focus moves into the dialog and is trapped there, the page behind is inert, and Escape cancels.
- `aria-labelledby` points at the title. Initial focus goes to Cancel for destructive dialogs, so a stray Enter doesn't delete.
- On close, focus returns to the control that opened it.

## Content rules

Title is a question with the item's name: "Delete “Software Engineer”?". Body states the consequence in one or two sentences. The confirming button repeats the verb ("Delete", "Publish"), never "OK" or "Yes".

## Tokens

`--size-dialog`, `--space-8`, `--space-2`, `--space-inset-lg`, `--space-stack-sm|lg`, `--space-gap-sm`, `--color-surface-raised`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-scrim`, `--shadow-overlay`, `--radius-surface`, `--border-width-divider`, `--text-title`, `--text-tracking-title`, `--duration-moderate`, `--ease-out`.

## Markup

```html
<dialog class="ui-dialog" aria-labelledby="delete-title">
  <h2 class="ui-dialog__title" id="delete-title">Delete “Software Engineer”?</h2>
  <p class="ui-dialog__body">It will be removed from the CMS and, if Published, from the Portfolio. This can’t be undone.</p>
  <div class="ui-dialog__actions">
    <button type="button" class="ui-button" data-variant="ghost" autofocus>Cancel</button>
    <button type="button" class="ui-button" data-variant="danger">Delete</button>
  </div>
</dialog>
```
