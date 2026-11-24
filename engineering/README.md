# Engineering Reference Library

A technical companion to the [Design Reference Library](../README.md). This is the shared reference layer for software architecture, agent engineering, testing, data systems, civil geometry and operational tools. It is **not** a product runtime, approved dependency list, or a second copy of existing research.

**Baseline 2026-11-24:** 39 original proposed patterns, 24 source references, 11 target capability groups. All initial patterns remain research leads, not certified or adopted in consuming projects. Three original standalone utility prototypes have separately scoped unit-test evidence. The [machine-readable catalog](catalog.json) is authoritative. The [roadmap](ROADMAP.md) records sequencing, pilot gates and known gaps.

## How to use this library

1. Read the target repository's AGENTS.md, active issues, branch and current implementation. Search this catalog by capability and compare against what already exists.
2. Select a specific ENG ID and explain why it fills an observed gap; prefer using a proven existing implementation. Link its source record and any relevant existing ChanMeng666/DCH ID rather than duplicating research.
3. Before copying or executing anything, inspect exact upstream files and commit SHA, dependencies, licenses (including separate media/data/model licenses), permissions, and security implications. Record attribution, local plan and acceptance tests in the target repo.
4. Pilot one bounded feature using synthetic fixtures and a separate branch. No automatic integration, no GitHub Actions, no new paid services or dependency installation by default.
5. Record actual commands, commit, environment, evidence, failures and NOT_RUN items. A human controls production approvals, submissions and irreversible actions. Record adoption only with target-specific evidence and a rollback path.

## Discovery and execution plan

- [Unified searchable gallery](../gallery/knowledge.html) (serve the repository root over local HTTP).
- [Owner-approved priorities](PRIORITIES.md).
- [Reuse workflow](REUSE_WORKFLOW.md) and [agent acceptance contract](AGENT_ACCEPTANCE_CONTRACT.md).
- [383 tutorial index](research/build-your-own-x-index.json), [145 repository discovery index](research/codecrafters-repository-index.json) and [CodeCrafters source review](research/CODECRAFTERS_AGENT_ENGINEERING_DEEP_REVIEW_2026-11-24.md).

## Pattern index

### agent-engineering

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-001 | Scoped agent tool loop | P1 | agent-orchestration, developer-tooling |
| ENG-002 | Durable task ledger and lease | P1 | agent-orchestration, developer-tooling |
| ENG-003 | Checkpoint, resume and idempotency | P1 | agent-orchestration, tender-discovery, operations |
| ENG-034 | Correlated tool action and independent readback | P1 | agent-orchestration, civil-geometry, estimate-qa, developer-tooling |
| ENG-037 | Metadata-first skill selection and scoped activation | P1 | agent-orchestration, developer-tooling |

### evaluation

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-004 | Comparable offline model evaluation | P1 | ai-evaluation, estimate-qa, civil-geometry |
| ENG-005 | Shadow, canary and rollback for routing | P2 | ai-evaluation, agent-orchestration |
| ENG-025 | Versioned prompt and inference configuration | P2 | ai-evaluation, agent-orchestration, education |
| ENG-032 | Independent artifact verifier and oracle controls | P1 | ai-evaluation, civil-geometry, estimate-qa, developer-tooling |
| ENG-033 | Frozen trial denominator and fail-closed outcomes | P1 | ai-evaluation, developer-tooling, agent-orchestration |
| ENG-035 | Seeded negative controls and decoy fixtures | P1 | ai-evaluation, civil-geometry, education, developer-tooling |
| ENG-039 | Separate offline replay, live and native acceptance evidence | P1 | ai-evaluation, civil-geometry, estimate-qa, developer-tooling |

### retrieval

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-006 | Evidence-linked document retrieval | P1 | tender-discovery, estimate-qa, document-tracking |
| ENG-007 | Hybrid lexical and semantic search | P2 | tender-discovery, developer-tooling, document-tracking, education |
| ENG-023 | Exact-token indexing and ranking baseline | P1 | tender-discovery, document-tracking, education, developer-tooling |
| ENG-026 | Document revision lineage and supersession | P1 | tender-discovery, estimate-qa, document-tracking |

### data-systems

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-008 | Stable records and transactional audit | P1 | agent-orchestration, document-tracking, tender-discovery, operations |
| ENG-020 | Schema migration and recovery | P1 | document-tracking, operations, education |
| ENG-021 | Append-only event replay with deduplication | P1 | agent-orchestration, tender-discovery, document-tracking |

### geometry

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-009 | Shared object identity across 2D and 3D | P1 | earthworks, civil-geometry |
| ENG-010 | Projection and clipping reference cases | P2 | earthworks, civil-geometry |
| ENG-028 | Unit, datum and tolerance contracts | P1 | civil-geometry, earthworks, estimate-qa |

### construction-qa

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-011 | Native readback with independent reconciliation | P1 | civil-geometry, estimate-qa |
| ENG-012 | 4D planned versus observed progress | P2 | earthworks, estimate-qa, operations |

### developer-workflow

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-013 | Local regression and independent review gate | P1 | developer-tooling, agent-orchestration, web-ux |
| ENG-014 | Isolated branch/worktree coordination | P1 | developer-tooling, agent-orchestration |
| ENG-019 | Accessibility and UI acceptance evidence | P2 | web-ux, education, operations, developer-tooling |
| ENG-022 | Content-addressed artifacts and reproducible manifests | P1 | civil-geometry, estimate-qa, developer-tooling, tender-discovery |
| ENG-024 | Scriptable CLI with dry-run contract | P1 | developer-tooling, civil-geometry, agent-orchestration |
| ENG-030 | Test evidence and release claim ledger | P1 | developer-tooling, estimate-qa, web-ux |
| ENG-036 | Version-bound symbol navigation and diagnostics | P1 | developer-tooling, agent-orchestration |

### security

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-015 | Least privilege and untrusted-input boundary | P1 | agent-orchestration, tender-discovery, developer-tooling |
| ENG-027 | Dependency and capability manifest | P1 | agent-orchestration, developer-tooling, web-ux |
| ENG-038 | Immutable verifier and environment integrity | P1 | developer-tooling, agent-orchestration, ai-evaluation |

### application-architecture

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-016 | Deterministic core with advisory AI | P1 | tender-discovery, estimate-qa, operations, ai-evaluation |
| ENG-017 | Local-first recoverable workflow | P2 | operations, document-tracking, education, web-ux |
| ENG-018 | Explainable recommendation and feedback | P2 | operations, ai-evaluation, education |
| ENG-029 | Adapter boundary for optional AI and offline mode | P1 | operations, tender-discovery, ai-evaluation, education |
| ENG-031 | Freshness and stale-decision invalidation | P1 | operations, tender-discovery, document-tracking |

## Existing research collections — canonical, not copied

- [ChanMeng666: 82 public repository leads](../docs/CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md) and [structured inventory](../catalog/chanmeng666-opportunity-matrix.json).
- [dchantlos: 14-repository audit](../docs/DCHANTLOS_FULL_SOURCE_AUDIT_2026-11-20.md) and [13-pattern matrix](../catalog/dchantlos-opportunity-matrix.json).
- [Gus Bavia and design sources](../catalog/references.json); [reusable components and QA scope](../catalog/components.json).
- Build Your Own X, ECC, Hive, and related learning references are listed below. A course or link directory is not production software or an umbrella license.

## Audit and utility prototypes

- [Portfolio inventory and targeted source review (27 repositories)](PORTFOLIO_AUDIT_2026-11-24.md).
- [Source license triage and unresolved rights](LICENSE_REVIEW_2026-11-24.md).
- [Original reusable utility prototypes and test scope](modules/README.md).

## Source register

- **SRC-001 — [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x)**: Pinned README declares CC0 for the directory; linked works retain independent rights.
- **SRC-002 — [Building a Coding Agent From Scratch](https://github.com/itsdecodingai/building-a-coding-agent-from-scratch-course)**: Working canonical repository license read; original directory alias did not independently return a readable license.
- **SRC-003 — [LLM Evaluation Harness tutorial](https://machinelearningmastery.com/building-a-custom-llm-evaluation-harness-in-python-from-scratch/)**: Article reference only; no reusable license verified.
- **SRC-004 — [RAG From Scratch](https://github.com/langchain-ai/rag-from-scratch)**: No license path in pinned non-truncated tree; README did not declare license.
- **SRC-005 — [Vector Database from Scratch](https://skyzh.github.io/vector-db-from-scratch/)**: Directory entry confirmed; upstream LICENSE blob 261eeb9e9f8b2b4b0d119366dda99c6fd7d35c64 read.
- **SRC-006 — [Computer Graphics from Scratch](https://www.gabrielgambetta.com/computer-graphics-from-scratch/)**: Upstream split license file read; demo JS MIT, text and images CC BY-NC-ND 4.0.
- **SRC-007 — [ECC (formerly Everything Claude Code)](https://github.com/affaan-m/ECC)**: Upstream MIT LICENSE blob b832b6f642312312367c07688dc7426db40a82ed read.
- **SRC-008 — [Hive](https://github.com/aden-hive/hive)**: Upstream Apache-2.0 LICENSE blob f72c3e53be0426cfe5a26b6369918ac0d12a7bb5 read.
- **SRC-009 — [ChanMeng666 research inventory](../catalog/chanmeng666-opportunity-matrix.json)**: Selected archlang and a11y-loop MIT licenses read; other inventory entries not newly cleared.
- **SRC-010 — [dchantlos research inventory](../catalog/dchantlos-opportunity-matrix.json)**: Existing 14-repository audit retained; construction-timelapse has no verified reuse license.
- **SRC-011 — [Civil takeoff traceability method](https://github.com/taiduc1302/civil-takeoff-markups-mcp)**: Public MIT license read; QA lifecycle source sampled.
- **SRC-012 — [AI Model Advisor](https://github.com/taiduc1302/ai-model-advisor)**: Public Apache-2.0 license read; benchmark runner source sampled.
- **SRC-013 — [Design Reference Library](../README.md)**: Existing design catalog and notices govern third-party material.
- **SRC-014 — [Build Your Own Database from Scratch](https://build-your-own.org/database/)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-015 — [Mini-LSM storage engine](https://skyzh.github.io/mini-lsm/)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-016 — [Build Your Own Kafka](https://github.com/buildthingsuseful/build-your-own-kafka)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-017 — [Write yourself a Git](https://wyag.thb.lt/)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-018 — [Vector space indexing in Python](https://boyter.org/2010/08/build-vector-space-search-engine-python/)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-019 — [Rust command-line applications book](https://rust-cli.github.io/book/index.html)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-020 — [Build a Large Language Model from Scratch](https://github.com/rasbt/LLMs-from-scratch)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-021 — [Build a Reasoning Model from Scratch](https://github.com/rasbt/reasoning-from-scratch)**: Link observed in SRC-001 pinned README; individual source files, dependencies, revision and license not newly inspected. Reference only.
- **SRC-022 — [CCBench](https://github.com/codecrafters-io/ccbench)**: Pinned targeted source review; independent verifier and stage regressions, but compile failure can write reward 1; published impact unknown. No reuse clearance.
- **SRC-023 — [Claude Code Tester](https://github.com/codecrafters-io/claude-code-tester)**: Pinned targeted source review: randomized workspace, request recorder, actual filesystem and LSP checks; raw request capture, live provider and bypass permissions are not safe defaults.
- **SRC-024 — [Build Your Own Claude Code](https://github.com/codecrafters-io/build-your-own-claude-code)**: Pinned design and course review: seven Skills stages, LSP versioned feedback; five LSP tester stages vs six design stages; beta/deferred scope. No copied code.

## Promotion and contribution contract

Status: RESEARCH_LEAD → SOURCE_REVIEWED → PILOT_TESTED → ADOPTED (per target). BLOCKED and REJECTED record the specific reason. SOURCE_REVIEWED requires pinned files, license and dependency/security review; PILOT_TESTED requires actual reproducible test evidence; ADOPTED requires target regression and required approvals. A published reference or passing catalog check does not promote a pattern. Record evidence for each transition, never infer missing results. The source observations in this baseline are not SOURCE_REVIEWED.

Add a new stable ENG ID only when the proposal, target, measurable acceptance, source, risk/stop condition and status are distinct. Reuse existing IDs for overlaps and link source-specific inventories. For adoption record target (public URL or generic capability only), reviewed commit, test command/results, review date and rollback reference in the target repository; keep private project links and sensitive records out of this public repo. Never delete rejected leads merely to make progress look better.

Suggested agent instruction: “Read the Engineering Reference Library and the target repository's AGENTS.md. Identify existing implementations first. Select at most one relevant ENG pattern, check exact upstream license and dependencies, propose a small isolated change and evidence-based tests. Do not claim unrun QA or automatically approve, submit, install or deploy.”
