import "../src/styles.css";
import "./patterns.css";
import { icons } from "../gallery/icons.js";
import { bindThemeSwitch } from "../src/theme/theme.ts";
import { bindForm, renderForm } from "./form.js";

for (const slot of document.querySelectorAll("[data-icon]")) slot.outerHTML = icons[slot.dataset.icon];

bindThemeSwitch(document.getElementById("theme-switch"));

const ENTRY = {
  en: { period: "2024 — Present", role: "AI Engineer", org: "Ponte Labs · São Paulo" },
  "pt-BR": { period: "2024 — Atual", role: "Engenheiro de IA", org: "Ponte Labs · São Paulo" },
};

const entry = (locale) => {
  const t = ENTRY[locale];
  return `<p class="ui-entry__period"><time datetime="2024-03"><span class="ui-chip">${t.period}</span></time></p>
    <h3 class="ui-entry__role">${t.role}</h3><p class="ui-entry__org">${t.org}</p>`;
};

const languageDemo = document.getElementById("language-demo");
const languageEntry = document.getElementById("language-entry");
const showLocale = (link) => {
  for (const other of languageDemo.querySelectorAll("[data-locale]")) other.removeAttribute("aria-current");
  link.setAttribute("aria-current", "true");
  languageEntry.lang = link.dataset.locale;
  languageEntry.innerHTML = entry(link.dataset.locale);
  document.getElementById("language-url").textContent = link.getAttribute("href");
};
languageDemo.addEventListener("click", (event) => {
  const link = event.target.closest("[data-locale]");
  if (!link) return;
  event.preventDefault();
  showLocale(link);
});
showLocale(languageDemo.querySelector('[data-locale="en"]'));

const ROLES = [
  ["2024 — Present", "AI Engineer", "Ponte Labs · São Paulo"],
  ["2022 — 2024", "Senior Software Engineer", "Tessera Saúde · Recife"],
  ["2020 — 2022", "Software Engineer", "Atlas Pagamentos · São Paulo"],
];
const band = document.getElementById("loading-band");
const list = document.getElementById("loading-list");
const status = document.getElementById("loading-status");
const loaded = () =>
  ROLES.map(
    ([period, role, org], i) => `<li><article class="ui-entry" data-variant="compact">
      <p class="ui-entry__period"><time>${i === 0 ? `<span class="ui-chip">${period}</span>` : period}</time></p>
      <h4 class="ui-entry__role">${role}</h4><p class="ui-entry__org">${org}</p></article></li>`,
  ).join("");
const skeletons = () =>
  ROLES.map(
    () => `<li><article class="ui-entry" data-variant="compact" aria-hidden="true">
      <p class="ui-entry__period"><span class="ui-skeleton" data-shape="line" style="width: 7rem"></span></p>
      <h4 class="ui-entry__role"><span class="ui-skeleton" data-shape="line" style="width: 12ch"></span></h4>
      <p class="ui-entry__org"><span class="ui-skeleton" data-shape="line" style="width: 9rem"></span></p></article></li>`,
  ).join("");

list.innerHTML = loaded();
for (const button of document.querySelectorAll("[data-load]")) {
  button.addEventListener("click", () => {
    band.setAttribute("aria-busy", "true");
    list.innerHTML = skeletons();
    status.textContent = "Loading experience";
    setTimeout(() => {
      list.innerHTML = loaded();
      band.removeAttribute("aria-busy");
      status.textContent = "Experience loaded";
    }, Number(button.dataset.load));
  });
}

const toasts = document.getElementById("toasts");
const toast = (tone, message) => {
  const item = document.createElement("li");
  item.className = "ui-toast";
  item.dataset.tone = tone;
  item.innerHTML = `${tone === "danger" ? icons.circleAlert : icons.circleCheck}<p class="ui-toast__message">${message}</p>
    <button type="button" class="ui-button" data-variant="ghost" data-size="sm" aria-label="Dismiss">${icons.x}</button>`;
  item.querySelector("button").addEventListener("click", () => item.remove());
  toasts.append(item);
  if (tone !== "danger") setTimeout(() => item.remove(), 5000);
};

const form = document.getElementById("experience-form");
form.innerHTML = renderForm(icons);
bindForm(form, toast);
