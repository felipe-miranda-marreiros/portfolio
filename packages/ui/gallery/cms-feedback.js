import { icons } from "./icons.js";

const pad = (html) => `<div class="gallery-pad">${html}</div>`;
const draft = `<span class="ui-status" data-status="draft">Draft</span>`;
const published = `<span class="ui-status" data-status="published">${icons.check}<span>Published</span></span>`;

const ROWS = [
  ["AI Engineer", "Ponte Labs · 2024 — Present", published],
  ["Senior Software Engineer", "Tessera Saúde · 2022 — 2024", published],
  ["Software Engineer", "Atlas Pagamentos · 2020 — 2022", draft],
];

const rowActions = (title) => `<div class="ui-content-list__actions">
    <a class="ui-button" data-variant="ghost" data-size="sm" href="#">${icons.pencil}<span>Edit<span class="ui-visually-hidden"> ${title}</span></span></a>
    <button type="button" class="ui-button" data-variant="ghost" data-size="sm" aria-label="Delete ${title}">${icons.trash}</button>
  </div>`;

const table = (body, busy = false) => `<table class="ui-content-list" ${busy ? 'aria-busy="true"' : ""}>
    <caption class="ui-visually-hidden">Experience</caption>
    <thead><tr><th scope="col">Role</th><th scope="col">Company and period</th><th scope="col">Status</th><th scope="col"><span class="ui-visually-hidden">Actions</span></th></tr></thead>
    <tbody>${body}</tbody>
  </table>`;

const list = (hoverFirst = false) =>
  table(
    ROWS.map(
      ([title, detail, status], i) =>
        `<tr ${hoverFirst && i === 0 ? 'data-gallery-state="hover"' : ""}><td class="ui-content-list__title">${title}</td><td class="ui-content-list__detail">${detail}</td><td>${status}</td><td>${rowActions(title)}</td></tr>`,
    ).join(""),
  );

const skeletonRow = `<tr aria-hidden="true">
    <td><span class="ui-skeleton" data-shape="line" style="width: 12rem"></span></td>
    <td><span class="ui-skeleton" data-shape="line" style="width: 14rem"></span></td>
    <td><span class="ui-skeleton" data-shape="line" style="width: 5rem"></span></td>
    <td></td></tr>`;

const empty = `<div class="ui-content-list__empty">
    <strong>No experience yet</strong>
    <p>Add a role to show it on the Portfolio once it’s Published in both Locales.</p>
    <a class="ui-button" href="#">${icons.plus}<span>Add experience</span></a>
  </div>`;

const message = (
  tone,
  icon,
  title,
  body,
) => `<div class="ui-message" data-tone="${tone}" role="${tone === "danger" ? "alert" : "status"}">
    ${icon}<p class="ui-message__title">${title}</p><p class="ui-message__body">${body}</p>
  </div>`;

const summary = (
  focus = false,
) => `<div class="ui-message ui-error-summary" data-tone="danger" role="alert" tabindex="-1" aria-labelledby="sum-${focus}" ${focus ? 'data-gallery-state="focus"' : ""}>
    ${icons.circleAlert}<p class="ui-message__title" id="sum-${focus}">There are 2 problems with this entry</p>
    <div class="ui-message__body"><ul>
      <li><a class="ui-link" href="#">Company: enter the company name</a></li>
      <li><a class="ui-link" href="#">Start: enter a year with four digits</a></li>
    </ul></div>
  </div>`;

const dialog = (danger) => `<dialog class="ui-dialog" open data-gallery-static aria-labelledby="dlg-${danger}">
    <h2 class="ui-dialog__title" id="dlg-${danger}">${danger ? "Delete “Software Engineer”?" : "Publish “AI Engineer”?"}</h2>
    <p class="ui-dialog__body">${danger ? "It will be removed from the CMS and, if Published, from the Portfolio. This can’t be undone." : "It will appear on the Portfolio in English and Portuguese."}</p>
    <div class="ui-dialog__actions">
      <button type="button" class="ui-button" data-variant="ghost">Cancel</button>
      <button type="button" class="ui-button" ${danger ? 'data-variant="danger"' : ""}>${danger ? "Delete" : "Publish"}</button>
    </div>
  </dialog>`;

const toast = (tone, icon, text, action = "") => `<div class="ui-toast" data-tone="${tone}">
    ${icon}<p class="ui-toast__message">${text}</p>${action}
    <button type="button" class="ui-button" data-variant="ghost" data-size="sm" aria-label="Dismiss">${icons.x}</button>
  </div>`;

const shell = `<div class="ui-app-shell gallery-shell">
    <aside class="ui-app-shell__sidebar">
      <a class="ui-app-shell__brand" href="#">Portfolio CMS</a>
      <nav aria-label="Content"><ul class="ui-app-shell__nav">
        <li><a href="#">${icons.user}<span>Profile</span></a></li>
        <li><a href="#" aria-current="page">${icons.briefcase}<span>Experience</span></a></li>
        <li><a href="#" data-gallery-state="hover">${icons.list}<span>Skills</span></a></li>
      </ul></nav>
      <div class="ui-app-shell__footer">
        <div class="ui-segmented" role="group" aria-label="Theme">
          <button type="button" aria-pressed="true" aria-label="Dark theme">${icons.moon}</button>
          <button type="button" aria-pressed="false" aria-label="Light theme">${icons.sun}</button>
        </div>
        <ul class="ui-app-shell__nav">
          <li><a href="#">${icons.externalLink}<span>View Portfolio</span></a></li>
          <li><button type="button">${icons.logOut}<span>Sign out</span></button></li>
        </ul>
      </div>
    </aside>
    <main class="ui-app-shell__main">
      <header class="ui-app-shell__header">
        <h1 class="ui-app-shell__title">Experience</h1>
        <div class="ui-app-shell__actions"><a class="ui-button" href="#">${icons.plus}<span>Add experience</span></a></div>
      </header>
      ${list()}
    </main>
  </div>`;

/** Gallery entries for the CMS status, list, feedback and frame components. */
export const cmsFeedback = [
  {
    name: "Status badge",
    doc: "status",
    groups: [
      [
        "Draft and Published",
        [
          ["Draft", pad(draft)],
          ["Published", pad(published)],
        ],
      ],
    ],
  },
  {
    name: "Content list",
    doc: "content-list",
    groups: [
      [
        "Loaded, hover, loading, empty",
        [
          ["Loaded, first row hovered", pad(list(true))],
          [
            "Loading",
            pad(
              `${table(skeletonRow.repeat(3), true)}<p class="ui-visually-hidden" role="status">Loading experience</p>`,
            ),
          ],
          ["Empty", pad(empty)],
        ],
      ],
    ],
  },
  {
    name: "Inline message",
    doc: "message",
    groups: [
      [
        "Tones",
        [
          [
            "Info",
            pad(message("info", icons.info, "Changes aren’t live yet", "Publish to show this entry on the Portfolio.")),
          ],
          [
            "Success",
            pad(message("success", icons.circleCheck, "Published", "This entry is live in English and Portuguese.")),
          ],
          [
            "Warning",
            pad(
              message(
                "warning",
                icons.triangleAlert,
                "Missing Portuguese",
                "Fill in every pt-BR field before publishing.",
              ),
            ),
          ],
          [
            "Danger",
            pad(
              message(
                "danger",
                icons.circleAlert,
                "Couldn’t save",
                "The connection dropped. Your changes are kept here; try again.",
              ),
            ),
          ],
        ],
      ],
    ],
  },
  {
    name: "Form error summary",
    doc: "error-summary",
    groups: [["After a failed save", [["Focused", pad(summary(true))]]]],
  },
  {
    name: "Dialog",
    doc: "dialog",
    groups: [
      [
        "Confirmations (shown in place; the real one is modal)",
        [
          ["Publish", pad(dialog(false))],
          ["Delete", pad(dialog(true))],
        ],
      ],
    ],
  },
  {
    name: "Toast",
    doc: "toast",
    groups: [
      [
        "Tones (shown in place; the real region is fixed to the corner)",
        [
          [
            "Stack",
            pad(`<div class="ui-toast-region" data-gallery-static aria-live="polite">
              ${toast("success", icons.circleCheck, "Saved as Draft.")}
              ${toast("success", icons.circleCheck, "Published.", '<a class="ui-link" href="#">View</a>')}
              ${toast("danger", icons.circleAlert, "Couldn’t publish. Try again.", '<button type="button" class="ui-button" data-variant="secondary" data-size="sm">Retry</button>')}
            </div>`),
          ],
        ],
      ],
    ],
  },
  { name: "App shell", doc: "app-shell", groups: [["Experience page", [["Desktop", shell]]]] },
];
