/**
 * Original, framework-neutral UI components. Inspired by decision-first reporting
 * patterns researched from MIT-licensed examples by Gus Bavia, but not copies.
 * Provenance: components/README.md and docs/COMPONENT_PROVENANCE.md.
 */
import {filterRows, sortRows, sparklinePoints, STATUS_LABELS, normalizedStatus} from './data.mjs';

let instanceId = 0;
const svgNS = 'http://www.w3.org/2000/svg';

function element(tag, className = '', content = undefined) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = String(content);
  return node;
}

function appendIfPresent(parent, tag, className, value) {
  if (value !== null && value !== undefined && value !== '') {
    const node = element(tag, className, value);
    parent.append(node);
    return node;
  }
  return null;
}

/** Visible text accompanies every status; color is never its only meaning. */
export function createStatusBadge(status, customLabel) {
  const value = normalizedStatus(status);
  const badge = element('span', `dr-status dr-status--${value}`);
  badge.append(element('span', 'dr-status__dot'));
  badge.lastChild.setAttribute('aria-hidden', 'true');
  badge.append(document.createTextNode(String(customLabel ?? STATUS_LABELS[value])));
  return badge;
}

/** Works with synthetic or real numeric series; missing points yield a textual fallback. */
export function createSparkline(values, label) {
  const points = sparklinePoints(values);
  if (!points) return element('span', 'dr-sparkline-fallback', 'Trend unavailable');
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'dr-sparkline');
  svg.setAttribute('viewBox', '0 0 150 48');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', String(label || 'Numeric trend'));
  const line = document.createElementNS(svgNS, 'polyline');
  line.setAttribute('points', points);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', 'currentColor');
  line.setAttribute('stroke-width', '2.8');
  line.setAttribute('stroke-linejoin', 'round');
  line.setAttribute('stroke-linecap', 'round');
  svg.append(line);
  return svg;
}

/** A metric must have a label and a value; benchmark and context are optional. */
export function createKpiCard({label, value, context, deltaText, deltaMeaning = 'neutral', benchmark, trend, trendLabel} = {}) {
  const card = element('article', 'dr-kpi');
  appendIfPresent(card, 'h3', 'dr-kpi__label', label ?? 'Metric');
  appendIfPresent(card, 'div', 'dr-kpi__value', value ?? '—');
  if (context) appendIfPresent(card, 'p', 'dr-kpi__context', context);
  const footer = element('div', 'dr-kpi__footer');
  if (deltaText) {
    const meanings = ['positive', 'negative', 'neutral'];
    const meaning = meanings.includes(deltaMeaning) ? deltaMeaning : 'neutral';
    footer.append(element('span', `dr-kpi__delta dr-kpi__delta--${meaning}`, deltaText));
  }
  if (benchmark) footer.append(element('span', 'dr-kpi__benchmark', benchmark));
  if (trend) footer.append(createSparkline(trend, trendLabel));
  if (footer.childNodes.length) card.append(footer);
  return card;
}

/** Buttons are omitted unless a real callback is provided. */
export function createDecisionCallout({eyebrow = 'Decision needed', title, description, tone = 'warning', primaryAction, secondaryAction} = {}) {
  const allowed = ['info', 'warning', 'critical', 'success'];
  const chosenTone = allowed.includes(tone) ? tone : 'info';
  const card = element('section', `dr-decision dr-decision--${chosenTone}`);
  appendIfPresent(card, 'p', 'dr-decision__eyebrow', eyebrow);
  appendIfPresent(card, 'h3', 'dr-decision__title', title ?? 'Review required');
  appendIfPresent(card, 'p', 'dr-decision__description', description);
  const actions = element('div', 'dr-decision__actions');
  for (const [action, variant] of [[primaryAction, 'primary'], [secondaryAction, 'secondary']]) {
    if (action && typeof action.onClick === 'function' && action.label) {
      const button = element('button', `dr-button dr-button--${variant}`, action.label);
      button.type = 'button';
      button.addEventListener('click', action.onClick);
      actions.append(button);
    }
  }
  if (actions.childNodes.length) card.append(actions);
  return card;
}

/** Table with search, stable typed sorting, loading/error/empty states, safe text nodes. */
export function createDataTable({caption = 'Records', columns = [], rows = [], searchPlaceholder = 'Search records', emptyMessage = 'No matching records.'} = {}) {
  if (!Array.isArray(columns) || !columns.length || columns.some(col => !col || !col.key || !col.label)) {
    throw new TypeError('columns must be an array of {key, label, ...}');
  }
  instanceId++;
  const id = `dr-search-${instanceId}`;
  const root = element('section', 'dr-table-panel');
  const toolbar = element('div', 'dr-table__toolbar');
  const label = element('label', 'dr-table__search-label', 'Search');
  label.htmlFor = id;
  const search = element('input', 'dr-table__search');
  search.id = id;
  search.type = 'search';
  search.placeholder = searchPlaceholder;
  const feedback = element('output', 'dr-table__feedback');
  feedback.setAttribute('aria-live', 'polite');
  toolbar.append(label, search, feedback);
  root.append(toolbar);
  root.append(element('p', 'dr-table__scroll-hint', 'Swipe or scroll the table horizontally to see all columns.'));

  const scroll = element('div', 'dr-table__scroll');
  scroll.tabIndex = 0;
  scroll.setAttribute('role', 'region');
  scroll.setAttribute('aria-label', `${caption} table, scroll horizontally for more columns`);
  const table = element('table', 'dr-table');
  table.append(element('caption', 'dr-table__caption', caption));
  const thead = element('thead');
  const trHead = element('tr');
  const headers = new Map();
  let activeSort = null;
  let direction = 'asc';
  let currentRows = Array.isArray(rows) ? [...rows] : [];
  let loading = false;
  let error = '';
  for (const col of columns) {
    const th = element('th');
    th.scope = 'col';
    if (col.sortable) {
      th.setAttribute('aria-sort', 'none');
      const control = element('button', 'dr-table__sort', col.label);
      control.type = 'button';
      control.setAttribute('aria-label', `Sort by ${col.label}`);
      control.addEventListener('click', () => {
        direction = activeSort === col.key && direction === 'asc' ? 'desc' : 'asc';
        activeSort = col.key;
        render();
      });
      th.append(control);
      headers.set(col.key, th);
    } else {
      th.textContent = col.label;
    }
    trHead.append(th);
  }
  thead.append(trHead);
  table.append(thead);
  const tbody = element('tbody');
  table.append(tbody);
  scroll.append(table);
  root.append(scroll);

  function render() {
    for (const [key, th] of headers.entries()) {
      const selected = activeSort === key;
      th.setAttribute('aria-sort', selected ? (direction === 'asc' ? 'ascending' : 'descending') : 'none');
      th.querySelector('button').textContent = columns.find(col => col.key === key).label + (selected ? (direction === 'asc' ? ' ↑' : ' ↓') : '');
    }
    tbody.replaceChildren();
    if (loading || error) {
      const row = element('tr');
      const cell = element('td', 'dr-table__empty', error || 'Loading records…');
      cell.colSpan = Math.max(columns.length, 1);
      row.append(cell);
      tbody.append(row);
      feedback.textContent = error ? 'Unable to load records' : 'Loading';
      return;
    }
    const keys = columns.filter(col => col.searchable !== false).map(col => col.key);
    let visible = filterRows(currentRows, search.value, keys);
    if (activeSort) {
      const col = columns.find(entry => entry.key === activeSort);
      visible = sortRows(visible, activeSort, direction, col?.type || 'text');
    }
    for (const item of visible) {
      const row = element('tr');
      for (const col of columns) {
        const cell = element('td');
        if (col.align === 'right') cell.classList.add('dr-table__numeric');
        const value = item?.[col.key];
        if (col.type === 'status') cell.append(createStatusBadge(value));
        else cell.textContent = value === undefined || value === null ? '—' : String(value);
        row.append(cell);
      }
      tbody.append(row);
    }
    if (!visible.length) {
      const row = element('tr');
      const cell = element('td', 'dr-table__empty', emptyMessage);
      cell.colSpan = Math.max(columns.length, 1);
      row.append(cell);
      tbody.append(row);
    }
    feedback.textContent = `${visible.length} of ${currentRows.length} records`;
  }
  search.addEventListener('input', render);
  render();
  return {
    element: root,
    setRows(nextRows) { currentRows = Array.isArray(nextRows) ? [...nextRows] : []; loading = false; error = ''; render(); },
    setLoading(value = true) { loading = Boolean(value); if (loading) error = ''; render(); },
    setError(message = 'Unable to load records') { error = String(message); loading = false; render(); },
    clearError() { error = ''; render(); },
    getVisibleCount() { return tbody.querySelectorAll('tr').length - (tbody.querySelector('.dr-table__empty') ? 1 : 0); }
  };
}
