# dchantlos / ArcGIS construction visualisation — reusable research inventory

> Research lead only. Source inspection: 2026-11-20. No external code, graphics, models, ArcGIS services, browser extension, credentials, sensor feeds or third-party packages were copied or installed. No live interaction regression or performance benchmark was run. The examples describe **illustrative and/or simulated** construction data, not verified field reports.

## Why keep this research

These repositories demonstrate a useful separation: an authoritative model or data record, a selectable geometric object with stable identity, a time axis (4D), progress and cost context (5D), independent validation status, and multiple visual presentations. The strongest reusable ideas are **architecture, interaction and evidence contracts**, not visual effects or claims of engineering accuracy.

This inventory is deliberately generic and does not reference private project repositories or client datasets. A project-specific plan belongs in the consuming project's private documents. Nothing in this file promotes a component into `catalog/references.json` or `catalog/components.json`.

## Verified sources and scope

| Source (GitHub) | Reviewed commit | Observed capabilities | Licence / caveat | Research priority |
|---|---|---|---|---|
| [construction-timelapse](https://github.com/dchantlos/construction-timelapse) | `50ec8720531285abdb47ba7755fdaab5bc0feab0` | ArcGIS scene layers, IFC-derived I3S building / viaduct, planned 4D, progress, 5D panels, IDS 1.0 / BCF 2.1, slice, explode, selection, schedule and cost lenses, sensor display | **No repository-level LICENSE file found at this revision**. Public source is **not permission to copy** its code or graphics. Distinguish mocked financial interactions and example data from actual field or finance records | HIGH |
| [realitytimeline](https://github.com/dchantlos/realitytimeline) | `83979a29234d860cd489e7cbb934fac5fee5cadc` | Date slider and before/after 3D mesh / Gaussian Splat reality capture layers | No repository LICENSE found; layer naming is date-driven; visual change is not measured installed quantity | MEDIUM |
| [datacenter](https://github.com/dchantlos/datacenter) | `c3f15344fcb6a75a9c1f15c85f31a79864e5006e` | Terrain/parcel screening, alternate design scenarios, GLB placement, cut/fill via ArcGIS `VolumeMeasurementAnalysis`, line of sight and sun | No repository LICENSE found; external ArcGIS/Podium integration, terrain detail and basemap rights must be checked; no survey-grade cut/fill claims | HIGH |
| [3dgs](https://github.com/dchantlos/3dgs) | `a4e161f7195f27bdc60bdd0958b0ac1bc7d885c8` | Gaussian Splat explorer, time comparison, slice, elevation profile, measurement, camera controls | No repository LICENSE found; rendering measurements depend on displayed 3D resolution | MEDIUM |
| [Badouzi](https://github.com/dchantlos/Badouzi) | `da4dda1f28c4d7e9d500d0bd521794f237a63238` (`master`) | Combined BIM/point-cloud/Gaussian Splat, field asset cards, drone camera, what-if water levels, line-of-sight visualisation | No repository LICENSE found; illustrative scenarios and cinematic effects are not engineering simulations | MEDIUM |
| [arcgis-js-app-template](https://github.com/dchantlos/arcgis-js-app-template) | `65dc64d82b379f2a9fda9f0e3504fb3b2d512584` | Loading/empty UX, panels, layer controls, timeline dock, clean screenshot mode, agent-led review checklist | Apache-2.0 file present; Esri branding/assets remain separately restricted; validate templates and scripts before reuse | HIGH |
| [arcgis-ai-components-demo](https://github.com/dchantlos/arcgis-ai-components-demo) | `79735db6a156fc8cd4e3827231636429fe8f4c43` | Assistant grounded in GIS layers / field metadata and vector embeddings, with explicit OAuth prerequisites | MIT file present; ArcGIS AI components beta, named-user subscription and embeddings setup; source answers need independent verification | LOW |
| [ifc-lite-gis](https://github.com/dchantlos/ifc-lite-gis) | `1b91ece03912bd3c9ee2d5e8e2d5062cac97092c` | IFC4/IFC4X3 parser, property inspection, WebGPU rendering, IFC/GLB workflows | **Fork** of [LTplus-AG/ifc-lite](https://github.com/LTplus-AG/ifc-lite), not an original dchantlos implementation. MPL-2.0; inspect upstream and notices | MEDIUM |

Additional public repositories identified but not deeply examined: `arcgisdev` (methodology), `housekeeping-for-arcgis` (inventory/review UI), `sdktemplate` (ArcGIS starter), `shadow-map` and `my-3d-map` (very small or undeveloped), `HSK2-game` (unrelated). This is a **shortlist**, not a code/security certification for all repositories.

### Main demo routes

- [Planned construction 4D — tower](https://dchantlos.github.io/construction-timelapse/index.html)
- [Progress 4D / cost 5D — tower](https://dchantlos.github.io/construction-timelapse/progress.html)
- [Planned 4D — linear roadway](https://dchantlos.github.io/construction-timelapse/index.html?project=linear)
- [Progress 4D / cost 5D — linear roadway](https://dchantlos.github.io/construction-timelapse/progress.html?project=linear)
- [Billing report](https://dchantlos.github.io/construction-timelapse/report.html)

The principal demo offers two project configurations (vertical building and linear viaduct), planned sequence vs simulated construction status, 3D element selection and filtering, and cost panels. Some smartphone use is deliberately blocked. The Google Photorealistic 3D view requires compatible organisational authorization; do not treat anonymous site accessibility as proof of feature availability.

## Detailed implementation findings: distinguish interface claims from facts

1. **Geometry and time.** `js/config.js` separates vertical/linear project layer mappings and phase settings; `js/cinematic.js` and the timeline drive visible sequencing. A timeline animation is not a verified installation log.
2. **As-built aggregation.** `js/progress-stats.js` reads published I3S per-attribute statistics (`CStatus`, `Prog_*`, `Fin_*`). Tower progress uses status buckets and a configured planned percentage; linear figures are read from precomputed layer statistics for simulated `Prog_*` fields. These are not a validated live P6/Field Maps source of truth.
3. **Important discrepancy.** The tower's `Scheduled_10_Days` / `Scheduled_11_to_30_Days` buckets feed its estimated lateness; its own `docs/ifc-schedule-workflows.md` correctly warns **forecast buckets are not actual overdue evidence**. A real overdue decision needs an approved baseline due date and dated installed record.
4. **5D caveat.** `js/progress-overlays.js` uses `CStatus`-keyed `UniqueValueRenderer` for budget/billing/risk visual lenses, so a coloured object does not establish the amount invoiced or per-object earned value. `js/progress-financial.js` and `js/progress-drilldown.js` explicitly describe mocked billing actions/risk drilldowns and configured figures.
5. **IFC → I3S / IDS / BCF.** Model provenance, stable IFC `GlobalId` and join tables are more transferable than the exact ArcGIS implementation. `docs/ifc-schedule-workflows.md` describes the P6 XML and Field Maps workflows as follow-on processes; shipped public linear data is generated/simulated. GIS caching introduces data-freshness risks.
6. **3D cut/fill.** `datacenter/apps/web/src/components/SceneTools.tsx` uses ArcGIS `VolumeMeasurementAnalysis({measureType:"cut-fill"})`. This is a terrain-visualisation measurement and must be independently reconciled against authoritative quantities; never replace the engineering quantity engine with it.
7. **Reality capture.** Gaussian Splat / mesh timelines make good *visual evidence* when capture dates, georeferencing, ground controls, coverage and alignment are disclosed. They cannot prove quantities, tolerances or site safety by appearance.
8. **User experience.** Layer isolation, cut planes, explode/reset, click-to-inspect cards, keyboard camera controls, distinct Planned/Actual states and screenshot mode merit small isolated pilots. Dense controls and deliberately disabled phones should not be copied automatically.

## Reusable patterns to investigate (not approved to implement)

| ID | Pattern | Minimum data contract | Required proof before promotion |
|---|---|---|---|
| CT-01 | One read-only model → linked 2D plan, section, 3D selection | Stable geometry ID, source/revision/hash, units, coordinate reference, confidence/QA status | Cross-view ID and coordinate parity; numeric source reconciliation |
| CT-02 | 4D sequence / work fronts | Typed phase IDs, schedule source/baseline, component links, simulated-vs-actual flag | Deterministic timeline; dependency and planned-vs-installed test; no invented progress |
| CT-03 | Contextual quantity and cost lenses | Approved quantity plus unit, rate authority, cost code, period and status provenance | Financial arithmetic independently checked; do not infer billing from installed status |
| CT-04 | Section, slice, isolate, explode | Ground/element geometry and immutable scene transform | Reset restores source geometry; cut/slice does not alter counted quantities |
| CT-05 | Reality capture date comparison | Source/flight ID, timestamp, CRS/datum, alignment/coverage and QA | Synthetic before/after, reference control points, missing coverage and time gaps |
| CT-06 | Provenance-linked element inspector | Read-only object key and source evidence register | Click selection agrees with source revision, source hash and status |
| CT-07 | Optional GIS, IFC/IDS/BCF adapters | Explicit format/version/unit/CRS schema and licence/dependency manifest | Offline synthetic fixture and fail-closed incompatibility tests |
| CT-08 | Screen-mode / presentation shell | Layout/focus/viewport state and screenshot sanitisation | Keyboard, 320/390/768/1440px, dark/contrast/reduced motion, clean capture QA |

## Suggested priority and staged decision gates

- **R0 — Research and licensing (NOW):** pin source commits, record exact notice/license status, separate concept reuse from copying; no dependency installs.
- **R1 — Small independent civil visualisation proof:** synthetic data, same object IDs in plan/section/3D and independent length/area/volume/mm–m checks. Record mock vs real source labels.
- **R2 — Layer/section inspection:** read-only selection, isolate/slice, source QA cards, no geometry writeback.
- **R3 — Optional 4D:** synthetic phases `existing → excavation → bedding → pipe → backfill → finished grade`; verify stage transitions, cumulative volumes, immutability and no implicit actual progress.
- **R4 — Optional 5D:** only after quantity provenance and cost-code/rate authority exist; show unmapped/unknown rather than guessed money or billed value.
- **R5 — Reality/GIS/IFC:** only with demonstrated use case, surveyed alignment, data rights, licensing, deployment/cost assessment and independent QA.

Avoid automatic installation, GIS subscription commitments, cloud services, Actions, mixing conflicting geometry engines or copying any third-party model/data/logo. Record what was actually tested in the *target* project. Before integrating, re-check upstream revisions and licenses; a source reviewed today can change.

## Related research already tracked

- [ChanMeng666 research matrix](CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md) (includes ArchLang 2D / downstream 3D concept).
- [Curation and acceptance rules](CURATION_RULES.md) and [project handoff](PROJECT_HANDOFF.md).
- Existing original reusable UI code remains under `components/`; this source is **research-only**, not a promoted UI component.

## Provenance and evidence level

Inspected upstream source files: `README.md`, `js/config.js`, `js/progress-stats.js`, `js/progress-financial.js`, `js/progress-overlays.js`, `js/progress-drilldown.js`, `docs/ifc-schedule-workflows.md`, `datacenter/apps/web/src/components/SceneTools.tsx`, and selected alternate repository READMEs. The published progress page was **read** in an existing browser tab. Full browser interaction, cross-device rendering, performance, data freshness and every dependency licence were **NOT TESTED**. A repo's missing LICENSE does not make its code public domain.
