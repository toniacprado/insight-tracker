# Durable Learnings
*Version:* v0.6
*Date:* 2026-04-19
*Last reviewed:* 2026-04-19

Use this file for discoveries that should influence future work but do not fit neatly in
a single task file.

## Entries
### 2026-04-18 - Abandoned scratch worktrees are not canonical source
- Learning: abandoned side worktrees can look like an active rewrite, but the canonical
  repo must stay rooted in the top-level tree.
- Follow-up: when an exploratory rewrite is abandoned, delete or archive that scratch
  state separately and keep future changes in the main repository tree.

### 2026-04-18 - Fewer instruction layers work better here
- Learning: the repo became harder to use when legacy guides, maintenance docs,
  prompt scaffolding, and product guidance all stayed first-class at once.
- Follow-up: add new docs or policy layers only when the product has a concrete need
  for them.

### 2026-04-19 - Inbox-first capture is lower friction than event-first capture
- Learning: forcing users to create or choose an event before a quick capture adds
  structure at the worst possible moment, when context is fresh and attention is thin.
- Follow-up: default new captures into an inbox and layer grouping on later only if it
  clearly improves review.

### 2026-04-19 - Hosted-ready boundaries can be proven with local development adapters
- Learning: the fastest way to prove the inbox-review loop was to keep auth,
  persistence, and processing behind explicit boundaries while using local development
  adapters for the first working slice.
- Follow-up: preserve those boundaries and replace the adapters, not the whole flow,
  when real hosted providers are selected.
