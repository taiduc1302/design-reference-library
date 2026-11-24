# Portfolio knowledge library — priorities and execution plan

Owner-approved 2026-11-24: expand technical references, add unified discovery, distribute a safe reference instruction to consuming repositories. This is a living work plan, not authorization to install third-party software, access private data, release production apps, or approve estimates.

| Priority | Work | Acceptance / status |
|---|---|---|
| P0 | Preserve canonical catalogs, source provenance and privacy | Never copy external/private source or data; keep separate evidence status and source links. |
| P1 | Extend engineering catalog | 31 patterns / 21 source records after 12 new original proposals; new tutorials are link-only leads. |
| P1 | Unified search across engineering, ChanMeng666, dchantlos, design references and original components | One read-only local gallery, category/collection/status/capability search, safe links, missing-source disclosure; test actual data and errors. |
| P1 | Agent adoption | Add bounded reference guidance to eligible repositories' existing AGENTS.md (or create minimal instructions where absent). Preserve local policy; avoid upstream forks, mirrors, generated snapshots and restricted setup bundles until their policy explicitly permits changes. |
| P2 | Close audit gaps by capability | Review exact source files and license/dependency scope only for selected pilots; use existing implementations first. Do not call inventory a full audit. |
| P2 | Pilot shared utilities | Review gate, revision grouping and catalog validator; target-specific acceptance before adoption, no production approvals. |
| P2 | Create feedback loop | Consuming repos record ENG IDs, actual test evidence, adoption or rejection and rollback; contribute only sanitized general lessons back to library. |
| P3 | Improve discoverability and maintenance | Add additional filters and source refresh when real need is demonstrated; do not add paid services, automatic Actions or dependencies by default. |

## Coordination rules

Read target AGENTS.md and active PRs before changes; use narrow branches if code changes or conflicting work are involved. Do not edit mirrored or generated content directly. Reference instructions are advisory, subordinate to local policy and do not override authorization. A private repo may link to this public resource; the public library must not publish private repository identifiers, local paths, client records or credentials.

## Decision on adoption

Choose a candidate based on an observed gap and a measurable test, not popularity. P1 is priority to inspect, not permission to implement. Keep statuses RESEARCH_LEAD / SOURCE_REVIEWED / PILOT_TESTED / ADOPTED separate. Do not report a browser or integration test as executed when only isolated logic is tested. No automatic rollout of runtime changes across consuming repositories.
