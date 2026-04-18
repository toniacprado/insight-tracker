# Instruction Layering
*Version:* v0.6  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

This file explains how to layer instructions without losing a single source of truth.

## Codex-first layering
Use these layers in order:
1. `AGENTS.md` for shared repo rules
2. `docs/CONTEXT_ENGINEERING.md` for retrieval and compaction policy
3. topic docs in `docs/` for durable workflow, policy, and prompting guidance
4. nested `AGENTS.override.md` files only when a subtree genuinely needs different rules
5. user-level Codex config for personal preferences that should not affect the whole repo

## Layering principle
Keep one canonical shared entry point for repository rules.

That means:
- `AGENTS.md` is the root instruction layer for shared repo behavior
- `docs/CONTEXT_ENGINEERING.md` defines retrieval and compaction policy
- topic docs in `docs/` hold durable workflow and policy details
- compatibility shims for secondary tools are optional, not canonical, and should be
  removed if they start to compete with the main instruction path

## Personal preferences
Use `AGENTS.local.md.example` as inspiration for personal preferences, but do not treat
it as a shared source of truth.

Good uses:
- verbosity preferences
- preferred editor commands
- local fixture names or sample accounts
- personal no-go operations

## Scoped overrides
If one part of the repo has genuinely different rules, place an `AGENTS.override.md`
close to that subtree. Keep overrides short and explain why they differ.
Use `AGENTS.override.md.example` as the starting point.
