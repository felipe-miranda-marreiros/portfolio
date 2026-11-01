/** About me's token page: the language toggle specimen's pressed state. */
const buttons = [...document.querySelectorAll("[data-lang-choice]")];

for (const button of buttons) {
  button.addEventListener("click", () => {
    for (const other of buttons) {
      other.setAttribute("aria-pressed", String(other === button));
    }
  });
}
