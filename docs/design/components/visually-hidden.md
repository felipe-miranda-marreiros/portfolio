# Visually hidden

Code: `packages/ui/src/components/visually-hidden/visually-hidden.css`.

## Purpose

Keeps text available to screen readers while hiding it on screen: live-region announcements ("Saved", "Loading experience"), and extra context a sighted user gets from layout. Not for hiding content from everyone (use `hidden`) and not for decorative text (delete it).

## Anatomy

A class, `.ui-visually-hidden`, on any element. It uses the standard 1px clipped box: zero-size boxes are skipped by some screen readers, so the 1px is the technique, not a design value.

## States

None. To reveal something on focus, use a component built for it, such as the [skip link](skip-link.md).

## Accessibility

- Never put focusable elements inside: a keyboard user would focus something invisible.
- Live regions keep their element in the DOM and change its text; inserting a new region each time is often not announced.

## Content rules

Write the sentence a screen reader user needs, in the page's Locale: "Experience loaded", "A experiência foi carregada".

## Tokens

None; it has no visual.

## Markup

```html
<p class="ui-visually-hidden" role="status">Experience loaded</p>
```
