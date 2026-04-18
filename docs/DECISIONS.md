# Decisions Log
*Version:* v0.4
*Date:* 2026-04-18
*Last reviewed:* 2026-04-18

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
  web stack, while keeping lightweight Python repo tooling temporarily for local checks.
- Why: one TypeScript codebase minimizes coordination cost across UI and server logic
  while the product is still narrow and moving quickly.
- Alternatives considered: a Python-first application, a docs-only holding phase, or
  separate front-end and back-end repos.
- Consequences: canonical product verification should move to `pnpm`, unit or
  integration tests, and Playwright as soon as the app scaffold exists.
- Revisit when: `PRODUCT-001` exposes a strong reason to split the stack or choose a
  different runtime.

### 2026-04-18 - The repository will keep one canonical Codex workflow
- Decision: remove secondary-tool compatibility artifacts and treat the root
  repository tree as the only canonical implementation path.
- Why: abandoned scratch work created a second apparent source of truth and blurred
  where real product work should happen.
- Alternatives considered: keeping a compatibility shim or migrating scratch work into
  the canonical repo without re-review.
- Consequences: shared repo guidance now points to `AGENTS.md`, `docs/`, and `work/`
  only; scratch worktrees are reference material at most, not canonical code.
- Revisit when: the team intentionally adopts a second tool and can support that
  workflow without fragmenting the repository contract.

### 2026-04-18 - The repo will prefer a lean instruction surface
- Decision: remove legacy scaffolding until the product actually needs more structure.
- Why: duplicated guidance was increasing maintenance cost and making the real entry
  points harder to identify.
- Alternatives considered: keeping the old structure but marking most files as optional.
- Consequences: the repo now centers on product docs, security guardrails, task
  tracking, and a small verification layer.
- Revisit when: the product introduces real runtime prompt assets or more complex agent
  workflows that justify added structure.

### 2026-04-18 - Security and review are part of the product contract
- Decision: treat security, privacy, and human review as core product constraints in v1.
- Why: event captures can easily include sensitive context, and trust will collapse if
  the system feels opaque or promiscuous with data.
- Alternatives considered: deferring security policy until after the app scaffold exists.
- Consequences: external provider boundaries must stay explicit, local-first workflows
  are preferred, and any broader data exposure needs deliberate review.
- Revisit when: real integrations or hosted deployment requirements change the risk model.
