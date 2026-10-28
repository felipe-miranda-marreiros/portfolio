# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Visitor** (primary: hiring teams). Recruiters and engineering managers deciding whether to interview the Owner. They arrive from a CV, a job application or a profile link, usually scanning several candidates, and need to judge fit quickly.
- **Visitor** (secondary: freelance clients and peers). People weighing the Owner for a contract, or engineers following their work.
- **Owner**. The single authenticated person who writes, translates and publishes all Content in the CMS.

Vocabulary (Owner, Visitor, Content, Locale, Draft, Published) is defined in `GLOSSARY.md`.

## Product Purpose

A dynamic portfolio for a software engineer. The Owner manages Content in the CMS, the API stores it, and Visitors read it on the Portfolio in English or Brazilian Portuguese. Success: a hiring Visitor understands who the Owner is and what they have done well enough to reach a decision, in either Locale; the Owner can update that story without touching code.

## Positioning

- Who the Owner presents as is Content, not design. The current intent is "AI Engineer", and it is expected to change; no surface may hardcode a role, specialty or seniority.
- The project itself is built by AI coding agents inside a deterministic harness (hooks, CI, contract-first apps; see `README.md`). Inferred from the repository; not yet confirmed as a claim the Portfolio makes to Visitors.

## Operating Context

- Portfolio: public, bilingual (`en`, `pt-BR`), locale-prefixed routes (`/en`, `/pt-br`); `/` redirects by `Accept-Language`, default `en`.
- CMS: Owner only, English only. The Owner authors every translatable field in both Locales and publishes from here.
- All Content comes from the API. During design and app development both apps run on fixtures derived from the Contract (`packages/contracts`).

## Capabilities and Constraints

- Content is Published only when complete in both Locales, so the Portfolio never shows a half-translated page and has no fallback logic (ADR 0004).
- The API owns Content and its invariants; the CMS holds no data (ADR 0001, 0002).
- Both apps import UI from `packages/ui`. Styling is plain CSS until the CSS framework is chosen after the design (ADR 0005).
- Portfolio: Astro. CMS: Vite + React, TanStack Router and Query, React Hook Form, Zod.
- v1 is minimal. Project list and Project detail are v2; blog, contact form and analytics are out (`docs/roadmap/backlog.md`).
- Undecided: which Content types and fields exist in v1 (Profile, Experience, Skill and Media are candidates), Markdown for long text, ordering, and the hosting target. They are settled in roadmap phase 4 and 6, not here.

## Brand Commitments

None yet: no logo, wordmark or fixed name lockup exists. Binding design process and design-system rules live in `.claude/rules/design-system.md` and `docs/design/impeccable-brief.md`.

## Evidence on Hand

- A real CV with work history, and real photos of the Owner. Neither is in the repository yet; both enter as Content through the CMS.
- Design work uses Contract fixtures in the meantime.
- Absent, and must not be fabricated: testimonials, client names or logos, metrics, press, awards, case studies.

## Product Principles

1. Content decides what the Portfolio says; design decides how it reads. Nothing about the Owner is hardcoded.
2. Hiring teams first. The fastest path to judging fit wins over anything that delays it.
3. Both Locales are equal. `pt-BR` is never a degraded copy of `en`.
4. The CMS serves one person. The Owner's speed and confidence publishing come before generality.

## Accessibility & Inclusion

WCAG 2.2 AA across both apps, both themes and both Locales. The detailed requirements live in `.claude/rules/design-system.md`.
