import test from 'node:test';
import assert from 'node:assert/strict';
import {installFakeDom} from './fake-dom.mjs';
import {createStatusBadge,createSparkline,createKpiCard,createDecisionCallout,createDataTable} from '../src/components.mjs';
installFakeDom();

test('status badge has both explicit text and a visual marker',()=>{
  const node=createStatusBadge('verified');
  assert.match(node.className,/dr-status--verified/);
  assert.match(node.textContent,/Verified/);
  assert.equal(node.querySelector('.dr-status__dot').getAttribute('aria-hidden'),'true');
  assert.match(createStatusBadge('random').textContent,/Draft/);
});

test('sparkline exposes an accessible label and fallback on invalid data',()=>{
  const node=createSparkline([1,2,4],'Weekly progress');
  assert.equal(node.tagName,'SVG');
  assert.equal(node.getAttribute('aria-label'),'Weekly progress');
  assert.ok(node.querySelector('polyline').getAttribute('points'));
  assert.match(createSparkline([1]).textContent,/unavailable/);
});

test('KPI card includes label/value/benchmark and remains text-only',()=>{
  const node=createKpiCard({label:'Evidence',value:'93%',benchmark:'Target 95%',deltaText:'+3pp',trend:[10,13,15]});
  assert.match(node.textContent,/Evidence/);
  assert.match(node.textContent,/93%/);
  assert.match(node.textContent,/Target 95%/);
  assert.ok(node.querySelector('svg'));
  assert.equal(node.querySelector('script'),null);
});

test('callout renders only actionable buttons and executes their handlers',()=>{
  let calls=0;
  const node=createDecisionCallout({title:'Review required',primaryAction:{label:'Review',onClick:()=>calls++},secondaryAction:{label:'Inert'}});
  const buttons=node.querySelectorAll('button');
  assert.equal(buttons.length,1);
  buttons[0].click();
  assert.equal(calls,1);
  assert.match(node.textContent,/Review required/);
});

test('data table rejects empty column definitions',()=>{
  assert.throws(()=>createDataTable({caption:'Invalid',columns:[]}),TypeError);
});

test('data table searches, sorts, reports states and never parses user markup',()=>{
  const table=createDataTable({caption:'Evidence',columns:[{key:'name',label:'Name',sortable:true},{key:'count',label:'Count',sortable:true,type:'number'}],rows:[
    {name:'B',count:4},{name:'<img src=x onerror=alert(1)>',count:1},{name:'A',count:9}
  ]});
  const root=table.element;
  assert.equal(table.getVisibleCount(),3);
  assert.equal(root.querySelector('img'),null);
  const search=root.querySelector('input');
  search.value='<img';
  search.fire('input');
  assert.equal(table.getVisibleCount(),1);
  assert.match(root.querySelector('tbody').textContent,/<img src=x/);
  search.value='';
  search.fire('input');
  const sort=root.querySelectorAll('button')[1];
  sort.click();
  assert.match(root.querySelector('tbody').querySelector('tr').textContent,/1/);
  sort.click();
  assert.match(root.querySelector('tbody').querySelector('tr').textContent,/9/);
  table.setLoading(true);
  assert.match(root.querySelector('tbody').textContent,/Loading records/);
  assert.equal(table.getVisibleCount(),0);
  table.setError('Network unavailable');
  assert.match(root.querySelector('tbody').textContent,/Network unavailable/);
  table.setRows([]);
  assert.match(root.querySelector('tbody').textContent,/No matching records/);
});
