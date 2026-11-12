---
version: 1
slug: "prototype-index-html"
primary_target: "prototype/index.html"
related_targets: []
---

# Prototype index

## Scope

`prototype/index.html`, the design phase's front page: it links to every token and component page and is the first
surface of the Portfolio's Visual language. Component pages under `prototype/components/` are related targets. The world
is built for Persuade (Home's 30-second read); this page itself is a Read reference that the Owner and agents consult.

## Job

Show the Visual language working, not described: every token group and component reachable in one step, each panel
carrying a live specimen, in both themes. Placeholder text is allowed here; components still hold none.

## Decided

On 2026-11-01 the Owner chose, from rendered comparison rounds: Schibsted Grotesk for display and body, Martian Mono for
labels; and a monochrome "bone and ink" palette with no hued accent (dark: ground #141311, ink #e8e2d6; light: ground
#efe9dd, ink #1a1815). The Owner turned down orange, amber, coral, copper, lime, cyan, green, gradients and multi-colour
palettes along the way. The Owner also set the theme: dark always by default, light only by choosing it in a dark and
light switch, never from the system preference.

On 2026-11-10 the Owner kept, from the rendered Button page, the states DESIGN.md had left open: the primary's fill steps
down to 84% of the ink on hover; both buttons sink 1px when pressed, the secondary also taking the Tint fill; and while
loading, a spinning ring replaces the label, which keeps the width and the accessible name.

On 2026-11-10 the Owner kept, from the rendered Link page, a pressed Link that looks like a hovered one: nothing sinks.

On 2026-11-11 the Owner chose, from rendered options, the Toggle's pressed option: the Tint fill plus a 1px edge in the
input border colour, so the state clears 3:1. A Toggle option being pressed (mouse down) looks like hover, and a Toggle
has no disabled state: it always offers a choice.

On 2026-11-11 the Owner chose, from rendered options, the Top bar: no name or logo in it. The Pages sit on the left,
the current one marked; the theme switch and then the language toggle sit on the right, the language toggle on the
edge, so it keeps its place on About me, where the theme switch is absent. On phones it wraps to two rows, the Pages
first and the toggles on the right of the second, with no menu.

On 2026-11-11 the Owner chose, from rendered options, the Footer: a short title (Content) that Home's contact link
lands on, then the repository link with its arrow, a hairline, and the social links and email as plain links, in the
Owner's order. The quietest one-line Footer and a headline-size repository link were turned down.

## Unresolved

The type scale, spacing scale and state tokens are first set by the token build, then refined with `typeset`, `layout`
and `colorize` and captured with `/impeccable document` in scan mode. Home's small photo uses a placeholder marked as
such until the Owner supplies it.

## Direction contract

THESIS: A dark, confident engineering page: bold tight type and hairline panels say "engineer who ships", and the facts
lead while the Owner stays in the background. It refuses the template portfolio (avatar hero, skill pills, card grid)
and any themed metaphor world.

OWN-WORLD: Dark by default, a complete light theme the visitor switches to. Bone ink on near-black, ink on bone paper, with
alpha-stepped secondary ink and ten-percent hairlines. No hued accent: the primary action is the ink itself, filled,
and focus is an ink ring. A bold grotesk with tight tracking for headings; a monospace for labels, tags, chips and
numerals only. Hairline-bordered panel grids whose cells share borders. No colour fields; on Home, a hairline facts
panel and a small, plain photo.

STORY: The Owner and agents see the whole system at a glance, trust it is complete (every state present), and open any
token or component in one click.

FIRST VIEWPORT: A top bar on a hairline: links to the two Visual languages' pages left, the dark and light switch and
then the language toggle right. A large bold
title left-aligned, a short supporting line under it. Below, a hairline panel grid: one cell per token group (with a
live specimen and mono chips of its token names) and one per component (with mono chips of its states), the facts
panel among them once it exists. Each cell ends in a row link; the first is the filled-ink primary action.

FORM: Direction pinned by the Owner; it beat the roll. seed:b2cac2cddef801f9

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and
every shipping raster carrying its provenance

Signature interaction: a panel's hairline brightens and its row link goes from secondary to full ink on hover and
focus, arrow keys move between cells, and the theme switch crossfades every token at once. Motion grammar: short
ease-out transitions (about 150 to 200 ms), no bounce, nothing animates under reduced motion.
