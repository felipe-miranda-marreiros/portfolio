/** The prototype index's colour swatches, theme switch and motion specimen. */
const swatchNames = [
  "ground",
  "surface",
  "ink",
  "ink-secondary",
  "ink-muted",
  "tint",
  "hairline",
  "hairline-hover",
  "hairline-control",
  "hairline-input",
  "error",
];

// Both themes list the same tokens, so the lists are built once here rather than written twice in the page.
for (const list of document.querySelectorAll("[data-swatches]")) {
  for (const name of swatchNames) {
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.setProperty("--swatch", `var(--color-${name})`);
    const label = document.createElement("code");
    label.textContent = name;
    const item = document.createElement("li");
    item.append(swatch, label);
    list.append(item);
  }
}

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

const runButton = document.querySelector("[data-run]");
runButton.addEventListener("click", () => {
  const cell = runButton.closest(".panel-grid__cell");
  const running = !cell.hasAttribute("data-running");
  cell.toggleAttribute("data-running", running);
  runButton.setAttribute("aria-pressed", String(running));
});
