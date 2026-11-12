# Component provenance — 2026-11-12

The v0.2 reusable HTML/CSS/JS components are **original implementations authored for this repository**. They borrow *design ideas* from the MIT-licensed upstream sources, but do not include source snippets, images, audio, DAX, fonts or third-party scripts from them. The repo's own MIT license applies to this original component code.

| Component(s) | Concept studied | Upstream file / pin | What changed |
|---|---|---|---|
| Contextual KPI Card and Sparkline | KPI cards with context and trends | `gusbavia/the-world-of-peaches` at `0692068e53acf75550c0290824f0fc0aa6090a8a`, `html-components/css/Page-1---001---KPI-Row.css` | Created new responsive, text-first CSS and accessible SVG geometry; no Power BI dependencies |
| Status Badge and Decision Callout | Explicit visual hierarchy and interpretation of KPIs | `gusbavia/city-sustainability-scorecard` at `87020be37c73b8b5e34c91407919987e55e75780`, `html-components/Page-1---Card---Livability-HTML.html` | Replaced hover-dependent explainers with visible status labels and actual button callbacks |
| Searchable Data Table | Dashboard filtering and table structure | `gusbavia/city-sustainability-scorecard` at `87020be37c73b8b5e34c91407919987e55e75780`, `html-components/Page-1---Header---Title-and-Context.html` | Added standalone immutable search/sort helpers, typed comparisons and explicit states |
| Shared design tokens | Semantic palette and theme separation | `gusbavia/pbi-theme` at `3f3d2ac7fc4761defffbc7f09a9c0c6c096d074e`, `README.md` | Used independent CSS custom properties, not Power BI theme JSON |
| Narrative and decision-first reading order | Sections present recommendations with the context needed to act | `gusbavia/assisted-report` at `93d90e32f713d51234150fd0a1725f9531967625`, `index.html` | Kept sections static and keyboard-usable; no autoplay audio, shader, CDN or scroll hijacking |

**License evidence:** all four upstream repositories contain `LICENSE` with `MIT License`, `Copyright (c) 2026 Gus Bavia` as checked in the connected GitHub repository files. The upstream commits above were retrieved from their `main` branches on 2026-11-12. Verify the license of any new upstream material at the exact revision before copying substantial code.

## Design decisions

1. Prefer readable metrics, references and follow-up actions over decoration.
2. Keep verification statuses explicit and non-approving by default.
3. Avoid hover-only disclosures seen in some report examples because touch and keyboard users also need the context.
4. Keep charts supplementary: every sparkline has a text alternative, and tables remain readable without charts.
5. Keep source forks separate from this original code so credit and update history are not confused.

## What remains out of scope

- Forks themselves have **not** been created by GitHub connector writes. See `docs/FORKS.md` and `catalog/upstreams.json`.
- External images, fonts, CSS, DAX templates, licensed media and commercial narration systems are **not** imported.
- Functional/browser QA on synthetic data is not the same as accessibility audit or production field validation.
