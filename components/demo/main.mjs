import {createKpiCard, createStatusBadge, createDecisionCallout, createDataTable} from '../src/components.mjs';

const $ = id => document.getElementById(id);
const sampleRows = [
  {id:'DEMO-001',scope:'Watermain replacement',due:'2026-11-19',readiness:88,status:'review'},
  {id:'DEMO-002',scope:'Road rehabilitation',due:'2026-11-16',readiness:96,status:'verified'},
  {id:'DEMO-003',scope:'Utility crossing',due:'2026-11-28',readiness:51,status:'blocked'},
  {id:'DEMO-004',scope:'Site grading',due:'2026-12-02',readiness:73,status:'pending'}
];

const kpis = [
  {label:'Open sample opportunities',value:'24',context:'Fictional dataset · 7-day view',deltaText:'+4 vs previous week',deltaMeaning:'neutral',benchmark:'Target: 20',trend:[14,13,16,18,17,20,24],trendLabel:'Opportunity count increased from 14 to 24'},
  {label:'Evidence verified',value:'92%',context:'Sample check results · 24 records',deltaText:'+6 pp improvement',deltaMeaning:'positive',benchmark:'Target: ≥95%',trend:[78,83,82,85,88,90,92],trendLabel:'Verified evidence increased from 78% to 92%'},
  {label:'Needs human review',value:'5',context:'Approval is never automatic',deltaText:'2 critical blockers',deltaMeaning:'negative',benchmark:'Owner: Estimating lead',trend:[3,6,5,4,6,5,5],trendLabel:'Five items currently require review'},
  {label:'Average review time',value:'18 min',context:'Demonstration metric only',deltaText:'−3 min faster',deltaMeaning:'positive',benchmark:'Target: ≤20 min',trend:[27,25,22,24,21,19,18],trendLabel:'Average review time decreased from 27 to 18 minutes'}
];
kpis.forEach(item => $('metric-cards').append(createKpiCard(item)));
for (const state of ['verified','review','blocked','pending','draft']) {
  $('status-badges').append(createStatusBadge(state));
}
$('decision').append(createDecisionCallout({
  eyebrow:'Review before approval',
  title:'Two items still lack checked evidence',
  description:'The example dataset includes unresolved source conflicts. Pause approval until a reviewer confirms quantities and source revisions.',
  tone:'warning',
  primaryAction:{label:'Mark for review',onClick:()=>{$('action-result').textContent='Demo only: item marked for review locally. Nothing was approved or submitted.';}},
  secondaryAction:{label:'Show QA note',onClick:()=>{$('action-result').textContent='QA note: compare the original source, revision, and measured quantities before sign-off.';}}
}));
const table = createDataTable({
  caption:'Fictional opportunities and evidence statuses',
  columns:[
    {key:'id',label:'Reference',sortable:true},
    {key:'scope',label:'Scope',sortable:true},
    {key:'due',label:'Due date',type:'date',sortable:true},
    {key:'readiness',label:'Readiness %',type:'number',align:'right',sortable:true},
    {key:'status',label:'Evidence',type:'status',sortable:true}
  ],
  rows:sampleRows,
  emptyMessage:'No records match the search. Try clearing the field.'
});
$('table').append(table.element);
$('show-sample').addEventListener('click',()=>table.setRows(sampleRows));
$('show-loading').addEventListener('click',()=>table.setLoading(true));
$('show-empty').addEventListener('click',()=>table.setRows([]));
$('show-error').addEventListener('click',()=>table.setError('Sample loading error. No data was changed.'));
