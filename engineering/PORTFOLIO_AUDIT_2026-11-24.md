# Portfolio source inventory — 2026-11-24

**Scope:** 27 accessible repository default-branch recursive Git trees; 11,613 blob entries (includes docs, media and duplicates across forks/mirrors). All 27 tree responses reported non-truncated. Selected source or test excerpt read in each of 26 repositories; one repository was README-only. This is a first-pass inventory and targeted source review, NOT a full code/security/architecture audit. No private repository identifiers, commits, data, or code are published here. No target repositories were modified.

## Existing patterns and recommended reuse

| Capability | Evidence observed | Recommendation |
|---|---|---|
| Model evaluation | Public [AI Model Advisor benchmark runner](https://github.com/taiduc1302/ai-model-advisor/blob/91c8029e71116218bfda667a19e276146da7d3bc/src/ai_model_advisor/benchmark_runner.py): frozen fixture and deterministic judging interfaces | Extend existing benchmark suite rather than create another runner. ENG-004/005. |
| Civil takeoff QA | Public [QA lifecycle](https://github.com/taiduc1302/civil-takeoff-markups-mcp/blob/985d0e20cb873e9b0ea533b04f36a21feadaa1d4/tools/qa_state_transitions.py) and [CSV audit rules](https://github.com/taiduc1302/civil-bid-readiness-auditor/blob/012c69b84bb346bb12ab03a7c046cd243f3c7daf/app/audit_engine_hardened.py) | Preserve the domain-specific state machine and human approval boundary; ENG-011/016. |
| Agent harness and workflow | Public [ECC release approval gate](https://github.com/taiduc1302/ECC/blob/b38be6a7f6350964d59328b52f0624e1d1d552d1/scripts/release-approval-gate.js); public Hive setup script observed, not executed | Inspect existing harness policies and task ledger before adding orchestration; ENG-001/002/013/014/015. |
| Document tracking | Public [Statement Calendar](https://github.com/taiduc1302/statement-calendar/blob/0e98be516af8b4272eafe36b951eb819917475ba/app.js): calendar and status model | Separate deterministic date rules and UI when reuse is useful; ENG-008/017. |
| Learning apps | Public [Construction Vocabulary Trainer tests](https://github.com/taiduc1302/construction-vocabulary-trainer/blob/7a66f90500212b8af19a8b8bfa2d4725b1a14d1c/scripts/test-practice-engine.mjs), [tone-learning API contracts](https://github.com/taiduc1302/dau-tones/blob/aacc4a449e205e0af6b0f1174dacee1308da657a/api/dau/schemas.py), [local-first state schema](https://github.com/taiduc1302/little-hearth-companion/blob/283694cfb9de9b4c54dded5d00337bbd575be0c1/src/domain.ts) | Reuse principles of schema validation, offline tests and state migration; ENG-017/018/019. |
| Historical evidence | Public [Global Kinship Research](https://github.com/taiduc1302/global-kinship-research/blob/8f0eceae0060d1ae9dd8d83cc1bebc7c7fdcf40f/src/kinship/audit.py): deterministic graph/evidence audit | Keep uncertainty and contradictory evidence explicit. ENG-006/008/016. |
| Design library | [Existing catalog validator](../scripts/validate_catalog.py) and original UI components | Preserve established UI patterns and validators. New engineering validator has different schema. |
| Tender discovery | Authorized private source excerpts: display-independent engine, isolated modes, source quality audit; related mirrors exist | Compare current engine and source registry before building revision-aware retrieval. ENG-006/007/008. |
| Measurement and engineering geometry | Authorized private source/test excerpts: evidence utilities, partial-channel safeguards, restricted data mode, explicit engineering inputs and generated verification checks | Keep exact calculations and native evidence separate from visualization. ENG-009/010/011. No private code copied. |
| Operational/review apps | Authorized private excerpts: deterministic scoring, owner review queue, record identity and stale decisions, calendar state | Evaluate generic review gate and revision grouping as adapters only; ENG-008/016/017/018. |
| Repository maintenance | Authorized private excerpts: offline validators, skill copies and similar mirrors | Compare lineage and avoid divergent duplicated rules. No consolidation attempted. |
| Empty project | Public [Revit Estimating Tools](https://github.com/taiduc1302/revit-estimating-tools) tree contains only README | No implementation available to audit. |

## Coverage and remaining work

- 27/27 tree inventories; 26/26 nonempty-code projects sampled (some samples are tests or setup scripts rather than the core implementation); 1 README-only project.
- 11,613 file entries are not 11,613 reviewed files. Hive and ECC alone account for 7,314 entries. Exclude generated files, binaries, vendor dependencies and duplicate forks when planning a complete review.
- Full local checkout could not be obtained: network DNS resolution to github.com failed in the available shell. No full cross-repo regression, Windows, live native MCP, dependency vulnerability, secrets/history or full source review was executed. No claim of complete audit.
- Next pass per target: pin head SHA; enumerate first-party source and test files, inspect manifests/lockfiles/licensing and code paths; record reviewed-file denominator, findings, severity, owner, reproduction, regression and unresolved gaps; use target repo's own roadmap and approval gates. Do not expose private project specifics in this public catalog.
- Do not infer that any existing pattern is fit for integration from a source excerpt alone. All ENG pattern adoption statuses remain NOT_ADOPTED.
