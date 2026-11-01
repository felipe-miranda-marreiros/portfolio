# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters**, primary on Home and Experience. In about 30 seconds, on mobile or desktop, they need the Owner's
  role, seniority, core technologies, location, a CV and a way to make contact.
- **Engineers**, secondary. They want depth: what the Owner did in each role, its impact, and a short path to the code.
- **The Owner**, the only person who edits, and only in the CMS. The CMS interface is English only.

Vocabulary (Owner, Visitor, Page, Section, Content, Content item, Draft, Published, Visual language) is defined in
`GLOSSARY.md`.

## Product Purpose

A bilingual (English and Brazilian Portuguese) portfolio that helps the Owner land their next software engineering
role, plus the CMS where the Owner edits all of its Content. Success is the Vision's goals: three people unfamiliar with
the Owner, after 30 seconds on Home, name the role, seniority and core technologies and point to where to make contact;
an engineer reaches the public repository in one click from any Page; the Owner changes any Content with no code
change.

## Positioning

The Portfolio is its own proof of work: its public repository, its CMS, and its test-first, planned, agent-built
workflow are evidence of how the Owner works as an engineer, which a template portfolio cannot claim. The Owner's role,
seniority, technologies and location are Content edited in the CMS, not fixed product facts; design must hold any
values of them.

## Operating Context

- Pages: Home, Experience and About me, with the Footer on every Page. Projects and Articles Pages, a contact form,
  analytics and a generated CV are out of the first release.
- Each language has its own address. A shared link opens in its own language; a first visit follows the browser's
  language and falls back to English; later visits remember the Visitor's choice.
- Contact goes only through the Footer: the public repository link first, then social links and email.
- The Owner works in the CMS: edits Drafts, previews them in both languages exactly as the Portfolio will show them
  (About me's Visual language included), then publishes, unpublishes, deletes or discards.

## Capabilities and Constraints

- Every piece of text a Visitor sees is Content from the CMS, including navigation, button and toggle labels, alt text,
  the not-found Page and SEO metadata. Nothing a Visitor reads is hardcoded. Dates are the exception: month names and
  "present" follow the chosen language.
- A Content item publishes only when its English and Brazilian Portuguese versions are complete, alt text included.
  Visitors see only Published items; editing a Published item creates a Draft over it.
- Roles and education entries are ordered by date, most recent first. The Owner orders core technologies and Footer
  links.
- The Footer always includes the public repository link; the Owner edits its URL but can't remove it.
- The CMS edits Content only, never layout or visual design.
- Two Visual languages: the Portfolio's, which the CMS also uses, and About me's own, entirely distinct. On About me,
  the navigation, language toggle and Footer stay in the same place and behave the same; only their styling changes.
- Mobile and desktop have equal priority.
- Built by the Owner alone with AI agents, no budget, no fixed deadline.

## Brand Commitments

- The Portfolio's Visual language is a dark, confident engineering page: near-black ground, bone ink, a bold tightly
  tracked grotesk, monospace for labels only and hairline-bordered panels.
- The Portfolio is monochrome: no hued accent. The primary action is the ink itself, filled; the Owner turned down
  every hued accent, gradient and multi-colour palette offered.
- Dark always by default, with a complete light theme the visitor chooses in a dark and light switch; the system
  preference is never followed.
- The Owner prefers not to be the visual focus: Home leads with the facts, and the Owner's photo stays small and plain
  beside the name.

## Evidence on Hand

The Owner holds, outside the repository: CV PDFs in English and Brazilian Portuguese, a photo for Home, a written role
history with achievements and technologies, and material for About me (hobbies and interests, personal story, values
and how they work). None of it is in the repository yet; future work uses placeholders marked as such and never invents
roles, employers, achievements, testimonials or metrics.

## Product Principles

1. **Thirty seconds, then depth.** Home answers role, seniority, technologies, location, CV and contact at a glance;
   Experience gives engineers the depth one step away.
2. **The project is the evidence.** The public repository is one click from every Page, and the craft of the build
   itself is part of the pitch.
3. **Content owns every word.** Nothing a Visitor reads is hardcoded, and both languages are complete equals.
4. **One behavior, two Visual languages.** About me may look entirely different, but it never moves or changes how
   navigation, the language toggle or the Footer work.

## Accessibility & Inclusion

Every Page, About me included, meets WCAG 2.2 AA, in both languages and on mobile and desktop.
