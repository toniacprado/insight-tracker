# Bootstrap Artifact Workshop
*Version:* v0.1
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

Use this guide to help Codex draft the core artifacts for Insight Tracker. The goal is
not to make you fill a long form. The goal is to help Codex ask short questions,
propose sensible wording, and leave the repo with durable context.

## Interview Rhythm
- Ask 5-8 focused questions, not 25 broad ones.
- Group questions by artifact so the conversation feels coherent.
- If the user is unsure, propose 2-3 plausible options and mark the chosen one as an
  assumption.
- Draft files directly instead of asking the user to write them from scratch.
- End by defining the first implementation slice and verification path in `work/`.

## Artifact 1: Manifesto
File: `docs/PROJECT_MANIFESTO.md`

Why it matters:
- It explains why the project exists, what promise it makes, and what it will not do.

Ask questions like:
- What concrete problem should this project solve?
- Who feels that problem most sharply?
- What should users reliably get from the first release?
- What tempting expansions should stay out of scope?

Done when:
- A newcomer can read the file and explain the problem, promise, anti-goals, and
  constraints without extra chat context.

## Artifact 2: Landing Docs
Files:
- `README.md`
- `docs/START_HERE.md`

Why it matters:
- They are the first files a human and many AI sessions will open, so leaving them in
  draft-template language weakens everything that follows.

Ask questions like:
- How should the project be described in one short paragraph?
- What should a brand-new contributor do first?
- Which generated bootstrap guides should stay visible until the product docs are real?

Done when:
- The README and start-here guide describe the real project and point at the current
  recommended workflow instead of sounding like template scaffolding.

## Artifact 3: Charter
File: `docs/PROJECT_CHARTER.md`

Why it matters:
- It turns the manifesto into release scope, user definition, success metrics, and
  risks.

Ask questions like:
- What is the smallest end-to-end workflow that must work first?
- Which users matter in the first release?
- How will we know the first release is useful?
- What should explicitly stay out of scope for now?

Done when:
- The first-release boundary is explicit enough that Codex can propose a thin
  implementation slice without inventing product scope.

## Artifact 4: Tech Stack Selection
File: `docs/TECH_STACK_SELECTION.md`

Why it matters:
- It prevents the inherited template tooling from being mistaken for the real product
  stack.

Ask questions like:
- What platforms or environments must this run on?
- What language or framework should own the core logic?
- What test runner or verification path should become canonical?
- Should the inherited Python maintenance stack stay temporarily or be replaced now?

Done when:
- The main implementation stack and verification path are named, even if a few
  decisions are provisional.

## Artifact 5: Decisions Log
File: `docs/DECISIONS.md`

Why it matters:
- It captures meaningful project and workflow decisions so they do not stay implicit.

Ask questions like:
- What is the first real product or architecture decision we are making today?
- Why is this choice better than the main alternatives?
- What consequence or revisit trigger should be recorded now?

Done when:
- At least one project-specific decision is logged and the template's original
  decision history is gone from the new repo.

## Artifact 6: Work Tracking
Files:
- `work/ACTIVE_TASKS.md`
- `work/items/BOOTSTRAP-001-initialize-project.md`

Why it matters:
- It leaves the next step visible after the first session instead of burying it in
  chat history.

Ask questions like:
- What is the first thin implementation slice after bootstrap?
- What verification should prove that slice worked?
- What uncertainty still needs follow-up?

Done when:
- `BOOTSTRAP-001` points at the real next action and the active task list names the
  first product slice or the remaining bootstrap debt.

## Optional During Bootstrap
- `prompts/` and `evals/` only need real content now if model behavior will matter in
  the first release.
- `docs/DATA_POLICY.md`, `docs/GUARDRAILS.md`, and `docs/MODEL_POLICY.md` should be
  tightened early if the product has sensitive data or user-facing model behavior.
