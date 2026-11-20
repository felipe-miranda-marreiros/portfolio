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

On 2026-11-10 the Owner kept, from the rendered Link page, a pressed Link that looks like a hovered one: nothing sinks (the action variant's press is
settled by a later entry).

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

On 2026-11-13 the Owner chose, from rendered options, the Text field: its label in the link role (Small at the control
weight, full ink) above the field; on hover the input border steps up to full ink; the value is set at Body size (16px),
not Small, so Safari on iPhone doesn't zoom the page on focus; and one component covers both a single-line field and a
multi-line one. A mono uppercase label, a quiet regular label, a Tint fill on hover and no hover change were turned
down. In forced colours, where the error hue is gone, a field in error takes a dashed 2px border and its message the
control weight, as on About me; the message alone, a dashed 1px border and a solid 2px one were turned down.

On 2026-11-13 the Owner kept the Panel grid to the Portfolio: it is how the Portfolio shows collections, and About me,
whose brief refuses cards, never shows one, so the component has no About me page.

On 2026-11-13 the Owner chose to have `index.js` build the index's component cells from one list, as it builds the
colour swatches, so the page stays under the file size hook while every component stays one step away.

On 2026-11-13 the Owner kept the Lineup to About me, so the Portfolio never shows one; the index still links to its
About me page, as it does to every component.

On 2026-11-13 the Owner chose, from rendered options, Home's facts panel: the role and seniority as one large line
(its label is settled by the next entry), then location and work model side by side under a hairline, then the core technologies as Chips, in a
hairline panel. Every word, labels included, is Content. A label-beside-value list and a grid of cells were turned
down. The facts panel is Home's, so it has no About me page.

On 2026-11-13 the Owner chose, from a rendered pair, to keep the role line's label for screen readers only: the role
line opens the panel, since a visible mono label above it reads as an eyebrow, and the label stays in the list's markup.
The other facts keep their visible labels.

On 2026-11-14 the Owner chose, from rendered options, Experience's role entry: the period, location and work model in
a side column on the left (how it is set is settled by the next entry), the role beside it (title, company, summary, achievements, then the technologies
as Chips), with a hairline between roles. A stacked entry and a hairline panel per role were turned down. The role
entry is Experience's, so it has no About me page.

On 2026-11-14 the Owner chose, from a rendered pair, how the side column is set: only the period in monospace, a date
being numerals; the location and work model in the sans at Small in Muted Ink, as the Facts panel sets those values, so
the Mono Labels Rule holds as written. An all-monospace column was turned down.

On 2026-11-14 the Owner chose, from a rendered comparison in the states pass, no placeholders in the Text field: on
About me a placeholder takes the band's full ink and reads as a value, so the hint carries any example, on every band
and theme. Placeholders on the Portfolio only were turned down.

On 2026-11-14 the Owner chose, from a rendered pair in the states pass, that the Link's action variant sinks 1px when
pressed, as the primary Button does, since the two look alike; the plain Link still doesn't sink. Keeping the action
looking like hover when pressed was turned down.

On 2026-11-14 the Owner kept every part of a role entry required, as the approved Vision lists them for every role.
The layout only tolerates a missing location, work model, achievements or technologies, as the fewer-parts sample
shows, so a gap never breaks it. Making those parts optional Content was turned down.

On 2026-11-20 the Owner chose, from a rendered pair in the states pass, how the Toggle moves between options: one
pressed fill slides to the option pressed next, on both themes and on About me. A crossfade, the old option's fill
fading out as the new one's fades in, was turned down. When the script that slides it doesn't run, the fill snaps to
the new option; it never fades.

On 2026-11-20 the Owner chose, from a rendered pair in the states pass, that under reduced motion a busy Button's loading
ring fades in and out instead of spinning, so it still reads as working without any movement. Every other transition
stays instant under reduced motion. A still ring was turned down.

On 2026-11-20 the Owner chose, after the design review, that the slide wins on the theme switch too: the page's theme
crossfade leaves the switch out, so its pressed fill only slides while every other token crossfades. Letting the
crossfade take over the switch was turned down.

On 2026-11-20 the Owner chose, from a rendered comparison after the design review, that the loading ring fades only
to 70% under reduced motion, on both Visual languages, so it stays at 3:1 or more on every theme and band; the secondary
Button on About me's sunset band needs 68%. A 35% floor, under 3:1, and a deeper 55% on the Portfolio with 70% on
About me were turned down.

## Unresolved

The type scale, spacing scale and state tokens are first set by the token build, then refined with `typeset`, `layout`
and `colorize` and captured with `/impeccable document` in scan mode. The facts panel's role line repeats Home's
headline (role and seniority) unless the Home Page lets one stand for the other; that is settled when Home is composed.
Home's small photo uses a placeholder marked as
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
focus, arrow keys move between cells, and the theme switch crossfades every token at once (the switch itself sitting
out is settled by a Decided entry). Motion grammar: short ease-out transitions (about 150 to 200 ms), no bounce,
nothing moves under reduced motion (the loading ring's fade is settled by a Decided entry).
