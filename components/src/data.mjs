/**
 * Deterministic, dependency-free data helpers for the Design Reference Library.
 * No DOM operations or third-party dependencies. Safe for Node.js and browsers.
 */

const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

export function normalizeSearchTerm(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .trim();
}

/** Keep the input array and its rows unchanged. */
export function filterRows(rows, query, searchKeys) {
  if (!Array.isArray(rows)) return [];
  const term = normalizeSearchTerm(query);
  if (!term) return [...rows];
  return rows.filter(row => {
    const keys = Array.isArray(searchKeys) && searchKeys.length ? searchKeys : Object.keys(row || {});
    return keys.some(key => normalizeSearchTerm(row?.[key]).includes(term));
  });
}

function isMissing(value) {
  return value === null || value === undefined || value === '' ||
    (typeof value === 'number' && !Number.isFinite(value));
}

/** Stable sort: null, undefined, blank and invalid typed values always come last. */
export function sortRows(rows, key, direction = 'asc', type = 'text') {
  if (!Array.isArray(rows)) return [];
  if (!key || (direction !== 'asc' && direction !== 'desc')) return [...rows];
  const sign = direction === 'asc' ? 1 : -1;
  const toComparable = value => {
    if (isMissing(value)) return null;
    if (type === 'number') {
      const number = typeof value === 'number' ? value : Number(String(value).replace(/,/g, ''));
      return Number.isFinite(number) ? number : null;
    }
    if (type === 'date') {
      const timestamp = Date.parse(String(value));
      return Number.isFinite(timestamp) ? timestamp : null;
    }
    return String(value);
  };
  return rows.map((row, index) => ({ row, index })).sort((a, b) => {
    const av = toComparable(a.row?.[key]);
    const bv = toComparable(b.row?.[key]);
    if (av === null && bv !== null) return 1;
    if (bv === null && av !== null) return -1;
    if (av === null && bv === null) return a.index - b.index;
    const comparison = type === 'text' ? collator.compare(av, bv) : (av > bv ? 1 : av < bv ? -1 : 0);
    return comparison * sign || a.index - b.index;
  }).map(item => item.row);
}

/** SVG coordinates for numeric trend values; no pixel rounding/DOM dependency. */
export function sparklinePoints(values, width = 150, height = 48, padding = 4) {
  if (!Array.isArray(values) || values.length < 2 || !Number.isFinite(width) || !Number.isFinite(height) ||
      width <= 2 * padding || height <= 2 * padding) return '';
  const data = values.map(Number);
  if (data.some(value => !Number.isFinite(value))) return '';
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  return data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = range === 0 ? height / 2 : height - padding - ((value - min) / range) * (height - 2 * padding);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

export const STATUS_LABELS = Object.freeze({
  verified: 'Verified',
  review: 'Needs review',
  blocked: 'Blocked',
  pending: 'Pending',
  draft: 'Draft'
});

export function normalizedStatus(value) {
  return Object.hasOwn(STATUS_LABELS, value) ? value : 'draft';
}
