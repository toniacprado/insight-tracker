# Tech Stack Selection
*Version:* v0.2
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

This file records the first-pass stack selection for Insight Tracker. Some choices are
still provisional, but the repo should now assume a TypeScript web app instead of the
template's Python maintenance stack as the product direction.

## Product Surfaces
- A mobile-friendly capture UI for creating or opening an event and submitting quick
  inputs
- A review UI for suggested insights and suggested follow-up actions
- A persistence layer that stores raw captures and reviewed structured outputs together
- An early follow-on `.ics` export path once the core review loop is stable

## Selected Stack
- App framework: React with Next.js in a single TypeScript codebase
- Server/runtime: Node.js using Next.js route handlers or server actions for the first
  iteration
- Persistence: SQLite for the first pass, with a relational schema for events,
  captures, suggestions, and reviewed outputs
- AI processing boundary: a typed processing adapter that can start mocked and later
  call a real transcription or extraction provider
- Media handling: mocked voice and photo processing first, with explicit contracts so
  the real provider can be added without changing the user flow
- Package manager and build: `pnpm` plus the standard Next.js build pipeline
- Deployment target: local-first while the product shape is changing, then a managed
  Node-compatible host once the first slice is stable
- Observability: structured application logs and persisted processing state per capture

## Verification Path
- Unit and integration checks: `pnpm test` for schemas, processing logic, and
  persistence contracts
- End-to-end checks: `pnpm exec playwright test` for the capture-to-review happy path
- Manual product check: complete the flow on a mobile-width viewport without manual
  database edits

## Prompt And Eval Strategy
- Keep the first implementation provider-agnostic behind a typed adapter.
- Use structured outputs for suggested insights and follow-ups so reviewed records are
  deterministic enough to test.
- Add eval fixtures in `evals/` once mocked processing is replaced with a real model
  call.

## Decision On The Inherited Python Maintenance Stack
- Keep the inherited Python tooling temporarily for repo-level maintenance while the
  TypeScript web app is being scaffolded.
- Once the TypeScript toolchain exists, day-to-day product verification should move to
  `pnpm`-based commands and the Python maintenance stack can be reduced or removed.

## Open Decisions To Revisit
- Which model provider and prompt contract should replace the mocked processing adapter
- Whether `.ics` export belongs in the first implementation wave or the immediate
  follow-on task
- When authentication and multi-user support become necessary

## Next Decision
- Scaffold the app shell, persistence schema, and happy-path tests for
  `PRODUCT-001`.
