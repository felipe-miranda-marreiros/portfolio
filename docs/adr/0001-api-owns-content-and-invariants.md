# The API owns Content and its invariants; the CMS is a custom admin over it

The Portfolio is dynamic, so Content lives in a database behind the API, which is the single source of truth and the only place invariants are enforced. The CMS is a small custom app that calls the API and has no database access. We rejected an off-the-shelf headless CMS (Payload, Strapi) because it would own the domain model and split the invariants between two systems.
