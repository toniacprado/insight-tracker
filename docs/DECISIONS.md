# Decisions Log
*Version:* v0.5
*Date:* 2026-04-19
*Last reviewed:* 2026-04-19

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
- Consequences: external provider boundaries must stay explicit, private-by-default
  data handling is preferred, and any broader data exposure needs deliberate review.
- Revisit when: real integrations or hosted deployment requirements change the risk model.

### 2026-04-19 - V1 will be a hosted personal app with simple auth
- Decision: build v1 as a hosted, single-user or personal-first web app with
  magic-link authentication instead of a Mac-dependent local workflow.
- Why: the product needs to be usable away from one machine, especially for reviewing
  captures and transcripts after the event context has passed.
- Alternatives considered: making the Mac the primary runtime and exposing only part of
  the data online, or staying local-first until later.
- Consequences: the initial app slice now needs auth, hosted persistence, and private
  storage boundaries from the beginning.
- Revisit when: local processing becomes a specific privacy requirement strong enough to
  justify hybrid runtime complexity.

### 2026-04-19 - Capture is inbox-first, not event-first
- Decision: captures land in an inbox first and can remain unassigned until the user
  decides how to organize them.
- Why: forcing event creation at capture time adds friction exactly when the user is
  least willing to navigate structure.
- Alternatives considered: requiring an event before each capture or using a rigid
  session model immediately.
- Consequences: event or session grouping becomes optional organization layered on top
  of the core capture-review loop, and the data model must allow zero, one, or many
  future grouping links.
- Revisit when: repeated real usage shows a stable grouping model that improves review
  rather than slowing capture.

### 2026-04-19 - Raw source stays immutable and reviewed output stays editable
- Decision: retain raw audio and transcripts as immutable source records while making
  the editable review layer the extracted insight and follow-up set.
- Why: the product needs auditable source material without inviting users to rewrite
  transcripts into an uncontrolled second note-taking surface.
- Alternatives considered: editable transcripts or discarding transcripts after
  extraction.
- Consequences: the UI needs a clear separation between source material and reviewed
  output, and tests should assert that both remain linked.
- Revisit when: users show a repeated need for transcript correction rather than
  insight-level editing.

### 2026-04-19 - Follow-up output is multi-candidate and may be empty
- Decision: each capture can produce one primary insight plus multiple candidate
  follow-ups, and the reviewed result may keep zero, one, or several follow-ups.
- Why: live-context captures often suggest several plausible next moves, while some
  captures are valuable as insight only and should not force an action.
- Alternatives considered: exactly one follow-up per capture or requiring every
  confirmed item to include an action.
- Consequences: the review UI must support selecting, editing, deleting, or adding
  follow-ups without turning the workflow into a task manager.
- Revisit when: the candidate volume proves noisy enough that the product needs a
  tighter default bound.

### 2026-04-19 - Archive remains manual and external storage is not canonical
- Decision: keep archive or export as a manual user action, with Google Drive as a
  plausible first external target, but do not make external storage the system of
  record.
- Why: archive is useful, but putting Drive on the hot path would add sync complexity,
  permission risk, and avoidable operational coupling too early.
- Alternatives considered: automatic archive after review or using Drive as primary
  storage for raw files.
- Consequences: the app must own its operational data model and storage, while archive
  connectors stay optional and explicit.
- Revisit when: the core capture-review flow is stable and export pressure becomes real.

### 2026-04-19 - The first working app slice uses development adapters behind hosted-ready boundaries
- Decision: implement the first working text capture slice with a development magic-link
  preview and a file-backed runtime state store, while keeping auth, persistence, and
  processing behind explicit interfaces.
- Why: this proves the real inbox-to-review behavior now without forcing a premature
  commitment to external hosted providers.
- Alternatives considered: blocking implementation until provider selection was final,
  or wiring providers directly into the first slice without local fallback boundaries.
- Consequences: the repo now has a working app shell, but the auth and persistence
  adapters remain development-only and must be replaced before claiming production
  readiness.
- Revisit when: the first hosted auth, database, and storage providers are selected.
