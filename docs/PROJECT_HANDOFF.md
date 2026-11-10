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

## Versioning

- Treat tokens as a separate compatibility contract; changing them can affect every app.
- Extract a component only when at least two projects need it, or it clearly reduces duplication.
- Do not claim a production UI is verified just because a design-gallery demo renders.
