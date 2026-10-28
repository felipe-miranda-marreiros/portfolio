# Portfolio

A dynamic portfolio for a software engineer: the owner manages content in an admin app, and visitors read it on a public site.

## Language

**Owner**:
The single person who authors and publishes all content. The only authenticated user.
_Avoid_: Admin, user, author

**Visitor**:
Anyone browsing the public site. Never authenticated.
_Avoid_: User, reader, client

**Content**:
Everything the Owner publishes about themselves, stored in the API and never hardcoded in an app.
_Avoid_: Data, entries, posts

**Portfolio**:
The public app where Visitors read published Content.
_Avoid_: Site, frontend, website

**CMS**:
The Owner-only admin app for creating, editing and publishing Content. It holds no data of its own and talks only to the API.
_Avoid_: Admin panel, dashboard, backoffice

**API**:
The only app that stores Content and enforces its invariants. Serves both the Portfolio and the CMS.
_Avoid_: Backend, server

**Contract**:
The shared definition of Content shapes, invariants and API operations that the API, Portfolio and CMS all build against.
_Avoid_: Schema, types, spec

**Locale**:
One of the two languages Content is written in: English (`en`) or Brazilian Portuguese (`pt-BR`).
_Avoid_: Language, translation

**Draft**:
Content that is not visible to Visitors, whatever its state of completion.
_Avoid_: Unpublished, hidden

**Published**:
Content visible to Visitors. Content can be Published only when it is complete in every Locale.
_Avoid_: Live, public, released
