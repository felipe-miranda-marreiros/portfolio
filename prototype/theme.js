/**
 * The theme switch on every prototype page that has one: pressing Dark or Light sets the theme on the root, crossfades
 * to it where motion is allowed, and remembers the choice for the other pages. Each page also applies a stored Light
 * choice from an inline script in its head, before the first paint, so it never flashes dark.
 */
const root = document.documentElement;
const storageKey = "prototype-theme";
const buttons = [...document.querySelectorAll("[data-theme-choice]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function applyTheme(choice) {
  if (choice === "light") {
    root.dataset.theme = "light";
  } else {
    delete root.dataset.theme;
  }
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === choice));
  }
}

function chooseTheme(choice) {
  localStorage.setItem(storageKey, choice);
  if (!document.startViewTransition || reducedMotion.matches) {
    applyTheme(choice);
    return;
  }
  document.startViewTransition(() => applyTheme(choice));
}

applyTheme(localStorage.getItem(storageKey) === "light" ? "light" : "dark");
for (const button of buttons) {
  button.addEventListener("click", () => chooseTheme(button.dataset.themeChoice));
}
