# Checkbox

Code: `packages/ui/src/components/checkbox/checkbox.css`. CMS.

## Purpose

A single yes/no choice, such as "Present (I still work here)" in the [date field](date-field.md). Not for choosing between options that exclude each other (radio buttons) or for settings that act immediately (the [segmented switch](segmented.md)).

## Anatomy

A `<label class="ui-checkbox">` wrapping the native `<input type="checkbox">` and its text. The box is the native input restyled; the check mark is Lucide's `check`, inlined as a mask so it takes the inverse text colour.

## States

| State | Look |
| --- | --- |
| Unchecked | Outlined box on the raised surface |
| Hover | Outline turns `--color-text` |
| Checked | Inverse fill with the check mark, which scales in (`--duration-quick`, instant under reduced motion) |
| Focus | 2px focus ring around the box |
| Invalid | `aria-invalid="true"`: danger outline, plus an error message as in the [field](field.md) |
| Disabled | `--opacity-disabled` on box and label |

Loading, empty and skeleton don't apply: a checkbox renders with its form.

## Accessibility

- Native input, so Space toggles it and its state is announced; the whole label is the click target.
- At least 24px tall, 44px on touch layouts.
- Never the only indicator of a required confirmation: the form error summary names it too.

## Content rules

A statement that's true when checked, sentence case, no trailing period: "Show on the Portfolio".

## Tokens

`--size-icon-md|sm`, `--size-target-min`, `--size-target-touch`, `--color-border-control`, `--color-surface-raised`, `--color-surface-inverse`, `--color-text-inverse`, `--color-text`, `--color-danger`, `--color-focus`, `--radius-chip`, `--border-width-control|focus|2`, `--space-inset-sm`, `--text-body`, `--opacity-disabled`, `--duration-quick`, `--ease-out`.

## Markup

```html
<label class="ui-checkbox"><input type="checkbox" checked> Show on the Portfolio</label>
```
