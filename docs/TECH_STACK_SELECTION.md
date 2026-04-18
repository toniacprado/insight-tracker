# Tech Stack Selection
*Version:* v0.3
*Date:* 2026-04-18
*Last reviewed:* 2026-04-18

This file records the current stack direction for Insight Tracker.

## Product Surfaces
- A mobile-friendly capture UI for creating or opening an event and submitting quick
  inputs
- A review UI for suggested insights and suggested follow-up actions
- A persistence layer that stores raw captures and reviewed structured outputs together
- A future `.ics` export path once the core review loop is stable

## Selected Stack
- App framework: React with Next.js in a single TypeScript codebase
- Server/runtime: Node.js using Next.js route handlers or server actions for the first
  iteration
- Persistence: SQLite for the first pass, with a relational schema for events,
  captures, suggestions, and reviewed outputs
- AI processing boundary: a typed processing adapter that starts mocked and can later
  call a real provider without changing the user-facing review flow
- Media handling: mocked voice and photo processing first, with explicit contracts so
  the real provider can be added without changing the user flow
- Package manager and build: `pnpm` plus the standard Next.js build pipeline
- Deployment target: local-first while the product shape is changing, then a managed
  Node-compatible host once the first slice is stable
- Observability: structured application logs and persisted processing state per capture
- Secrets and credentials: environment variables only; no secrets in source, prompts, or fixtures
- Security posture: minimize external data transfer and keep provider-specific behavior
  behind explicit, testable interfaces

## Verification Path
- Unit and integration checks: `pnpm test` for schemas, processing logic, and
  persistence contracts
- End-to-end checks: `pnpm exec playwright test` for the capture-to-review happy path
- Manual product check: complete the flow on a mobile-width viewport without manual
  database edits

## AI Strategy
- Keep the first implementation provider-agnostic behind a typed adapter.
- Use structured outputs for suggested insights and follow-ups so reviewed records are
  deterministic enough to test.
- Add prompt and eval assets only when the product starts using real model behavior.

## Repo Tooling
- Keep the current lightweight Python tooling only for repo checks while the app is not
  scaffolded yet.
- Move day-to-day product verification to `pnpm` once the app exists.

## Next Decision
- Define the first secure local-first data flow for `PRODUCT-001`.
