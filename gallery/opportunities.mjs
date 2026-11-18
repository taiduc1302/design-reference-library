import {filterOpportunities, priorityCounts, validSourceUrl} from './opportunities-model.mjs';

const catalogUrl = '../catalog/chanmeng666-opportunity-matrix.json';
const els = Object.fromEntries(['filters','search','priority','target','kind','category','rows','total-count','result-status'].map((id) => [id, document.getElementById(id)]));
let records = [];
let targetLabels = new Map();

function plain(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = String(text ?? '');
  if (className) element.className = className;
  return element;
}

function draw() {
  const visible = filterOpportunities(records, {
    search: els.search.value,
    priority: els.priority.value,
    target: els.target.value,
    kind: els.kind.value,
    category: els.category.value
  });
  const fragment = document.createDocumentFragment();
  for (const item of visible) {
    const tr = document.createElement('tr');
    const sourceCell = document.createElement('td');
    const link = document.createElement('a');
    link.href = validSourceUrl(item.source_url) ? item.source_url : '#';
    link.textContent = String(item.id).split('/').slice(1).join('/');
    link.rel = 'noopener noreferrer';
    link.target = '_blank';
    if (!validSourceUrl(item.source_url)) {
      link.removeAttribute('href');
      link.removeAttribute('target');
    }
    sourceCell.append(link);
    sourceCell.append(plain('small', item.upstream_kind === 'fork' ? 'Fork / original upstream may differ' : item.upstream_kind === 'archived' ? 'Archived source' : 'Public project', 'subline'));
    tr.append(sourceCell);

    const priorityCell = document.createElement('td');
    priorityCell.append(plain('span', item.priority === 'NONE' ? 'No current use' : item.priority, 'priority priority-' + String(item.priority).toLowerCase()));
    tr.append(priorityCell);
    const targets = document.createElement('td');
    for (const target of Array.isArray(item.targets) ? item.targets : []) {
      targets.append(plain('span', targetLabels.get(target) ?? target, 'target'));
    }
    tr.append(targets);
    const description = document.createElement('td');
    description.append(plain('span', item.applicability_note));
    description.append(plain('small', 'Research lead · Not installed or audited', 'subline'));
    tr.append(description);
    fragment.append(tr);
  }
  if (!visible.length) {
    const row = document.createElement('tr');
    const cell = plain('td', 'No matching research leads. Adjust your search or clear the filters.', 'empty');
    cell.colSpan = 4;
    row.append(cell);
    fragment.append(row);
  }
  els.rows.replaceChildren(fragment);
  const counts = priorityCounts(visible);
  els['result-status'].textContent = `Showing ${visible.length} of ${records.length} sources · ${counts.HIGH} high priority · all marked research only`;
}

async function init() {
  try {
    const response = await fetch(catalogUrl, {cache: 'no-store'});
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const catalog = await response.json();
    if (catalog.schema_version !== 1 || !Array.isArray(catalog.records) || !Array.isArray(catalog.targets)) {
      throw new Error('Unexpected catalog format');
    }
    records = catalog.records;
    targetLabels = new Map(catalog.targets.map((item) => [item.id, item.label]));
    for (const item of catalog.targets) {
      if (item.id === 'other') continue;
      const option = plain('option', item.label);
      option.value = item.id;
      els.target.append(option);
    }
    els['total-count'].textContent = String(records.length);
    els.filters.addEventListener('input', draw);
    els.filters.addEventListener('change', draw);
    els.filters.addEventListener('reset', () => queueMicrotask(draw));
    draw();
  } catch (error) {
    els['result-status'].textContent = 'Unable to load the research catalog.';
    els.rows.replaceChildren();
    const row = document.createElement('tr');
    const cell = plain('td', 'Could not read local JSON. Start from the repository root with python -m http.server 8765, then open /gallery/opportunities.html. Raw Markdown inventory remains available.', 'empty');
    cell.colSpan = 4;
    row.append(cell);
    els.rows.append(row);
  }
}
init();
