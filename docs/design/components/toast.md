# Toast

Code: `packages/ui/src/components/toast/toast.css`. CMS.

## Purpose

Brief feedback after an action: "Saved as Draft.", "Published.", "Couldn’t publish." Not for anything the Owner must read to continue ([inline message](message.md)) or decide ([dialog](dialog.md)).

## Anatomy

- **Region** `.ui-toast-region`: a list fixed to the bottom corner (`--z-toast`), at most `--size-toast` (24rem) wide, newest at the bottom.
- **Toast** `.ui-toast`: tone icon, message, an optional action (a link or a small secondary button), and a dismiss button.

## Variants

| `data-tone` | Icon | Behaviour |
| --- | --- | --- |
| `success` | circle-check | Leaves after about 5 seconds, paused while hovered or focused |
| `info` (default) | info | Same as success |
| `danger` | circle-alert | Stays until dismissed or retried |

## States

| State | Look |
| --- | --- |
| Entering | Fades in and rises over `--duration-moderate`; instant under reduced motion |
| Shown | Raised surface, control-grey outline, overlay shadow |
| Hover or focus | Timer paused |
| Dismissed | Removed; focus returns to where it was if it was inside the toast |

## Accessibility

- The region is a polite live region (`aria-live="polite"`), present from page load so additions are announced. Danger toasts may use `role="alert"`.
- The dismiss button has `aria-label="Dismiss"`. Actions are real links or buttons, reachable by keyboard.
- Toasts never take focus, and nothing important lives only in a toast that disappears.

## Content rules

One short sentence, past tense for results: "Saved as Draft." Errors say what failed and offer the fix ("Retry").

## Tokens

`--z-toast`, `--size-toast`, `--space-6|8|2`, `--space-stack-sm`, `--space-inset-sm|md`, `--color-surface-raised`, `--color-border-control`, `--color-text`, `--color-success|danger|info`, `--shadow-overlay`, `--radius-surface`, `--border-width-divider`, `--size-icon-md`, `--text-body`, `--duration-moderate`, `--ease-out`.

Component token: `--toast-tone`.

## Markup

```html
<ol class="ui-toast-region" aria-live="polite">
  <li class="ui-toast" data-tone="success">
    <span class="ui-icon" aria-hidden="true"><!-- circle-check --></span>
    <p class="ui-toast__message">Saved as Draft.</p>
    <button type="button" class="ui-button" data-variant="ghost" data-size="sm" aria-label="Dismiss"><!-- x --></button>
  </li>
</ol>
```
