import "../src/styles.css";
import "./gallery.css";
import { cmsFeedback } from "./cms-feedback.js";
import { cmsForms } from "./cms-forms.js";
import { portfolio } from "./portfolio.js";
import { shared } from "./shared.js";

const renderComponent = ({ name, doc, groups }, theme, stack = false) => `
  <section class="component" aria-labelledby="${doc}-${theme}">
    <h3 id="${doc}-${theme}">${name} <code>docs/design/components/${doc}.md</code></h3>
    ${groups
      .map(
        ([title, items]) => `
      <h4>${title}</h4>
      <ul class="states" ${stack ? 'data-layout="stack"' : ""}>
        ${items.map(([label, html]) => `<li><span class="state-label">${label}</span><div class="state-demo">${html}</div></li>`).join("")}
      </ul>`,
      )
      .join("")}
  </section>`;

const titleOf = (theme) => (theme === "dark" ? "Dark (default)" : "Light");

const SECTIONS = [
  [".themes > [data-theme]", "Shared", shared, false],
  ["#portfolio > [data-theme]", "Portfolio", portfolio, true],
  ["#cms > [data-theme]", "CMS", [...cmsForms, ...cmsFeedback], true],
];

for (const [selector, batch, components, stack] of SECTIONS) {
  for (const scope of document.querySelectorAll(selector)) {
    const { theme } = scope.dataset;
    scope.innerHTML = `<h2 class="theme-title">${batch} · ${titleOf(theme)}</h2>${components.map((c) => renderComponent(c, theme, stack)).join("")}`;
  }
}

// Content is rendered after load, so the browser's own jump to a #fragment has already happened.
if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
