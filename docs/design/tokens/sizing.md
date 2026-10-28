# Sizing

Code: `packages/ui/src/tokens/sizing.css`. Primitives on the 4px base: `--size-4` 1rem, `--size-5` 1.25rem, `--size-6` 1.5rem, `--size-8` 2rem, `--size-11` 2.75rem, `--size-13` 3.25rem, `--size-24` 6rem, `--size-64` 16rem, `--size-96` 24rem, `--size-128` 32rem, `--size-400` 100rem.

| Token | Value | Use |
| --- | --- | --- |
| `--size-target-min` | 1.5rem (24px) | Smallest pointer target anywhere (WCAG 2.5.8) |
| `--size-target-touch` | 2.75rem (44px) | Smallest target on touch layouts |
| `--size-control-sm` | 2rem (32px) | Segmented switches (language, theme) on pointer layouts |
| `--size-control-md` | 2.75rem (44px) | Fields, buttons in the CMS, every control on touch |
| `--size-control-lg` | 3.25rem (52px) | The Portfolio's primary action (Download CV) |
| `--size-icon-sm` | 1rem | Icons inside controls |
| `--size-icon-md` | 1.25rem | Standalone icons |
| `--size-portrait-sm` | 2.75rem (44px) | Avatar in CMS lists and header |
| `--size-portrait-md` | 6rem (96px) | Avatar in the CMS profile and upload preview; default skeleton circle |
| `--size-container-page` | 100rem (1600px) | Maximum page width; wider screens get more margin |
| `--size-sidebar` | 16rem | The CMS sidebar |
| `--size-toast` | 24rem | Maximum toast width |
| `--size-dialog` | 32rem | Maximum dialog width |

Controls set `min-height`, never `height`, so a `pt-BR` label that wraps grows the control instead of overflowing ([i18n](../foundations/i18n.md#text-length)). The inline avatar in the introduction is sized in `em` by its component, so it always matches the cap height of the line it sits in.
