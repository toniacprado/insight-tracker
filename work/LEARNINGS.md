# Durable Learnings
*Version:* v0.3
*Date:* 2026-04-18
*Last reviewed:* 2026-04-18

Use this file for discoveries that should influence future work but do not fit neatly in
a single task file.

## Entries
### 2026-04-18 - Abandoned scratch worktrees are not canonical source
- Learning: abandoned side worktrees can look like an active rewrite, but the canonical
  repo must stay rooted in the top-level tree.
- Follow-up: when an exploratory rewrite is abandoned, delete or archive that scratch
  state separately and keep future changes in the main repository tree.

### 2026-04-18 - Fewer instruction layers work better here
- Learning: the repo became harder to use when bootstrap guides, template maintenance
  docs, prompt scaffolding, and product guidance all stayed first-class at once.
- Follow-up: add new docs or policy layers only when the product has a concrete need
  for them.
