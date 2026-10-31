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

## Unresolved

The accent hue (warm), the display and mono faces, the type scale, the dark and light
neutral ramps are settled when the tokens are built (step 1 of `.claude/rules/design.md`), then captured with
`/impeccable document` in scan mode. Home's small photo uses a placeholder marked as such until the Owner supplies it.

## Direction contract

THESIS: A dark, confident engineering page: bold tight type and hairline panels say "engineer who ships", and the facts
lead while the Owner stays in the background. It refuses the template portfolio (avatar hero, skill pills, card grid)
and any themed metaphor world.

OWN-WORLD: Dark first, a complete light theme following the system. Near-black ground, warm off-white ink with
alpha-stepped secondary ink, eight-percent hairlines. A bold grotesk with tight tracking for headings; a monospace for
labels, tags, chips and numerals only. Hairline-bordered panel grids whose cells share borders. One warm accent on the
primary action and focus. No large colour fields; on Home, a hairline facts panel and a small, plain photo.

STORY: The Owner and agents see the whole system at a glance, trust it is complete (every state present), and open any
token or component in one click.

FIRST VIEWPORT: A top bar on a hairline: the Visual language's name left, a dark and light switch right. A large bold
title left-aligned, a short supporting line under it. Below, a hairline panel grid: one cell per token group (with a
live specimen and mono chips of its token names) and one per component (with mono chips of its states), the facts
panel among them. Each cell ends in a row link; the first carries the accent as the primary action.

FORM: Direction pinned by the Owner; it beat the roll. seed:b2cac2cddef801f9

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and
every shipping raster carrying its provenance

Signature interaction: a panel's hairline brightens and its row link takes the accent on hover and focus, arrow keys
move between cells, and the theme switch crossfades every token at once. Motion grammar: short ease-out transitions
(about 150 to 200 ms), no bounce, nothing animates under reduced motion.
