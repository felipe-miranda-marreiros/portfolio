# Image upload

Code: `packages/ui/src/components/upload/upload.css`. CMS.

## Purpose

Sets the Owner's portrait (and later other Media): preview, choose or drop a file, see progress, replace or remove. Alt text is separate Content, edited with a [locale field pair](locale-pair.md) under it.

## Anatomy

- **Zone** `.ui-upload`: the dashed drop area.
- **Preview**: the current portrait as an [avatar](avatar.md), or its initials fallback.
- **Title** `.ui-upload__title`: what's happening, in words.
- **Hint or status**: accepted files, a `<progress>`, or an error.
- **Actions** `.ui-upload__actions`: a visually hidden file input with a secondary [button](button.md)-styled `<label>` ("Choose image" or "Replace"), and "Remove" (danger) once uploaded, or "Cancel" while uploading.

## States

Set with `data-state` by the app:

| `data-state` | Look |
| --- | --- |
| `empty` | Dashed outline, initials, "Drop a portrait here, or choose a file" |
| `dragover` | Solid `--color-text` outline on the hover surface, "Drop to upload" |
| `uploading` | Progress bar and Cancel |
| `done` | Solid outline, the portrait, file name, Replace and Remove |
| `error` | Danger outline and an error saying what to change ("The image is 640×640. Use one at least 800px on its shorter side.") |

Focus lands on the file input and shows the ring on its label. Disabled isn't used. Loading (page) is a `circle` and two `line` skeletons.

## Accessibility

- The file input stays in the DOM (visually hidden) so keyboard and screen reader users reach it; its label is the visible button.
- Drag and drop is an addition, never the only way ([WCAG 2.5.7](../foundations/accessibility.md#targets)).
- Progress is a native `<progress>` with a label; completion and errors are announced through the [toast](toast.md) region.
- Remove asks for confirmation in a [dialog](dialog.md).

## Content rules

The hint lists formats, minimum size and maximum weight. Errors state the measured value and the requirement.

## Tokens

`--color-border-control`, `--color-surface-raised`, `--color-surface-hover`, `--color-surface-active`, `--color-text`, `--color-danger`, `--color-focus`, `--border-width-control|focus`, `--border-style-draft|default`, `--border-focus-offset`, `--radius-surface`, `--radius-full`, `--space-inset-lg`, `--space-gap-md|sm`, `--space-stack-sm`, `--space-2`, `--text-label`, `--text-measure-lead`, `--duration-quick`, `--ease-out`.

## Markup

```html
<div class="ui-upload" data-state="empty">
  <span class="ui-avatar" role="img" aria-label="No portrait yet">FM</span>
  <div class="ui-upload__body">
    <p class="ui-upload__title">Drop a portrait here, or choose a file</p>
    <p class="ui-field__hint">JPG or PNG, at least 800px on the shorter side, up to 5 MB.</p>
    <div class="ui-upload__actions">
      <input type="file" id="portrait" class="ui-visually-hidden" accept="image/jpeg,image/png">
      <label for="portrait" class="ui-button" data-variant="secondary" data-size="sm">Choose image</label>
    </div>
  </div>
</div>
```
