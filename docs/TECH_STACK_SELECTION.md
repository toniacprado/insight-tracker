# Tech Stack Selection
*Version:* v0.7
*Date:* 2026-04-25
*Last reviewed:* 2026-04-25

This file records the current stack direction for Insight Tracker.

## Product Surfaces
- An authenticated mobile-friendly inbox capture UI for quick text and audio inputs
- An async processing layer with visible per-capture status
- A review UI for a retained transcript, one primary insight, and multiple follow-up
  candidates
- A persistence layer that stores raw captures, transcripts, and reviewed outputs
  together
- A later manual archive or export path once the core review loop is stable

## Selected Stack
- App framework: React with Next.js in a single TypeScript codebase
- Server/runtime: Node.js using Next.js route handlers or server actions for the first
  iteration
- Host: Vercel for the managed Next.js deployment, environment variables, and later
  scheduled route invocations if needed
- Auth: Supabase Auth magic-link email sign-in behind the existing auth boundary
- Persistence: Supabase Postgres for captures, transcripts, suggestions, reviewed
  outputs, and optional later event or session links
- Raw file storage: Supabase Storage private bucket for uploaded audio, with manual
  archive or export handled separately from the operational store
- Background work: database-backed processing state first; evaluate Supabase Queues,
  Supabase Cron, or Vercel Cron only after the hosted text path is stable
- AI processing boundary: a typed processing adapter that starts mocked and can later
  call a real provider without changing the user-facing review flow
- Development adapters: local magic-link preview and in-memory runtime state until the
  first hosted providers are chosen
- Media handling: text first, then several-minute audio upload and processing; photo
  input stays deferred
- Package manager and build: `pnpm` plus the standard Next.js build pipeline
- Deployment target: a managed Node-compatible host from the first real app slice so
  review works away from one machine
- Observability: structured application logs and persisted processing state per capture
- Secrets and credentials: environment variables only; no secrets in source, prompts, or fixtures
- Security posture: keep raw data private by default, minimize external data transfer,
  and keep provider-specific behavior behind explicit, testable interfaces

## Verification Path
- Unit and integration checks: `pnpm test` for schemas, processing logic, and
  persistence contracts
- End-to-end checks: `pnpm exec playwright test` for auth, inbox capture, and review
  happy paths
- Manual product check: complete the flow on a mobile-width viewport without manual
  database edits and without requiring the local Mac to stay online

## AI Strategy
- Keep the first implementation provider-agnostic behind a typed adapter.
- Use structured outputs for one primary insight and a bounded follow-up candidate set
  so reviewed records are deterministic enough to test.
- Keep transcript retention explicit and separate from the editable review layer.
- Add prompt and eval assets only when the product starts using real model behavior.

## Repo Tooling
- Keep the current lightweight Python tooling only for repo checks while the app is not
  scaffolded yet.
- Move day-to-day product verification to `pnpm` once the app exists.

## Next Decision
- Wire Supabase Auth, Postgres, and private Storage behind the existing development
  boundaries, deploy through Vercel environment configuration, and keep the user flow
  unchanged while replacing the in-memory store.
