# Button

Code: `packages/ui/src/components/button/button.css`.

## Purpose

Starts an action: download the CV, save, publish, delete, cancel. Not for going somewhere: navigation is a [link](link.md), even when it looks important. A link styled as a button (`<a class="ui-button">`) is allowed only for a download or a single call to action that leaves the page, such as Download CV.

## Anatomy

- **Container**: the pill (`.ui-button`).
- **Icon** (optional): a leading [icon](icon.md) at `--size-icon-sm`.
- **Label**: always present, even with an icon.
- **Spinner** (loading only): `.ui-button__spinner`, a Lucide `loader-circle`.

## Variants and sizes

| Variant | `data-variant` | Use |
| --- | --- | --- |
| Primary | (none) | The one main action in a region: Download CV, Publish |
| Secondary | `secondary` | Other actions next to a primary: Save draft |
| Ghost | `ghost` | Low-emphasis actions in toolbars and dialogs: Cancel |
| Danger | `danger` | Destructive actions: Delete. Always confirmed in a dialog |

Sizes (`data-size`): `sm` (32px, 44px on touch) for dense CMS rows; `md` (44px, default); `lg` (52px) for the Portfolio's primary action. One primary per region.

## States

| State | How it's triggered | Look |
| --- | --- | --- |
| Default | | Primary: inverse fill. Secondary: outline in `--color-border-control`. Ghost: text only. Danger: text and outline in `--color-danger` |
| Hover | `:hover` | Primary `--color-action-hover`; others `--color-surface-hover` |
| Active | `:active` | Primary `--color-action-active`; others `--color-surface-active`; changes in `--duration-instant` |
| Focus | `:focus-visible` | 2px outline in `--color-focus`, offset `--border-focus-offset` |
| Disabled | `disabled` (or `aria-disabled="true"` on a link) | `--opacity-disabled`, `cursor: not-allowed`, no hover or active |
| Loading | `aria-busy="true"` | Spinner shown, label changes to the action in progress ("Publishing…"), no hover or active. The spinner stops under reduced motion; the label still says what's happening |

Error, empty, selected and skeleton don't apply: a button shows its result elsewhere (toast, inline message), and buttons render with the page, never loaded on their own.

## Accessibility

- `<button type="button">` for actions, `type="submit"` in forms. `<a class="ui-button" href>` only for a download or navigation.
- An icon-only button needs `aria-label`; the icon is `aria-hidden`.
- Keep a busy button focusable so focus isn't lost; repeat clicks are ignored while `aria-busy="true"`.
- Target at least 24×24px; `sm` grows to 44px on coarse pointers.

## Content rules

- A verb, or verb plus object: "Download CV", "Save draft", "Publish". Never "OK" or "Submit".
- Labels wrap and the button grows; never truncate. "Baixar currículo" is the longest Portfolio label; CMS labels stay under about 25 `pt-BR`-length characters.
- Loading labels end with an ellipsis character: "Publishing…".

## Tokens

`--color-action`, `--color-action-hover`, `--color-action-active`, `--color-on-action`, `--color-surface-hover`, `--color-surface-active`, `--color-border-control`, `--color-danger`, `--color-focus`, `--size-control-sm|md|lg`, `--size-target-min`, `--size-target-touch`, `--size-icon-sm`, `--space-inset-xs|sm|md|lg`, `--radius-action`, `--border-width-control`, `--border-width-focus`, `--border-focus-offset`, `--text-label`, `--text-size-md`, `--opacity-disabled`, `--duration-instant|quick|spinner`, `--ease-out`.

Component tokens (internal knobs): `--button-height`, `--button-padding-inline`, `--button-bg`, `--button-bg-hover`, `--button-bg-active`, `--button-fg`, `--button-border`.

## Markup

```html
<button type="button" class="ui-button" data-variant="secondary">Save draft</button>

<a class="ui-button" data-size="lg" href="/cv.pdf" download>
  <span class="ui-icon" aria-hidden="true"><!-- lucide download --></span>
  <span>Download CV</span>
</a>

<button type="button" class="ui-button" aria-busy="true">
  <span class="ui-icon ui-button__spinner" aria-hidden="true"><!-- lucide loader-circle --></span>
  <span>Publishing…</span>
</button>
```
