---
name: Portfolio
description: A bilingual engineer's portfolio, dark first, in a bold, hairline-framed engineering voice.
---

<!-- SEED: established with the user before implementation; re-run /impeccable document once there's code to capture the actual tokens and components. -->

# Design System: Portfolio

## Overview

**Creative North Star: "Bold Facts, Quiet Person"**

The Portfolio's Visual language is a dark, confident engineering page where bold, tightly tracked type and hairline
panels carry the authority and the facts lead. The Owner stays in the background: a small, plain photo beside the name,
never a portrait as the centrepiece.

The system is dark first, with a complete light theme that follows the system preference; both meet WCAG 2.2 AA.
Surfaces are near-monochrome: a near-black ground, warm off-white ink stepped down by opacity for secondary text, and
faint hairlines that frame panels and rule lists. Colour is rationed: one warm accent marks the primary action and
focus, and no large field of colour appears on any Page.

About me has its own, entirely distinct Visual language. It restyles the shared navigation, language toggle and Footer
through tokens alone; their place and behavior never change.

**Key Characteristics:**
- Dark first, light following the system preference, both AA.
- Warm off-white ink on near-black, secondary ink by opacity steps.
- Bold display type with tight tracking; monospace only for labels, tags, chips and numerals.
- Hairline-bordered panel grids and hairline-ruled lists instead of cards and shadows.
- One warm accent for the primary action and focus; no large colour fields.
- Facts over the person: a hairline facts panel leads Home, the photo stays small.

## Colors

Restrained: tinted neutrals carry almost every surface, and one warm accent does real work.

### Primary
- **Warm Accent** ([to be resolved during implementation]; warm): the primary action on
  a Page and the focus ring. Dark ink on the accent fill.

### Neutral
- **Ground** ([to be resolved during implementation]): near-black in the dark theme, near-white in the light theme.
- **Ink** ([to be resolved during implementation]): warm off-white in the dark theme; secondary and muted ink are the
  same ink at lower opacity, each still AA where it carries text.
- **Hairline** ([to be resolved during implementation]): a faint, low-opacity line for panel borders and list rules,
  with a slightly stronger step for outlined controls.
- **Chip fill** ([to be resolved during implementation]): a barely-there tint of the ink behind mono chips.

### Named Rules
**The One Accent Rule.** The accent marks what to do next: one primary action per view, plus focus. Secondary actions
are outlined in a hairline.

**The Two Equal Themes Rule.** Every colour token exists in both themes and passes AA in both; dark is designed first,
never light inverted.

## Typography

**Display and Body Font:** [to be resolved during implementation]: one bold, contemporary grotesk that holds tight
tracking at large sizes
**Label/Mono Font:** [to be resolved during implementation]: one monospace for labels, tags, chips and numerals

**Character:** Heavy, tightly tracked headings that sound sure of themselves over calm, readable body text, with a
monospace that labels facts the way a codebase labels things: commands, tags, counts, dates.

### Hierarchy
- **Display** (bold, large, tracking around -0.04em, line-height just under 1): the Owner's name and Page titles.
- **Headline** (bold, tracking around -0.03em): Section titles.
- **Title** (semibold): role titles, panel titles, list rows.
- **Body** (regular, secondary ink, line length 65 to 75ch): summaries, achievements, supporting lines.
- **Label** (monospace, small, uppercase and widely tracked, or as-is inside chips): tags, stat labels, dates, chips.

### Named Rules
**The Mono Labels Rule.** Monospace sets labels, tags, chips and numerals, never sentences or headings, and never as an
eyebrow above a heading: the heading carries its own weight.

## Layout

A wide content column with a shared left edge. Sections are separated by full-width hairlines and use two-column splits
where a heading leads and text or a list answers it. Collections read as hairline panel grids whose cells share borders,
or as hairline-ruled lists with a mono tag, a title and an arrow. Mobile and desktop have equal priority: grids collapse
to one column and splits stack, heading first, and nothing a desktop row shows is dropped on mobile. One spacing rhythm
throughout, with more space above a heading than below it. Exact widths, breakpoints and the spacing scale are resolved
when the tokens are built.

## Elevation & Depth

Flat by default. Depth comes from hairlines and a faint ink tint, not shadows: a hovered panel brightens its hairline
and tint, a menu sits on a slightly lighter surface with a hairline edge. Nothing glows.

### Named Rules
**The Hairline Before Shadow Rule.** Reach for a hairline or a tint step first; a shadow is the last resort and only
for something floating above the page.

## Shapes

Softly rounded, product-like corners: small radii on chips, buttons and inputs, slightly larger on panel grids, which
round only their outer corners. One-pixel hairlines are the structural line; no thick borders, no decorative shapes. The
Owner's photo is small, in a softly rounded square with a hairline edge, plain, with no effect applied. Exact radii are
resolved with the tokens.

## Do's and Don'ts

### Do:
- **Do** design the dark theme first and keep the light theme a complete equal, both at WCAG 2.2 AA.
- **Do** keep one primary action per view in the accent, and outline every other action in a hairline.
- **Do** lead Home with the facts in a hairline panel (role, seniority, location, work model, technologies) and keep
  the Owner's photo small and plain beside the name.
- **Do** take every visual value from tokens, so About me can restyle the shared navigation, language toggle and Footer
  through tokens alone.
- **Do** give every component all its states (default, hover, focus, active, disabled, and loading, error or success
  where they apply) before it counts as done.
- **Do** let motion be short ease-out transitions (about 150 to 200 ms) with no bounce, and none under reduced motion.

### Don't:
- **Don't** build a template portfolio: no avatar hero, no skill pills, no grid of identical project cards.
- **Don't** set a monospace eyebrow above a heading, or monospace prose.
- **Don't** make the Owner's photo a centrepiece: no large portrait, no colour effects, no full-bleed photo.
- **Don't** let expression cost the 30-second read: role, seniority, technologies, location, CV and contact stay
  findable at a glance.
