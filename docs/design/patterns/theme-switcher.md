# Theme switching

Demo: the switch at the top of `/patterns/`. Code: `packages/ui/src/theme/theme.ts` (exported as `@portfolio/ui/theme`, tested in `theme.test.ts`). Component: [segmented switch](../components/segmented.md). Foundation: [themes](../foundations/themes.md).

## Behaviour

- **Dark by default** in both apps, whatever the system preference.
- **An explicit choice of light is remembered** on that device (`localStorage`, key `theme`) and applied as `data-theme="light"` on `<html>`.
- **No flash.** `THEME_BOOT_SCRIPT` is inlined in `<head>` before the stylesheets, so a remembered light theme is applied before the first paint. If storage is blocked, the page stays dark and the switch still works for that page.
- **One cross-fade.** Switching uses a View Transition where supported and motion is allowed; otherwise it's instant. The change never depends on the animation: if the browser skips the transition, the theme is applied anyway.

## API

| Export | Use |
| --- | --- |
| `THEME_BOOT_SCRIPT` | Inline in `<head>`: Astro `<script is:inline set:html={THEME_BOOT_SCRIPT} />`; the CMS puts it in `index.html` |
| `bindThemeSwitch(group)` | Wires a segmented switch whose buttons carry `data-theme-choice="dark"` and `"light"` |
| `applyTheme(theme)`, `readTheme()`, `resolveTheme(value)` | For framework code that manages the switch itself (for example a React component) |

## Placement

- Portfolio: in the [site header](../components/site-header.md) controls, next to the Locale switch.
- CMS: in the [app shell](../components/app-shell.md) sidebar footer.

## Accessibility

The switch is a `role="group"` named "Theme" with two `aria-pressed` buttons ("Dark theme", "Light theme"). The choice is a preference, so nothing is announced on change; the pressed state says which is active.
