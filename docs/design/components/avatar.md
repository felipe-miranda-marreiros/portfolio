# Avatar

Code: `packages/ui/src/components/avatar/avatar.css`.

## Purpose

Shows the Owner's portrait as a circle: inline inside the introduction sentence, and as a block in the CMS (profile, upload preview). Not for other images (Content media keeps its own shape).

## Anatomy

- **Image**: `<img class="ui-avatar">`, cropped to a circle with `object-fit: cover`, focused near the top (`object-position: 50% 20%`) where faces sit.
- **Fallback**: `<span class="ui-avatar">` with initials, when no portrait is uploaded yet.

## Sizes

| `data-size` | Size | Use |
| --- | --- | --- |
| `inline` | 0.92em of the surrounding text | Inside the display introduction, aligned to the line |
| `sm` | `--size-portrait-sm` (44px) | CMS lists and header |
| `md` (default) | `--size-portrait-md` (96px) | CMS profile and upload preview |

## States

| State | Look |
| --- | --- |
| Loaded | The photo; `--shadow-raised` in light theme |
| Empty | Initials in `--text-title` on `--color-surface-raised` |
| Loading | A `circle` [skeleton](skeleton.md) of the same size (`--skeleton-size`) |
| Error | Same as empty: a portrait that fails to load falls back to initials (set by the app on the image's `error` event) |

Not interactive: no hover, focus, active, disabled or selected. In the CMS, changing the portrait happens in the image upload component.

## Accessibility

- Inline next to the Owner's name: `alt=""`, so the name isn't read twice.
- Standing alone: `alt` is the Owner's name (Content, in both Locales).
- Initials fallback: `role="img"` with `aria-label` set to the full name.

## Content rules

Initials are two letters, uppercase. The portrait is Content uploaded through the CMS; the design never ships a placeholder face.

## Tokens

`--size-portrait-sm|md`, `--radius-avatar`, `--color-surface-raised`, `--color-text-muted`, `--shadow-raised`, `--text-title`, `--text-label`.

Component token: `--avatar-size`.

## Markup

```html
<h1>Hi, I’m Felipe<img class="ui-avatar" data-size="inline" src="portrait.jpg" alt="">, an AI engineer.</h1>
<span class="ui-avatar" role="img" aria-label="Felipe Miranda Marreiros">FM</span>
```
