# Design Reference Library

A curated, implementation-ready reference library for websites, web applications, dashboards, presentation systems, and future design work. This is a **living design knowledge base**, not a dumping ground of random screenshots and third-party code.

**Maintainer:** [taiduc1302](https://github.com/taiduc1302)  
**Stage:** v0.1 published; original examples included; upstream reference projects catalogued, not vendored.  
**Privacy:** only synthetic, public, or explicitly approved content.

## What belongs here

- **Source references**: original upstream repositories, author attribution, license, useful components, and intended use.
- **Curated patterns**: clean-room implementations or properly attributed adaptations, with reproducible previews and acceptance checks.
- **Design foundations**: shared semantic color tokens, spacing, typography, accessibility guidance, and responsive conventions.
- **Presentation patterns**: reusable layouts for business proposals, technical briefings, and product demos.
- **Agent operating rules**: one entry point that future assistants and developers can apply when designing an interface.

## Preview the original starter examples

From the repository root:

```bash
python -m http.server 8765
```

Open `http://localhost:8765/gallery/` and explore the dashboard, website, and presentation demos. The examples require **no npm install, no APIs, no credentials**. All content is fictional.

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

Structured metadata: [`catalog/references.json`](catalog/references.json).

## How to use this library for a new project

1. Read [`AGENTS.md`](AGENTS.md) and [`docs/PROJECT_HANDOFF.md`](docs/PROJECT_HANDOFF.md).
2. Pick **one** primary reference and, optionally, one secondary pattern. Do not mash together whole themes from unrelated projects.
3. Trace the source, license, UI pattern, and intent in `catalog/references.json`.
4. Build a small design slice (tokens + 2-3 components) against fictional data, then test keyboard access, responsiveness, and loading/empty/error states.
5. Promote a component to the reusable library only after code review and visual verification; preserve upstream notices for any copied code.

## GitHub setup

The central repository is now published at [taiduc1302/design-reference-library](https://github.com/taiduc1302/design-reference-library). The upstream source projects remain linked rather than vendored; creating any optional GitHub forks is a separate task. The included Windows PowerShell script can create missing forks through GitHub CLI after authentication:

```powershell
.\scripts\bootstrap-github.ps1
.\scripts\bootstrap-github.ps1 -Mode apply -ForkSources
```

The first command only previews the planned operations. See [`docs/FORKS.md`](docs/FORKS.md) for safeguards and manual commands.

## Important boundaries

- A **fork** preserves history and provenance; keep upstream forks mostly intact and update them intentionally.
- This central library is the **selection and reuse layer**, not an attempt to rebrand third-party projects.
- Public source availability does not always mean every asset has a reusable license; check fonts, photos, datasets, audio, third-party packages and brand marks independently.
- Some examples are specific to Power BI and DAX. Their visual ideas may be relevant to web apps, but Power BI implementation code is **not drop-in React code**.
- No automatic GitHub Actions required. Validation scripts and manual checks are enough for this starter.

## Next milestones

1. Create optional source forks; verify each fork points to the original parent.
2. Capture screenshots and usability notes for each curated source after an independent visual review.
3. Establish an approved component library in the actual frontend stack (e.g. React, Vue, or plain HTML), selected when a production project needs it.
4. Add one real project integration at a time: Tender Finder, AI Model Advisor, Statement Calendar, then Civil Takeoff QA.
5. Introduce regression checks for tokens, contrast, responsiveness, visual diffs, and source provenance.

## License

Original scaffold and example code: MIT, see [`LICENSE`](LICENSE). Third-party source references remain under their own licenses: see [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
