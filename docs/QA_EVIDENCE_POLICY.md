# Evidence-first QA without owner-operated testing

Owner instruction: **21 November 2026**. Build and run every check the current agent's tools can execute. The owner is not a required test operator. Missing environments are recorded as debt; development continues on independent work.

## Required statuses (never conflate)

| Status | Meaning |
|---|---|
| PASS | A named check actually executed on the stated SHA/artifact and met its assertions. Include command, platform, counts and evidence. |
| FAIL | A named check executed and failed. Fix, reproduce and rerun before treating the affected behavior as accepted. |
| NOT_RUN | Could not execute. Record why, capability missing, affected scope, expected consequence and a reproducible command. This is not a PASS. |
| BLOCKED | A non-optional safety or acceptance dependency prevents that particular operation, not unrelated development. |
| NOT_APPLICABLE | Explain why this check does not apply to the change; never use it merely because the environment is absent. |

## Autonomous sequence

1. Pin branch and exact head SHA, read the project's current AGENTS.md / ownership rules, and inspect existing checks.
2. Choose the smallest valid testable surface: source checks, schema/unit tests, packaged ZIP/hash checks, actual Chromium/HTTP test when accessible, or real Windows when accessible. Use synthetic data, offline by default.
3. Run available checks. Save `qa/evidence/<date>-<head>.md` or a project-equivalent issue comment with status, command, output, host and constraints. Do **not** claim native Windows from browser emulation.
4. For each NOT_RUN, create or update a tracking issue with reproduction steps and a clear owner-independent retry path. Avoid requiring the user to run PowerShell.
5. Proceed to other independent scoped tasks. A missing visual/environment check is not an excuse to stop fixing known defects.
6. Before merge, obey **that repository's** acceptance gates; only low-risk and permitted changes can merge with recorded deferred QA. Never quietly weaken tests or required approvals to get a green status.
7. Never downgrade safety checks for price/signature/approval, live portals, confidentiality, addenda/requirement provenance or data loss.

## Minimal evidence block

```yaml
repository: owner/repo
head_sha: exact-40-character-SHA
scope: changed files / impacted behavior
host: OS + runtime + browser if applicable
checks:
  - name: exact test/check
    result: PASS | FAIL | NOT_RUN | BLOCKED | NOT_APPLICABLE
    evidence: command and output or artifact link
    limitation: precise risk / why skipped
decision: continue-independent-work | hold-specific-merge | merge-with-tracked-debt
deferred_issue: URL, if needed
```

This is a work policy, not a claim that all project regressions or Windows checks ran. Re-evaluate an older PASS after source changes; a passing check on a different SHA is historical evidence only.
