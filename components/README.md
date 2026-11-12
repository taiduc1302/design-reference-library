# Reusable UI components (v0.2)

Five small **original implementations**, informed by patterns studied in the four MIT-licensed Gus Bavia repositories. These are **not** copies of Power BI DAX or existing web code. See [provenance](../docs/COMPONENT_PROVENANCE.md) and [third-party notices](../THIRD_PARTY_NOTICES.md).

## Preview

From the repository root:

```sh
python -m http.server 8765
```

Open `http://localhost:8765/components/demo/` (Chrome, Edge, Firefox or Safari with modern ES module support). No build, NPM install, login or external service required. All numbers, dates, and opportunities in the demo are fictional.

## Component APIs

| Export | Inputs | Returns | Notes |
|---|---|---|---|
| `createStatusBadge(status, label?)` | `verified`, `review`, `blocked`, `pending`, `draft` | `HTMLSpanElement` | Unknown state falls back to `draft` |
| `createSparkline(values, label)` | numeric array + accessible label | `SVGElement` or fallback span | Invalid series displays “Trend unavailable” |
| `createKpiCard({...})` | `label`, `value`, `context`, `benchmark`, `deltaText`, `deltaMeaning`, `trend`, `trendLabel` | `HTMLElement` | `deltaMeaning` is semantic (`positive`, `negative`, `neutral`), not arrow direction |
| `createDecisionCallout({...})` | `eyebrow`, `title`, `description`, `tone`, optional actions `{label,onClick}` | `HTMLElement` | Buttons only rendered for real callbacks; never approves anything automatically |
| `createDataTable({...})` | `caption`, `columns`, `rows`, `searchPlaceholder`, `emptyMessage` | `{element,setRows,setLoading,setError,clearError,getVisibleCount}` | Search, stable sort (text/number/date), explicit empty/loading/error states |

`createDataTable` columns have `{key,label,sortable?,searchable?,type?,align?}`. Types: `text` (default), `number`, `date`, `status`. Default sorting direction is ascending, then descending. `status` cells use the allowlisted badge.

## Using in a webpage

```html
<link rel="stylesheet" href="/tokens/design-tokens.css">
<link rel="stylesheet" href="/components/components.css">
<div id="dashboard"></div>
<script type="module">
  import { createKpiCard, createDataTable } from '/components/src/components.mjs';
  const root = document.querySelector('#dashboard');
  root.append(createKpiCard({label: 'Verified records', value: '92%', benchmark: 'Target ≥95%'}));
  const table = createDataTable({
    caption: 'Example records',
    columns: [{key: 'name', label: 'Record', sortable: true}],
    rows: [{name: 'Example A'}]
  });
  root.append(table.element);
</script>
```

Paths above are **root-relative examples**. Adjust imports when copying into a subdirectory, bundler, or application. In a React/Vue project, port the simple logic rather than mixing this DOM renderer into a virtual DOM component tree. CSS selectors use `dr-` prefix to avoid collisions; tokens can be overridden per product.

## Contract, security, and accessibility

- User-supplied text is inserted using **`textContent`**, never parsed as HTML. Dynamic content is not treated as trusted markup.
- No external scripts, remote fonts, cookies, telemetry, local storage, API requests or secrets.
- Color is never the only status signal; table uses semantic headers and `aria-sort`, filter has a visible label, live result feedback is announced.
- Table horizontal scrolling is intentional at narrow widths; the document itself must not overflow.
- Loading and errors are explicit and never silently represented as successful verification.
- Data helpers are immutable, with stable typed sorting; the browser demo is not a security boundary for production datasets.
- Caller owns data fetching, authorization, dates/time zones, business rules, and approval permissions. These primitives **do not perform bid submission or approval**.

## Checks

```sh
npm test
python scripts/validate_catalog.py
python scripts/validate_components.py
python scripts/qa_components.py  # optional: Chromium + Python Playwright available locally
```

The Node suite is dependency-free; NPM only runs Node and does not install anything. Browser QA requires an installed Chromium and Python Playwright; it is separate from the mandatory tests. No GitHub Actions are required.

## Promotion rule

Passing smoke tests supports **technical reuse**, not production readiness. `catalog/components.json` keeps status `PROTOTYPED` until a reviewed integration meets a real project's acceptance criteria. See [curation rules](../docs/CURATION_RULES.md).
