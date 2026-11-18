import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
import {filterOpportunities, normalizeQuery, priorityCounts, validSourceUrl} from '../gallery/opportunities-model.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(resolve(root, 'catalog/chanmeng666-opportunity-matrix.json'), 'utf8'));
const records = catalog.records;

test('source inventory and priorities match the recorded research snapshot', () => {
  assert.equal(records.length, 82);
  assert.equal(new Set(records.map((r) => r.id)).size, 82);
  assert.deepEqual(priorityCounts(records), {HIGH: 10, MEDIUM: 22, LOW: 35, NONE: 15});
  assert.ok(records.every((r) => r.status === 'RESEARCH_LEAD' && r.implementation_status === 'NOT_IMPLEMENTED'));
});

test('all repository source links are GitHub links with no query or credentials', () => {
  for (const record of records) assert.ok(validSourceUrl(record.source_url), record.source_url);
  for (const malformed of ['javascript:alert(1)', 'https://evil.com/ChanMeng666/archlang',
    'https://github.com.evil.com/ChanMeng666/archlang',
    'https://user:pass@github.com/ChanMeng666/archlang',
    'https://github.com/ChanMeng666/archlang?token=bad', '']) {
    assert.equal(validSourceUrl(malformed), false, malformed);
  }
});

test('default sort is deterministic; high priority first and input unchanged', () => {
  const original = records.map((r) => r.id);
  const list = filterOpportunities(records);
  assert.equal(list.length, 82);
  assert.ok(list.slice(0, 10).every((r) => r.priority === 'HIGH'));
  assert.deepEqual(records.map((r) => r.id), original);
  assert.deepEqual(filterOpportunities(records).map((r) => r.id), list.map((r) => r.id));
});

test('filters narrow by priority, capability, category and kind', () => {
  assert.equal(filterOpportunities(records, {priority: 'HIGH'}).length, 10);
  assert.ok(filterOpportunities(records, {target: 'civil-geometry'}).some((r) => r.id === 'chanmeng666/archlang'));
  assert.ok(filterOpportunities(records, {category: 'archived'}).every((r) => r.upstream_kind === 'archived'));
  assert.ok(filterOpportunities(records, {kind: 'fork'}).every((r) => r.upstream_kind === 'fork'));
  assert.deepEqual(filterOpportunities(records, {search: 'does-not-exist'}), []);
  assert.deepEqual(filterOpportunities(records, {priority: 'HIGH', kind: 'archived'}), []);
});

test('query normalization and malformed records do not crash pure selector', () => {
  assert.equal(normalizeQuery(' CAFÉ '), 'cafe');
  assert.equal(filterOpportunities(null).length, 0);
  assert.deepEqual(filterOpportunities([null, undefined, {id: 'ok', priority: 'NONE', targets: [], applicability_note: 'Test note'}], {search: 'ok'}).map((r) => r.id), ['ok']);
});

test('public research contains no private repo URLs or client data fields', () => {
  const source = JSON.stringify(catalog);
  assert.equal(source.includes('github.com/taiduc1302/'), false);
  for (const row of records) {
    assert.ok(!('secret' in row) && !('token' in row) && !('customer' in row));
    assert.equal(row.license_status, 'NOT_FILE_LEVEL_VERIFIED');
    assert.equal(row.security_review, 'NOT_RUN');
  }
});
