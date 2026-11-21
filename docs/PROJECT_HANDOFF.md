# Using the library in real projects

## One minute design brief

- **Audience / core job:** who and what decision/action?
- **Primary screen:** what must be visible before scrolling?
- **Critical trust signal:** what is confirmed, unverified, pending or failed?
- **Constraints:** screen sizes, keyboard navigation, load speed, data density, offline needs, export/print.
- **Selected reference:** ID from `catalog/references.json` and why it beats alternatives.
- **Design tokens and chosen components:** copy only what is needed.
- **Test evidence:** functional tests, screenshots, source tracking, and remaining risk.

## Recommended starting points

| Project | Primary visual problem | Candidate pattern |
|---|---|---|
| Canada Tender Finder | Find relevant opportunities and next bid actions fast | Dashboard priority queue + filters + evidence state |
| AI Model Advisor | Compare price, latency, accuracy and reliability on equal footing | Normalized KPI cards + decision matrix + confidence labels |
| Statement Calendar | Show due, expected, uploaded and processed document states | Compact status table + calendar timeline |
| Civil Takeoff QA | Surface scale checks, quantity mismatches and review hold points | Verification queue + evidence/detail side panel |
| Client proposals / presentations | Tell one evidence-backed story with clear next action | Technical briefing slides / guided narrative |

## Suggested agent instruction

> Use `taiduc1302/design-reference-library` for design references. Read its AGENTS.md, catalog, licensing rules and corresponding pattern. Do not transplant the full upstream repo. Explain the visual hierarchy and implement a minimal slice, then test it on narrow and desktop screens. Use only synthetic data in public examples, and log license/provenance for copied code.

## Existing reusable components (v0.2)

- [Component API and demo](../components/README.md) — original, dependency-free UI code for KPI, status, sparkline, decision callout and table.
- [Provenance](COMPONENT_PROVENANCE.md) — precise source commits and concept notes.
- [Component manifest](../catalog/components.json) — states and test scope.
- [Component QA](QA_COMPONENTS_2026-11-12.md) — tested logic and remaining browser limitations.

## Versioning

- Treat tokens as a separate compatibility contract; changing them can affect every app.
- Extract a component only when at least two projects need it, or it clearly reduces duplication.
- Do not claim a production UI is verified just because a design-gallery demo renders.

## Cross-project research to consult before planning new features

- [dchantlos technical audit (14 repositories)](DCHANTLOS_FULL_SOURCE_AUDIT_2026-11-20.md) with the [12-pattern opportunity matrix](../catalog/dchantlos-opportunity-matrix.json). Reusable candidates include linked 2D/3D object identity, earthworks and GIS display, planned vs actual 4D, fail-closed unknown states, scorecard ranking, IFC/BCF data and reusable accessibility QA. **Research only:** do not copy unlicensed code, install vendor/agent skills or replace verified quantity calculations. Select a DCH-xx ID and follow the consuming repository's own AGENTS.md and roadmap.
