import { icons } from "./icons.js";

const PORTRAIT = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop";

const button = (attrs, label) => `<button type="button" class="ui-button" ${attrs}>${label}</button>`;
const states = (attrs, label) => [
  ["Default", button(attrs, label)],
  ["Hover", button(`${attrs} data-gallery-state="hover"`, label)],
  ["Active", button(`${attrs} data-gallery-state="active"`, label)],
  ["Focus", button(`${attrs} data-gallery-state="focus"`, label)],
  ["Disabled", button(`${attrs} disabled`, label)],
];

const themeSwitch = (state = "") =>
  `<div class="ui-segmented" role="group" aria-label="Theme">
    <button type="button" aria-pressed="true" aria-label="Dark theme" ${state}>${icons.moon}</button>
    <button type="button" aria-pressed="false" aria-label="Light theme">${icons.sun}</button>
  </div>`;

const localeSwitch = (current, hover = "") =>
  `<nav class="ui-segmented" aria-label="Language">
    <a href="#" lang="en" aria-label="English" ${current === "en" ? 'aria-current="true"' : ""}>EN</a>
    <a href="#" lang="pt-BR" aria-label="Português" ${current === "pt" ? 'aria-current="true"' : ""} ${hover}>PT</a>
  </nav>`;

/** Gallery entries for the shared components: each has its doc file and a list of [state label, markup]. */
export const shared = [
  {
    name: "Button",
    doc: "button",
    groups: [
      ["Primary", states("", "Download CV")],
      ["Secondary", states('data-variant="secondary"', "Save draft")],
      ["Ghost", states('data-variant="ghost"', "Cancel")],
      ["Danger", states('data-variant="danger"', "Delete")],
      [
        "Sizes, icon, loading, long pt-BR",
        [
          ["Small", button('data-size="sm"', "Edit")],
          ["Large with icon", button('data-size="lg"', `${icons.download}<span>Download CV</span>`)],
          ["Loading", button('aria-busy="true"', `${icons.spinner}<span>Publishing…</span>`)],
          ["pt-BR", button('data-size="lg"', `${icons.download}<span>Baixar currículo</span>`)],
          [
            "Wraps, never truncates",
            `<div style="max-width: 9rem">${button('data-variant="secondary"', "Salvar rascunho e continuar editando")}</div>`,
          ],
        ],
      ],
    ],
  },
  {
    name: "Link",
    doc: "link",
    groups: [
      [
        "Inline",
        [
          ["Default", `<p>Write to <a class="ui-link" href="#">hello@example.com</a> any time.</p>`],
          ["Hover", `<p>Write to <a class="ui-link" href="#" data-gallery-state="hover">hello@example.com</a>.</p>`],
          ["Focus", `<p>Write to <a class="ui-link" href="#" data-gallery-state="focus">hello@example.com</a>.</p>`],
        ],
      ],
      [
        "Standalone",
        [
          ["Default", `<a class="ui-link" data-variant="standalone" href="#">Experience</a>`],
          ["Hover", `<a class="ui-link" data-variant="standalone" href="#" data-gallery-state="hover">Experience</a>`],
          ["Current", `<a class="ui-link" data-variant="standalone" href="#" aria-current="page">Experience</a>`],
          ["Muted", `<a class="ui-link" data-variant="standalone" data-tone="muted" href="#">LinkedIn</a>`],
          ["pt-BR", `<a class="ui-link" data-variant="standalone" href="#">Experiência</a>`],
        ],
      ],
    ],
  },
  {
    name: "Segmented switch",
    doc: "segmented",
    groups: [
      [
        "Theme (buttons) and Locale (links)",
        [
          ["Theme", themeSwitch()],
          [
            "Theme, hover on light",
            themeSwitch().replace('aria-pressed="false"', 'aria-pressed="false" data-gallery-state="hover"'),
          ],
          ["Theme, focus", themeSwitch('data-gallery-state="focus"')],
          ["Locale, en", localeSwitch("en")],
          ["Locale, pt-BR", localeSwitch("pt")],
          ["Locale, hover", localeSwitch("en", 'data-gallery-state="hover"')],
        ],
      ],
    ],
  },
  {
    name: "Chip",
    doc: "chip",
    groups: [
      [
        "Variants",
        [
          ["Inverse", `<span class="ui-chip">2024 — Present</span>`],
          ["Outline", `<span class="ui-chip" data-variant="outline">2022 — 2024</span>`],
          ["pt-BR", `<span class="ui-chip">2024 — Atual</span>`],
        ],
      ],
    ],
  },
  {
    name: "Avatar",
    doc: "avatar",
    groups: [
      [
        "Sizes, fallback, skeleton",
        [
          ["Medium", `<img class="ui-avatar" src="${PORTRAIT}" alt="Felipe Miranda Marreiros">`],
          ["Small", `<img class="ui-avatar" data-size="sm" src="${PORTRAIT}" alt="Felipe Miranda Marreiros">`],
          ["No photo yet", `<span class="ui-avatar" role="img" aria-label="Felipe Miranda Marreiros">FM</span>`],
          ["Skeleton", `<span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>`],
          [
            "Inline in display text",
            `<p class="gallery-display">Hi, I’m Felipe<img class="ui-avatar" data-size="inline" src="${PORTRAIT}" alt="">,</p>`,
          ],
        ],
      ],
    ],
  },
  {
    name: "Skip link",
    doc: "skip-link",
    groups: [
      [
        "Focused (hidden until then)",
        [
          ["Focus", `<a class="ui-skip-link ui-button" href="#" data-gallery-state="focus">Skip to content</a>`],
          ["pt-BR", `<a class="ui-skip-link ui-button" href="#" data-gallery-state="focus">Pular para o conteúdo</a>`],
        ],
      ],
    ],
  },
  {
    name: "Skeleton",
    doc: "skeleton",
    groups: [
      [
        "Primitives",
        [
          [
            "Line (body)",
            `<div aria-hidden="true" style="width: 16rem"><span class="ui-skeleton" data-shape="line"></span><span class="ui-skeleton" data-shape="line" style="width: 70%"></span></div>`,
          ],
          [
            "Line (title)",
            `<div aria-hidden="true" class="gallery-title" style="width: 12rem"><span class="ui-skeleton" data-shape="line"></span></div>`,
          ],
          [
            "Block",
            `<span class="ui-skeleton" data-shape="block" aria-hidden="true" style="width: 12rem; height: 4rem"></span>`,
          ],
          ["Circle", `<span class="ui-skeleton" data-shape="circle" aria-hidden="true"></span>`],
        ],
      ],
    ],
  },
];
