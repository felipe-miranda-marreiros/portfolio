# Introduction

Code: `packages/ui/src/components/intro/intro.css`. Portfolio only.

## Purpose

The thesis of the Portfolio ([principle 1](../foundations/principles.md#1-the-owner-speaks-first)): the Owner introducing themselves in one sentence at display size, their face set inside the line, the statement under it, and the two ways to act. Used once, as the page's `<h1>`. Not for section titles (headline role) or anywhere narrower than about 60% of the viewport ([typography](../tokens/typography.md#scale)).

## Anatomy

- **Title** (`.ui-intro__title`, `<h1>`): greeting, name, inline [avatar](avatar.md), role.
- **Name group** (`.ui-intro__name`): the name, the avatar and the punctuation after them, kept on one line.
- **Lead** (`.ui-intro__lead`): the statement, in the lead role and muted colour, up to 40ch.
- **Actions** (`.ui-intro__actions`): the large primary [button](button.md) (Download CV) and the email [link](link.md).

## Variants

One variant. `pt-BR` text gets a wider measure (14ch instead of 13ch) and a display size one step down (86%), so "engenheiro de IA" fits the same column ([i18n](../foundations/i18n.md#text-length)).

## States

| State | Look |
| --- | --- |
| Loaded | As above |
| Loading | Two display-height lines, two lead lines and a pill block the size of the button, all [skeletons](skeleton.md); the section has `aria-busy="true"` and a status "Loading introduction" |
| No portrait | The avatar is left out; the sentence reads the same without it |
| No CV | The button is left out; the email link stays |

Hover, focus and active belong to the button and link inside. Error doesn't apply: if Profile Content can't load, the page shows the page-level error pattern instead.

## Accessibility

- The title is the page's only `<h1>`; the avatar inside it has `alt=""` because the name is next to it.
- The lead is a `<p>`, not part of the heading, so the heading stays short when read in a headings list.
- Download CV is a link with `download`, and its file size and format go in its accessible name once known ("Download CV, PDF, 120 KB").

## Content rules

- The sentence comes from Profile Content in each Locale. The design assumes it's short: a greeting, the name, the role, about 6 to 9 words. Longer sentences wrap to three lines; past that, shorten the Content.
- The avatar sits after the first occurrence of the Owner's short name. How Content marks that position (a placeholder in the sentence, or separate greeting, name and role fields) is a Contract decision for roadmap phase 4.
- The role is Content and changes; nothing in the layout assumes "AI engineer".

## Tokens

`--text-display`, `--text-size-display`, `--text-tracking-display`, `--text-lead`, `--text-measure-lead`, `--text-body`, `--color-text-muted`, `--space-page-inline`, `--space-stack-lg|xl`, `--space-gap-sm|md`, `--size-container-page`.

Component tokens: `--intro-measure` (13ch), `--intro-measure-long` (14ch), `--intro-size-long` (86% of display).

## Markup

```html
<section class="ui-intro">
  <h1 class="ui-intro__title">
    Hi, I’m <span class="ui-intro__name">Felipe<img class="ui-avatar" data-size="inline" src="portrait.jpg" alt="">,</span>
    an AI engineer.
  </h1>
  <p class="ui-intro__lead">I ship software where language models do real work, and the tests that keep them honest.</p>
  <div class="ui-intro__actions">
    <a class="ui-button" data-size="lg" href="/cv.pdf" download><!-- icon --><span>Download CV</span></a>
    <a class="ui-link" href="mailto:hello@example.com">hello@example.com</a>
  </div>
</section>
```
