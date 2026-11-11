/** Toggle: pressing an option presses it alone in its group. */
for (const group of document.querySelectorAll(".toggle")) {
  const options = [...group.querySelectorAll(".toggle__option")];
  for (const option of options) {
    option.addEventListener("click", () => {
      for (const other of options) {
        other.setAttribute("aria-pressed", String(other === option));
      }
    });
  }
}
