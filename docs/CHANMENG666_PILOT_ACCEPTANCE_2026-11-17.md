# Research pilots: source-backed experiments, not third-party adoption

**Checkpoint:** 2026-11-17. This is a public, generic technical playbook, not an implementation report. The sources are research leads. No upstream code is copied, no model is approved, and no real project document is included.

## Verified reading and source snapshots

| Candidate | Public source | Observed upstream default-branch commit | What was examined | Known boundary |
|---|---|---|---|---|
| ArchLang | [ChanMeng666/archlang](https://github.com/ChanMeng666/archlang) | `36e1378c5845eafe30b9121b951da3d56dca0da3` (2026-11-17 local) | `spec.llm.md`, `packages/archlang-3d/README.md` | Architectural planning, not a civil earthwork/quantity estimator; mm units and screen Y-down require explicit transforms |
| a11y-loop | [ChanMeng666/a11y-loop](https://github.com/ChanMeng666/a11y-loop) | `341f5d657345e0676563e350f8d72db66d70b23b` | `docs/overview.md`, README, benchmark discussion | Five-pass browser audit does not prove full WCAG compliance; manual and assistive-tech review remain required |
| slack-waterline | [ChanMeng666/chanmeng-slack-waterline](https://github.com/ChanMeng666/chanmeng-slack-waterline) | `41bce33b249e49bdd2f87bdcd3e426d9fa5f138f` | `skills/chanmeng-slack-waterline/references/read-state.md` | Slack state tracking is not a tender addenda parser. Only the evidence-preserving state-machine principle is reusable |

These SHAs identify the observed upstream state, **not a pinned vendored dependency**. Re-check before any code reuse. See [curation rules](CURATION_RULES.md). No project has been run or independently audited in this workstream.

## Pilot A — trustworthy cumulative document amendments (HIGH)

**Capability:** `tender-discovery` / `document-tracking`. **Hypothesis:** We can guarantee that an extracted change or discovered replacement cannot silently disappear when another revision arrives.

**Generic contract for a synthetic experiment:**

- `source_id`, `version_id`, `source_sha256`, `page_id`, `page_sha256`, `requirement_id`, `requirement_fingerprint`.
- Separate timestamps/receipts: `discovered_at` (observed), `extracted_at` (content was parsed), `reviewed_at` (a genuine reviewer evaluated the evidence), `applied_at` (the approved result affected downstream output). A timestamp is never proof of a different stage.
- `reviewed_at` and `applied_at` require their own source reference, actor/decision evidence and validity guard. No AI is permitted to mint a human-review decision.
- Each requirement stores one or more immutable lineage links (`supersedes`, `duplicates`, `conflicts_with`, `unresolved`); semantic conflict does not auto-close because a later file is discovered.
- A truncated scan is `INCOMPLETE`, not quiet; failure to extract one page is an exception, not a successful all-clear; duplicates may be de-duplicated only with recorded identity/evidence.

**Synthetic acceptance fixtures:**

| Fixture | Expected result |
|---|---|
| Base tender + two cumulative addenda, including reissued page numbers | All original and new requirements persist with revision authority recorded |
| Same page number, different bytes | New version preserved; ambiguous authority held for review |
| Different page IDs, identical PDF bytes | Duplicate reported; no double-count |
| Requirement removed in later revision without explicit repeal evidence | Held as conflict / requires review, not erased |
| One unreadable or omitted page | Scan remains incomplete and reviewer queue remains open |
| AI suggests approval without signed reviewer evidence | Hard refusal; no downstream approval/commit |
| Repeated processing of same input | Idempotent output and stable identifiers |

**Exit criteria:** all synthetic scenarios pass, zero silent requirement losses, deterministic output on replay, review-only status preserved, documented failure-mode report. **Not approved:** live procurement action, portal submission, automatic conflict winner, or merging into active production without its own regression gate.

## Pilot B — civil 2D/3D geometry correspondence (HIGH)

**Capabilities:** `civil-geometry` / `earthworks`. **Hypothesis:** A single explicit geometry model can produce a plan view, a section, and an illustrative 3D view without contradictory dimensions.

**Contract for an independently built tiny fixture:**

1. Declare coordinate frame and units explicitly: CAD model units or metres internally; convert to ArchLang millimetres only in an isolated adapter, with orientation and origin transforms documented. Never infer survey vertical datum or project north.
2. Use synthetic straight utility corridor and one trench with flat bottom, length, depth and side slope. Keep scope deliberately smaller than a real pipe network.
3. Read the fixture's geometric measurements back independently; compare each output with a separately derived reference (not the same function that generated the scene).
4. 3D view is `ILLUSTRATIVE` until the underlying solids, topology, units and volume calculation pass independent tests.
5. A changed source fingerprint invalidates prior geometry acceptance and blocks downstream measured totals.

**Acceptance:** a 10 m synthetic feature stays 10 m after round-trip under both coordinate conventions; a known polygon area and elementary prism/trapezoid volume match exact reference within declared tolerances; flipped Y, swapped X/Y, mixed mm/m and changed revision all fail with explanatory errors. Check DXF/SVG as exports and GLB as visualization independently. **Do not:** infer actual AGTEK surfaces, claim native Bluebeam capability, or sign off quantities from a pretty render.

**Dependency policy:** test with an isolated third-party install, after an explicit license/dependency review; do not make ArchLang a core dependency to an existing civil workflow until the adapter and benchmark demonstrate value.

## Pilot C — actual UI accessibility regressions (HIGH)

**Capabilities:** `web-ux` / `design-library`. **Hypothesis:** the existing local UI QA can be extended to catch regressions that a single default Chromium viewport misses.

**Five visual/browser profiles:**

1. Default desktop.
2. Dark color scheme.
3. Forced colors/high contrast.
4. Reduced motion.
5. 320 px reflow viewport.

**Check:** focus visibility; keyboard-reachable controls; semantic labels and search status announcements; tables remain operable at 320 px without document-wide horizontal overflow; all real modal/loading/error/empty states exercised; clear no-autofocus/keyboard traps; each test records browser version, URL/state, timestamps, screenshot evidence and exact failures.

**Regression gate:** compare against the previously accepted baseline using stable finding identifiers; any newly introduced failure is a regression even if total failures fall. Unsupported modes become `NOT_TESTED`, never PASS. Run without GitHub Actions minutes where practical.

**Manual exit criteria:** keyboard, focus order, high-contrast, screen-reader spot checks; independent review of visual overflow and wording. Automatically reported `0 violations` is **not a WCAG compliance certification**.

## Developer handoff and sequencing

- These are **separate experiments**, not one sprawling integration PR.
- Preserve each target application's `AGENTS.md`, issue ownership and existing branch. Do not collide with a claimed lane or silently change private repositories.
- For each pilot: create scoped issue/branch, inspect actual upstream source and file-level license, write independent synthetic fixtures, implement smallest adapter, run applicable local tests, capture result/limitations, and open a reviewable PR. Do not merge on metadata inspection alone.
- All live Bluebeam/Windows, real source portals, privacy-sensitive records and paid-provider experiments require separate explicit access, real test evidence and safe handling.
- Keep `design-reference-library` as the **research and design selection layer**. Product-specific state engines or geometry solvers belong in their own project after evidence is collected.

## Snapshot status

- Catalog and browser UI: implemented on research PR branch; execution checks are tracked separately.
- Pilot A/B/C: **NOT_IMPLEMENTED / NOT_TESTED**. These are testable specifications only.
