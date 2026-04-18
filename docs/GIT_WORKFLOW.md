# Git Workflow
*Version:* v0.2  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

Use Git as a review and publishing boundary, not as ceremony.

## Core rule
Checkpoint locally whenever it helps. Branch when you are crossing a review,
protection, or collaboration boundary.

## Default for this repo
- Use one short-lived branch per mergeable slice.
- Keep related fixes on the same branch until that slice is merged.
- Do not push directly to protected `main`.

## Practical rules
- Keep commits small enough to review.
- Run verification before publishing.
- Keep `work/` current so the repo carries the handoff state.
- Delete merged branches and prune stale refs periodically.
