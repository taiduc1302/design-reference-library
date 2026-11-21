# dchantlos: full 14-repository source audit and cross-project opportunity map

> Research status **RESEARCH_LEAD / NOT ADOPTED**. Date: **2026-11-20**. This supplements the [initial 4D/5D study](DCHANTLOS_CONSTRUCTION_VISUALIZATION_RESEARCH_2026-11-20.md) and is the **source of truth for technical findings** from the later 14-repository follow-up. Do not copy code, licensed media or install extensions from this document. This is not engineering certification, full security review, production QA or an implementation order.
>
> Machine-readable candidate and target matrix: [catalog/dchantlos-opportunity-matrix.json](../catalog/dchantlos-opportunity-matrix.json). Targets below are generic capabilities, not private repository names.

## How future agents should use this

1. Start with the **all-repos inventory**, the **verified code findings**, and the **candidate matrix** below; do not treat a demo as validated engineering or financial evidence.
2. Pick **one** candidate pattern ID (DCH-01 through DCH-12). Inspect the pinned upstream revision and re-check the current source, license and dependencies before any copying.
3. Read the consuming repository's AGENTS/roadmap and active issue/PR claims; obey any requirement to finish existing roadmap items first.
4. Work on a small synthetic, reversible experiment with separate acceptance evidence. No change to approved quantities, bidding decisions, field safety or native construction documents.
5. Record the observed test outcome. Never promote research to SOURCE_REVIEWED / PROTOTYPED / VISUALLY_CHECKED / ADOPTED from a link, mock screenshot, unit smoke test or a GitHub fork alone.

## All 14 public repositories (pinned)

All SHAs are the author's branch HEADs observed **2026-11-20**. Original = this repository is not marked as a GitHub fork; this does **not** establish ownership of embedded data, images, libraries, models or trademarks. `NO_LICENSE_FOUND` refers to the absence of a repository-wide reuse license at the inspected revision; it is not an assertion about external components.

| Repository at pinned SHA | Origin | Repo license evidence | Research priority | What it actually contains / major limit |
|---|---|---|---|---|
| [construction-timelapse](https://github.com/dchantlos/construction-timelapse/tree/50ec8720531285abdb47ba7755fdaab5bc0feab0) | original | NO LICENSE FOUND | P1 | 4D/5D scene, simulated progress, I3S aggregate audit; do not trust element-level audit/BCF IDs |
| [datacenter](https://github.com/dchantlos/datacenter/tree/c3f15344fcb6a75a9c1f15c85f31a79864e5006e) | original | NO LICENSE FOUND | P1 | GIS screening, explainable eligibility/scoring, scenarios, ArcGIS cut/fill, Podium extension |
| [arcgis-js-app-template](https://github.com/dchantlos/arcgis-js-app-template/tree/65dc64d82b379f2a9fda9f0e3504fb3b2d512584) | original | Apache-2.0 | P1 | Design tokens, docks, layer controls, screenshot QA; branded assets not automatically reusable |
| [Badouzi](https://github.com/dchantlos/Badouzi/tree/da4dda1f28c4d7e9d500d0bd521794f237a63238) | original | NO LICENSE FOUND | P2 | 3D navigation, line of sight, partial/unavailable evidence semantics, what-if scenarios |
| [3dgs](https://github.com/dchantlos/3dgs/tree/a4e161f7195f27bdc60bdd0958b0ac1bc7d885c8) | original | NO LICENSE FOUND | P2 | Gaussian Splat gallery, slice/profile/measure via ArcGIS, 3D flight |
| [realitytimeline](https://github.com/dchantlos/realitytimeline/tree/83979a29234d860cd489e7cbb934fac5fee5cadc) | original | NO LICENSE FOUND | P2 | Dated mesh/splat layer switching; ArcGIS volume API, not independent engineering volumes |
| [arcgisdev](https://github.com/dchantlos/arcgisdev/tree/99f8f90b1b1fbe856e6fa6d3d6061c1e849d518f) | original | NO LICENSE FOUND | P3 | React/Tailwind/Framer methodology and portfolio presentation patterns |
| [HSK2-game](https://github.com/dchantlos/HSK2-game/tree/19434e14d65ef8c9e685ac98fc280e4d729b0834) | original | NO LICENSE FOUND | P3 | Story quiz, vocabulary matching, browser TTS, local progress |
| [shadow-map](https://github.com/dchantlos/shadow-map/tree/d3aee0b934a3779ad36e1df1b40d1464c9cc5410) | original | NO LICENSE FOUND | P3 | Single-page ArcGIS ShadowCast example; not a reusable framework |
| [my-3d-map](https://github.com/dchantlos/my-3d-map/tree/7c9a1b24bcbeb6b1679a315c8977210b29c5cbb9) | original | NO LICENSE FOUND | P3 | Single-page ArcGIS 3D scene and layer widget example |
| [ifc-lite-gis](https://github.com/dchantlos/ifc-lite-gis/tree/1b91ece03912bd3c9ee2d5e8e2d5062cac97092c) | fork: LTplus-AG/ifc-lite | MPL-2.0 | P1 | IFC4X3, units, georeferencing, section/measurement, IDS and BCF; evaluate upstream, not stale fork |
| [housekeeping-for-arcgis](https://github.com/dchantlos/housekeeping-for-arcgis/tree/d4fe2c93e8ac67959c91b8504e69af2721aaac9e) | fork: cartinuum/housekeeping-for-arcgis | Apache-2.0 FILE; API NOASSERTION | P2 | Inventory, tables, triage, dependency graph, reviewer basket, email drafts |
| [arcgis-ai-components-demo](https://github.com/dchantlos/arcgis-ai-components-demo/tree/79735db6a156fc8cd4e3827231636429fe8f4c43) | fork: CodeHeistPy/arcgis-ai-components-demo | MIT | P2 | Map assistant, metadata-driven retrieval and OAuth; beta/paid organization requirements |
| [sdktemplate](https://github.com/dchantlos/sdktemplate/tree/7d7fe49397044b53ef3f168d443af68841df09e4) | fork: arnofiva/codekit | Apache-2.0 | P3 | Generic React/Vite/Calcite ArcGIS starter, mostly superseded for UI research |

**Four forks, not original dchantlos projects:** [ifc-lite-gis](https://github.com/LTplus-AG/ifc-lite) is from LTplus-AG/ifc-lite (MPL-2.0; this fork last pushed 2026-06-17 while upstream had newer work in November); [housekeeping-for-arcgis](https://github.com/cartinuum/housekeeping-for-arcgis) is from cartinuum (actual Apache-2.0 LICENSE file, even though GitHub API returned NOASSERTION); [arcgis-ai-components-demo](https://github.com/CodeHeistPy/arcgis-ai-components-demo) is from CodeHeistPy (MIT); [sdktemplate](https://github.com/arnofiva/codekit) is from arnofiva (Apache-2.0). The latter two include a higher-level platform integration or starter, not independent measured construction geometry.

## Confirmed code findings and trust limitations

### 1. Construction progress, 5D and BIM audit (construction-timelapse)

- [config.js](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/config.js#L130-L236) (remove whitespace around links when pasting): tower `plannedPct: 60`; `Scheduled_10_Days` and `Scheduled_11_to_30_Days` are treated as representative late buckets; financial contract, CPI/SPI, environmental risk amounts are hard-coded demo figures. These **future-scheduled buckets are not verified overdue work**. A production claim needs a dated baseline, a reference date and validated installation records.
- [progress-stats.js](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/progress-stats.js#L1-L11) reads per-attribute I3S precomputed histograms/sums; this is aggregation over published scene statistics, **not** a per-object verified earned-value ledger or live P6/Field Maps readback.
- [progress-financial.js](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/progress-financial.js#L53-L131) uses constants for the tower and `Fin_*` aggregate fields for the linear demo. [Billing button](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/progress-financial.js#L302-L340) explicitly mocks loading/success; there is **no billing backend**. Never count the animation or CSV fallback as an approved payment application.
- **High-severity audit correctness limitation:** [audit.js lines 247–282](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/audit.js#L247-L282) counts populated values per required attribute and uses the **minimum across fields** for the compliant element count. The counts' minimum does not prove that all required fields are populated **on the same elements**: e.g., 80/100 have A, 80/100 have B, but only 60/100 have both. Treat this as an aggregate coverage indicator, **not exact IDS conformance**.
- **High-severity BCF traceability limitation:** [audit.js lines 903–939](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/audit.js#L903-L939) derives candidate GlobalIds from precomputed `mostFrequentValues`, and [lines 987–990](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/audit.js#L982-L991) admit that the exact failing IDs are not knowable. Highlighted red components and exported BCF selections are **representative**, not proven failing object identities. Do not port this into compliance, markups or takeoff approval.
- [ids.js](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/ids.js#L1-L8) explicitly parses only supported IDS facet families and ignores others. Missing facet support must never silently imply full validation.
- [bcfExport.js lines 40–59](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/js/bcfExport.js#L40-L59) declares a Web Mercator → local IFC transform with an **estimated** origin from scene extent. Never export certified camera/model alignment without surveying CRS, vertical datum, rotation, control points and unit round trips.
- [AI agent](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/ai/src/agent.ts#L58-L98) has numeric fallback cost/schedule values, and [environmental cost fallback](https://github.com/dchantlos/construction-timelapse/blob/50ec8720531285abdb47ba7755fdaab5bc0feab0/ai/src/agent.ts#L109-L172) includes illustrative events; prompt instructions cannot turn simulated figures into actual field data. Avoid treating crane thresholds, weather windows, inferred cause of delay or risk amounts as safety or contractual decisions.

**Transferable concept:** provenance-linked object inspector, true statuses (proposed/observed/verified), time controls, sectional inspection, audit evidence and cost cards. **Do not transfer** the aggregate compliance maths, representative BCF offenders, simulated 5D numbers, estimated georeferencing or safety advice as authoritative results.

### 2. Explainable screening, terrain and automation boundary (datacenter)

- [criteria.ts hard gates](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/criteria.ts#L121-L150) correctly separates exclusion rules from preference scores. [Verdict](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/criteria.ts#L243-L249) has `pass / fail / unknown`, valuable for a tender or model-choice workflow.
- [criteria.ts scoring](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/criteria.ts#L265-L350) assigns missing factors `norm: null` and zero contribution, with deterministic weights and stable tie-break. **But** [rankSites lines 378–398](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/criteria.ts#L378-L399) sets `eligible = status !== fail`: unknown candidates are ranked together with confirmed pass candidates (still labelled unknown). For decision UX, show **Verified / Potential / Unknown / Excluded** as separate populations; neither an unknown check nor a high score is verified eligibility.
- [analysis.ts](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/analysis.ts#L21-L24) caps one run at 1,000 parcels and external query concurrency at 4; [siteFacts.ts](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/siteFacts.ts#L168-L205) uses USGS raster-statistics slope sampling, not ground-survey precision. Geometry, data age and source-fallback uncertainties remain.
- [SceneTools.tsx](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/components/SceneTools.tsx#L28-L84) invokes ArcGIS `VolumeMeasurementAnalysis({measureType: "cut-fill"})`. This is useful as **visual context/check**, not a replacement for a surveyed grid/TIN quantity engine.
- [store.ts](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/apps/web/src/store.ts#L9-L12) uses local IndexedDB for runs/shortlists/options. This does not provide multi-user synchronization, audit retention, verified field records or backup across browsers.
- [podium-bridge/manifest.json](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/podium-bridge/manifest.json) limits extension hosts and externally connectable origins; [background.js](https://github.com/dchantlos/datacenter/blob/c3f15344fcb6a75a9c1f15c85f31a79864e5006e/podium-bridge/background.js#L1-L77) injects a driver into a signed-in Podium page. The extension automates a third-party product without a public API; it was **not installed or security tested**. Treat external login, permissions, site boundary and vendor terms as separate decisions.

**Transferable concept:** deterministic scoring with transparent source values, hard failures, an honest unknown state, scenario shortlist and editable selection parameters. Keep scoring separate from source ingestion and human approval.

### 3. Data integrity and camera UX (Badouzi)

- [exposure.js](https://github.com/dchantlos/Badouzi/blob/da4dda1f28c4d7e9d500d0bd521794f237a63238/exposure.js#L31-L134) distinguishes completed, partial and unavailable inventory when elevations or values are missing; unknown cost is **null, not zero**. Good fail-closed data/reporting practice.
- [line-of-sight.js](https://github.com/dchantlos/Badouzi/blob/da4dda1f28c4d7e9d500d0bd521794f237a63238/line-of-sight.js#L1-L42) explicitly separates visible/blocked/pending/unavailable; current level of 3D detail and zoom influence the result, so no certified clearance is implied.
- [flight-motion.js](https://github.com/dchantlos/Badouzi/blob/da4dda1f28c4d7e9d500d0bd521794f237a63238/flight-motion.js) uses bounded, frame-independent eased camera movement and Web Mercator scaling; [zoom-motion.js](https://github.com/dchantlos/Badouzi/blob/da4dda1f28c4d7e9d500d0bd521794f237a63238/zoom-motion.js) uses a logarithmic critically damped zoom spring. Useful as **interaction ideas**, not transplantable geometry calculations.
- [package.json](https://github.com/dchantlos/Badouzi/blob/da4dda1f28c4d7e9d500d0bd521794f237a63238/package.json) declares local Node tests for exposure, flight, zoom, line-of-sight, weather and other features. Their **existence** was inspected; the upstream suite itself was **not run**. Tide levels and asset values in the demo are illustrative, not forecasts or estimates.

### 4. Capture timeline and 3D analysis (realitytimeline / 3dgs)

- [realitytimeline/src/main.js](https://github.com/dchantlos/realitytimeline/blob/83979a29234d860cd489e7cbb934fac5fee5cadc/src/main.js#L47-L73) extracts capture dates **from layer titles** such as Month Year. This is brittle under renaming, localization, unknown dates and mixed captures; prefer typed timestamps and source IDs.
- [realitytimeline/src/volumeTool.js](https://github.com/dchantlos/realitytimeline/blob/83979a29234d860cd489e7cbb934fac5fee5cadc/src/volumeTool.js#L1-L35) wraps ArcGIS `VolumeMeasurementAnalysis` including stockpile/cut/fill, with no independent cross-section or quantity verification in that module.
- [3dgs/src/tools.js](https://github.com/dchantlos/3dgs/blob/a4e161f7195f27bdc60bdd0958b0ac1bc7d885c8/src/tools.js#L1-L15) wraps ArcGIS Slice, LineOfSight, ElevationProfile and Measure; it is a visualization/inspection toolkit. This repository has no test files in the inspected tree. Geometry quality, registration and mesh coverage must be recorded before using any measured result.

### 5. UI-kit and its own QA gap (arcgis-js-app-template)

- [Reusable agent kit](https://github.com/dchantlos/arcgis-js-app-template/blob/65dc64d82b379f2a9fda9f0e3504fb3b2d512584/skills/arcgis-js-app-template/SKILL.md) includes source rules, theme tokens, welcome/loading panels, layer toggles, optional timeline, keyboard and reduced-motion requirements. It is **Apache-2.0**, but Esri marks/logos, datasets and imagery have their own rights. Do **not** install a third-party skill solely from this research.
- [Checklist](https://github.com/dchantlos/arcgis-js-app-template/blob/65dc64d82b379f2a9fda9f0e3504fb3b2d512584/skills/arcgis-js-app-template/references/checklist.md) is a useful non-visual checklist and covers 1440/1024/390px, escape/focus and error states.
- **QA gap:** [screenshots.mjs](https://github.com/dchantlos/arcgis-js-app-template/blob/65dc64d82b379f2a9fda9f0e3504fb3b2d512584/skills/arcgis-js-app-template/scripts/screenshots.mjs#L50-L117) captures five modes and prints a pass/fail symbol for each, but does **not set a nonzero exit code** when a screenshot reports boot failure or console errors. It also omits explicit **320px** coverage and executes all modes with reduced motion, not both motion settings. A reusable validator must fail on failed acceptance checks, not just print red markers.
- No actual screenshot or 320px browser QA was performed in this audit. Use UI patterns selectively, not an unreviewed whole theme.

### 6. Forks and adjacent opportunities

- **IFC Lite:** [fork](https://github.com/dchantlos/ifc-lite-gis/blob/1b91ece03912bd3c9ee2d5e8e2d5062cac97092c/README.md), [original upstream](https://github.com/LTplus-AG/ifc-lite). The fork tree includes `packages/ids/src` for IDS facet rules, `packages/bcf/src` for BCF read/write, `packages/parser/src/unit-extractor.ts` and `georef-extractor.ts`, `packages/codegen/generated/ifc4x3` plus sections/measurements and tests. These are **actual source paths**, not proof they pass or that PDF-to-BIM conversion works. Prefer reviewing the updated upstream; MPL-2.0 file-level obligations and dependencies require checking before reuse. This is particularly relevant to IFC4X3 infrastructure.
- **housekeeping-for-arcgis:** a [cartinuum fork](https://github.com/cartinuum/housekeeping-for-arcgis) with Apache-2.0 file, multiple `src/__tests__` and `src/components/TableView.tsx`, `TriageStrip.tsx`, `DependencyGraph.tsx`, `ActionPanel.tsx`; useful inventory → review basket → human communication draft UX. Documentation cautions about limited sampling, estimated credit rates and source-dependent completeness; no live account workflow tested.
- **arcgis-ai-components-demo:** [CodeHeistPy fork](https://github.com/CodeHeistPy/arcgis-ai-components-demo) uses ArcGIS AI/map components. README requires correct layer metadata, generated vector embeddings, sign-in, beta enablement and supported organization. OOB agents are limited in scope; no generic free/offline AI answer engine is present.
- **sdktemplate:** an [arnofiva/codekit fork](https://github.com/arnofiva/codekit) with Apache-2.0; generic app starter and no detected unit tests, lower priority than the narrower UI kit.
- **arcgisdev:** React/Tailwind/Framer animations and project storytelling, not field data QA or takeoff computation; no detected unit tests and no repository license.
- **HSK2-game:** vocabulary stories, matching, quizzes, browser speech and local progress; domain concept only, no detected test suite/license, do not copy text/assets/code.
- **shadow-map / my-3d-map:** each contains a single HTML page with ArcGIS components, no tests/license; study SDK setup only.

## Cross-project candidate map (NOT a sprint backlog)

| ID | Pattern | Potential target capabilities | Priority | Safe first pilot |
|---|---|---|---|---|
| **DCH-01** | One geometry, linked 2D plan / section / 3D selection | earthworks, civil-takeoff | P1 | Synthetic trench: click an element in any view; same ID and numbers in all views; no count-engine changes. |
| **DCH-02** | Read-only timeline of construction stages (4D) | earthworks, civil-takeoff | P2 | Synthetic existing -> excavation -> bedding -> installation -> backfill -> restore; verify stage transitions and no invented progress. |
| **DCH-03** | Quantity/cost context lenses (5D) with independent evidence | civil-takeoff, tender-discovery | P3 | Synthetic-only report: unknown money remains unknown; reconciled totals; human-only pricing/signoff. |
| **DCH-04** | Optional GIS/terrain + visual cut/fill comparison | earthworks, civil-takeoff | P2 | Side-by-side synthetic terrain volumes and local solver; never replace engineering quantities with ArcGIS preview. |
| **DCH-05** | Explainable hard-gate screening and ranking | tender-discovery, model-advice | P1 | Synthetic candidate ranking; test failed gate outranks no one; unknown never shown as verified eligible. |
| **DCH-06** | Reusable UI shell, themes, panels and evidence screenshots | design-library, civil-takeoff, tender-discovery, model-advice | P1 | Isolated 2-3 component slice + automated screenshot checks that exit nonzero on failure. |
| **DCH-07** | Time-stamped reality-capture / as-is overlay | earthworks, civil-takeoff | P3 | Synthetic before/after captures with explicit unknown/misaligned states and a rollback option. |
| **DCH-08** | IFC/IDS/BCF adapters and exact object validation | earthworks, civil-takeoff | P2 | Small IFC fixture with disjoint missing fields; verify intersection and BCF GUIDs against source, fail on estimated georef. |
| **DCH-09** | Review basket, dependency graph and action drafts | tender-discovery, civil-takeoff, model-advice | P2 | Synthetic shortlist to review to human action; verify missing dependencies prevent 'ready'. |
| **DCH-10** | Fail-closed unknown/partial data states | earthworks, civil-takeoff, tender-discovery, model-advice | P1 | Deterministic fixtures with absent elevations, missing amounts, expired services and conflicting records. |
| **DCH-11** | Progressive vocabulary practice, story and TTS | learning | P3 | Original construction dialogue and spaced-review exercise, no unlicensed storyline/code reuse. |
| **DCH-12** | Read-only AI assistant over well-described structured data | tender-discovery, model-advice, civil-takeoff | P3 | Offline synthetic tool-call fixture with citation-level provenance, no cloud account or invented thresholds. |

**Suggested sequence:** (a) preserve this research; (b) finish each target's existing roadmap and avoid overlapping agent claims; (c) experiment only with DCH-10 fail-closed evidence, DCH-05 transparent ranking, or DCH-01 read-only cross-view identity, depending on task urgency; (d) pilot DCH-06 isolated UI with full 320px and failure-exit tests; (e) consider 4D, 5D, IFC and GIS only after core validation. Priority is a candidate ranking, **not authority to change the consuming project's approved roadmap**.

## Proposed acceptance / release gates

| Gate | Evidence required | Explicit rejection conditions |
|---|---|---|
| G0 rights & provenance | Exact upstream SHA, per-file copyright/license, asset/data rights, dependency manifest | Unknown license, copy/paste without permission, third-party extension installed without review |
| G1 data and identity | Stable IDs, source revision+hash, CRS, vertical datum, mm/m unit tests and independent reference | Estimated georef, unmatched object IDs, silent interpolation, unknown treated as zero |
| G2 numeric & engineering | Analytic synthetic fixture + independent sections/mesh + reconciled totals with tolerances | ArcGIS raster appearance passed off as verified quantity; source-dependent simulation |
| G3 human/AI boundaries | AI_PROPOSED / QA_CHECKED / human-approved separation; source-linked decision record | Model signs off, submits bids, sets commercial rates, confirms site safety |
| G4 UX/accessibility | Real built-app browser tests at 320, 390, 768 and 1440px; keyboard/focus/escape, forced colors, dark/reduced motion, load/empty/error | Screenshot-only claims; console errors; failure not returned as failing exit |
| G5 integration/rollback | One isolated PR per consuming repo, no unrelated changes, versioned acceptance and rollback instructions | Unreviewed wholesale port, import of expensive ArcGIS dependencies, unintended quantity changes |

## Evidence actually obtained (limited)

- Source: GitHub trees, metadata, package manifests, README + targeted implementation reads for **all 14** repositories, pinned above. This is source-level sampling and focused issue identification, **not full-line code review** or an independent claim that every feature works.
- **11/11 isolated JavaScript function smoke checks passed:** four assertions on `Badouzi/exposure.js` (waterline, counted/valued objects, missing cost, missing source), four on `Badouzi/flight-motion.js` (valid pose, reject NaN, forward motion, min speed), two on `Badouzi/zoom-motion.js` (zoom step, wheel normalization), one on `construction-timelapse/js/linear-conditions.mjs` (unavailable sensor data not green). These checks evaluated selected pure source functions, **not installed upstream dependencies or their test suite**.
- **NOT RUN:** full unit test suites, npm/Playwright build/run, true browser layout, 320px keyboard accessibility, ArcGIS/Podium/IoT account flows, survey-grade geometry, security scanning, benchmark, real project regression, Windows acceptance.
- Licensing: missing repo-level licence remains **no source copying** even when a page is public; inspect upstream copyright and branded assets independently.
- Privacy: public/generic examples only; no private project names, client data, actual construction documents, rates or credentials in this research.

## Hand-off for separate project chats

When exploring any individual opportunity, pass the **pattern ID (DCH-xx)**, [machine-readable matrix](../catalog/dchantlos-opportunity-matrix.json), **pinned source links** in this document, observed limitations, target repo AGENTS/roadmap, and current test evidence. Create task issues in the consuming repo only after checking existing priorities, claims and open PRs. Future findings should update this common record, not create unlinked notes spread across several repositories.

Related: [initial 4D/5D study](DCHANTLOS_CONSTRUCTION_VISUALIZATION_RESEARCH_2026-11-20.md) · [curation rules](CURATION_RULES.md) · [project handoff](PROJECT_HANDOFF.md) · [ChanMeng666 research](CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md).
