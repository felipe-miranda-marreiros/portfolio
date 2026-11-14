/** Panel grid: the arrow keys move focus between the cells' row links, by the cells' rendered positions. */
const arrows = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];

/** Finds the row link nearest to `from` in the arrow's direction, among `links`. */
function nextLink(links, from, key) {
  const origin = from.closest(".panel-grid__cell").getBoundingClientRect();
  const candidates = links
    .filter((link) => link !== from)
    .map((link) => ({ link, box: link.closest(".panel-grid__cell").getBoundingClientRect() }))
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

for (const grid of document.querySelectorAll(".panel-grid")) {
  grid.addEventListener("keydown", (event) => {
    if (!arrows.includes(event.key)) return;
    const links = [...grid.querySelectorAll(".panel-grid__link")];
    if (!links.includes(event.target)) return;
    const target = nextLink(links, event.target, event.key);
    if (!target) return;
    event.preventDefault();
    target.focus();
  });
}
