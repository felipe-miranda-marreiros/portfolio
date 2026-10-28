# Empty states

Demo: `/patterns/#p-empty`. Components: [content list](../components/content-list.md) empty state, [button](../components/button.md), [avatar](../components/avatar.md) fallback, [image upload](../components/upload.md) empty state.

## The CMS: explain and offer the first step

An empty list is the Owner's starting point, not an error:

- **Title**: what's missing, in plain words ("No experience yet").
- **Sentence**: why it matters or what happens next ("Add a role to show it on the Portfolio once it’s Published in both Locales.").
- **One primary action** that creates the first item ("Add experience").

No illustrations: they'd be the only image in a quiet tool, and they'd need translating in spirit if not in words.

## The Portfolio: leave it out

Visitors never see an empty frame ([principle 2](../foundations/principles.md#2-scan-before-story)):

| Missing Content | What the Portfolio does |
| --- | --- |
| No Published experience | The [work band](../components/work-band.md) and the experience list aren't rendered |
| No portrait | The introduction reads the same without the inline avatar |
| No CV file | The Download CV button is left out; the email link stays |
| No profile links | The footer shows only the name |

Because Publish requires both Locales ([ADR 0004](../../adr/0004-publish-requires-both-locales.md)), something is never present in one Locale and empty in the other.

## Partial content in the CMS

A Draft missing one Locale isn't empty: it uses the [locale field pair](../components/locale-pair.md) missing state (dashed outline, warning note), and the [status badge](../components/status.md) stays Draft.

## Search and filters

Not in v1, so there's no "no results" state.
