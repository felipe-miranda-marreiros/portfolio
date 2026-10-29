import { icons } from "./icons.js";

const PORTRAIT = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop";
const pad = (html) => `<div class="gallery-pad">${html}</div>`;
let n = 0;
const id = (base) => `${base}-${++n}`;

const field = ({ label, value = "", hint = "", error = "", state = "", extra = "", area = false }) => {
  const fid = id("f");
  const describedBy = [hint && `${fid}-hint`, error && `${fid}-error`].filter(Boolean).join(" ");
  const attrs = `id="${fid}" class="ui-input" ${state} ${extra} ${error ? 'aria-invalid="true"' : ""} ${describedBy ? `aria-describedby="${describedBy}"` : ""}`;
  const control = area ? `<textarea ${attrs}>${value}</textarea>` : `<input ${attrs} value="${value}">`;
  return `<div class="ui-field">
    <label class="ui-field__label" for="${fid}">${label}</label>
    ${hint ? `<p class="ui-field__hint" id="${fid}-hint">${hint}</p>` : ""}
    ${control}
    ${error ? `<p class="ui-field__error" id="${fid}-error">${icons.circleAlert}<span>${error}</span></p>` : ""}
  </div>`;
};

const localeField = (locale, code, value, missing = false, area = false) => {
  const fid = id("lp");
  const control = area
    ? `<textarea id="${fid}" class="ui-input" lang="${code}" ${missing ? `aria-describedby="${fid}-m"` : ""}>${value}</textarea>`
    : `<input id="${fid}" class="ui-input" lang="${code}" value="${value}" ${missing ? `aria-describedby="${fid}-m"` : ""}>`;
  return `<div class="ui-field" ${missing ? "data-missing" : ""}>
    <label class="ui-field__label" for="${fid}">${locale} <span class="ui-chip" data-variant="outline">${code}</span></label>
    ${control}
    ${missing ? `<p class="ui-locale-pair__missing" id="${fid}-m">${icons.triangleAlert}<span>Required in ${code} before this can be Published.</span></p>` : ""}
  </div>`;
};

const pair = (legend, en, pt, missing = false, area = false) => `<fieldset class="ui-locale-pair">
    <legend class="ui-locale-pair__legend">${legend}</legend>
    ${localeField("English", "en", en, false, area)}
    ${localeField("Portuguese", "pt-BR", pt, missing, area)}
  </fieldset>`;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dateField = (legend, month, year, { present = false, withPresent = false } = {}) => {
  const fid = id("d");
  const off = present ? "disabled" : "";
  return `<fieldset class="ui-date-field">
    <legend class="ui-date-field__legend">${legend}</legend>
    <div class="ui-date-field__inputs">
      <span class="ui-date-field__part"><label for="${fid}-m">Month</label>
        <select id="${fid}-m" class="ui-input ui-date-field__month" ${off}>${MONTHS.map((m, i) => `<option ${i === month ? "selected" : ""}>${m}</option>`).join("")}</select></span>
      <span class="ui-date-field__part"><label for="${fid}-y">Year</label>
        <input id="${fid}-y" class="ui-input ui-date-field__year" inputmode="numeric" maxlength="4" value="${year}" ${off}></span>
    </div>
    ${withPresent ? `<label class="ui-checkbox"><input type="checkbox" ${present ? "checked" : ""}> Present (I still work here)</label>` : ""}
  </fieldset>`;
};

const checkbox = (label, attrs = "", labelAttrs = "") =>
  `<label class="ui-checkbox" ${labelAttrs}><input type="checkbox" ${attrs}> ${label}</label>`;

const upload = (state) => {
  const fid = id("u");
  const preview =
    state === "done"
      ? `<img class="ui-avatar" src="${PORTRAIT}" alt="Current portrait">`
      : `<span class="ui-avatar" role="img" aria-label="No portrait yet">FM</span>`;
  const title = {
    empty: "Drop a portrait here, or choose a file",
    dragover: "Drop to upload",
    uploading: "Uploading portrait.jpg…",
    done: "portrait.jpg",
    error: "That file couldn’t be used",
  }[state];
  const body =
    {
      uploading: `<progress max="100" value="62" aria-label="Upload progress">62%</progress>`,
      error: `<p class="ui-field__error">${icons.circleAlert}<span>The image is 640×640. Use one at least 800px on its shorter side.</span></p>`,
    }[state] ?? `<p class="ui-field__hint">JPG or PNG, at least 800px on the shorter side, up to 5 MB.</p>`;
  const actions =
    state === "uploading"
      ? `<button type="button" class="ui-button" data-variant="ghost" data-size="sm">Cancel</button>`
      : `<input type="file" id="${fid}" class="ui-visually-hidden" accept="image/jpeg,image/png">
         <label for="${fid}" class="ui-button" data-variant="secondary" data-size="sm">${icons.upload}<span>${state === "done" ? "Replace" : "Choose image"}</span></label>
         ${state === "done" ? `<button type="button" class="ui-button" data-variant="danger" data-size="sm">${icons.trash}<span>Remove</span></button>` : ""}`;
  return `<div class="ui-upload" data-state="${state}">
    ${preview}
    <div class="ui-upload__body">
      <p class="ui-upload__title">${title}</p>
      ${body}
      <div class="ui-upload__actions">${actions}</div>
    </div>
  </div>`;
};

/** Gallery entries for the CMS form components. */
export const cmsForms = [
  {
    name: "Text field and text area",
    doc: "field",
    groups: [
      [
        "States",
        [
          ["Default", pad(field({ label: "Company", value: "Ponte Labs" }))],
          ["Hover", pad(field({ label: "Company", value: "Ponte Labs", state: 'data-gallery-state="hover"' }))],
          ["Focus", pad(field({ label: "Company", value: "Ponte Labs", state: 'data-gallery-state="focus"' }))],
          [
            "Hint and placeholder",
            pad(field({ label: "Location", hint: "City, or Remote.", extra: 'placeholder="São Paulo"' })),
          ],
          ["Error", pad(field({ label: "Company", error: "Enter the company name." }))],
          ["Disabled", pad(field({ label: "Slug", value: "ponte-labs", extra: "disabled" }))],
          ["Read only", pad(field({ label: "Created", value: "12 Mar 2024", extra: "readonly" }))],
          [
            "Text area",
            pad(field({ label: "Notes (not published)", value: "Ask before naming the client.", area: true })),
          ],
        ],
      ],
    ],
  },
  {
    name: "Locale field pair",
    doc: "locale-pair",
    groups: [
      [
        "Complete and missing a Locale",
        [
          ["Complete", pad(pair("Role", "AI Engineer", "Engenheiro de IA"))],
          [
            "Missing pt-BR",
            pad(pair("Summary", "Agent workflows for internal tooling and the evaluation harness.", "", true, true)),
          ],
        ],
      ],
    ],
  },
  {
    name: "Date field",
    doc: "date-field",
    groups: [
      [
        "Start and end",
        [
          ["Start", pad(dateField("Start", 2, "2024"))],
          ["End, ongoing", pad(dateField("End", 0, "", { withPresent: true, present: true }))],
          ["End, finished", pad(dateField("End", 1, "2024", { withPresent: true }))],
        ],
      ],
    ],
  },
  {
    name: "Checkbox",
    doc: "checkbox",
    groups: [
      [
        "States",
        [
          ["Unchecked", pad(checkbox("Show on the Portfolio"))],
          ["Hover", pad(checkbox("Show on the Portfolio", "", 'data-gallery-state="hover"'))],
          ["Checked", pad(checkbox("Show on the Portfolio", "checked"))],
          ["Focus", pad(checkbox("Show on the Portfolio", 'checked data-gallery-state="focus"'))],
          ["Invalid", pad(checkbox("I confirm both Locales are reviewed", 'aria-invalid="true"'))],
          ["Disabled", pad(checkbox("Show on the Portfolio", "disabled checked"))],
          [
            "Group",
            pad(`<fieldset class="ui-checkbox-group">
              <legend class="ui-checkbox-group__legend">Stack (optional)</legend>
              ${checkbox("React", "checked")}${checkbox("React Native")}${checkbox("TypeScript", "checked")}${checkbox("PostgreSQL")}
            </fieldset>`),
          ],
        ],
      ],
    ],
  },
  {
    name: "Image upload",
    doc: "upload",
    groups: [
      [
        "States",
        [
          ["Empty", pad(upload("empty"))],
          ["Drag over", pad(upload("dragover"))],
          ["Uploading", pad(upload("uploading"))],
          ["Uploaded", pad(upload("done"))],
          ["Error", pad(upload("error"))],
        ],
      ],
    ],
  },
];
