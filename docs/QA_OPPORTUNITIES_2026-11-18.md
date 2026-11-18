# Opportunity browser QA checkpoint — 2026-11-18

**Scope:** PR #1, issue #2, local gallery. Research-only; no third-party package or GitHub Actions installed or executed.

## Source verification

The exact original Git blob hashes from PR head `8b2e85ba377f19c57109a9d8071570d50cece483` were reproduced locally using `git hash-object` for the opportunity app, its 82-record JSON, selector, Node tests, the component module, and shared token CSS. The matrix blob is `cdab3c00ca99c1e8c492880e9c93565a73e81825`. The updated files have been committed to the PR branch; re-run acceptance on the final head before merge.

The runtime could not `git clone` the public repository: DNS resolution for github.com failed. Selected files were reconstructed from authenticated GitHub connector reads and verified by exact Git blob hashes. This is **not an entire checkout**.

## Actual executions

| Check | Actual result | Boundary |
|---|---|---|
| `npm test` | **23 / 23 PASS** on exact-blob Node/component/selector tests and catalog data | Reproduced subset, not a full repository checkout |
| `python scripts/validate_chanmeng666_research.py` | **PASS**, 82 unique records and 13 target capabilities | Source JSON and Markdown were hash-matched |
| Real Chromium isolated DOM/visual tests | **7 / 7 modes PASS**: 1440 desktop, 1024 dark, 768 forced colors, 390 reduced motion, 320 reflow, 820 tablet, 375 mobile | HTML/JS/CSS bytes were reproduced from PR, then altered only for isolated script injection and mocked JSON response |
| Isolated error states | **2 / 2 PASS**: HTTP error response and malformed catalog | Injected responses, not actual web requests |
| `python scripts/qa_opportunities.py` | **FAILED / BLOCKED**, `Page.goto: net::ERR_BLOCKED_BY_ADMINISTRATOR` | System Chromium launched; local HTTP navigation blocked by runtime policy |
| `npm run check` | **NOT RUN end-to-end** | Full checkout not available; other Python validators cannot be certified |

### Reproduced bug and fix

Before fix: after searching for a nonexistent term and clicking **Clear filters**, the input value was cleared, but result count stayed **0/82** and the empty-state row remained. Waiting did not fix it. Root cause: the previous `reset` listener queued a microtask while native form reset default handling remained pending. Fix: cancel default reset, restore each known control to its explicit default, and synchronously redraw. Same Chromium scenario now returns **82/82**, followed by working archived and capability filters.

Additional changes: 320px stacked filters, clearer horizontal-scroll table hint with `aria-describedby`, true `prefers-color-scheme: dark` palette, and a system-Chromium fallback in the optional Playwright QA runner. No new dependencies.

## Remaining release gates

- [ ] Run `npm run check` from a real, complete Git checkout at the **final PR head**.
- [ ] Run `python scripts/qa_opportunities.py` against genuine HTTP/ESM loading; check desktop, dark, forced-colors, reduced-motion, and 320px with actual screenshots.
- [ ] Manually review keyboard focus, contrast, table scroll, screen-reader announcements and all error/loading/empty states on a normal browser; repeat on Windows if required by release policy.
- [ ] Verify output and regression suite against the current final PR SHA; PR remains **Draft / HOLD**.
- [ ] Keep issue #2's geometry and document-receipt pilots separate; these are NOT_IMPLEMENTED and NOT_TESTED.

No merge; no GitHub Actions; no external source code adoption.
