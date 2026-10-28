# Date field

Code: `packages/ui/src/components/date-field/date-field.css`. CMS.

## Purpose

A month and year, for experience periods. Not for exact dates: no date picker in v1, because periods never need a day.

## Anatomy

- **Fieldset** `.ui-date-field` with a **legend** ("Start", "End").
- **Month**: a native `<select>` with `.ui-input`, month names from `Intl` in English.
- **Year**: an `<input inputmode="numeric" maxlength="4">` with `.ui-input`, sized for four digits.
- **Present** (end dates only): a [checkbox](checkbox.md) "Present (I still work here)" that disables month and year while checked.

## States

| State | Look |
| --- | --- |
| Filled | Month and year set |
| Ongoing | Present checked; month and year disabled and kept empty |
| Error | Year not four digits, or end before start: `aria-invalid` on the offending control, with a [field](field.md) error under the inputs ("Enter a year with four digits.", "End must be after start.") |
| Focus, hover, disabled | Per [field](field.md) |
| Loading | Two small `block` skeletons at control height |

## Accessibility

- Fieldset and legend, and a visible label on each part ("Month", "Year"), so each control is announced as "Start, Month".
- Native select and numeric keyboard on touch.
- Validation happens on blur and on save, never while typing.

## Content rules

Stored as year and month; the Portfolio formats periods per Locale with `Intl` ([i18n](../foundations/i18n.md#dates-and-numbers)).

## Tokens

`--space-stack-xs`, `--space-gap-sm`, `--text-label|caption`, `--color-text-muted`, plus the field and checkbox tokens. The month and year widths are set in `ch` so they follow the text size.

## Markup

```html
<fieldset class="ui-date-field">
  <legend class="ui-date-field__legend">End</legend>
  <div class="ui-date-field__inputs">
    <span class="ui-date-field__part"><label for="end-m">Month</label><select id="end-m" class="ui-input ui-date-field__month" disabled>…</select></span>
    <span class="ui-date-field__part"><label for="end-y">Year</label><input id="end-y" class="ui-input ui-date-field__year" inputmode="numeric" maxlength="4" disabled></span>
  </div>
  <label class="ui-checkbox"><input type="checkbox" checked> Present (I still work here)</label>
</fieldset>
```
