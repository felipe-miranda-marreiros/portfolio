# App shell

Code: `packages/ui/src/components/app-shell/app-shell.css`. CMS.

## Purpose

The frame of every CMS page: which section the Owner is in, the other sections, and the page's main action. Quiet by design ([surfaces](../foundations/principles.md#surfaces)): no display type, inversion only for the current section and the primary action. The rail holds only top-level sections; a section's own pages are listed on its [overview](overview.md), and each page leads back with a [breadcrumb](breadcrumb.md).

## Anatomy

- **Rail** `.ui-app-shell__rail` (`--size-rail`, 6rem, raised surface, divider on its edge, fixed to the viewport height):
  - **Brand** `.ui-app-shell__brand`: "CMS", linking to the Portfolio overview, the CMS's landing page. Its accessible name is "Portfolio CMS home".
  - **Sections**: a `<nav aria-label="Sections">` with `.ui-app-shell__nav` items, each an icon over a visible label. v1 has one, Portfolio; About me and Articles join only when they have pages, never as placeholders.
  - **Footer** `.ui-app-shell__footer`: the theme [segmented switch](segmented.md), stacked vertically to fit the rail, then a second `.ui-app-shell__nav` list with "View Portfolio" and "Sign out".
- **Main** `.ui-app-shell__main` (`<main>`): a **header** with a **heading** group (`.ui-app-shell__heading`: the [breadcrumb](breadcrumb.md) on pages inside a section, then `.ui-app-shell__title-row` with the page **title**, `<h1>` in the title role, and on edit pages the item's [status badge](status.md)) and its **actions** (one primary [button](button.md); Cancel, Save draft and Publish on edit pages), then the page content.

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | Rail beside main; the rail stays in view while main scrolls |
| Below 56rem | The rail becomes a bar across the top: brand and sections, then the footer controls, wrapping; items put the icon beside the label |

## States

| State | Trigger | Look |
| --- | --- | --- |
| Section | | Muted icon and label |
| Hover | `:hover` | `--color-surface-hover`, primary label |
| Current | `aria-current="page"`, on the section and every page inside it | `--color-surface-selected` fill, `--color-text-selected` label |
| Focus | `:focus-visible` | Focus ring |
| Loading (page) | | The shell renders at once; only main's content shows skeletons |

## Accessibility

- Landmarks: the rail's "Sections" `<nav>`, the breadcrumb `<nav>` and the `<main>`; a [skip link](skip-link.md) to `#main` comes first.
- Every rail item has a visible label, never an icon alone. The current section is marked with `aria-current="page"`, not only by fill.
- Rail items are at least `--size-control-lg` tall, 44px below the breakpoint. "Sign out" is a `<button>` (it acts); "View Portfolio" is a link that opens the public site.

## Content rules

Section labels are one or two short words ("Portfolio", "About me"), since they sit under an icon in 6rem. Page titles follow their overview row ("Skills"); edit pages take the item's title ("AI Engineer", or "New experience").

## Tokens

`--size-rail`, `--size-control-lg`, `--size-target-touch`, `--color-surface-raised`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-surface-hover`, `--color-surface-selected`, `--color-text-selected`, `--border-width-divider`, `--radius-field`, `--space-inset-xs|sm|md|lg`, `--space-stack-xs|sm|md|lg`, `--space-gap-sm`, `--space-page-inline`, `--text-caption|label|title`, `--font-weight-semibold`, `--text-size-md`, `--text-tracking-title`, `--font-display`, `--duration-quick`, `--ease-out`.

## Markup

```html
<div class="ui-app-shell">
  <aside class="ui-app-shell__rail">
    <a class="ui-app-shell__brand" href="/portfolio" aria-label="Portfolio CMS home">CMS</a>
    <nav aria-label="Sections"><ul class="ui-app-shell__nav">
      <li><a href="/portfolio" aria-current="page"><span class="ui-icon" data-size="md" aria-hidden="true"><!-- briefcase --></span><span>Portfolio</span></a></li>
    </ul></nav>
    <div class="ui-app-shell__footer"><!-- theme switch, View Portfolio, Sign out --></div>
  </aside>
  <main class="ui-app-shell__main" id="main" tabindex="-1">
    <header class="ui-app-shell__header">
      <div class="ui-app-shell__heading">
        <nav class="ui-breadcrumb" aria-label="Breadcrumb"><ol><li><a class="ui-link" data-variant="standalone" data-tone="muted" href="/portfolio">Portfolio</a></li></ol></nav>
        <div class="ui-app-shell__title-row"><h1 class="ui-app-shell__title">Experience</h1></div>
      </div>
      <div class="ui-app-shell__actions"><!-- Add experience --></div>
    </header>
  </main>
</div>
```
