# Component validation evidence — 2026-11-12 (revised)

## What was actually verified

Five original, dependency-free components: status badge, sparkline, contextual KPI, review decision callout, searchable table. The example dataset is synthetic. No real tender document, customer data, provider API key, credentials, or real personal records were processed.

| Check | Result | Scope |
|---|---|---|
| Node `components/tests/data.test.mjs` and `components/tests/components.test.mjs` | **17/17 PASS** | Data helpers, typed sort, safe DOM rendering, state changes and callback behavior |
| `python scripts/validate_catalog.py` | **PASS** | Eight catalog entries and provenance metadata |
| `python scripts/validate_components.py` | **PASS** | Five components, pinned four upstreams and XSS guardrails |
| Chromium isolated-source rendering | **PASS: five widths** | 1440, 1024, 768, 390, 320 px; no document overflow or JS exceptions |
| Interactive browser checks | **PASS** | Search, ascending/descending numeric sort, empty/loading/error recovery, action handlers, injection as literal text, keyboard focus |
| Accessibility smoke | **PASS for tested checks** | Semantic status labels, keyboard navigation, visible focus, forced-color border, WCAG AA contrast spot-checks (six UI text/control selections) |
| Human visual inspection of screenshots | **COMPLETE for desktop and 320/390px views** | Hierarchy, content density, absence of clipping, mobile table usability |
| Browser navigation to HTTP/file URL | **BLOCKED by environment policy** | `ERR_BLOCKED_BY_ADMINISTRATOR`; no successful HTTP delivery/CSP verification in this environment |
| Full cross-browser/OS and assistive-technology review | **NOT DONE** | Required before production sign-off |

## Method

The browser can launch and render, but administrator policy blocks navigation even to localhost and local files. For the visual pass, the exact library source styles and JS modules were assembled into an in-memory HTML document and loaded with `page.set_content` in Chromium. This exercises actual browser layout and event handling, not a mocked DOM. It does **not** prove HTTP server/CSP/browser-import behavior.

Screenshots produced from the review: `components-1440.png`, `components-1024.png`, `components-768.png`, `components-390.png`, `components-320.png`. These remain local QA artifacts (`.qa-output` is gitignored) and are not presented as committed GitHub screenshots.

The first mobile review found an absent visual cue for horizontal table scrolling. We added `.dr-table__scroll-hint` below 640px and increased button/input minimum heights to 44px. Follow-up Chromium testing passed.

## Adoption state

The five catalog components may be labeled **VISUALLY_CHECKED** for the isolated Chromium review. They are **not ADOPTED** or production-certified. Two independent draft integration PRs demonstrate adapting the semantic patterns to product-specific UI:

- [Canada Tender Finder PR #110](https://github.com/taiduc1302/canada-tender-finder/pull/110): blocker decision gate, review-only; respects the existing Bid Board design system.
- [AI Model Advisor PR #23](https://github.com/taiduc1302/ai-model-advisor/pull/23): decision-path comparison, local-only and heuristic, no provider calls.

No integration is merged by this library update. Their existing offline regression suites, packaged browser tests and Windows QA gates must pass before approval.

## Reproduce without GitHub Actions

```sh
npm test
python scripts/validate_catalog.py
python scripts/validate_components.py
python scripts/qa_components.py
```

Browser QA requires Python Playwright and Chromium. On an ordinary developer machine, the script uses the local HTTP server. When localhost is blocked specifically by policy it falls back to isolated-source rendering; **that fallback is weaker evidence**. Test a real local HTTP/packaged build before production use.
