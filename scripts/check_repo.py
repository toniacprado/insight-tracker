#!/usr/bin/env python3
"""Lean repo contract checks for Insight Tracker."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_PATHS = [
    "README.md",
    "AGENTS.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "package.json",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "next.config.ts",
    "next-env.d.ts",
    "vitest.config.ts",
    "pyproject.toml",
    ".codex/README.md",
    ".codex/config.toml",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/copilot-instructions.md",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/ISSUE_TEMPLATE/codex-task-slice.yml",
    ".github/ISSUE_TEMPLATE/codex-bug-report.yml",
    ".github/workflows/ci.yml",
    "docs/START_HERE.md",
    "docs/PROJECT_MANIFESTO.md",
    "docs/PROJECT_CHARTER.md",
    "docs/TECH_STACK_SELECTION.md",
    "docs/DECISIONS.md",
    "docs/ENGINEERING_STANDARDS.md",
    "docs/GIT_WORKFLOW.md",
    "docs/GUARDRAILS.md",
    "docs/REPO_STRUCTURE.md",
    "docs/CONTEXT_ENGINEERING.md",
    "work/README.md",
    "work/ACTIVE_TASKS.md",
    "work/LEARNINGS.md",
    "work/items/README.md",
    "work/items/PRODUCT-001-core-capture-review-flow.md",
    "work/items/REPO-002-lean-codex-cleanup.md",
    "scripts/README.md",
    "scripts/check_repo.py",
    "src/README.md",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/actions.ts",
    "src/components/processing-poller.tsx",
    "src/lib/types.ts",
    "src/insight_tracker_repo/__init__.py",
    "tests/test_repo_contract.py",
]

FORBIDDEN_PATHS = [
    "docs/BOOTSTRAP_NEXT_STEPS.md",
    "docs/CODEX_PROMPTING.md",
    "docs/CODEX_SESSION_STARTER.md",
    "docs/CODEX_FIRST_HOUR.md",
    "docs/HUMAN_OPERATING_GUIDE.md",
    "docs/MODEL_POLICY.md",
    "docs/DATA_POLICY.md",
    "scripts/bootstrap_new_project.py",
    "scripts/bootstrap_new_project.ps1",
    "scripts/newcomer_smoke_test.py",
    "scripts/run_prompt_evals.py",
    "work/items/BOOTSTRAP-001-initialize-project.md",
]

FORBIDDEN_STRINGS = [
    "BOOTSTRAP-001",
    "bootstrap_new_project",
    "repo_template",
]

SCAN_PATHS = [
    "README.md",
    "AGENTS.md",
    "CONTRIBUTING.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/copilot-instructions.md",
    ".github/workflows/ci.yml",
    "docs/START_HERE.md",
    "docs/PROJECT_MANIFESTO.md",
    "docs/PROJECT_CHARTER.md",
    "docs/TECH_STACK_SELECTION.md",
    "docs/DECISIONS.md",
    "docs/ENGINEERING_STANDARDS.md",
    "docs/GIT_WORKFLOW.md",
    "docs/GUARDRAILS.md",
    "docs/REPO_STRUCTURE.md",
    "docs/CONTEXT_ENGINEERING.md",
    "work/ACTIVE_TASKS.md",
    "work/LEARNINGS.md",
    "work/items/PRODUCT-001-core-capture-review-flow.md",
    "work/items/REPO-002-lean-codex-cleanup.md",
]


@dataclass(frozen=True)
class CheckResult:
    name: str
    passed: bool
    detail: str


def run_repo_checks(repo_root: Path) -> list[CheckResult]:
    results: list[CheckResult] = []

    for rel in REQUIRED_PATHS:
        path = repo_root / rel
        results.append(
            CheckResult(
                name=f"required:{rel}",
                passed=path.exists() and path.read_text(encoding="utf-8").strip() != "",
                detail=f"expected non-empty path: {rel}",
            )
        )

    for rel in FORBIDDEN_PATHS:
        results.append(
            CheckResult(
                name=f"forbidden-path:{rel}",
                passed=not (repo_root / rel).exists(),
                detail=f"path should be absent: {rel}",
            )
        )

    for rel in SCAN_PATHS:
        path = repo_root / rel
        text = path.read_text(encoding="utf-8")
        for needle in FORBIDDEN_STRINGS:
            results.append(
                CheckResult(
                    name=f"forbidden-text:{rel}:{needle}",
                    passed=needle not in text,
                    detail=f"`{needle}` should not appear in {rel}",
                )
            )

    active_tasks = (repo_root / "work" / "ACTIVE_TASKS.md").read_text(encoding="utf-8")
    results.append(
        CheckResult(
            name="product-001-active",
            passed="| PRODUCT-001 |" in active_tasks and (
                "| todo |" in active_tasks or "| in_progress |" in active_tasks
            ),
            detail="expected PRODUCT-001 to remain the active implementation task in todo or in_progress status",
        )
    )

    return results


def main() -> int:
    failed = [check for check in run_repo_checks(ROOT) if not check.passed]
    if not failed:
        print("Repo contract checks: OK")
        return 0

    print("Repo contract checks: FAIL")
    for check in failed:
        print(f"- {check.name}: {check.detail}")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
