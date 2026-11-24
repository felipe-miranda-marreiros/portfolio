---
version: 1
slug: "prototype-cms-index-html"
primary_target: "prototype/cms/index.html"
related_targets: ["prototype/cms/sign-in/index.html","prototype/cms/reset/index.html","prototype/cms/editor/index.html","prototype/cms/preview/index.html"]
---

# CMS

## Scope

`prototype/cms/`, the prototype's CMS Screens in the Portfolio's Visual language: sign-in, password reset, the Content
list, the editor and the preview. Visitor mode: Operate. The final front end reimplements it. No Screen is built until
the components it needs exist.

## Job

Only the Owner arrives, to edit Content, preview it and publish it. The CMS is English only and desktop first: on a
phone every Screen still works in one column, but the phone is not the main scene. It keeps the Portfolio's theme
switch (dark by default) and has no language toggle.

Success: the Owner finds any Content item where it appears on the Portfolio, edits both languages side by side, sees
exactly what Visitors will see, and publishes. At every moment the Owner knows whether the item is a Draft, Published,
or Published with a Draft over it; what is still missing to publish; and whether a publish has reached the Portfolio.

## Decided

On 2026-11-24 the Owner chose, from structured options:

- Desktop first, over equal priority with the phone and desktop only.
- Navigation by Page, over by type of Content item and one filtered list: the Pages (Home, Experience, About me, Not
  found), then the Footer, then Site for the CV and the shared labels (navigation, language toggle and theme switch
  labels). Each Page lists its own SEO metadata, over grouping it under Site.
- English and Brazilian Portuguese side by side in each field, over language tabs.
- A full preview Screen behind an Edit | Preview switch, over a live split and both languages at a reduced scale.
- A fixed action bar with the item's state and publish feedback, over publishing a whole Page at once.
- Email and password sign-in, with password reset, over a single external-account button.
- A Draft saves itself as the Owner types, with a saved indicator and no Save button.
- One CV Content item holds both PDFs, English and Brazilian Portuguese, so it follows the rule that an item publishes
  only when both languages are complete.

## Structure

- **Sign-in:** email and password. States: wrong credentials, too many attempts, and an expired session that returns
  the Owner here with a notice. Links to password reset: request a link by email (sent confirmation), then set a new
  password (error, expired link).
- **Content list:** a side navigation: the Pages, then the Footer, then Site. Each Page lists its Content items
  grouped by Section, then its SEO metadata, each with its state. A Section that holds several items has a New action. Roles and education entries follow date order; core
  technologies and Footer links are reordered by hand. The public repository link has no delete and no unpublish.
- **Editor:** a header with the item's name, its state and the Edit | Preview switch. Text fields show English and
  Brazilian Portuguese side by side and flag a missing translation on the field itself; language-neutral fields
  (dates, URLs, technologies, photo) appear once; every image carries its alt text in both languages. A fixed action
  bar shows the state and what is missing; Publish stays visible but disabled until nothing is missing. Discard
  draft, Unpublish and Delete each confirm in a dialog. After a publish the bar shows it reaching the Portfolio, then
  live, or failed with a way to try again.
- **Preview:** the real Page at real size, scrolled to the item and marked, with English | Brazilian Portuguese and
  Desktop | Phone switches. On About me it takes About me's Visual language; everywhere else in the CMS it never does.

## Ranges

An empty Section, one item, about fifteen roles; long Portuguese wording and summaries of several paragraphs; several
missing fields at once; a publish that fails; a session that expires mid-edit.

## Components

Reused: Button, Link, Chip, Toggle (the language and width switches), Text field, Section heading, Page header.

New, one PR each, before any Screen: side navigation, Content item row, state indicator, bilingual field, period
field, image field with alt text, file field, reorderable list, technology input, action bar, confirmation dialog,
notice, preview frame.

## Anti-goals

No dashboard or metrics; no editing of layout or visual design; no About me styling outside the preview; no editing
on top of the rendered Page.

## Unresolved

Nothing is built yet. Which mechanism signs the Owner in, saves Drafts and carries a publish to the Portfolio is
settled in the ADRs after these Screens; the Screens show only states, never a mechanism.
