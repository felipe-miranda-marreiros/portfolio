/** The prototype index's theme switch, motion specimen and arrow-key movement between grid cells. */
const root = document.documentElement;
const storageKey = "prototype-theme";
const buttons = [...document.querySelectorAll("[data-theme-choice]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function applyTheme(choice) {
  if (choice === "system") {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = choice;
  }
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.themeChoice === choice));
  }
}

function chooseTheme(choice) {
  localStorage.setItem(storageKey, choice);
  if (!document.startViewTransition || reducedMotion.matches) {
    applyTheme(choice);
    return;
  }
  document.startViewTransition(() => applyTheme(choice));
}

applyTheme(localStorage.getItem(storageKey) ?? "system");
for (const button of buttons) {
  button.addEventListener("click", () => chooseTheme(button.dataset.themeChoice));
}

const grid = document.querySelector("[data-grid]");
const links = [...grid.querySelectorAll(".cell__link")];

/** Finds the cell link nearest to `from` in the arrow's direction, by the cells' rendered positions. */
function nextLink(from, key) {
  const origin = from.closest(".cell").getBoundingClientRect();
  const candidates = links
    .filter((link) => link !== from)
    .map((link) => ({ link, box: link.closest(".cell").getBoundingClientRect() }))
    .filter(({ box }) => {
      if (key === "ArrowRight")
        return box.left >= origin.right - 1 && box.top < origin.bottom && box.bottom > origin.top;
      if (key === "ArrowLeft")
        return box.right <= origin.left + 1 && box.top < origin.bottom && box.bottom > origin.top;
      if (key === "ArrowDown") return box.top >= origin.bottom - 1;
      return box.bottom <= origin.top + 1;
    });
  const distance = ({ box }) => Math.hypot(box.left - origin.left, box.top - origin.top);
  return candidates.sort((a, b) => distance(a) - distance(b))[0]?.link;
}

grid.addEventListener("keydown", (event) => {
  if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) return;
  if (!links.includes(event.target)) return;
  const target = nextLink(event.target, event.key);
  if (!target) return;
  event.preventDefault();
  target.focus();
});

const runButton = document.querySelector("[data-run]");
runButton.addEventListener("click", () => {
  const cell = runButton.closest(".cell");
  const running = !cell.hasAttribute("data-running");
  cell.toggleAttribute("data-running", running);
  runButton.setAttribute("aria-pressed", String(running));
});
