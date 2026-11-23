---
version: 1
slug: "prototype-pages-about-me-index-html"
primary_target: "prototype/pages/about-me/index.html"
related_targets: []
---

# About me

## Scope

`prototype/pages/about-me/index.html`, the prototype's About me Page, composed only from existing components in About
me's Visual language (its tokens and direction contract are in `prototype-about-me-index-html.md`). Visitor mode:
Experience. The final front end reimplements it.

## Job

A Visitor, often arriving from the Portfolio's Top bar, learns who the Owner is outside code in one scroll, finds
something to read, hear or watch, and sees what the Owner is studying now. Per the Vision, About me is built from fixed
Sections the product defines, with editable text; per `PRODUCT.md`, they cover the Owner's interests, recommendations
and engineering. The navigation, language toggle and Footer stay where they are on the Portfolio and work the same;
only their styling changes. Mobile and desktop have equal priority.

## Decided

On 2026-11-23 the Owner chose, while shaping, three Sections, each a Lineup: Interests, then Recommendations, then
Engineering. The Page header's lede is the Page's only prose. A personal story Section, before or after the lineups,
was turned down.

On 2026-11-23 the Owner chose that a lineup category holds several items in one row, listed after the category like a
poster's billing, which the Lineup gains in its own PR before this Page. Repeating the category on every row, and one
item per category, were turned down.

On 2026-11-23 the Owner chose that the illustration is absent until the Owner supplies artwork: the first band holds the
Top bar and the Page header only. A marked placeholder slot was turned down for the Page.

On 2026-11-23 the Owner chose that what the Owner is studying now is a lineup row in the Engineering Section, its
category like any other. A line under the Section's title was turned down.

## Structure

The Top bar and the Page header (the title in the Display role, the lede in the Lede role) on the first band, purple;
then one band per Section, rotating, each a Section heading and a Lineup: Interests on sunset, Recommendations on lime,
Engineering on charcoal; then the Footer on the next band, purple.

## Ranges

Three Sections, each with about 2 to 6 categories and 1 to about 5 items per category; an item may link when the Owner
gives it an address. Every text holds both languages, long Portuguese wording included.

## Anti-goals

No cards, counters, feeds or avatars; no photo; no gamer costume; nothing that recolours the Portfolio; no invented
interests or recommendations: placeholders stand in, marked as such.

## Unresolved

The Page is built (`prototype/pages/about-me/`) from existing components: the Top bar, the Page header, the Section
heading, the Lineup and the Footer. Which categories each Section holds is settled with the CMS's content model, so the
front end never hardcodes them. Interests' and Recommendations' categories follow `PRODUCT.md`; the Engineering ones
beside "Studying now" are guesses. Every item is a placeholder marked as such until the Owner supplies them, and the
Footer's links point at placeholders, as on the other Pages.
