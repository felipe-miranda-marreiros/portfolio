# Site header

Code: `packages/ui/src/components/site-header/site-header.css`. Portfolio only.

## Purpose

The top of every Portfolio page: who this is (the wordmark), where to go (section links), and the two settings a Visitor may want first (Locale and theme). Not sticky: the introduction is the first thing to read, and nothing should sit over it.

## Anatomy

- **Wordmark**: the Owner's name as a standalone [link](link.md) to the Locale home (`.ui-site-header__mark`).
- **Section links**: a `<nav aria-label="Sections">` list of standalone links (`.ui-site-header__nav`).
- **Controls**: the Locale and theme [segmented switches](segmented.md) (`.ui-site-header__controls`).

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | One row: wordmark left; links, then controls, right |
| Below 56rem | Three rows: wordmark; controls; links. The links never hide behind a menu: two links don't earn one |

## States

| State | Look |
| --- | --- |
| Current section | The section's link has `aria-current="true"` and a 2px underline |
| Locale | The current Locale's segment is selected |
| Theme | The current theme's segment is pressed |
| Hover, focus | Per [link](link.md) and [segmented switch](segmented.md) |

Loading, error, empty and skeleton don't apply: the header renders from the Owner's name and fixed labels before any other Content.

## Accessibility

- `<header>` landmark; the [skip link](skip-link.md) comes before it in the DOM.
- Two navigation landmarks with distinct names: "Sections" and "Language".
- Links are at least 24px tall, 44px below the breakpoint (touch layouts).

## Content rules

- The wordmark is the Owner's full name from Content, never a logo image (there is no logo).
- Section labels are UI strings (i18next): "Experience", "Contact" / "Experiência", "Contato". Keep each to one or two words.

## Tokens

`--space-page-block`, `--space-page-inline`, `--space-gap-sm|md`, `--size-container-page`, `--size-target-min`, `--size-target-touch`, `--text-label`, `--text-size-md`, `--font-display`, `--radius-chip`, plus the link and segmented switch tokens.

## Markup

```html
<header class="ui-site-header">
  <a class="ui-site-header__mark ui-link" data-variant="standalone" href="/en">Felipe Miranda Marreiros</a>
  <nav class="ui-site-header__nav" aria-label="Sections">
    <ul><li><a class="ui-link" data-variant="standalone" href="#experience">Experience</a></li></ul>
  </nav>
  <div class="ui-site-header__controls"><!-- Locale and theme switches --></div>
</header>
```
