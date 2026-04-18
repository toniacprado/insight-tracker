# Durable Learnings
*Version:* v0.2
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
