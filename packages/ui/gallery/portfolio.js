import { icons } from "./icons.js";

const PORTRAIT = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop";

const COPY = {
  en: {
    nav: ["Experience", "Contact"],
    greeting: "Hi, I’m",
    role: "an AI engineer.",
    lead: "I ship software where language models do real work, and the tests that keep them honest.",
    cv: "Download CV",
    present: "Present",
    roles: ["AI Engineer", "Senior Software Engineer", "Software Engineer"],
    summary: "Agent workflows for internal tooling and the evaluation harness that gates every LLM feature.",
  },
  "pt-BR": {
    nav: ["Experiência", "Contato"],
    greeting: "Oi, eu sou o",
    role: "engenheiro de IA.",
    lead: "Entrego software em que modelos de linguagem fazem trabalho de verdade, e os testes que os mantêm confiáveis.",
    cv: "Baixar currículo",
    present: "Atual",
    roles: ["Engenheiro de IA", "Engenheiro de Software Sênior", "Engenheiro de Software"],
    summary: "Fluxos com agentes para ferramentas internas e o harness de avaliação que controla cada recurso com LLM.",
  },
};

const ORGS = ["Ponte Labs · São Paulo", "Tessera Saúde · Recife", "Atlas Pagamentos · São Paulo"];
const PERIODS = [
  ["2024-03", "2024"],
  ["2022-01/2024-02", "2022 — 2024"],
  ["2020-02/2021-12", "2020 — 2022"],
];

const header = (lang, current = 0) => {
  const t = COPY[lang];
  return `<header class="ui-site-header" lang="${lang}">
    <a class="ui-site-header__mark ui-link" data-variant="standalone" href="#">Felipe Miranda Marreiros</a>
    <nav class="ui-site-header__nav" aria-label="Sections"><ul>
      ${t.nav.map((n, i) => `<li><a class="ui-link" data-variant="standalone" href="#" ${i === current ? 'aria-current="true"' : ""}>${n}</a></li>`).join("")}
    </ul></nav>
    <div class="ui-site-header__controls">
      <nav class="ui-segmented" aria-label="Language">
        <a href="#" lang="en" aria-label="English" ${lang === "en" ? 'aria-current="true"' : ""}>EN</a>
        <a href="#" lang="pt-BR" aria-label="Português" ${lang === "pt-BR" ? 'aria-current="true"' : ""}>PT</a>
      </nav>
      <div class="ui-segmented" role="group" aria-label="Theme">
        <button type="button" aria-pressed="true" aria-label="Dark theme">${icons.moon}</button>
        <button type="button" aria-pressed="false" aria-label="Light theme">${icons.sun}</button>
      </div>
    </div>
  </header>`;
};

const intro = (lang) => {
  const t = COPY[lang];
  return `<section class="ui-intro" lang="${lang}">
    <h1 class="ui-intro__title">${t.greeting} <span class="ui-intro__name">Felipe<img class="ui-avatar" data-size="inline" src="${PORTRAIT}" alt="">,</span> ${t.role}</h1>
    <p class="ui-intro__lead">${t.lead}</p>
    <div class="ui-intro__actions">
      <a class="ui-button" data-size="lg" href="#" download>${icons.download}<span>${t.cv}</span></a>
      <a class="ui-link" href="#">hello@example.com</a>
    </div>
  </section>`;
};

const introSkeleton = () => `<section class="ui-intro" aria-busy="true">
    <h1 class="ui-intro__title"><span class="ui-skeleton" data-shape="line" aria-hidden="true"></span><span class="ui-skeleton" data-shape="line" aria-hidden="true" style="width: 70%"></span></h1>
    <p class="ui-intro__lead"><span class="ui-skeleton" data-shape="line" aria-hidden="true"></span><span class="ui-skeleton" data-shape="line" aria-hidden="true" style="width: 60%"></span></p>
    <div class="ui-intro__actions"><span class="ui-skeleton" data-shape="block" aria-hidden="true" style="width: 11rem; height: var(--size-control-lg); border-radius: var(--radius-action)"></span></div>
    <p class="ui-visually-hidden" role="status">Loading introduction</p>
  </section>`;

const entry = (lang, i, variant, withSummary = false) => {
  const t = COPY[lang];
  const [datetime, label] = PERIODS[i];
  const period = i === 0 ? `<span class="ui-chip">${label} — ${t.present}</span>` : label;
  return `<article class="ui-entry" data-variant="${variant}" lang="${lang}" ${i === 0 ? "data-current" : ""}>
    <p class="ui-entry__period"><time datetime="${datetime}">${period}</time></p>
    <h3 class="ui-entry__role">${t.roles[i]}</h3>
    <p class="ui-entry__org">${ORGS[i]}</p>
    ${withSummary ? `<p class="ui-entry__summary">${t.summary}</p>` : ""}
  </article>`;
};

const entrySkeleton = (variant) => `<article class="ui-entry" data-variant="${variant}" aria-hidden="true">
    <p class="ui-entry__period"><span class="ui-skeleton" data-shape="line" style="width: 7rem"></span></p>
    <h3 class="ui-entry__role"><span class="ui-skeleton" data-shape="line" style="width: 12ch"></span></h3>
    <p class="ui-entry__org"><span class="ui-skeleton" data-shape="line" style="width: 9rem"></span></p>
  </article>`;

const STACK = ["React", "React Native", "TypeScript", "Node.js", "Python", "PostgreSQL", "Docker"];

const band = (lang, count = STACK.length, loading = false) => {
  const items = loading
    ? ["100%", "60%"]
        .map(
          (width) =>
            `<li style="width: ${width}" aria-hidden="true"><span class="ui-skeleton" data-shape="line"></span></li>`,
        )
        .join("")
    : STACK.slice(0, count)
        .map((name) => `<li>${name}</li>`)
        .join("");
  return `<section class="ui-work-band ui-inverse" lang="${lang}" aria-labelledby="band-${lang}-${count}-${loading}" ${loading ? 'aria-busy="true"' : ""}>
    <div class="ui-work-band__inner">
      <h2 class="ui-work-band__label" id="band-${lang}-${count}-${loading}">Stack</h2>
      <ul class="ui-work-band__list">${items}</ul>
      ${loading ? '<p class="ui-visually-hidden" role="status">Loading stack</p>' : ""}
    </div>
  </section>`;
};

const footer = (lang) => `<footer class="ui-site-footer" lang="${lang}">
    <p>Felipe Miranda Marreiros</p>
    <ul>
      <li><a class="ui-link" data-variant="standalone" data-tone="muted" href="#">Email</a></li>
      <li><a class="ui-link" data-variant="standalone" data-tone="muted" href="#">GitHub</a></li>
      <li><a class="ui-link" data-variant="standalone" data-tone="muted" href="#">LinkedIn</a></li>
    </ul>
  </footer>`;

/** Gallery entries for the Portfolio components, rendered full width because display type needs the room. */
export const portfolio = [
  {
    name: "Site header",
    doc: "site-header",
    groups: [
      [
        "Locales",
        [
          ["en, Experience current", header("en")],
          ["pt-BR", header("pt-BR", -1)],
        ],
      ],
    ],
  },
  {
    name: "Introduction",
    doc: "intro",
    groups: [
      [
        "Loaded and loading",
        [
          ["en", intro("en")],
          ["pt-BR", intro("pt-BR")],
          ["Loading", introSkeleton()],
        ],
      ],
    ],
  },
  {
    name: "Experience entry",
    doc: "entry",
    groups: [
      [
        "Row (full list)",
        [
          ["Current, with summary", entry("en", 0, "row", true)],
          ["pt-BR", entry("pt-BR", 1, "row", true)],
          ["Loading", entrySkeleton("row")],
        ],
      ],
    ],
  },
  {
    name: "Work band",
    doc: "work-band",
    groups: [
      [
        "Seven names, three names, loading",
        [
          ["Seven names", band("en")],
          ["Three names", band("en", 3)],
          ["Loading", band("en", 0, true)],
        ],
      ],
    ],
  },
  {
    name: "Site footer",
    doc: "site-footer",
    groups: [["Default", [["en", footer("en")]]]],
  },
];
