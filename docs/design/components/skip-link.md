# Skip link

Code: `packages/ui/src/components/skip-link/skip-link.css`.

## Purpose

Lets keyboard and screen reader users jump past the header to the main content. Every page in both apps has exactly one, as its first focusable element.

## Anatomy

A primary [button](button.md) styled link (`class="ui-skip-link ui-button"`), pinned to the top-left corner.

## States

| State | Look |
| --- | --- |
| Default | Off-screen above the viewport, so it never covers the page |
| Focus | Slides in to the top-left corner (`--duration-quick`, instant under reduced motion), above everything (`--z-toast`), with the button's focus ring |
| Hover, active | As the primary button |

Disabled, loading, error, empty and skeleton don't apply.

## Accessibility

- `<a href="#main">`, where `#main` is the `<main id="main">` element (give it `tabindex="-1"` if focus doesn't land on it in every browser).
- Moves into view on focus rather than being `display: none`, so screen readers and keyboards both reach it.

## Content rules

"Skip to content" / "Pular para o conteúdo". In the CMS, English only.

## Tokens

`--space-4`, `--space-8`, `--z-toast`, `--duration-quick`, `--ease-out`, plus everything the primary button uses.

## Markup

```html
<a class="ui-skip-link ui-button" href="#main">Skip to content</a>
```
