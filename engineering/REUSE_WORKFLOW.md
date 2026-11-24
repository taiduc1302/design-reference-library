# Portfolio reuse workflow (v1)

The central library is the discovery and evidence layer, not the owner of each application's business logic.

## Before designing new functionality

Read the consuming repository's AGENTS.md, current implementation, active work and tests. Search [engineering patterns](catalog.json), [design references](../catalog/references.json), [components](../catalog/components.json) and the [Knowledge Explorer](../gallery/knowledge.html). For broader ideas inspect the [BYOX index](research/build-your-own-x-index.json) and [CodeCrafters index](research/codecrafters-repository-index.json).

Select a small number of relevant ENG or component IDs. Compare existing local implementations and public reference examples. Document the specific gap, baseline, why reuse helps, license and dependency rights, and the smallest useful change. If nothing fits, say so. Do not install, copy or execute third-party code on the basis of a catalog entry. Existing local policy and scope always prevail.

## Evidence levels

- Discovery: external repository or tutorial found; not inspected.
- Research lead: original proposed pattern with acceptance/stop conditions; not approved for reuse.
- Source review: exact upstream files, revision, rights and dependencies reviewed.
- Pilot: isolated implementation with reproducible tests and limitations.
- Adoption: verified in a named authorized consuming project; rollback and required approval recorded.

Standalone module tests are not evidence of consuming-project adoption. Use [agent acceptance contract](AGENT_ACCEPTANCE_CONTRACT.md) and target checks. The library must never publish private repository identifiers or internal evidence.

## Per-project reuse record (store in consuming repo)

```yaml
pattern_ids: [ENG-000]
local_gap: "specific observed gap"
baseline_revision: "commit SHA"
existing_implementation: "local files and tests"
decision: "REUSE | ADAPT | ALREADY_PRESENT | REJECT | DEFER"
source_revision_and_rights: "pinned source and license evidence or original design"
acceptance: "specific checks"
verification: "actual commands, outcomes, environment, evidence; NOT_RUN where applicable"
adoption: "NOT_ADOPTED or verified target scope"
rollback: "revert or disable reference"
```

Do not commit this placeholder as an adoption record. Keep records in the local repo; contribute generalized findings, not confidential identifiers, back to the library.

## Rollout policy

Add a concise advisory reference in AGENTS.md of eligible owned projects. Read local instructions and active PRs first; defer forks, mirrors, generated snapshots and restricted bundles unless their policy explicitly allows editing. Preserve instructions and application logic. A reference link alone is CONNECTED, not ADOPTED. A library update never authorizes a change to any other repo.
