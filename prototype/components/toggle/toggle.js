/**
 * Toggle: pressing an option presses it alone in its group, and an indicator slides the pressed fill to it. Only a
 * Toggle of buttons slides: the language toggle's links load another Page, whose current option fills itself. Without
 * this script each pressed option fills itself too, so the indicator is an enhancement only.
 */
for (const group of document.querySelectorAll(".toggle:has(> button.toggle__option)")) {
  const options = [...group.querySelectorAll(".toggle__option")];
  const indicator = document.createElement("span");
  indicator.className = "toggle__indicator";
  indicator.setAttribute("aria-hidden", "true");
  // Appended, not prepended: a fieldset's legend must stay its first child.
  group.append(indicator);
  group.classList.add("toggle--sliding");

  const place = () => {
    const current = options.find((option) => option.getAttribute("aria-pressed") === "true");
    indicator.hidden = !current;
    if (!current) return;
    // Bounding rects, not offsetLeft and offsetWidth, which round to whole pixels and leave a hairline gap.
    const option = current.getBoundingClientRect();
    const start = group.getBoundingClientRect().left + group.clientLeft;
    indicator.style.setProperty("--toggle-pressed-x", `${option.left - start}px`);
    indicator.style.setProperty("--toggle-pressed-width", `${option.width}px`);
  };

  for (const option of options) {
    option.addEventListener("click", () => {
      for (const other of options) {
        other.setAttribute("aria-pressed", String(other === option));
      }
    });
  }

  // Pages that act on the choice, such as the theme switch, set aria-pressed themselves; widths change as fonts load.
  new MutationObserver(place).observe(group, { subtree: true, attributeFilter: ["aria-pressed"] });
  const resize = new ResizeObserver(place);
  for (const option of options) resize.observe(option);
  place();
  document.fonts.ready.then(() => requestAnimationFrame(() => indicator.toggleAttribute("data-ready", true)));
}
