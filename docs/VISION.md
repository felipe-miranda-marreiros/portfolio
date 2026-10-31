# Vision

Status: draft

## Why

The Owner needs a portfolio that helps land the next software engineering role. It has two jobs: present the career
clearly to the people who hire, and let the project itself (its public repository, its CMS, its test-first and planned
workflow) serve as evidence of how the Owner works as an engineer.

## Audience

- **Recruiters** (primary on Home and Experience): in about 30 seconds they need the Owner's role, seniority, core
  technologies, location, a CV and a way to make contact.
- **Engineers** (secondary): they want depth, meaning what the Owner did in each role, its impact, and a short path to
  the code.
- **The Owner** is the only user of the CMS and edits all Content there.

## Goals

- In 30 seconds or less on Home, a recruiter can name the Owner's role, seniority and core technologies, and knows how
  to get in touch.
- An engineer reaches the Owner's code in one click from any Page.
- The Owner changes any Content through the CMS, with no code change.
- The Portfolio has three Pages and a Footer shown on every Page:
  - **Home**: name, headline (role and seniority), short summary, location, optional photo, core technologies,
    CV download, and links to Experience and to contact.
  - **Experience**: every role in reverse chronological order by date, each with company, title, period, location and
    work model, summary, achievements and technologies; then an Education and certifications Section.
  - **About me**: a personal Page built from fixed blocks the product defines, with editable text and images, in a
    visual language of its own that is entirely distinct from the rest of the Portfolio.
  - **Footer**: the social links and email, which the Owner adds, removes and reorders in the CMS.
- The Portfolio is bilingual, in English and Brazilian Portuguese, with a language toggle. On a first visit it follows
  the browser's language and falls back to English; after that it remembers the Visitor's choice.

## Non-goals

- Projects and Articles Pages in v1.
- A contact form; contact goes through the Footer links.
- A CV generated from Content; the CV is one PDF per language that the Owner uploads.
- Visit analytics in v1.
- A CMS that changes layout or visual design: it edits Content only.
- More than one CMS user, and any CMS interface language other than English.

## Constraints

- Every piece of Content the Visitor sees comes from the CMS: text, links, media, the order of items, navigation
  labels and SEO and sharing metadata. Nothing a Visitor reads is hardcoded in the Portfolio.
- Each Content item is a Draft or Published, and Visitors see only Published items. Editing a Published item creates a
  Draft over it, and the Published version stays live until the Owner publishes again.
- An item can be published only when both its English and its Brazilian Portuguese versions are complete.
- The CMS previews a Draft as it will look on the Portfolio, including About me's own visual language.
- The CMS uses the Portfolio's visual language, not About me's.
- On About me, the navigation, the language toggle and the Footer stay in the same place and work the same way; only
  their styling follows About me's visual language.
- Mobile and desktop have equal priority.
- Every Page, About me included, meets WCAG 2.2 AA.
- One person builds it, with no budget and no fixed deadline.

## Open decisions

- Should the Portfolio and the CMS be two separate front-end applications, and how do they share the Portfolio's
  design system?
- What back end and API serve the Content, and where is Content stored?
- How are Drafts stored, and how does the CMS preview them?
- How does the Owner authenticate to the CMS?
- How are bilingual Content and the Visitor's language choice modeled and persisted?
- Where are media and CV files stored and served from?
- Which stack and frameworks build the Portfolio and the CMS?
- Where and how are the Portfolio, the CMS and the back end hosted and deployed?
