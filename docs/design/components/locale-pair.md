# Locale field pair

Code: `packages/ui/src/components/locale-pair/locale-pair.css`. CMS.

## Purpose

Edits one translatable value in both Locales side by side, so the Owner writes and compares `en` and `pt-BR` together ([principle 4](../foundations/principles.md#4-both-locales-are-equal), [ADR 0004](../../adr/0004-publish-requires-both-locales.md)). Used for every translatable field; single-Locale values (dates, URLs) use a plain [field](field.md).

## Anatomy

- **Fieldset** `.ui-locale-pair` with a **legend** naming the value ("Role", "Summary").
- Two [fields](field.md), each labelled with its Locale in words and a code [chip](chip.md) ("English `en`", "Portuguese `pt-BR`"), and `lang` set on its control so spell-check and screen readers use the right language.
- **Missing note** `.ui-locale-pair__missing` under a field whose Locale is still empty.

## Variants

Text field or text area pairs, chosen by the value's length. Side by side from 56rem; stacked (`en` first) below.

## States

| State | Look |
| --- | --- |
| Complete | Both fields filled |
| Missing a Locale | That field's outline is dashed and a warning note says "Required in pt-BR before this can be Published." It's a warning, not an error: Drafts may be incomplete |
| Error | Per field, as in the [field](field.md) (for example, a required value empty on Publish) |
| Focus, hover, disabled | Per field |
| Loading | Two field skeletons side by side |

## Accessibility

- `<fieldset>` and `<legend>`, so each control is announced as "Role, English" and "Role, Portuguese".
- The missing note is connected with `aria-describedby`; the state is carried by text and the dashed outline, not by colour.

## Content rules

The legend is the value's name. Locale labels are the language names in English (the CMS UI is English).

## Tokens

`--space-stack-sm|xs`, `--space-gap-md`, `--space-inset-xs|sm`, `--text-label|caption`, `--font-weight-regular`, `--color-text-muted`, `--color-warning`, `--border-style-draft`, plus the field and chip tokens.

## Markup

```html
<fieldset class="ui-locale-pair">
  <legend class="ui-locale-pair__legend">Role</legend>
  <div class="ui-field"><label class="ui-field__label" for="role-en">English <span class="ui-chip" data-variant="outline">en</span></label>
    <input id="role-en" class="ui-input" lang="en"></div>
  <div class="ui-field" data-missing><label class="ui-field__label" for="role-pt">Portuguese <span class="ui-chip" data-variant="outline">pt-BR</span></label>
    <input id="role-pt" class="ui-input" lang="pt-BR" aria-describedby="role-pt-missing">
    <p class="ui-locale-pair__missing" id="role-pt-missing"><!-- triangle-alert --> Required in pt-BR before this can be Published.</p></div>
</fieldset>
```
