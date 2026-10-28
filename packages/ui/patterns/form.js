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

const field = (id, label, { value = "", hint = "", lang = "", area = false } = {}) => {
  const attrs = `id="${id}" name="${id}" class="ui-input" ${lang ? `lang="${lang}"` : ""} ${hint ? `aria-describedby="${id}-hint"` : ""}`;
  return `<div class="ui-field" data-field="${id}">
    <label class="ui-field__label" for="${id}">${label}</label>
    ${hint ? `<p class="ui-field__hint" id="${id}-hint">${hint}</p>` : ""}
    ${area ? `<textarea ${attrs}>${value}</textarea>` : `<input ${attrs} value="${value}">`}
  </div>`;
};

const pair = (name, legend, en, pt, area = false) => `<fieldset class="ui-locale-pair wide">
    <legend class="ui-locale-pair__legend">${legend}</legend>
    ${field(`${name}-en`, 'English <span class="ui-chip" data-variant="outline">en</span>', { value: en, lang: "en", area })}
    ${field(`${name}-pt`, 'Portuguese <span class="ui-chip" data-variant="outline">pt-BR</span>', { value: pt, lang: "pt-BR", area })}
  </fieldset>`;

const date = (name, legend, month, year, withPresent) => `<fieldset class="ui-date-field">
    <legend class="ui-date-field__legend">${legend}</legend>
    <div class="ui-date-field__inputs">
      <span class="ui-date-field__part"><label for="${name}-month">Month</label>
        <select id="${name}-month" class="ui-input ui-date-field__month">${MONTHS.map((m, i) => `<option ${i === month ? "selected" : ""}>${m}</option>`).join("")}</select></span>
      <span class="ui-date-field__part ui-field" data-field="${name}-year"><label for="${name}-year">Year</label>
        <input id="${name}-year" class="ui-input ui-date-field__year" inputmode="numeric" maxlength="4" value="${year}"></span>
    </div>
    ${withPresent ? `<label class="ui-checkbox"><input type="checkbox" id="${name}-present"> Present (I still work here)</label>` : ""}
  </fieldset>`;

/** Renders the Experience edit form used by the forms, error and dialog demos. */
export const renderForm = (icons) => `
  <div class="form-header">
    <h3>Software Engineer <span class="ui-status" data-status="draft" id="status">Draft</span></h3>
    <div class="row">
      <button type="submit" class="ui-button" data-variant="secondary" value="draft">Save draft</button>
      <button type="submit" class="ui-button" value="publish">Publish</button>
    </div>
  </div>
  <div id="summary-slot"></div>
  <div class="form-grid">
    ${pair("role", "Role", "Software Engineer", "")}
    ${field("company", "Company", { value: "" })}
    ${field("location", "Location", { hint: "City, or Remote.", value: "São Paulo" })}
    ${date("start", "Start", 1, "202")}
    ${date("end", "End", 11, "2021", true)}
    ${pair("summary", "Summary", "Payments API and the reconciliation services behind it.", "", true)}
  </div>
  <dialog class="ui-dialog" id="publish-dialog" aria-labelledby="publish-title">
    <h2 class="ui-dialog__title" id="publish-title">Publish “Software Engineer”?</h2>
    <p class="ui-dialog__body">It will appear on the Portfolio in English and Portuguese.</p>
    <div class="ui-dialog__actions">
      <button type="button" class="ui-button" data-variant="ghost" value="cancel" autofocus>Cancel</button>
      <button type="button" class="ui-button" value="confirm">Publish</button>
    </div>
  </dialog>
  <template id="error-icon">${icons.circleAlert}</template>`;

const LABELS = {
  "role-en": "Role (English)",
  "role-pt": "Role (Portuguese)",
  company: "Company",
  "start-year": "Start",
  "end-year": "End",
  "summary-pt": "Summary (Portuguese)",
};

/** Returns the problems for one submit intent; Publish adds the rule that every Locale is complete (ADR 0004). */
const validate = (form, intent) => {
  const value = (id) => form.querySelector(`#${id}`)?.value.trim() ?? "";
  const problems = [];
  if (!value("role-en")) problems.push(["role-en", "enter the role"]);
  if (!value("company")) problems.push(["company", "enter the company name"]);
  if (!/^\d{4}$/.test(value("start-year"))) problems.push(["start-year", "enter a year with four digits"]);
  if (!form.querySelector("#end-present").checked && !/^\d{4}$/.test(value("end-year")))
    problems.push(["end-year", "enter a year with four digits, or tick Present"]);
  if (intent === "publish") {
    if (!value("role-pt")) problems.push(["role-pt", "required to publish"]);
    if (!value("summary-pt")) problems.push(["summary-pt", "required to publish"]);
  }
  const order = Object.keys(LABELS);
  return problems.sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));
};

const showFieldErrors = (form, problems) => {
  const icon = form.querySelector("#error-icon").innerHTML;
  for (const node of form.querySelectorAll(".ui-field__error")) node.remove();
  for (const input of form.querySelectorAll("[aria-invalid]")) {
    input.removeAttribute("aria-invalid");
    input.setAttribute(
      "aria-describedby",
      (input.getAttribute("aria-describedby") ?? "").replace(/\S+-error/, "").trim(),
    );
  }
  for (const [id, message] of problems) {
    const input = form.querySelector(`#${id}`);
    const error = Object.assign(document.createElement("p"), { className: "ui-field__error", id: `${id}-error` });
    error.innerHTML = `${icon}<span>${message[0].toUpperCase()}${message.slice(1)}.</span>`;
    input.closest("[data-field]").append(error);
    input.setAttribute("aria-invalid", "true");
    input.setAttribute("aria-describedby", `${input.getAttribute("aria-describedby") ?? ""} ${id}-error`.trim());
  }
};

const showSummary = (form, problems) => {
  const slot = form.querySelector("#summary-slot");
  if (!problems.length) {
    slot.innerHTML = "";
    return;
  }
  const icon = form.querySelector("#error-icon").innerHTML;
  const noun = problems.length === 1 ? "There is 1 problem" : `There are ${problems.length} problems`;
  slot.innerHTML = `<div class="ui-message ui-error-summary" data-tone="danger" role="alert" tabindex="-1" aria-labelledby="summary-title">
      ${icon}<p class="ui-message__title" id="summary-title">${noun} with this entry</p>
      <div class="ui-message__body"><ul>${problems.map(([id, message]) => `<li><a class="ui-link" href="#${id}">${LABELS[id]}: ${message}</a></li>`).join("")}</ul></div>
    </div>`;
  slot.firstElementChild.focus();
};

/** Wires validation timing: nothing until the first submit, then each field re-checks as it changes. */
export const bindForm = (form, toast) => {
  let lastIntent = null;
  const dialog = form.querySelector("#publish-dialog");
  const present = form.querySelector("#end-present");

  present.addEventListener("change", () => {
    for (const id of ["end-month", "end-year"]) form.querySelector(`#${id}`).disabled = present.checked;
  });

  form.addEventListener("input", () => {
    if (!lastIntent) return;
    const problems = validate(form, lastIntent);
    showFieldErrors(form, problems);
    if (!problems.length) form.querySelector("#summary-slot").innerHTML = "";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    lastIntent = event.submitter?.value ?? "draft";
    const problems = validate(form, lastIntent);
    showFieldErrors(form, problems);
    showSummary(form, problems);
    if (problems.length) return;
    if (lastIntent === "draft") toast("success", "Saved as Draft.");
    else dialog.showModal();
  });

  form.querySelector("#summary-slot").addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link) return;
    event.preventDefault();
    form.querySelector(link.getAttribute("href"))?.focus();
  });

  dialog.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    dialog.close();
    if (button.value !== "confirm") return;
    const status = form.querySelector("#status");
    status.dataset.status = "published";
    status.textContent = "Published";
    toast("success", "Published.");
  });
};
