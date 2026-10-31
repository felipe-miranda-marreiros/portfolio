# Portfolio project

A portfolio project, and the harness that keeps the work AI agents do on it planned, ordered and verifiable.

## Language

### Product

**Portfolio**:
The public, bilingual presentation of the Owner that Visitors read. It shows only Published Content.
_Avoid_: site, frontend, website

**CMS**:
The application where the Owner edits Content.
_Avoid_: admin, dashboard, back office

**Owner**:
The person the Portfolio presents, and the only person who edits in the CMS.
_Avoid_: admin, author, user

**Visitor**:
Anyone reading the Portfolio, mainly recruiters and engineers.
_Avoid_: user, guest, reader

**Page**:
A top-level destination of the Portfolio, such as Home, Experience or About me. A Page is made of Sections.
_Avoid_: screen, route, view

**Section**:
A distinct part of a Page, such as Education and certifications on Experience. The Footer is the Section shown on every Page.
_Avoid_: block, area, module

**Visual language**:
The look shared by a set of Pages. The Portfolio has one, About me has its own, and the CMS uses the Portfolio's.
_Avoid_: theme, skin, style

**Content**:
Everything a Visitor reads or downloads on the Portfolio, edited in the CMS, in both languages.
_Avoid_: data, copy

**Content item**:
One piece of Content the Owner edits and publishes on its own, such as a role, a Footer link or a CV.
_Avoid_: entry, record, document

**Draft**:
A Content item's version not yet Published, visible only to the Owner in the CMS. Not to be confused with a draft Vision.
_Avoid_: unpublished, pending

**Published**:
A Content item's version that Visitors see. Editing it creates a Draft over it.
_Avoid_: live, public, released

### Planning workflow

**Vision**:
The document that says why the project exists, for whom, its goals, its non-goals, its constraints and the decisions still open. It holds no technical decisions.
_Avoid_: pre-planning, kickoff, charter, constitution

**ADR**:
A short record of one hard-to-reverse decision, with its context and consequences, usually closing an open decision from the Vision.
_Avoid_: decision doc, design doc

**Roadmap**:
The plan of what gets built and in what order, with the blockers of every item stated.
_Avoid_: concrete planning, backlog, plan

**Milestone**:
One item of the Roadmap: a shippable outcome with a status (planned, in-progress or done) and its blockers. Each Milestone gets exactly one Spec once it is in progress.
_Avoid_: epic, phase, GitHub Milestone

**Spec**:
The description of one Milestone from the user's perspective: problem, solution and user stories. Written only when that Milestone is in progress.
_Avoid_: PRD, requirements doc

**Ticket**:
A vertical slice of a Spec, verifiable on its own and small enough for one agent in one fresh context.
_Avoid_: task, story, subtask

**Claim**:
Marking a Ticket as taken by one agent, so no other agent picks it up.
_Avoid_: lock, reserve

**Blocker**:
Work that must be done before another piece of work can start. Every Roadmap item and Ticket names its blockers, or states explicitly that it has none.
_Avoid_: dependency, prerequisite

**Independent**:
Said of work whose blockers are explicitly stated as none, so it can start at any time.
_Avoid_: standalone, parallel

**Frontier**:
All work whose blockers are done and that nobody has claimed: what may be picked up now. For Milestones, the planned ones a human may approve next; for Tickets, the ones an agent may claim.
_Avoid_: ready queue, next up

**Approval**:
The act, reserved to a human, that moves a planning document or Roadmap item to its next stage.
_Avoid_: sign-off
