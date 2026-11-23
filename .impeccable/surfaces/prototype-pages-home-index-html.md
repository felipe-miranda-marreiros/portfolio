---
version: 1
slug: "prototype-pages-home-index-html"
primary_target: "prototype/pages/home/index.html"
related_targets: []
---

# Home

## Scope

`prototype/pages/home/index.html`, the prototype's Home Page, composed only from existing components in the
Portfolio's Visual language. Visitor mode: Persuade. The final front end reimplements it.

## Job

A recruiter, in about 30 seconds on a phone or a desktop, names the Owner's role, seniority and core technologies, sees
the location and work model, downloads the CV and finds where to make contact. An engineer reaches Experience or the
public repository in one click. Home shows, per the Vision: name, headline (role and seniority), short summary,
location, optional photo, core technologies, CV download, a link to Experience and a link to the Footer's contact
links, then the Footer.

## Decided

On 2026-11-20 the Owner chose, from three rendered structures in a surface round, the split masthead: the masthead on
the start side and the facts panel on the end side, read together. A command row of three action cells and a statement
opening with the summary at display scale were turned down.

On 2026-11-20 the Owner chose that the role line, not the name, takes the largest scale: the headline (role and
seniority) is the largest type on Home with the name above it at Title size beside the small photo, so Home still leads
with the facts. The facts panel beside it drops its own role line, so the role is never repeated. Keeping the name at
display scale was turned down.

On 2026-11-20 the Owner chose, from the rendered masthead, the Headline size for the role line (up to 3rem), the size
the facts panel gave the role. The Display size (up to 6rem) was turned down: in Home's half column a long role wraps
to three or four lines and, in Portuguese, breaks words with hyphens.

On 2026-11-23 the Owner chose, from three rendered splits, the facts panel at a set width (22rem,
`--home-panel-width`) with the masthead taking the rest of the column from 44rem: the role line wraps least, one line in
English and two in the long Portuguese case, while the panel stacks its facts and runs taller. Equal halves and a 3:2
split favouring the masthead were turned down.

On 2026-11-23 the Owner chose, after the design review, to set the two columns side by side only from 68rem, the
index's wide breakpoint: below it the panel follows the masthead at full width. From 44rem the set-width panel left the
masthead about 15rem, so the long Portuguese role line broke into five lines. Keeping the split from 44rem was turned
down.

## Unresolved

Home's photo is a placeholder marked as such until the Owner supplies it. The role and seniority, location, work model
and core technologies are stand-in Content of realistic length, unmarked on the page so the role line's wrapping stays
true, until the Owner supplies the real values. The Experience and About me Pages and the CV
file don't exist yet, so their links point at the paths they will take.

## Direction contract

THESIS: Home is a two-column fact sheet: what the Owner does, set largest, and the facts that prove it, read side by
side in one viewport. It refuses the split hero's habit of a giant name and a product shot.

OWN-WORLD: The Portfolio's bone and ink on near-black, dark by default; a bold tightly tracked grotesk for the role line,
monospace only for labels; one filled-ink action, the rest secondary Links; a hairline facts panel; a small, plain
photo in a softly rounded square.

STORY: The visitor reads the role and seniority first, the name and summary next, checks location, work model and
technologies in the panel, then downloads the CV, opens Experience or jumps to the Footer's contact links.

FIRST VIEWPORT: The Top bar. Below it, two columns from 68rem: on the start side the small photo beside the name at
Title size, then the role line at Headline size, the summary at lede size, then the CV download as the filled primary
action with the Experience and contact Links beside it; on the end side, top-aligned, the facts panel with location,
work model and the core technologies as Chips. Below 68rem the masthead comes first and the panel follows it, both
within the first screen as far as the content allows.

FORM: Split masthead, third of the dealt structures (index 2 of the grounded list). seed:4866980e8f1cd143

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and
every shipping raster carrying its provenance

Signature interaction: none of its own; the CV action, the Links and the Top bar keep their component states, and the
contact Link moves to the Footer's title. Motion grammar: the components' short ease-out transitions; nothing enters
or animates on load, and nothing moves under reduced motion.
