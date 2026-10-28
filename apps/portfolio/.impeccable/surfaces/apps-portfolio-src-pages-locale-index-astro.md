---
version: 1
slug: "apps-portfolio-src-pages-locale-index-astro"
primary_target: "apps/portfolio/src/pages/[locale]/index.astro"
related_targets: ["apps/portfolio/src/pages/index.astro"]
---

# Portfolio home

Scope: the Portfolio's locale home (`/en`, `/pt-br`). Mode: Experience. Build path: code-led (no image generation in the harness). Built only at brief step 5; until then the direction steers Foundations, Tokens and Components.

Audience and job: hiring Visitors (recruiters, engineering managers) judging fit in seconds; they need who the Owner is, what they do, and the recent work history, in either Locale. Action: download the CV or email. Proof: real work history and a real portrait, both Content; nothing invented.

Chosen direction: Voz, monochrome. It started as Voz com Cor, an Owner-requested blend of Retrato and Primeira Pessoa. The Owner then asked for something dark and elegant, "like Spotify, not the green", turned down the ipê colours, coral and cobalt, and picked monochrome made bolder by scale and a white work band. Memorable moment: a heavy white introduction on near-black with the Owner's face set in the line, cut off by a stark white band holding the work history.

Reference sketch: `.impeccable/mocks/r5/mono.html#b` (critique reference at the finish review; earlier rounds in `r2` to `r4` are rejected and serve as anti-references).

## Direction contract

THESIS: The home is the Owner speaking, in black and white: a first-person introduction at poster scale with the portrait set inline, refusing the dark dev hero with gradient and glow, the document or form layout, and any accent colour.

OWN-WORLD: Strict monochrome. Near-black ground (#121212) with a raised grey (#181818), white primary text, grey #b3b3b3 secondary; no hue anywhere, emphasis only from size, weight and inversion. The work band is the inversion: pure white with black text, and the current year is a black chip. Light theme is the mirror: near-white ground and a black band. Funnel Display (650) for the voice, Funnel Sans for text. White pill buttons with black text, round avatar, pill segmented switches, no cards, rules or shadows used as decoration.

STORY: The Visitor hears who the Owner is in one sentence, sees their face, scans three dated roles without scrolling, and downloads the CV or emails.

FIRST VIEWPORT: Top row: name wordmark left, section links and pill EN/PT and theme switches right. Middle left: "Hi, I'm Felipe [avatar], an AI engineer." at about 7rem, 650, white, two lines (three in pt-BR), the avatar sized to the cap height; under it the rest of the statement as a 1.6rem grey paragraph; then a white Download CV pill and the email. Bottom: a full-bleed white band with "Lately" and three roles as horizontal columns (year, role at 26px, company), the current year on a black chip.

FORM: blend of grounded candidates 1 (Retrato) and 2 (Primeira Pessoa) from the safer re-roll hand, recoloured to bold monochrome at the Owner's request; seed:e820bab0eed56fec.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- The real portrait and CV replace the stock placeholder and Sample Content.
- Whether the full experience list continues in the white band or below it.
- How the CMS (Operate mode) uses the monochrome tokens at a quieter density: decided in Foundations.
