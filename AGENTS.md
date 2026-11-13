# AGENTS.md - Design Reference Library

**Mission:** help agents and developers reuse demonstrably good design patterns while preserving provenance, licensing, accessibility, and usability.

## First read

1. `README.md`
2. `catalog/references.json`, `catalog/components.json`, `catalog/upstreams.json`
3. `components/README.md` and `docs/COMPONENT_PROVENANCE.md`
4. `docs/CURATION_RULES.md` and `THIRD_PARTY_NOTICES.md`
5. `docs/PROJECT_HANDOFF.md`

## Operating contract

- Start with the user's audience, tasks, success criteria, available data, and required output medium.
- Recommend patterns based on **task fit**, not how flashy the upstream demo looks.
- For prototypes, use fictional data and no live credentials or business-sensitive content.
- Never claim that a fork, URL, screenshot, workflow, or component was tested unless there is direct evidence.
- Inspect the exact upstream license and dependencies before copying anything. Record source repository, file path, upstream commit SHA, license, copyright, changes made, and implementation test evidence.
- When adapting source, retain required notices and link back to the original author; do not imply endorsement.
- Keep a useful separation between the original source fork, curated patterns, and project-specific code.
- Design mobile-first: focus order, contrast, reduced motion, keyboard interactions, visible focus, empty/error/loading states, legible charts.
- Avoid copying private customer data, real tender documents, family information, API keys, or project secrets into this public repository.
- Do not quietly add build systems, cloud services, network dependencies, automated GitHub Actions, or paid products.
- Prefer small reviewed components rather than wholesale imports from Power BI or specialized frameworks. Start with `components/src/components.mjs` and `components/components.css` for web apps; port rather than mixing direct DOM manipulation into React/Vue managed trees.
- A Node suite confirms logic but is not a substitute for browser QA. VISUALLY_CHECKED means isolated Chromium visual/interaction checks have evidence; ADOPTED requires project-specific tests and real delivery QA.
- For code modifications, locally run the available validator and test on narrow and desktop screens. Document limitations.

## Definition of Done for a promoted reusable pattern

- Meaningful source record with permission/license and attribution.
- Named use case, clear input contract, documented output, and an interactive or static local demo.
- Tests for typical content and problematic states (long labels, empty/loading/error, keyboard, narrow width).
- No unnecessary dependencies and no secrets.
- Screenshot or visual review notes when verified by a human/tool.
- Docs explain how to adapt the component and how **not** to use it.

## Useful prompt to follow

> Build a UI for [project] using `design-reference-library` as a design evidence source. Read `AGENTS.md`, choose the most suitable pattern from the catalog, establish semantic tokens, and implement the smallest useful set of components. Preserve licensing and source provenance. Show mobile and desktop states and identify what remains unverified.
