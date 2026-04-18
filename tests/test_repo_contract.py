import importlib.util
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPT = ROOT / "scripts" / "check_repo.py"

spec = importlib.util.spec_from_file_location("check_repo", SCRIPT)
assert spec and spec.loader
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)


def test_repo_contract_checks_pass() -> None:
    failures = [check for check in module.run_repo_checks(ROOT) if not check.passed]
    assert not failures, "\n".join(f"{check.name}: {check.detail}" for check in failures)
