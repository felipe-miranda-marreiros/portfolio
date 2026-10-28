/**
 * Theme switching for both apps. Dark is the default whatever the system preference; an explicit choice of light
 * is remembered per device under `THEME_KEY` and applied as `data-theme="light"` on the root element.
 */

export type Theme = "dark" | "light";

type ThemeStorage = Pick<Storage, "getItem" | "setItem">;

export const THEME_KEY = "theme";

/**
 * Inline this in `<head>` before any stylesheet so a remembered light theme is applied before first paint.
 * Storage can throw (private windows, blocked site data), so failures leave the dark default.
 */
export const THEME_BOOT_SCRIPT = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch{}`;

/** Returns the theme to apply for a stored value: only an explicit "light" leaves the dark default. */
export function resolveTheme(stored: string | null): Theme {
  return stored === "light" ? "light" : "dark";
}

/** Reads the remembered theme, falling back to dark when storage is unavailable. */
export function readTheme(storage: ThemeStorage | undefined = globalThis.localStorage): Theme {
  try {
    return resolveTheme(storage?.getItem(THEME_KEY) ?? null);
  } catch {
    return "dark";
  }
}

/** Applies a theme to the root element and remembers it; a storage failure still applies it for this page. */
export function applyTheme(
  theme: Theme,
  root: HTMLElement = document.documentElement,
  storage: ThemeStorage | undefined = globalThis.localStorage,
): void {
  if (theme === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    storage?.setItem(THEME_KEY, theme);
  } catch {
    // Not remembered across visits, but the page still switches.
  }
}

/**
 * Wires a segmented theme switch whose buttons carry `data-theme-choice="dark|light"`:
 * marks the current one with `aria-pressed` and cross-fades on change where View Transitions exist.
 */
export function bindThemeSwitch(group: HTMLElement, root: HTMLElement = document.documentElement): void {
  const buttons = [...group.querySelectorAll<HTMLButtonElement>("[data-theme-choice]")];
  const sync = (theme: Theme) => {
    for (const button of buttons) button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
  };
  sync(root.dataset.theme === "light" ? "light" : "dark");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const theme = resolveTheme(button.dataset.themeChoice ?? null);
      const change = () => {
        applyTheme(theme, root);
        sync(theme);
      };
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || !("startViewTransition" in document)) return change();
      // A skipped transition (hidden page, rapid clicks) can drop the update, so the change is re-applied; it's idempotent.
      const transition = document.startViewTransition(change);
      transition.ready.catch(() => {});
      transition.finished
        .catch(() => {})
        .finally(() => {
          if ((root.dataset.theme === "light" ? "light" : "dark") !== theme) change();
        });
    });
  }
}
