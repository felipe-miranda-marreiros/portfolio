---
name: Portfolio
description: A bilingual engineer's portfolio, dark first, monochrome bone and ink, in a bold, hairline-framed engineering voice.
colors:
  night: "#141311"
  night-raised: "#23211e"
  bone: "#e8e2d6"
  paper: "#efe9dd"
  paper-raised: "#f6f2e9"
  ink: "#1a1815"
  error-on-night: "#ed756a"
  error-on-paper: "#ac312c"
  bone-secondary: "rgb(232 226 214 / 0.84)"
  bone-muted: "rgb(232 226 214 / 0.64)"
  bone-hairline: "rgb(232 226 214 / 0.10)"
  bone-hairline-hover: "rgb(232 226 214 / 0.26)"
  bone-hairline-control: "rgb(232 226 214 / 0.22)"
  bone-hairline-input: "rgb(232 226 214 / 0.44)"
  bone-tint: "rgb(232 226 214 / 0.07)"
  bone-tint-hover: "rgb(232 226 214 / 0.04)"
  ink-secondary: "rgb(26 24 21 / 0.84)"
  ink-muted: "rgb(26 24 21 / 0.64)"
  ink-hairline: "rgb(26 24 21 / 0.10)"
  ink-hairline-hover: "rgb(26 24 21 / 0.26)"
  ink-hairline-control: "rgb(26 24 21 / 0.22)"
  ink-hairline-input: "rgb(26 24 21 / 0.52)"
  ink-tint: "rgb(26 24 21 / 0.07)"
  ink-tint-hover: "rgb(26 24 21 / 0.04)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 5.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  small:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
    fontFeature: "tnum"
rounded:
  chip: "4px"
  control: "8px"
  photo: "10px"
  panel: "12px"
  round: "999px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  "10": "8rem"
  content-max: "76rem"
  gutter: "clamp(1.25rem, 0.5rem + 3.5vw, 3rem)"
---

# Design System: Portfolio

## Overview

**Creative North Star: "Bold Facts, Quiet Person"**

The Portfolio's Visual language is a dark, confident engineering page where bold, tightly tracked type and hairline
panels carry the authority and the facts lead. The Owner stays in the background: a small, plain photo beside the name,
never a portrait as the centrepiece.

The system is monochrome bone and ink. Dark first, a near-black ground carries warm bone ink; the complete light theme
puts the same ink on bone paper and follows the system preference, with a manual dark and light switch. Every colour
token resolves both themes through `light-dark()`, so the active colour scheme picks one. Secondary text, metadata,
hairlines and tints are the ink itself at fixed alpha steps; there is no hued accent anywhere. The primary action is
the ink, filled; focus is an ink ring. The only hue in the system is error.

About me has its own, entirely distinct Visual language. It restyles the shared navigation, language toggle and Footer
through tokens alone; their place and behavior never change.

**Key Characteristics:**
- Dark first, light a complete equal following the system preference, both WCAG 2.2 AA.
- Monochrome: bone ink on near-black, ink on bone paper, secondary ink and hairlines by alpha steps of the ink.
- No hued accent: the primary action is filled ink, every other action is outlined in a hairline, focus is an ink ring.
- Bold display grotesk with tight tracking; monospace only for labels, tags, chips and numerals.
- Hairline-bordered panel grids whose cells share borders, instead of cards and shadows.
- Facts over the person: a hairline facts panel leads Home, the photo stays small.

## Colors

Strictly monochrome: one ink and one ground per theme, everything else is that ink at a lower alpha, and error is the
only hue.

### Primary
- **Bone** (night theme) and **Ink** (paper theme): the ink is the primary colour. It sets headings and body text,
  fills the primary action (with the ground as its text), draws the focus ring, and inverts for text selection. Accent
  and caret colour are the ink too.

### Neutral
- **Night** and **Paper**: the ground of the dark and light themes; also the text colour on a filled-ink action.
- **Night Raised** and **Paper Raised**: the surface for anything that floats above the page (menus, popovers), always
  paired with the float shadow.
- **Secondary Ink** (84% of the ink): supporting lines, ledes, body copy in panels, resting row links and inactive
  switch options.
- **Muted Ink** (64% of the ink): metadata, captions, notes and footer text. Still AA on the ground in both themes.
- **Hairline** (10% of the ink): panel-grid borders and the rules under the top bar and above the footer.
- **Hairline Hover** (26%): the brightened edge of a hovered or focused panel and of a hovered outlined control.
- **Hairline Control** (22%): the outline of secondary controls, the theme switch and swatch edges.
- **Hairline Input** (52% ink on paper, 44% bone on night): input borders, which identify the control and so meet 3:1
  against the ground.
- **Tint** (7%) and **Tint Hover** (4%): chip fills and the pressed theme option; the faint fill of a hovered control.

### Error
- **Error on Paper** and **Error on Night**: error borders and messages only, never decoration.

### Named Rules
**The Ink Is The Action Rule.** There is no accent colour. The primary action is the ink filled, with the ground as its
text: one per view. Secondary actions are outlined in Hairline Control. Focus is an ink ring. If a view needs colour to
show what to do next, the hierarchy is wrong, not the palette.

**The Alpha Steps Rule.** Secondary, muted, hairline and tint colours are always the ink mixed toward transparent at
their fixed steps (84, 64, 26, 22, 10, 7, 4), never new greys. Input borders are the one exception, set per theme to
hold 3:1.

**The Only Hue Is Error Rule.** Error is the sole hued colour, and it appears only where something went wrong.

**The Two Equal Themes Rule.** Every colour token exists in both themes and passes AA in both; dark is designed first,
never light inverted.

## Typography

**Display and Body Font:** Schibsted Grotesk (with ui-sans-serif, system-ui), self-hosted, variable 400 to 900
**Label/Mono Font:** Martian Mono (with ui-monospace), self-hosted, variable 100 to 800

**Character:** Heavy, tightly tracked headings that sound sure of themselves over calm, readable body text, with a
monospace that labels facts the way a codebase labels things: commands, tags, counts, dates.

### Hierarchy
- **Display** (800, fluid up to 6rem, line-height 0.95, -0.04em): the Owner's name and Page titles, balanced wrapping.
- **Headline** (700, fluid up to 3rem, line-height 1.05, -0.03em): Section titles.
- **Title** (600, 1.25rem, line-height 1.3, -0.01em): role titles, panel titles, list rows, ledes in secondary ink.
- **Body** (400, 1rem, line-height 1.6): summaries and supporting lines in secondary ink, measure 68ch.
- **Small** (400, 0.875rem): captions, notes, metadata in muted ink; also the size of row links and controls (600).
- **Label** (Martian Mono 500, 0.6875rem, 0.08em, uppercase, tabular numerals): stat labels and dates. Inside chips and
  code, the same mono size is set as-is, with no tracking or case change.

### Named Rules
**The Mono Labels Rule.** Monospace sets labels, tags, chips and numerals, never sentences or headings, and never as an
eyebrow above a heading: the heading carries its own weight.

## Layout

A single content column (76rem max) with a fluid gutter (1.25rem to 3rem) and a shared left edge; the top bar and footer
span the full width but align their content to the same edge. One 4px-based spacing rhythm (0.25rem to 8rem), with more
space above a heading than below it: the Page opens with 6rem above the title.

Collections read as hairline panel grids: cells share one-pixel borders drawn by the grid's hairline showing through a
one-pixel gap, and each cell (2rem padding, 1.5rem internal gap) ends in a row link pushed to its foot. The grid is one
column on mobile and three columns from 68rem, where wide cells span two. Mobile and desktop have equal priority: grids
collapse to one column and splits stack, heading first, and nothing a desktop row shows is dropped on mobile.

## Elevation & Depth

Flat by default. Depth comes from hairlines and alpha tints, not shadows: a hovered or focused panel brightens its edge
to Hairline Hover with a faint ink wash, a hovered control gains Tint Hover. Only a surface that floats above the page
(menu, popover) takes the raised surface colour and the float shadow. Nothing glows.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 0 0 1px <ring>, 0 12px 32px -12px <shadow>`): floating surfaces only. On night the ring is
  bone at 30% because a dark shadow vanishes on the near-black ground; on paper it is ink at 6% with an ink shadow at
  22%.

### Named Rules
**The Hairline Before Shadow Rule.** Reach for a hairline or a tint step first; a shadow is the last resort and only
for something floating above the page.

## Shapes

Softly rounded, product-like corners: chips at 4px, buttons, inputs and controls at 8px, the photo at 10px, panel grids
at 12px, which round only their outer corners and clip their cells. Fully round (999px) is reserved for things that are
truly circular. One-pixel hairlines are the structural line; no thick borders, no decorative shapes. The Owner's photo
is small, in a softly rounded square with a hairline edge, plain, with no effect applied.

## Components

No component library exists yet; these are the primitives the prototype's token specimens establish, to be confirmed
by each component's own PR. Every component takes every visual value from tokens and holds no visible text.

### Buttons
- **Shape:** gently rounded (8px), Small text at 600, padding 0.5rem by 1rem.
- **Primary:** filled ink with the ground as text, no border. One per view.
- **Secondary:** transparent, ink text, outlined in Hairline Control; on hover the outline moves to Hairline Hover and
  the fill to Tint Hover.
- **Focus:** a 2px ink ring at 2px offset. **Disabled:** 0.4 opacity. Transitions run 150ms on the expo ease-out.

### Chips
- **Style:** Martian Mono at label size, Tint fill, Secondary Ink text, 4px corners, padding 2px by 0.5rem, no border.

### Panel grid cells
- **Corner Style:** the grid rounds its outer corners (12px); cells are square.
- **Background:** the ground; on hover or focus within, a faint ink wash and an inset Hairline Hover edge (200ms).
- **Border:** shared one-pixel hairlines. **Internal Padding:** 2rem.
- **Row link:** Small text at 600 in Secondary Ink with an arrow; on panel hover or focus it goes to full ink and the
  arrow nudges 2px. The first cell's row link is the filled-ink primary action.

### Inputs / Fields
- **Style:** Hairline Input border (1px), 8px corners, padding 0.5rem by 0.75rem, Small text.
- **Focus:** the shared 2px ink ring at 2px offset.
- **Error:** the border becomes 1px Error and a Small message in Error sits under the field. **Disabled:** 0.4 opacity.

### Navigation
- **Top bar:** on a bottom hairline, the name left (800, title size, -0.03em), controls right.
- **Theme switch:** a segmented control in a Hairline Control outline (8px); options in Small text at 600, Secondary
  Ink, full ink on hover, Tint fill and full ink when pressed. Switching crossfades every token at once (240ms).

## Do's and Don'ts

### Do:
- **Do** design the dark theme first and keep the light theme a complete equal, both at WCAG 2.2 AA.
- **Do** make the one primary action per view filled ink, and outline every other action in a hairline.
- **Do** derive every secondary, muted, hairline and tint colour from the ink at its fixed alpha step.
- **Do** lead Home with the facts in a hairline panel (role, seniority, location, work model, technologies) and keep
  the Owner's photo small and plain beside the name.
- **Do** take every visual value from tokens, so About me can restyle the shared navigation, language toggle and Footer
  through tokens alone.
- **Do** give every component all its states (default, hover, focus, active, disabled, and loading, error or success
  where they apply) before it counts as done.
- **Do** keep motion to short expo ease-out transitions (150ms for controls, 200ms for panels, 240ms for the theme
  crossfade), no bounce, and 0ms under reduced motion.

### Don't:
- **Don't** introduce a hued accent, a gradient or a multi-colour palette; the Owner turned down every one offered.
- **Don't** use error red for anything but errors.
- **Don't** build a template portfolio: no avatar hero, no skill pills, no grid of identical project cards.
- **Don't** set a monospace eyebrow above a heading, or monospace prose.
- **Don't** make the Owner's photo a centrepiece: no large portrait, no colour effects, no full-bleed photo.
- **Don't** put a shadow on anything that doesn't float above the page.
- **Don't** let expression cost the 30-second read: role, seniority, technologies, location, CV and contact stay
  findable at a glance.
