# App shell

Code: `packages/ui/src/components/app-shell/app-shell.css`. CMS.

## Purpose

The frame of every CMS page: where the Owner is, where else they can go, and the page's main action. Quiet by design ([surfaces](../foundations/principles.md#surfaces)): no display type, inversion only for the current item and the primary action.

## Anatomy

- **Sidebar** `.ui-app-shell__sidebar` (`--size-sidebar`, 16rem, raised surface, divider on its edge):
  - **Brand** `.ui-app-shell__brand`: "Portfolio CMS", linking to the dashboard.
  - **Content navigation**: a `<nav aria-label="Content">` with `.ui-app-shell__nav` items (icon and label): Profile, Experience, Skills, Media. The final list follows the Content types decided in roadmap phase 4.
  - **Footer** `.ui-app-shell__footer`: the theme [segmented switch](segmented.md), then a second `.ui-app-shell__nav` list with "View Portfolio" and "Sign out".
- **Main** `.ui-app-shell__main` (`<main>`): a **header** with the page **title** (`<h1>`, title role) and its **actions** (one primary [button](button.md)), then the page content.

## Layout

| Width | Arrangement |
| --- | --- |
| 56rem and up | Sidebar beside main, full height |
| Below 56rem | Sidebar on top: brand, navigation as wrapping items, footer in a row; main below |

## States

| State | Trigger | Look |
| --- | --- | --- |
| Nav item | | Muted label |
| Hover | `:hover` | `--color-surface-hover`, primary label |
| Current | `aria-current="page"` | `--color-surface-selected` fill, `--color-text-selected` label |
| Focus | `:focus-visible` | Focus ring |
| Loading (page) | | The shell renders at once; only main's content shows skeletons |

## Accessibility

- Landmarks: the sidebar's `<nav>` and the `<main>`; a [skip link](skip-link.md) to `#main` comes first.
- The current page is marked with `aria-current="page"`, not only by fill.
- Nav items are 32px tall with a pointer, 44px below the breakpoint. "Sign out" is a `<button>` (it acts); "View Portfolio" is a link that opens the public site.

## Content rules

Navigation labels are Content type names, plural where they're lists ("Skills"), singular for Profile. The page title matches the current nav item.

## Tokens

`--size-sidebar`, `--size-control-sm`, `--size-target-touch`, `--color-surface-raised`, `--color-border`, `--color-text`, `--color-text-muted`, `--color-surface-hover`, `--color-surface-selected`, `--color-text-selected`, `--border-width-divider`, `--radius-field`, `--space-inset-xs|sm|md|lg`, `--space-stack-xs|sm|md|lg`, `--space-gap-sm`, `--space-page-inline`, `--text-label|title`, `--text-size-md`, `--text-tracking-title`, `--font-display`, `--duration-quick`, `--ease-out`.

## Markup

```html
<div class="ui-app-shell">
  <aside class="ui-app-shell__sidebar">
    <a class="ui-app-shell__brand" href="/">Portfolio CMS</a>
    <nav aria-label="Content"><ul class="ui-app-shell__nav">
      <li><a href="/experience" aria-current="page"><span class="ui-icon" aria-hidden="true"><!-- briefcase --></span><span>Experience</span></a></li>
    </ul></nav>
    <div class="ui-app-shell__footer"><!-- theme switch, View Portfolio, Sign out --></div>
  </aside>
  <main class="ui-app-shell__main" id="main" tabindex="-1">
    <header class="ui-app-shell__header"><h1 class="ui-app-shell__title">Experience</h1><div class="ui-app-shell__actions"><!-- Add experience --></div></header>
  </main>
</div>
```
