# Form error summary

Code: `packages/ui/src/components/error-summary/error-summary.css`. CMS.

## Purpose

After a failed save or publish, lists every problem in the form with a link to each field, at the top of the form. It's how a long bilingual form stays fixable: the Owner sees all problems at once instead of hunting for red outlines.

## Anatomy

A danger [inline message](message.md) with the extra class `.ui-error-summary`: the title counts the problems ("There are 2 problems with this entry"), and the body lists links to the invalid fields, each repeating the field's error message.

## States

| State | Look |
| --- | --- |
| Hidden | Not rendered until the first failed submit |
| Shown | Rendered above the form and focused (`tabindex="-1"`), with the focus ring |
| Updated | Rewritten on each submit; removed when the form saves |

## Accessibility

- `role="alert"` and focus moved to it on a failed submit, so screen reader and keyboard users land on the list.
- Each link points at the field's `id`; following it focuses the field.
- Each field still shows its own error ([field](field.md)), so the summary is never the only place an error appears.

## Content rules

"There is 1 problem…" / "There are N problems with this entry". Each item: "Field name: message", for example "Start: enter a year with four digits". Locale fields name the Locale: "Summary (Portuguese): required to publish".

## Tokens

`--border-width-focus`, `--border-focus-offset`, `--color-focus`, `--space-stack-xs`, plus the inline message tokens.

## Markup

```html
<div class="ui-message ui-error-summary" data-tone="danger" role="alert" tabindex="-1" aria-labelledby="errors-title">
  <span class="ui-icon" aria-hidden="true"><!-- circle-alert --></span>
  <p class="ui-message__title" id="errors-title">There are 2 problems with this entry</p>
  <div class="ui-message__body"><ul><li><a class="ui-link" href="#company">Company: enter the company name</a></li></ul></div>
</div>
```
