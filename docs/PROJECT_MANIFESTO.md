# Project Manifesto
*Version:* v0.4
*Date:* 2026-04-19
*Last reviewed:* 2026-04-19

Insight Tracker exists because valuable live-context insights decay almost
immediately. People leave meetups, hackathons, coffee chats, and networking
conversations with fragments: a sentence in Notes, a voice memo, a link, or a mental
promise to follow up later. Those fragments rarely turn into action because capture is
scattered and review is too much work.

## Why This Exists
- Intentional professional attendees need a lightweight way to capture valuable
  fragments before they disappear.
- Existing workarounds are optimized for storage, not trustworthy review and
  follow-through.
- This repo exists to build a focused product that turns event fragments into usable
  next steps without forcing a heavy workflow in the moment.

## The Promise
- Make capture fast enough to use between conversations or on the way home.
- Let a user drop text or audio into an inbox before deciding how to organize it.
- Turn raw captures into a retained transcript, a primary insight, and follow-up
  candidates with AI assistance.
- Keep the human in control through review, editing, and confirmation before anything
  becomes trusted output.

## Non-Negotiables
- The repo stays the durable source of truth for product intent, scope, and task state.
- The capture flow must feel lighter than opening a general-purpose note-taking system.
- Reviewed outputs must stay traceable to the raw capture and transcript they came
  from.
- Raw source material stays immutable in the product; the editable layer is the
  extracted insight and follow-up set.
- The product uses explicit user-initiated capture, not ambient always-on recording.
- Security and privacy are product features: sensitive event context should stay narrow,
  reviewable, and intentional.

## Anti-Goals
- Do not build a general-purpose notes app, calendar, or CRM replacement.
- Do not prioritize full sync integrations, email automation, autonomous follow-up
  agents, or photo capture before the core loop works.
- Do not make Google Drive or any external archive the primary system of record.
- Do not add complex taxonomy, dashboards, or collaboration features before single-user
  value is proven.

## What Good Looks Like First
- A user signs in, submits a quick text or audio capture to an inbox, and receives a
  retained transcript, a suggested insight, and multiple follow-up candidates worth
  reviewing.
- The user can edit and confirm the structured result without leaving the product or
  touching the database manually, including confirming insight-only with no follow-up.
- The repo makes the next implementation step obvious to a new contributor through
  `docs/` and `work/`.

## Constraints
- The first product surface is a hosted, mobile-friendly TypeScript web app with auth,
  not a native app suite.
- The first release should stay simple enough for a single-user or very small-scale
  workflow.
- Processing can be asynchronous; fast turnaround matters less than reliability,
  privacy, and reviewability.
- Real-time integrations and broad automation stay deferred until the review loop
  proves useful.
- Privacy and trust matter: captures should be intentional, reviewable, and
  user-controlled.
- External model or API usage must stay behind explicit boundaries that are easy to
  audit and easy to disable.
