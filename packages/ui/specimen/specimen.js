import "../src/styles.css";
import "./specimen.css";

const PAIRS = [
  ["--color-text", "--color-bg", 4.5],
  ["--color-text-muted", "--color-bg", 4.5],
  ["--color-text", "--color-surface-raised", 4.5],
  ["--color-text-muted", "--color-surface-raised", 4.5],
  ["--color-text-muted", "--color-surface-hover", 4.5],
  ["--color-text-inverse", "--color-surface-inverse", 4.5],
  ["--color-text-inverse-muted", "--color-surface-inverse", 4.5],
  ["--color-on-action", "--color-action", 4.5],
  ["--color-on-action", "--color-action-hover", 4.5],
  ["--color-danger", "--color-bg", 4.5],
  ["--color-success", "--color-bg", 4.5],
  ["--color-warning", "--color-bg", 4.5],
  ["--color-info", "--color-bg", 4.5],
  ["--color-border-control", "--color-bg", 3],
  ["--color-border-control", "--color-surface-raised", 3],
  ["--color-border-control", "--color-surface-hover", 3],
  ["--color-focus", "--color-bg", 3],
  ["--color-focus-inverse", "--color-surface-inverse", 3],
];

const RAMP = ["0", "50", "100", "200", "400", "500", "600", "800", "850", "900", "950"].map((s) => `--color-gray-${s}`);
const STATUS = ["red", "green", "amber", "blue"].flatMap((h) => [`--color-${h}-300`, `--color-${h}-700`]);
const SURFACES = [
  "bg",
  "surface-raised",
  "surface-hover",
  "surface-active",
  "surface-inverse",
  "action",
  "action-hover",
];
const SKELETON = ["--color-skeleton-base", "--color-skeleton-highlight"];

const ROLES = ["display", "headline", "title", "lead", "body", "label", "caption", "code"];
const SAMPLE = {
  en: "Hi, I’m Felipe, an AI engineer.",
  "pt-BR": "Oi, eu sou o Felipe, engenheiro de IA. Ações à vista: ç ã õ ê.",
};

const SPACE = ["1", "2", "3", "4", "6", "8", "10", "12", "16", "24"].map((s) => `--space-${s}`);
const SPACE_ROLES = [
  "inset-xs",
  "inset-sm",
  "inset-md",
  "inset-lg",
  "stack-xs",
  "stack-sm",
  "stack-md",
  "stack-lg",
  "stack-xl",
  "gap-sm",
  "gap-md",
  "gap-lg",
  "page-inline",
  "page-block",
  "section",
].map((s) => `--space-${s}`);
const SIZES = ["target-min", "target-touch", "control-sm", "control-md", "control-lg", "icon-sm", "icon-md"].map(
  (s) => `--size-${s}`,
);
const RADII = ["chip", "skeleton", "field", "surface", "action", "avatar"].map((s) => `--radius-${s}`);
const DURATIONS = ["instant", "quick", "moderate", "slow"].map((s) => `--duration-${s}`);
const Z = ["base", "sticky", "dropdown", "overlay", "modal", "toast"].map((s) => `--z-${s}`);

const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "style") el.style.cssText = v;
    else el.setAttribute(k, v);
  }
  el.append(...kids);
  return el;
};

const section = (title, ...kids) => h("section", { class: "block" }, h("h2", {}, title), ...kids);
const token = (name, value = "") => h("code", { class: "name" }, value ? `${name}: ${value}` : name);

const read = (scope, name) => getComputedStyle(scope).getPropertyValue(name).trim();

/** Resolves a colour token to sRGB channels by letting the browser compute it on a probe element. */
const rgb = (scope, name) => {
  const probe = h("span", { style: `color: var(${name})` });
  scope.append(probe);
  const channels = getComputedStyle(probe)
    .color.match(/[\d.]+/g)
    .slice(0, 3)
    .map(Number);
  probe.remove();
  return channels;
};

const luminance = (c) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const hex = (c) => `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

const swatches = (scope, names) =>
  h(
    "ul",
    { class: "swatches" },
    ...names.map((n) =>
      h(
        "li",
        {},
        h("span", { class: "chip", style: `background: var(${n})` }),
        token(n),
        h("span", { class: "muted" }, hex(rgb(scope, n))),
      ),
    ),
  );

const pairs = (scope) =>
  h(
    "table",
    { class: "pairs" },
    h(
      "thead",
      {},
      h("tr", {}, h("th", {}, "Foreground"), h("th", {}, "Background"), h("th", {}, "Ratio"), h("th", {}, "Min")),
    ),
    h(
      "tbody",
      {},
      ...PAIRS.map(([fg, bg, min]) => {
        const r = ratio(rgb(scope, fg), rgb(scope, bg));
        const ok = r >= min;
        return h(
          "tr",
          {},
          h("td", {}, h("span", { class: "dot", style: `background: var(${fg})` }), token(fg)),
          h("td", {}, h("span", { class: "dot", style: `background: var(${bg})` }), token(bg)),
          h("td", { class: ok ? "" : "fail" }, `${r.toFixed(2)}${ok ? "" : " fails"}`),
          h("td", {}, `${min}:1`),
        );
      }),
    ),
  );

const typeRoles = () =>
  h(
    "div",
    { class: "stack" },
    ...ROLES.map((role) =>
      h(
        "div",
        { class: `role role-${role}`, style: `--role-font: var(--text-${role})` },
        token(`--text-${role}`),
        h("p", { lang: "en" }, SAMPLE.en),
        h("p", { lang: "pt-BR" }, SAMPLE["pt-BR"]),
      ),
    ),
  );

const bars = (scope, names, prop) =>
  h(
    "ul",
    { class: "bars" },
    ...names.map((n) =>
      h("li", {}, token(n, read(scope, n)), h("span", { class: "bar", style: `${prop}: var(${n})` })),
    ),
  );

const skeleton = () =>
  h(
    "div",
    { class: "skeleton-demo", "aria-busy": "true" },
    h("span", { class: "sk sk-circle", "aria-hidden": "true" }),
    h(
      "span",
      { class: "sk-lines", "aria-hidden": "true" },
      h("span", { class: "sk sk-line" }),
      h("span", { class: "sk sk-line short" }),
    ),
    h("span", { class: "sk sk-block", "aria-hidden": "true" }),
    h("span", { class: "visually-hidden", role: "status" }, "Loading the skeleton specimen"),
  );

const render = (scope) => {
  const theme = scope.dataset.theme;
  scope.append(
    h("h2", { class: "theme-title" }, theme === "dark" ? "Dark (default)" : "Light"),
    section(
      "Colour: semantic surfaces",
      swatches(
        scope,
        SURFACES.map((s) => `--color-${s}`),
      ),
    ),
    section("Colour: contrast pairs", pairs(scope)),
    section("Colour: primitives", swatches(scope, RAMP), swatches(scope, STATUS), swatches(scope, SKELETON)),
    section("Typography: roles", typeRoles()),
    section("Spacing: primitives", bars(scope, SPACE, "width")),
    section("Spacing: semantic", bars(scope, SPACE_ROLES, "width")),
    section(
      "Sizing",
      h(
        "ul",
        { class: "boxes" },
        ...SIZES.map((n) =>
          h(
            "li",
            {},
            h("span", { class: "box", style: `width: var(${n}); height: var(${n})` }),
            token(n, read(scope, n)),
          ),
        ),
      ),
    ),
    section(
      "Radius",
      h(
        "ul",
        { class: "boxes" },
        ...RADII.map((n) => h("li", {}, h("span", { class: "box big", style: `border-radius: var(${n})` }), token(n))),
      ),
    ),
    section(
      "Border",
      h(
        "div",
        { class: "row" },
        h("span", { class: "outline" }, "Control border"),
        h("span", { class: "outline draft" }, "Draft (dashed)"),
        h("button", { type: "button", class: "focus-demo" }, "Tab to see focus"),
      ),
    ),
    section(
      "Elevation",
      h(
        "div",
        { class: "row" },
        h("span", { class: "card raised" }, "--shadow-raised"),
        h("span", { class: "card overlay" }, "--shadow-overlay"),
      ),
      h("p", { class: "muted" }, Z.map((n) => `${n}: ${read(scope, n)}`).join(" · ")),
    ),
    section(
      "Motion",
      h(
        "ul",
        { class: "boxes" },
        ...DURATIONS.map((n) =>
          h(
            "li",
            {},
            h("span", { class: "box mover", tabindex: "0", style: `transition-duration: var(${n})` }),
            token(n, read(scope, n)),
          ),
        ),
      ),
      h("p", { class: "muted" }, "Hover or focus a box. Under reduced motion every duration reads 0ms."),
    ),
    section(
      "Opacity",
      h(
        "div",
        { class: "row" },
        h("button", { type: "button", class: "action", disabled: "" }, "Disabled action"),
        h("span", { class: "scrim-demo" }, h("span", { class: "scrim" }), "Scrim"),
      ),
    ),
    section("Skeleton", skeleton()),
  );
};

for (const scope of document.querySelectorAll("[data-theme]")) render(scope);
