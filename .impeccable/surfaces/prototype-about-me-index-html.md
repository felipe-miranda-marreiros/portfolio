---
version: 1
slug: "prototype-about-me-index-html"
primary_target: "prototype/about-me/index.html"
related_targets: []
---

# About me's Visual language

## Scope

`prototype/about-me/index.html`, the token page of About me's Visual language: the second token set over the same
components, sibling of `prototype/index.html`. The world is built for About me's Page, where the visitor
meets the Owner through what they listen to, play, run, watch, recommend and study; this page itself is a Read
reference the Owner and agents consult.

## Job

Show About me's tokens working, not described: every token group reachable in one step, each with a live specimen, laid
out in the Visual language's own band system. Placeholder text is allowed here; components still hold none.

## Decided

On 2026-11-01 the Owner chose, from rendered comparison rounds:
- Reference pinned by the Owner: the poster and album-art grammar of Dance Gavin Dance, in an own version; never their
  artwork, lettering or logo.
- Big Shoulders Display for display (uppercase, condensed) and Archivo for text and lists.
- Palette: four flat bands that rotate one per Section: purple #4a2390, sunset orange #e8582f, lime #d6e45a, charcoal
  #1f1d21. Turned down along the way: violet gradient sky, lime alone, black poster block alone, cyan, pink, orange alone.
- One theme only, no photo. Illustration is optional: the language works without it and reserves a slot for one.
- On About me the theme switch is absent and the language toggle keeps its place.
- The Owner wants to avoid: a social network look, a gamer or childish look, a recolour of the Portfolio, and anything
  corporate or cold.

Later on 2026-11-01, after the finish review and the design review, the Owner confirmed:
- Lineup categories are set in the display face at large size, in two key colours per band; on sunset those are
  charcoal and cream, so half the categories share the ink and stand apart by face and size.
- The Footer takes the next band in the rotation, like any Section; no band is fixed to it.
- Creative North Star: "Loud Bands, Quiet Person".
- The supporting inks of option N stay: lilac #f7f0ff (the ink on purple and charcoal), peach #ff8a5c (titles, a key
  and the action on charcoal), blush #ffd0b8 (a key on purple), magenta #8a1158 (titles, a key and the action on lime)
  and cream #fff4e0 (large type on sunset, and the action's text on charcoal). The "pink" turned down earlier was the
  flat pink palette, not these.
- About me is documented in the root DESIGN.md beside the Portfolio, an About me subsection in each section.
- Spacing and motion stay the Portfolio's; radii, elevation and state are About me's own.
- On 2026-11-10, from the rendered Button page: the primary keeps its fill on hover and a 3px ring in the band's Display
  colour appears at 3px offset; pressing and loading behave as on the Portfolio, the loading ring drawn at 3px.
- On 2026-11-10, from the rendered Link page: a pressed Link looks like a hovered one, underlined in Key; nothing sinks.
- On 2026-11-10 the Owner kept About me's 3px link nudge, against the Portfolio's 2px, to match its 3px rules: the one
  motion token About me sets.
- On 2026-11-10 the Owner kept About me's chips 0.5rem apart, against the Portfolio's 0.25rem, so their 3px outlines
  don't crowd: the one spacing token About me sets.
- On 2026-11-11 the Owner kept About me's Toggle with no inset, its options touching the 3px outline, against the
  Portfolio's 3px: About me's second spacing token, beside the chip gap. Its Toggle presses straight to the ink fill,
  looks like hover while held, and has no disabled state, as on the Portfolio.
- On 2026-11-11 the Owner chose the Top bar without a name or logo: the Pages left, the language toggle on the right
  edge, where it keeps its place against the Portfolio's bar; on phones the toggle wraps under the Pages.
- On 2026-11-11 the Owner chose, from rendered options, how the Top bar's Pages tell hover from current: a hovered or
  pressed Page underlines 3px in the band's Key Alt, and the current Page keeps its 3px underline in Key.
- On 2026-11-11 the Owner chose the Footer's layout on both Visual languages: a title, the repository link, a rule, then
  the social links and email; on About me it keeps the band's 3px ink rule and its title takes the band's Display colour.
- On 2026-11-13 the Owner chose the Text field on both Visual languages: a label above it, its value at Body size, and
  a single-line and a multi-line variant in one component. On About me its 3px ink border takes the band's Display
  colour on hover, as the secondary Button's does: a change of hue, not of contrast, which on sunset falls from 4.7:1 to
  cream's 3.3:1 and still clears 3:1.
- On 2026-11-13 the Owner kept the Panel grid off About me: its collections stay bands and lineups.
- On 2026-11-13 the Owner kept the Lineup to About me, the mirror of the Panel grid, so it has no Portfolio page. An item
  links only when the Owner gives it an address, and a plain one has no underline and no hover; the next entry sets
  how a linked one looks.
- On 2026-11-13 the Owner chose, from rendered options, how a linked lineup item shows it leads somewhere before any
  hover: a thin resting underline in its row's key colour, thickening to the 3px rule on hover, focus and press (a
  pressed item looks like a hovered one, as a pressed Link does). An arrow after the item and no resting cue were
  turned down.
- On 2026-11-14 the Owner chose, from a rendered comparison in the states pass, no placeholders in the Text field on
  either Visual language: on every band a placeholder takes the band's full ink and reads as a value, so the hint
  carries any example.

## Unresolved

The illustration slot has no artwork; it carries a marked placeholder until the Owner supplies one.

## Direction contract

THESIS: About me as a gig poster: the Owner's interests, recommendations and studies set as a lineup across flat colour
bands. It refuses the social profile (cards, counters, feeds), the gamer costume, and the Portfolio recoloured.

OWN-WORLD: Four flat bands, purple, sunset orange, lime and charcoal, each Section owning one, rotating. Condensed
uppercase display that fills the band's width; lists set as poster billing, category in large display type in the band's
two key colours, item in heavy uppercase Archivo in the band's ink. Hard edges, thick rules, no shadows, no gradients, no neon.

STORY: The visitor learns who the Owner is outside code in one scroll, finds something to read, hear or watch, and sees
what they are studying now.

FIRST VIEWPORT: A purple band: the bar on top (Pages left, language toggle right), then a band-wide condensed title and a
one-line lede; the illustration slot sits on the band's right when artwork exists. The orange band starts within view.

FORM: Direction pinned by the Owner from references; it beat the roll. seed:f0d5ba375351a4af

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and
every shipping raster carrying its provenance

Signature interaction: a linked lineup item's thin resting underline, in its row's key colour, thickens on hover, focus
and press. Motion grammar: short ease-out (about 150 ms), no bounce, nothing animates under reduced motion.
