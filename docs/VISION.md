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
- **The Owner** is the only person who edits in the CMS, and edits all Content there.

## Goals

- Three people unfamiliar with the Owner, each looking at Home for 30 seconds on mobile and on desktop, name the Owner's
  role, seniority and core technologies, and point to where to make contact.
- An engineer reaches the Portfolio's public repository in one click from any Page.
- The Owner changes any Content through the CMS, with no code change.
- Each Page shows the following, and the Footer appears on every Page:
  - **Home**: name, headline (role and seniority), short summary, location, optional photo, core technologies,
    CV download, a link to Experience and a link to the Footer's contact links.
  - **Experience**: every role, each with company, title, period, location and work model, summary, achievements and
    technologies; then an Education and certifications Section.
  - **About me**: a personal Page built from fixed Sections the product defines, with editable text and images, in a
    Visual language of its own that is entirely distinct from the Portfolio's.
  - **Footer**: the link to the Portfolio's public repository, then the social links and email.
- The Portfolio is bilingual, in English and Brazilian Portuguese, with a language toggle.

## Non-goals

- Projects and Articles Pages in the first release.
- A contact form; contact goes through the Footer links.
- A CV generated from Content; the CV is one PDF per language that the Owner uploads.
- Visit analytics in the first release.
- A CMS that changes layout or visual design: it edits Content only.
- More than one person editing in the CMS, and any CMS interface language other than English.

## Constraints

- Every piece of text a Visitor sees is Content from the CMS: Page text, links, media, navigation labels, button and
  language toggle labels, image alt text, the not-found Page, and SEO and sharing metadata. Nothing a Visitor reads is
  hardcoded in the Portfolio. Dates are the exception: month names and "present" follow the chosen language.
- A Content item is each thing the Owner edits and publishes on its own: Home's main Section, each role, each education
  or certification entry, each About me Section, each Footer link, each CV, and each Page's SEO metadata.
- Each Content item is a Draft or Published, and Visitors see only Published items. Editing a Published item creates a
  Draft over it, and the Published version stays Published until the Owner publishes again.
- The Owner can unpublish a Content item (it leaves the Portfolio and remains as a Draft), delete it, and discard a
  Draft.
- A Content item can be published only when its English and Brazilian Portuguese versions are complete, including the
  alt text of every image. Language-neutral fields (dates, photo, technologies, URLs) and optional fields don't block
  publishing.
- Roles and education entries are ordered by date, most recent first. The Owner orders core technologies and Footer
  links in the CMS.
- The Footer always includes the link to the Portfolio's public repository; the Owner edits its URL but can't remove
  it.
- Each language has its own address. A shared link opens in its own language; otherwise a first visit follows the
  browser's language and falls back to English, and later visits remember the Visitor's choice.
- The CMS previews a Draft in both languages as it will look on the Portfolio, including About me's Visual language.
- The CMS uses the Portfolio's Visual language, not About me's.
- On About me, the navigation, the language toggle and the Footer stay in the same place and work the same way; only
  their styling follows About me's Visual language.
- Mobile and desktop have equal priority.
- Every Page, About me included, meets WCAG 2.2 AA.
- The Owner builds it alone, with AI agents, with no budget and no fixed deadline.

## Open decisions

- Should the Portfolio and the CMS be two separate front-end applications, and how do they share the Portfolio's
  design system?
- How is Content stored and delivered to the Portfolio?
- How does a publish reach Visitors (a rebuild, or a read on every visit), and how long may it take?
- How are Drafts stored, and how does the CMS preview them?
- How does the Owner authenticate to the CMS?
- How are bilingual Content and the Visitor's language choice modeled and persisted, and what does each language's
  address look like?
- Where are media and CV files stored and served from?
- Which stack and frameworks build the Portfolio and the CMS?
- Where and how are the Portfolio and the CMS hosted and deployed?
