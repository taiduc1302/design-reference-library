// Pure, dependency-free research catalog selectors. No access to DOM or network.
export const PRIORITY_ORDER = Object.freeze({HIGH: 0, MEDIUM: 1, LOW: 2, NONE: 3});

export function normalizeQuery(input) {
  return String(input ?? '').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
}

export function filterOpportunities(records, options = {}) {
  const all = Array.isArray(records) ? records : [];
  const search = normalizeQuery(options.search);
  const priority = String(options.priority || 'all');
  const target = String(options.target || 'all');
  const category = String(options.category || 'all');
  const kind = String(options.kind || 'all');
  return all.filter((item) => {
    if (!item || typeof item !== 'object') return false;
    if (priority !== 'all' && item.priority !== priority) return false;
    if (category !== 'all' && item.category !== category) return false;
    if (kind !== 'all' && item.upstream_kind !== kind) return false;
    if (target !== 'all' && (!Array.isArray(item.targets) || !item.targets.includes(target))) return false;
    const haystack = [item.id, item.applicability_note, ...(Array.isArray(item.targets) ? item.targets : [])].join(' ');
    return !search || normalizeQuery(haystack).includes(search);
  }).sort((a, b) => {
    const diff = (PRIORITY_ORDER[a.priority] ?? 9) - (PRIORITY_ORDER[b.priority] ?? 9);
    return diff || String(a.id).localeCompare(String(b.id));
  });
}

export function priorityCounts(records) {
  const counts = {HIGH: 0, MEDIUM: 0, LOW: 0, NONE: 0};
  for (const item of Array.isArray(records) ? records : []) {
    if (item && Object.hasOwn(counts, item.priority)) counts[item.priority] += 1;
  }
  return counts;
}

export function validSourceUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      url.hostname.toLowerCase() === 'github.com' &&
      /^\/ChanMeng666\/[^/?#]+\/?$/i.test(url.pathname) &&
      !url.username && !url.password && !url.search && !url.hash;
  } catch {
    return false;
  }
}
