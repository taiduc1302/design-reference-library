# Component validation evidence · 2026-11-12

## Scope

- Five new dependency-free components: StatusBadge, Sparkline, KpiCard, DecisionCallout, DataTable.
- All data and actions are fictional. No customer, banking, family, tender document, proprietary or credential data is included.
- Source pointers/license checked through connected GitHub tool, with commit pins in `catalog/upstreams.json`.

## Automated checks

| Check | Result | Evidence/limitations |
|---|---|---|
| Node `data.test.mjs` — filtering, stable sort, dates/numbers, missing data, SVG point math, status allowlist | PASS, 11 tests | Tests pure logic without the browser |
| Node `components.test.mjs` — DOM construction, safe text nodes, callbacks, state transitions, sort/filter | PASS, 6 tests | Uses small fake DOM; not real keyboard/browser verification |
| `python scripts/validate_catalog.py` | PASS | Local references and required metadata |
| `python scripts/validate_components.py` | PASS | Component export map, pinned sources, no `innerHTML` or remote scripts |
| Browser walkthrough, 1440/390/320 px | **BLOCKED** | Headless Chromium returns `ERR_BLOCKED_BY_ADMINISTRATOR` for both `http://127.0.0.1` and `file://` in the current execution environment. Not a component exception. The Playwright test script is included for local re-run. |

## Evidence and cautions

- Original components are text-first and use semantic labels, `aria-sort`, `aria-live`, safe `textContent` assignments, and real click handlers.
- External CSS is not downloaded. `Inter` is a non-required system fallback font name; runtime does not load it.
- **No human visual sign-off yet:** contrast, narrow viewport layout, focus ring and scrolling must be tested in a normal desktop browser before production reuse.
- `PROTOTYPED` is the correct status, not `VISUALLY_CHECKED` or `ADOPTED`.

## Local browser steps for reviewer

1. From repo root: `python -m http.server 8765` and open `/components/demo/`.
2. At widths **1440, 390 and 320 px**, verify no unintended document-level horizontal overflow; the table itself may scroll horizontally.
3. Keyboard Tab through links, action buttons, search, sortable headers and horizontal scroll region; verify focus is visible.
4. Search `utility`, then `absent-query`; sort Readiness ascending/descending, and test Sample / Loading / Empty / Error buttons.
5. Confirm no action approves or submits a tender. Review text contrast and screen-reader labels manually.
6. Optionally run `python scripts/qa_components.py` on a local machine with Chromium/Playwright installed, then save reviewed screenshots with test notes.

Only after passing those checks should a reviewer upgrade component metadata from `PROTOTYPED` to `VISUALLY_CHECKED`.
