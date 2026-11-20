/**
 * Toggle: pressing a button option presses it alone in its group, and an indicator slides the chosen fill to it. The
 * language toggle's options are links, chosen by aria-current, which navigate instead. Without this script each chosen
 * option fills itself, so the indicator is an enhancement only.
 */
const chosen = (option) =>
  option.getAttribute("aria-pressed") === "true" || option.getAttribute("aria-current") === "true";

for (const group of document.querySelectorAll(".toggle")) {
  const options = [...group.querySelectorAll(".toggle__option")];
  const indicator = document.createElement("span");
  indicator.className = "toggle__indicator";
  indicator.setAttribute("aria-hidden", "true");
  // Appended, not prepended: a fieldset's legend must stay its first child.
  group.append(indicator);
  group.classList.add("toggle--sliding");

  const place = () => {
    const current = options.find(chosen);
    indicator.hidden = !current;
    if (!current) return;
    // Bounding rects, not offsetLeft and offsetWidth, which round to whole pixels and leave a hairline gap.
    const option = current.getBoundingClientRect();
    const start = group.getBoundingClientRect().left + group.clientLeft;
    indicator.style.setProperty("--toggle-pressed-x", `${option.left - start}px`);
    indicator.style.setProperty("--toggle-pressed-width", `${option.width}px`);
  };

  for (const option of options.filter((option) => option.matches("button"))) {
    option.addEventListener("click", () => {
      for (const other of options) {
        other.setAttribute("aria-pressed", String(other === option));
      }
    });
  }

  // Pages that act on the choice, such as the theme switch, set aria-pressed themselves; widths change as fonts load.
  new MutationObserver(place).observe(group, { subtree: true, attributeFilter: ["aria-pressed", "aria-current"] });
  const resize = new ResizeObserver(place);
  for (const option of options) resize.observe(option);
  place();
  document.fonts.ready.then(() => requestAnimationFrame(() => indicator.toggleAttribute("data-ready", true)));
}
