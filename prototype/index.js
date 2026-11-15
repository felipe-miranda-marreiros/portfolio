/** The prototype index's colour swatches, component cells, theme switch and motion specimen. */
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

/**
 * The index's component cells, in grid order: one entry per component, each with its states or cases as chips. `page`
 * names the component page to open when it isn't `index.html`, as for a component only About me shows.
 */
const components = [
  {
    slug: "button",
    name: "Button",
    note: "The filled action and the outlined secondary, on both themes and on About me's bands.",
    label: "Button states",
    states: ["default", "hover", "focus", "active", "disabled", "loading"],
  },
  {
    slug: "link",
    name: "Link",
    note: "Text with an arrow that leads somewhere, and its filled action variant.",
    label: "Link states",
    states: ["default", "hover", "focus", "active", "long content"],
  },
  {
    slug: "text-field",
    name: "Text field",
    note: "A label above a single-line or multi-line field, with a hint and an error message.",
    label: "Text field states",
    states: ["default", "hover", "focus", "disabled", "error"],
  },
  {
    slug: "chip",
    name: "Chip",
    note: "A short tag in the monospace, for technologies, token names and states. Static.",
    label: "Chip cases",
    states: ["default", "numerals", "long content"],
  },
  {
    slug: "toggle",
    name: "Toggle",
    note: "A segmented control with one option pressed: the theme switch and the language toggle.",
    label: "Toggle states",
    states: ["default", "hover", "focus", "active", "pressed"],
  },
  {
    slug: "panel-grid",
    name: "Panel grid",
    note: "Hairline cells that share their borders: this grid. The Portfolio only.",
    label: "Panel grid cell states",
    states: ["default", "hover", "focus", "active"],
  },
  {
    slug: "top-bar",
    name: "Top bar",
    note: "The Pages on the start side, the theme switch and the language toggle on the end side.",
    label: "Top bar Page states",
    states: ["default", "hover", "focus", "active", "current"],
  },
  {
    slug: "lineup",
    name: "Lineup",
    note: "About me's lists, set like a poster's billing. About me only.",
    label: "Lineup item states",
    states: ["default", "hover", "focus", "active", "no address"],
    page: "about-me.html",
  },
  {
    slug: "facts-panel",
    name: "Facts panel",
    note: "Home's 30-second read: the role line, then the other facts and the core technologies. The Portfolio only.",
    label: "Facts panel cases",
    states: ["default", "fewer facts", "long content"],
  },
  {
    slug: "role-entry",
    name: "Role entry",
    note: "One role on Experience: the period, place and work model beside the role. The Portfolio only.",
    label: "Role entry cases",
    states: ["default", "long content", "fewer parts"],
  },
  {
    slug: "footer",
    name: "Footer",
    note: "A title, the repository link, then the social links and email.",
    label: "Footer link states",
    states: ["default", "hover", "focus", "active", "long content"],
  },
];

// Built here rather than written in the page, so the page stays under the file size hook as components are added.
const componentGrid = document.querySelector("[data-components]");
for (const { slug, name, note, label, states, page = "index.html" } of components) {
  const cell = document.createElement("section");
  cell.className = `panel-grid__cell area-${slug}`;
  cell.dataset.linkHost = "";
  cell.setAttribute("aria-labelledby", `${slug}-cell-title`);
  const title = document.createElement("h2");
  title.className = "panel-grid__title";
  title.id = `${slug}-cell-title`;
  title.textContent = name;
  const text = document.createElement("p");
  text.className = "panel-grid__note";
  text.textContent = note;
  const chips = document.createElement("ul");
  chips.className = "chips";
  chips.setAttribute("aria-label", label);
  for (const state of states) {
    const chip = document.createElement("li");
    chip.className = "chip";
    chip.textContent = state;
    chips.append(chip);
  }
  const link = document.createElement("a");
  link.className = "panel-grid__link link";
  link.href = `components/${slug}/${page}`;
  link.textContent = `Open the ${name}`;
  cell.append(title, text, chips, link);
  componentGrid.append(cell);
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
