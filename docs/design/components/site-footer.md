# Site footer

Code: `packages/ui/src/components/site-footer/site-footer.css`. Portfolio only.

## Purpose

A quiet close to every Portfolio page: the Owner's name and secondary links (email, GitHub, LinkedIn). Not for navigation the Visitor needs (that's the header) or for legal text v1 doesn't have.

## Anatomy

- **Name**: the Owner's full name in caption type.
- **Links**: a list of muted standalone [links](link.md).

## Layout

One row with the name left and links right, wrapping onto two rows when narrow.

## States

Links follow the [link](link.md) states (muted, primary on hover). Loading, error, empty and skeleton don't apply: a link with no Content is left out, and with none at all only the name remains.

## Accessibility

- `<footer>` landmark. Link names are the service ("LinkedIn"), never icons alone.
- Links are 24px tall, 44px on touch layouts.

## Content rules

Link targets are Content (Profile). Labels are service names, which don't translate; "Email" becomes "E-mail" in `pt-BR`.

## Tokens

`--space-page-block`, `--space-page-inline`, `--space-gap-sm|md`, `--size-container-page`, `--size-target-min`, `--size-target-touch`, `--text-caption`, `--text-label`, `--color-text-muted`.

## Markup

```html
<footer class="ui-site-footer">
  <p>Felipe Miranda Marreiros</p>
  <ul><li><a class="ui-link" data-variant="standalone" data-tone="muted" href="https://github.com/…">GitHub</a></li></ul>
</footer>
```
