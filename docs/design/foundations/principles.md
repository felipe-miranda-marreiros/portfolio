# Principles

Five principles, each one settling a trade-off. When two good options conflict, the principle decides; when a principle stops deciding anything, delete it.

## 1. The Owner speaks first

**Person over template.** Every surface a Visitor sees opens on the Owner in the first person: their name, their face, their own sentence. We give up the neutral, interchangeable layout that would survive any Content, so the design has to hold up when the statement is short or plain: the type scale and spacing carry the page even with one line of copy.

## 2. Scan before story

**Speed to judgment over atmosphere.** A hiring Visitor must find who, what role, and the latest dated roles within the first viewport, in either Locale. Nothing delays that: no intro animation that hides content, no carousel, no scroll-triggered reveal of facts. Motion and expression are spent only where they never stand between the Visitor and those facts.

## 3. Contrast, not colour

**Emphasis from size, weight and inversion, never from hue.** The world is strict monochrome: one near-black, one near-white, and greys between. Hierarchy comes from scale steps, weight steps, and swapping ground and ink (the inverted work band). We give up colour as a signalling tool, so status colours (success, warning, danger, info) exist only for functional states in forms and messages, never as decoration, and always paired with text or an icon.

## 4. Both Locales are equal

**Design for the longer text first.** Layouts are drawn with `pt-BR`, which runs about 30% longer than `en`, and then checked in `en`; never the other way round. Some `en` layouts end up roomier than they would be if designed alone; that is the price of `pt-BR` never being squeezed. See [i18n.md](i18n.md).

## 5. One system, two volumes

**Shared tokens over per-app freedom.** The Portfolio and the CMS use the same primitives, semantic tokens and components; they differ only in how loud they are (see Surfaces below). The CMS cannot invent its own palette or type, and the Portfolio cannot use a one-off value. A value one app needs and the system lacks becomes a token first.

## Surfaces

| | Portfolio | CMS |
| --- | --- | --- |
| Who | Visitors (hiring teams first) | The Owner only |
| Mode | Experience: the Owner's introduction is the work | Operate: write, translate, publish quickly and safely |
| Language | `en` and `pt-BR`, equal | English UI; Content fields in both Locales side by side |
| Density | Low: one idea per viewport, generous space | High: forms and lists at working density |
| Type range | Full scale, display sizes up to about 7rem | Text and title sizes only; no display sizes |
| Inversion | Used for structure (the white work band on black) | Used for selection and the primary action only |
| Motion | One authored moment per page, transitions on theme and Locale switch | Feedback only: focus, save, publish, errors |
| Imagery | The Owner's portrait | None beyond Content previews |

What never changes between them: tokens, components, focus treatment, radius and border language, the theme model, and the accessibility target.
