# Text field and text area

Code: `packages/ui/src/components/field/field.css`. CMS.

## Purpose

One labelled input for a single value (text field) or several lines (text area). The building block of every CMS form. A translatable value uses the [locale field pair](locale-pair.md), which wraps two of these; a date uses the [date field](date-field.md).

## Anatomy

- **Wrapper** `.ui-field`.
- **Label** `.ui-field__label`, always visible, above the control.
- **Hint** `.ui-field__hint` (optional), between label and control so it's read before typing.
- **Control** `.ui-input` on `<input>`, `<textarea>` or `<select>`.
- **Error** `.ui-field__error` (when invalid): icon and message under the control.
- **Count** `.ui-field__count` (optional, text area): characters used against a limit.

## Variants and sizes

Text field (`<input>`, 44px tall) and text area (`<textarea>`, three control heights tall, resizes vertically). One size: CMS forms are one density.

## States

| State | Trigger | Look |
| --- | --- | --- |
| Default | | Raised surface, `--color-border-control` outline |
| Hover | `:hover` | Outline darkens to `--color-text-muted` |
| Focus | `:focus-visible` | Outline `--color-text` plus a 2px focus ring |
| Error | `aria-invalid="true"` | Outline `--color-danger`; the error message names the problem and the fix |
| Disabled | `disabled` | `--opacity-disabled` |
| Read only | `readonly` | No fill, dashed outline: visibly not editable, still selectable |
| Loading | Form loading | A `block` [skeleton](skeleton.md) at control height under a `line` skeleton for the label |

## Accessibility

- `<label for>` on every control; placeholders never replace labels.
- Hint and error are connected with `aria-describedby`, hint first.
- Errors show after the first submit, or on blur once a field has been edited; never while typing the first time.
- The error message starts with what's wrong ("Enter the company name.") and is repeated in the [form error summary](error-summary.md).

## Content rules

Labels are nouns, sentence case, no colon ("Company", "Start"). Hints are one short sentence. Errors say what to do. CMS UI copy is English only; the values typed are Content.

## Tokens

`--color-surface-raised`, `--color-border-control`, `--color-text`, `--color-text-muted`, `--color-danger`, `--color-focus`, `--size-control-md`, `--space-inset-sm|md|xs`, `--space-stack-xs`, `--radius-field`, `--border-width-control|focus|1`, `--border-style-draft`, `--text-label|body|caption`, `--text-leading-normal`, `--font-weight-semibold`, `--opacity-disabled`, `--duration-quick`, `--ease-out`.

## Markup

```html
<div class="ui-field">
  <label class="ui-field__label" for="company">Company</label>
  <input id="company" class="ui-input" aria-invalid="true" aria-describedby="company-error">
  <p class="ui-field__error" id="company-error"><span class="ui-icon" aria-hidden="true"><!-- circle-alert --></span><span>Enter the company name.</span></p>
</div>
```
