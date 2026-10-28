# Language switching

Demo: `/patterns/#p-language`. Component: [segmented switch](../components/segmented.md) (Locale variant). Foundation: [i18n](../foundations/i18n.md#switching-locale).

## Behaviour

- Each Locale has its own URL: `/en/…` and `/pt-br/…` ([roadmap settled decisions](../../roadmap/00-overview.md#settled-decisions)). The switch is two **links**, not buttons, because switching Locale is navigation.
- Each link points at **the same page and section** in the other Locale: `/en/#experience` ↔ `/pt-br/#experience`. Only the Locale prefix changes; the path and fragment stay.
- `/` redirects by `Accept-Language`, defaulting to `en`. After that, the URL is the only source of truth: no cookie or stored preference overrides a link someone shared.
- Every Published page exists in both Locales ([ADR 0004](../../adr/0004-publish-requires-both-locales.md)), so a switch link never leads to a missing page.

## Placement

The Portfolio's [site header](../components/site-header.md), before the theme switch. The CMS has no Locale switch: its UI is English, and Content is edited in both Locales side by side ([locale field pair](../components/locale-pair.md)).

## Accessibility

- A `<nav aria-label="Language">`. Each link carries `lang` and an accessible name in its own language ("English", "Português"), so a screen reader pronounces it correctly.
- The current Locale has `aria-current="true"`.
- `<html lang>` matches the page's Locale, and `hreflang` alternates link the two versions for search engines.
