# Decisions Log
*Version:* v0.2
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

Use this file to record meaningful product, architecture, or workflow decisions.

### 2026-03-28 - v1 focuses on event follow-through, not note storage
- Decision: Insight Tracker v1 targets intentional professional attendees who need
  help turning fragmented event captures into structured insights and next actions.
- Why: people already have places to store fragments; the missing value is reliable
  follow-through after live conversations.
- Alternatives considered: a broad personal knowledge management app, a networking CRM,
  or a general meeting-notes product.
- Consequences: work that does not strengthen the event capture-to-review loop stays
  out of scope for the first release.
- Revisit when: repeated users ask for materially broader workflows than event capture
  and review.

### 2026-03-28 - The first product slice is human-in-the-loop capture to review
- Decision: the initial end-to-end workflow is create event, capture fragment, process
  it into a suggested insight and follow-up, review or edit it, then persist both the
  raw and reviewed records.
- Why: this is the smallest workflow that proves the product promise without depending
  on deep integrations.
- Alternatives considered: starting with full calendar sync, contact management, or an
  ambient recording workflow.
- Consequences: `.ics` export can follow soon after, but full calendar sync, CRM
  features, and autonomous follow-up agents are deferred.
- Revisit when: the core loop is stable and early users repeatedly ask for the same
  downstream action.

### 2026-03-28 - Initial implementation will be a TypeScript web app
- Decision: build the product as a mobile-friendly TypeScript web app with a single
  web stack, while keeping the inherited Python toolchain only as temporary repo
  maintenance.
- Why: one TypeScript codebase minimizes coordination cost across UI and server logic
  while the product is still narrow and moving quickly.
- Alternatives considered: a Python-first application, a docs-only holding phase, or
  separate front-end and back-end repos.
- Consequences: canonical product verification should move to `pnpm`, unit or
  integration tests, and Playwright as soon as the app scaffold exists.
- Revisit when: `PRODUCT-001` exposes a strong reason to split the stack or choose a
  different runtime.
