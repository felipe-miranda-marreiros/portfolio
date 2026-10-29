# Breadcrumb

Code: `packages/ui/src/components/breadcrumb/breadcrumb.css`. CMS.

## Purpose

Where a CMS page sits and the way back up: "Portfolio" above Skills, "Portfolio / Experience" above an experience being edited. It replaces a second level of side navigation, so the [app shell](app-shell.md) rail stays minimal. Not for the Portfolio, whose single page has nothing above it, and not on a section's [overview](overview.md), which is the top of its section.

## Anatomy

- **Navigation** `.ui-breadcrumb`: a `<nav aria-label="Breadcrumb">` in the app shell heading, above the `<h1>`.
- **Trail**: an `<ol>` of muted standalone [links](link.md), one per page above the current one, separated by a slash drawn as generated content.

The current page isn't a crumb: the `<h1>` right under the trail names it.

## States

| State | Look |
| --- | --- |
| Crumb | Muted label, underlined like every standalone link |
| Hover, focus | Per [link](link.md) |

Loading, error, empty and skeleton don't apply: crumbs are fixed labels that render with the page, before its Content.

## Accessibility

- A named `<nav>` landmark with an ordered list, so screen readers announce "Breadcrumb, list, 2 items".
- The slash separators are generated content with empty alt text (`content: "/" / ""`), so they aren't read.
- Links are at least 24px tall, 44px below the breakpoint.

## Content rules

Crumbs use the page titles above ("Portfolio", "Experience"), one or two words each. The trail wraps rather than truncating.

## Tokens

`--text-label`, `--color-text-muted`, `--space-inset-sm`, `--size-target-min`, `--size-target-touch`, plus the link's tokens.

## Markup

```html
<nav class="ui-breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a class="ui-link" data-variant="standalone" data-tone="muted" href="/portfolio">Portfolio</a></li>
    <li><a class="ui-link" data-variant="standalone" data-tone="muted" href="/portfolio/experience">Experience</a></li>
  </ol>
</nav>
<h1 class="ui-app-shell__title">AI Engineer</h1>
```
