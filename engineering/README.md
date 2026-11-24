# Engineering Reference Library

A technical companion to the [Design Reference Library](../README.md). This is the shared reference layer for software architecture, agent engineering, testing, data systems, civil geometry and operational tools. It is **not** a product runtime, approved dependency list, or a second copy of existing research.

**Baseline 2026-11-24:** 19 original proposed patterns, 13 source references, 11 target capability groups. All initial patterns are research leads; none is certified, integrated or tested here. The [machine-readable catalog](catalog.json) is authoritative. The [roadmap](ROADMAP.md) records sequencing, pilot gates and known gaps.

## How to use this library

1. Read the target repository's AGENTS.md, active issues, branch and current implementation. Search this catalog by capability and compare against what already exists.
2. Select a specific ENG ID and explain why it fills an observed gap; prefer using a proven existing implementation. Link its source record and any relevant existing ChanMeng666/DCH ID rather than duplicating research.
3. Before copying or executing anything, inspect exact upstream files and commit SHA, dependencies, licenses (including separate media/data/model licenses), permissions, and security implications. Record attribution, local plan and acceptance tests in the target repo.
4. Pilot one bounded feature using synthetic fixtures and a separate branch. No automatic integration, no GitHub Actions, no new paid services or dependency installation by default.
5. Record actual commands, commit, environment, evidence, failures and NOT_RUN items. A human controls production approvals, submissions and irreversible actions. Record adoption only with target-specific evidence and a rollback path.

## Pattern index

### agent-engineering

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-001 | Scoped agent tool loop | P1 | agent-orchestration, developer-tooling |
| ENG-002 | Durable task ledger and lease | P1 | agent-orchestration, developer-tooling |
| ENG-003 | Checkpoint, resume and idempotency | P1 | agent-orchestration, tender-discovery, operations |

### evaluation

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-004 | Comparable offline model evaluation | P1 | ai-evaluation, estimate-qa, civil-geometry |
| ENG-005 | Shadow, canary and rollback for routing | P2 | ai-evaluation, agent-orchestration |

### retrieval

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-006 | Evidence-linked document retrieval | P1 | tender-discovery, estimate-qa, document-tracking |
| ENG-007 | Hybrid lexical and semantic search | P2 | tender-discovery, developer-tooling, document-tracking, education |

### data-systems

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-008 | Stable records and transactional audit | P1 | agent-orchestration, document-tracking, tender-discovery, operations |

### geometry

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-009 | Shared object identity across 2D and 3D | P1 | earthworks, civil-geometry |
| ENG-010 | Projection and clipping reference cases | P2 | earthworks, civil-geometry |

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

### security

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-015 | Least privilege and untrusted-input boundary | P1 | agent-orchestration, tender-discovery, developer-tooling |

### application-architecture

| ID | Candidate | Priority | Target capabilities |
|---|---|---|---|
| ENG-016 | Deterministic core with advisory AI | P1 | tender-discovery, estimate-qa, operations, ai-evaluation |
| ENG-017 | Local-first recoverable workflow | P2 | operations, document-tracking, education, web-ux |
| ENG-018 | Explainable recommendation and feedback | P2 | operations, ai-evaluation, education |

## Existing research collections — canonical, not copied

- [ChanMeng666: 82 public repository leads](../docs/CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md) and [structured inventory](../catalog/chanmeng666-opportunity-matrix.json).
- [dchantlos: 14-repository audit](../docs/DCHANTLOS_FULL_SOURCE_AUDIT_2026-11-20.md) and [13-pattern matrix](../catalog/dchantlos-opportunity-matrix.json).
- [Gus Bavia and design sources](../catalog/references.json); [reusable components and QA scope](../catalog/components.json).
- Build Your Own X, ECC, Hive, and related learning references are listed below. A course or link directory is not production software or an umbrella license.

## Source register

- **SRC-001 — [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x)**: README categories and AI section observed 2026-11-24; directory is not a license for linked works.
- **SRC-002 — [Building a Coding Agent From Scratch](https://github.com/decodingai-magazine/building-a-coding-agent-from-scratch-course)**: Public README observed; exact implementation files, commit and dependencies not reviewed.
- **SRC-003 — [LLM Evaluation Harness tutorial](https://machinelearningmastery.com/building-a-custom-llm-evaluation-harness-in-python-from-scratch/)**: Link and topic observed in SRC-001; direct article/license review pending.
- **SRC-004 — [RAG From Scratch](https://github.com/langchain-ai/rag-from-scratch)**: Public repository landing page observed; notebook execution and license review pending.
- **SRC-005 — [Vector Database from Scratch](https://skyzh.github.io/vector-db-from-scratch/)**: Course preface observed independently; exact and approximate search benchmarking; not verified as a SRC-001 entry.
- **SRC-006 — [Computer Graphics from Scratch](https://www.gabrielgambetta.com/computer-graphics-from-scratch/)**: Contents observed; rendering theory only, not an engineering quantity engine.
- **SRC-007 — [ECC (formerly Everything Claude Code)](https://github.com/affaan-m/ECC)**: README and agent.yaml/package metadata observed; MIT declared by manifest, exact reuse rights and hook safety pending. Existing local reference fork: https://github.com/taiduc1302/ECC
- **SRC-008 — [Hive](https://github.com/aden-hive/hive)**: README/configuration overview observed; shared ledger, recovery and scoped memory. Existing reference fork: https://github.com/taiduc1302/hive
- **SRC-009 — [ChanMeng666 research inventory](../catalog/chanmeng666-opportunity-matrix.json)**: Existing 82-repository research inventory; use its precise source records and statuses, not a blanket approval.
- **SRC-010 — [dchantlos research inventory](../catalog/dchantlos-opportunity-matrix.json)**: Existing 13-pattern matrix and 14-repository audit; earlier limited smoke evidence remains scoped to its source record.
- **SRC-011 — [Civil takeoff traceability method](https://github.com/taiduc1302/civil-takeoff-markups-mcp)**: Public README observed; native readback, traceability, fail-closed status; live tool QA not performed here.
- **SRC-012 — [AI Model Advisor](https://github.com/taiduc1302/ai-model-advisor)**: Public README observed; heuristic model routing and evaluation separation; no new benchmark.
- **SRC-013 — [Design Reference Library](../README.md)**: Existing design catalog, components, and QA records remain authoritative for UI.

## Promotion and contribution contract

Status: RESEARCH_LEAD → SOURCE_REVIEWED → PILOT_TESTED → ADOPTED (per target). BLOCKED and REJECTED record the specific reason. SOURCE_REVIEWED requires pinned files, license and dependency/security review; PILOT_TESTED requires actual reproducible test evidence; ADOPTED requires target regression and required approvals. A published reference or passing catalog check does not promote a pattern. Record evidence for each transition, never infer missing results. The source observations in this baseline are not SOURCE_REVIEWED.

Add a new stable ENG ID only when the proposal, target, measurable acceptance, source, risk/stop condition and status are distinct. Reuse existing IDs for overlaps and link source-specific inventories. For adoption record target (public URL or generic capability only), reviewed commit, test command/results, review date and rollback reference in the target repository; keep private project links and sensitive records out of this public repo. Never delete rejected leads merely to make progress look better.

Suggested agent instruction: “Read the Engineering Reference Library and the target repository's AGENTS.md. Identify existing implementations first. Select at most one relevant ENG pattern, check exact upstream license and dependencies, propose a small isolated change and evidence-based tests. Do not claim unrun QA or automatically approve, submit, install or deploy.”
