import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeSearchTerm, filterRows, sortRows, sparklinePoints, normalizedStatus, STATUS_LABELS} from '../src/data.mjs';

const rows = [
  {id:'X3',label:'Road Rehab',score:75,due:'2026-11-27',status:'review'},
  {id:'X1',label:'Utility Crossing',score:100,due:'2026-11-15',status:'verified'},
  {id:'X2',label:'Café Sitework',score:50,due:'2026-11-21',status:'blocked'},
];

test('search normalizes case and diacritics',()=>{
  assert.equal(normalizeSearchTerm('  CAFÉ '),'cafe');
  assert.deepEqual(filterRows(rows,'cafe',['label']).map(r=>r.id),['X2']);
  assert.deepEqual(filterRows(rows,'road',['label']).map(r=>r.id),['X3']);
});
test('empty query and unknown data stay safe',()=>{
  assert.equal(filterRows(rows,'').length,3);
  assert.deepEqual(filterRows(null,'foo'),[]);
  assert.deepEqual(filterRows(rows,'missing',['label']),[]);
});
test('filters only selected keys',()=>{
  assert.deepEqual(filterRows(rows,'X3',['label']),[]);
  assert.deepEqual(filterRows(rows,'X3',['id']).map(r=>r.id),['X3']);
});
test('number ascending and descending',()=>{
  assert.deepEqual(sortRows(rows,'score','asc','number').map(r=>r.score),[50,75,100]);
  assert.deepEqual(sortRows(rows,'score','desc','number').map(r=>r.score),[100,75,50]);
});
test('date sort respects calendar order',()=>{
  assert.deepEqual(sortRows(rows,'due','asc','date').map(r=>r.id),['X1','X2','X3']);
});
test('natural text sort handles IDs with numbers',()=>{
  assert.deepEqual(sortRows([{id:'A10'},{id:'A2'},{id:'A1'}],'id').map(r=>r.id),['A1','A2','A10']);
});
test('sort is stable and does not mutate source',()=>{
  const source=[{id:'first',score:12},{id:'second',score:12},{id:'third',score:10}];
  const sorted=sortRows(source,'score','desc','number');
  assert.deepEqual(sorted.map(r=>r.id),['first','second','third']);
  assert.deepEqual(source.map(r=>r.id),['first','second','third']);
});
test('missing and invalid numeric values always sort last',()=>{
  const source=[{id:'none',score:null},{id:'good',score:'7'},{id:'bad',score:'oops'},{id:'other',score:2}];
  assert.deepEqual(sortRows(source,'score','asc','number').map(r=>r.id),['other','good','none','bad']);
  assert.deepEqual(sortRows(source,'score','desc','number').map(r=>r.id),['good','other','none','bad']);
});
test('sparkline within bounds and flattened values are centered',()=>{
  const p=sparklinePoints([2,4,6],100,40,4);
  assert.equal(p,'4.00,36.00 50.00,20.00 96.00,4.00');
  assert.equal(sparklinePoints([5,5],100,40,4),'4.00,20.00 96.00,20.00');
});
test('sparkline missing and invalid series is unavailable',()=>{
  assert.equal(sparklinePoints([]),'');
  assert.equal(sparklinePoints([4,Number.NaN]),'');
  assert.equal(sparklinePoints([1,2],5,8,4),'');
});
test('status values use an allowlist',()=>{
  assert.equal(normalizedStatus('verified'),'verified');
  assert.equal(normalizedStatus('alert'),'draft');
  assert.equal(normalizedStatus('__proto__'),'draft');
  assert.equal(STATUS_LABELS.blocked,'Blocked');
});
