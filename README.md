# Design Reference Library

A curated, implementation-ready reference library for websites, web applications, dashboards, presentation systems, and future design work. This is a **living design knowledge base**, not a dumping ground of random screenshots and third-party code.

**Maintainer:** [taiduc1302](https://github.com/taiduc1302)  
**Stage:** v0.2.1; five visually checked original components plus three original demos; upstream reference projects catalogued, not vendored.  
**Privacy:** only synthetic, public, or explicitly approved content.

## What belongs here

- **Source references**: original upstream repositories, author attribution, license, useful components, and intended use.
- **Curated patterns**: clean-room implementations or properly attributed adaptations, with reproducible previews and acceptance checks.
- **Design foundations**: shared semantic color tokens, spacing, typography, accessibility guidance, and responsive conventions.
- **Presentation patterns**: reusable layouts for business proposals, technical briefings, and product demos.
- **Agent operating rules**: one entry point that future assistants and developers can apply when designing an interface.

## Preview the original demos and reusable components

From the repository root:

```bash
python -m http.server 8765
```

Open `http://localhost:8765/gallery/` to explore the dashboard, website, presentation and new [component kit](components/demo/). All data is fictional; there are **no API keys or third-party runtime dependencies**. The component kit is framework-neutral HTML/CSS/JS. See [`components/README.md`](components/README.md) for documented exports and usage.

## Start with an appropriate reference

| Need | Reference | Stage |
|---|---|---|
| KPI cards, filters, dashboard hierarchy | [The World of Peaches](https://github.com/gusbavia/the-world-of-peaches) | Source reviewed |
| Rich HTML visual panels, design token use | [City Sustainability Scorecard](https://github.com/gusbavia/city-sustainability-scorecard) | Source reviewed |
| Guided scrollytelling and executive briefings | [Assisted Report](https://github.com/gusbavia/assisted-report) | Source reviewed |
| Semantic palettes and Power BI themes | [PBI Theme](https://github.com/gusbavia/pbi-theme) | Source reviewed |
| Modern dashboard shell with states | [`patterns/dashboard/`](patterns/dashboard/) | Original starter demo |
| Professional product landing page | [`patterns/website/`](patterns/website/) | Original starter demo |
| Keyboard-controlled HTML presentation | [`patterns/presentations/`](patterns/presentations/) | Original starter demo |
| KPI, status, callout, table, sparkline primitives | [`components/`](components/) | Isolated Chromium checked; production/browser/CSP QA pending |

Structured metadata: [`catalog/references.json`](catalog/references.json), [`catalog/components.json`](catalog/components.json), and pinned upstream commits in [`catalog/upstreams.json`](catalog/upstreams.json).

## External opportunity research (not integrated)


- **[dchantlos complete source audit — all 14 repositories](docs/DCHANTLOS_FULL_SOURCE_AUDIT_2026-11-20.md)** and [cross-project, machine-readable opportunity matrix](catalog/dchantlos-opportunity-matrix.json): 12 research-only patterns (DCH-01–DCH-12), pinned upstream commits, reliability/licensing cautions, and explicit unrun QA gates. Extends the initial construction 4D/5D note. Not adopted or installed.
- [dchantlos construction digital twin / ArcGIS 4D–5D research (2026-11-20)](docs/DCHANTLOS_CONSTRUCTION_VISUALIZATION_RESEARCH_2026-11-20.md) — source-pinned research on model-linked plan/sections/3D, timelapse, cost/QA overlays, reality capture and reuse/licensing risks. Research-only, not integrated.


- [ChanMeng666 complete research matrix — 82 public repositories](docs/CHANMENG666_OPPORTUNITY_RESEARCH_2026-11-16.md) with application opportunities, limits and priority labels.
- [Machine-readable opportunity inventory](catalog/chanmeng666-opportunity-matrix.json) covering generic target capabilities (no private repository names).
- Offline integrity check: `python scripts/validate_chanmeng666_research.py`.

These are **research leads**, not checked reusable components. No code, media, extensions, agent skills, or third-party dependencies have been copied, installed, integrated or security-audited. For tested design patterns, continue using `catalog/references.json` and the curation process below.

Browse research-only candidates locally: run `python -m http.server 8765` from the repository root and open [`gallery/opportunities.html`](gallery/opportunities.html). This is a searchable index of **unverified research leads**, not vetted components. [Pilot acceptance specifications](docs/CHANMENG666_PILOT_ACCEPTANCE_2026-11-17.md) document the next three experiments.

Run offline research checks with `npm test` and `python scripts/validate_chanmeng666_research.py`. Optional five-mode real-browser QA: `python scripts/qa_opportunities.py` after installing Playwright + Chromium locally. Do not claim browser QA passed if the browser cannot launch or local HTTP is blocked.

**QA status (PR #1, merged 2026-11-18):** Focused Node tests (23/23), catalog validation, and isolated Chromium checks passed. **Full `npm run check` from a complete checkout, real HTTP/ESM browser testing, and final manual accessibility review were NOT performed.** They are not required to keep the research catalog published, and are not being tracked as an active issue. If the gallery is later used as production UI, run these checks first. Evidence and limitations: [opportunity browser QA report](docs/QA_OPPORTUNITIES_2026-11-18.md).

## How to use this library for a new project

1. Read [`AGENTS.md`](AGENTS.md) and [`docs/PROJECT_HANDOFF.md`](docs/PROJECT_HANDOFF.md).
2. Pick **one** primary reference and, optionally, one secondary pattern. Do not mash together whole themes from unrelated projects.
3. Trace the source, license, UI pattern, and intent in `catalog/references.json`.
4. Build a small design slice (tokens + 2-3 components) against fictional data, then test keyboard access, responsiveness, and loading/empty/error states.
5. Promote a component to the reusable library only after code review and visual verification; preserve upstream notices for any copied code.

## GitHub forks and updates

The central repo is live at [`taiduc1302/design-reference-library`](https://github.com/taiduc1302/design-reference-library). **The four Gus Bavia forks are not yet created** because the connected GitHub actions do not support fork creation. Their parents, last observed commit SHAs and intended fork destinations are pinned in [`catalog/upstreams.json`](catalog/upstreams.json).

On your Windows machine, after `gh auth login`:

```powershell
.\scripts\fork-gusbavia.ps1          # read-only check
.\scripts\fork-gusbavia.ps1 -Apply   # creates and verifies missing forks
```

See [`docs/FORKS.md`](docs/FORKS.md) for the four one-click Fork links or manual commands; never describe a simple code copy as a fork.

## Important boundaries

- A **fork** preserves history and provenance; keep upstream forks mostly intact and update them intentionally.
- This central library is the **selection and reuse layer**, not an attempt to rebrand third-party projects.
- Public source availability does not always mean every asset has a reusable license; check fonts, photos, datasets, audio, third-party packages and brand marks independently.
- Some examples are specific to Power BI and DAX. Their visual ideas may be relevant to web apps, but Power BI implementation code is **not drop-in React code**.
- No automatic GitHub Actions required. Validation scripts and manual checks are enough for this starter.

## Next milestones

1. Create and verify the four real upstream forks (blocked on GitHub Fork permission/UI or CLI).
2. Complete packaged HTTP/CSP and cross-browser QA; isolated Chromium screenshot and interaction QA now passed five widths. See [`docs/QA_COMPONENTS_2026-11-12.md`](docs/QA_COMPONENTS_2026-11-12.md).
3. Review the [Tender Finder PR #110](https://github.com/taiduc1302/canada-tender-finder/pull/110) and [AI Model Advisor PR #23](https://github.com/taiduc1302/ai-model-advisor/pull/23) UX pilots, then use the patterns in other projects only after their individual safety/visual acceptance gates.
4. Add more website, presentation and report components only after evaluating reuse demand and license provenance.
5. Add screenshot visual regressions and accessibility audits as an opt-in local workflow, without GitHub Actions.

## License

Original scaffold and example code: MIT, see [`LICENSE`](LICENSE). Third-party source references remain under their own licenses: see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
