#!/usr/bin/env python3
"""Validate the research-only ChanMeng666 opportunity matrix without network access."""
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
path = ROOT / "catalog/chanmeng666-opportunity-matrix.json"
data = json.loads(path.read_text(encoding="utf-8"))
records = data["records"]
assert data["schema_version"] == 1
assert len(records) == 82, f"Expected 82 observed repositories, found {len(records)}"
ids = [row["id"] for row in records]
assert len(set(ids)) == len(ids), "Duplicate upstream repository identifiers"
target_ids = {t["id"] for t in data["targets"]}
assert len(target_ids) == len(data["targets"])
for row in records:
    assert row["id"].startswith("chanmeng666/")
    parsed = urlsplit(row["source_url"])
    assert parsed.scheme == "https" and parsed.netloc == "github.com"
    assert parsed.path.lower() == "/" + row["id"].lower()
    assert row["priority"] in {"HIGH", "MEDIUM", "LOW", "NONE"}
    assert row["status"] == "RESEARCH_LEAD"
    assert row["implementation_status"] == "NOT_IMPLEMENTED"
    assert row["security_review"] == "NOT_RUN"
    assert row["license_status"] == "NOT_FILE_LEVEL_VERIFIED"
    assert row["upstream_kind"] in {"project", "fork", "archived"}
    assert row["targets"] and set(row["targets"]) <= target_ids
    assert len(row["applicability_note"]) >= 18
text = (ROOT / "docs/CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md").read_text(encoding="utf-8")
for row in records:
    assert row["source_url"] in text, f"Missing README source link: {row['id']}"
print(f"OK: {len(records)} research leads, {len(target_ids)} generic target capabilities, distinct links and controlled statuses.")
