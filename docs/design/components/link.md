# Link

Code: `packages/ui/src/components/link/link.css`.

## Purpose

Goes somewhere: another page, a section, an email address, an external profile. Not for actions that change data: that is a [button](button.md).

## Anatomy

The text, its underline, and an optional trailing [icon](icon.md) (not used in v1).

## Variants

| Variant | Markup | Use |
| --- | --- | --- |
| Inline | `class="ui-link"` | Inside running text. Always underlined, so it never depends on colour |
| Standalone | `data-variant="standalone"` | Navigation and link lists, where position already says "this is a link". Underlined on hover and when current |
| Muted (tone) | `data-tone="muted"` | Secondary links (footer, social profiles). Turns to `--color-text` on hover |

## States

| State | Trigger | Look |
| --- | --- | --- |
| Default | | Inline: 1px underline. Standalone: no underline |
| Hover | `:hover` | Underline at 2px; muted links turn primary colour |
| Current | `aria-current="page"` (or `true`) | Standalone: 2px underline, permanently |
| Focus | `:focus-visible` | 2px outline in `--color-focus`; inline links use a 1px offset so the ring doesn't cover neighbouring words |
| Visited | | Same as default: the Portfolio is small enough that visited state is noise |

Disabled, loading, error, empty and skeleton don't apply: an unavailable destination is not rendered as a link at all, and links load with their text.

## Accessibility

- Always `<a href>`. Link text says where it goes out of context ("LinkedIn", "Experience"), never "click here".
- External links that open a new tab say so in their accessible name ("LinkedIn, opens in a new tab"); v1 opens links in the same tab.
- `aria-current="page"` on the link to the current page or section.

## Content rules

Short nouns for navigation ("Experience", "Contact"; `pt-BR` "Experiência", "Contato"). Email addresses are shown in full. Long links wrap.

## Tokens

`--color-text`, `--color-text-muted`, `--color-focus`, `--border-width-1|2`, `--border-width-focus`, `--border-focus-offset`, `--text-underline-offset`, `--radius-chip`, `--duration-quick`, `--ease-out`.

## Markup

```html
<p>Write to <a class="ui-link" href="mailto:hello@example.com">hello@example.com</a>.</p>
<a class="ui-link" data-variant="standalone" href="#experience" aria-current="true">Experience</a>
```
