# Forms

Demo: `/patterns/#p-forms` (an Experience edit page that validates for real). Components: [field](../components/field.md), [locale field pair](../components/locale-pair.md), [date field](../components/date-field.md), [checkbox](../components/checkbox.md), [image upload](../components/upload.md), [status badge](../components/status.md), [form error summary](../components/error-summary.md), [dialog](../components/dialog.md), [toast](../components/toast.md), [button](../components/button.md).

## Layout

- **Header**: the [app shell](../components/app-shell.md) header carries the item's title with its [status badge](../components/status.md), and the actions on the right: a way out (ghost), then "Save draft" (secondary) and "Publish" (primary), both tied to the form with the `form` attribute. The way out is "Cancel", back to the list, on items that have one; on a single item such as the Profile it's "Discard changes", shown only while there are unsaved changes and confirmed in a [dialog](../components/dialog.md). The actions sit at the top, so they don't move as the form grows.
- **Summary slot**: directly under the header, where the [form error summary](../components/error-summary.md) appears.
- **Fields**: a two-column grid from 56rem; [locale field pairs](../components/locale-pair.md) and text areas span both columns; one column below 56rem. Order follows how the Owner thinks about the item (what, where, when, details).
- Labels above controls, hints between label and control, errors under the control.
- Code: `packages/ui/src/components/form/form.css`: `.ui-form` (up to `--size-container-form`) holds the summary slot and `.ui-form__grid`, where `.ui-form__wide` spans both columns.

## Two submit intents

| Intent | Checks | On success |
| --- | --- | --- |
| Save draft | Only what the API needs to store a Draft (required fields, valid years) | Toast "Saved as Draft." |
| Publish | Everything above, plus every translatable field complete in both Locales ([ADR 0004](../../adr/0004-publish-requires-both-locales.md)) | Confirmation [dialog](../components/dialog.md), then toast "Published." and the badge turns Published |

The API is the authority ([ADR 0001](../../adr/0001-api-owns-content-and-invariants.md)): the CMS checks the same rules first only to answer faster, and shows the API's errors in exactly the same way.

## Validation timing

1. **While typing for the first time:** nothing. No errors before the Owner has finished.
2. **On submit:** every problem is shown at its field and listed in the summary, which takes focus. Problems are listed in page order.
3. **After the first submit:** each field re-checks as it changes, so an error disappears the moment it's fixed; the summary clears when nothing is left.
4. Missing `pt-BR` before Publish is a **warning** on a Draft (dashed field, note) and becomes an **error** only when Publish is attempted.

## Rules

- Never disable the submit buttons to signal invalid input; let the Owner submit and see why.
- Keep everything typed after any failure. Leaving a form with unsaved changes, by Cancel, the navigation or closing the tab, asks for confirmation.
- Error messages name the field and the fix: "Start: enter a year with four digits".
- Required fields are the norm in the CMS; optional ones say "(optional)" in the label instead of marking required ones with asterisks.
