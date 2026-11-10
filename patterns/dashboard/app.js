const opportunities = [
  { title: "North District Road Upgrade", location: "British Columbia", deadline: "Nov 12, 2026", status: "Review", next: "Check addendum" },
  { title: "River Crossing Access Works", location: "Alberta", deadline: "Nov 14, 2026", status: "Preparing", next: "Confirm quantities" },
  { title: "Community Watermain Renewal", location: "Ontario", deadline: "Nov 18, 2026", status: "Ready", next: "Final sign-off" },
  { title: "South Harbour Utility Trench", location: "British Columbia", deadline: "Nov 20, 2026", status: "Review", next: "Validate scale" },
  { title: "Greenway Retaining Wall", location: "Saskatchewan", deadline: "Nov 24, 2026", status: "Preparing", next: "Supplier follow-up" }
];
const body = document.querySelector('#opportunityBody');
const count = document.querySelector('#resultCount');
const search = document.querySelector('#search');
const statusFilter = document.querySelector('#statusFilter');
function draw() {
  const term = search.value.trim().toLowerCase();
  const filter = statusFilter.value;
  const matches = opportunities.filter(o => (filter === 'all' || o.status === filter) &&
    (o.title.toLowerCase().includes(term) || o.location.toLowerCase().includes(term)));
  body.replaceChildren();
  for (const o of matches) {
    const tr = document.createElement('tr');
    for (const value of [o.title, o.location, o.deadline]) { const td=document.createElement('td'); td.textContent=value; tr.appendChild(td); }
    const statusTd = document.createElement('td'); const status = document.createElement('span'); status.className=`status ${o.status}`;status.textContent=o.status;statusTd.appendChild(status);tr.appendChild(statusTd);
    const nextTd = document.createElement('td'); const next = document.createElement('span'); next.className='action'; next.textContent=o.next; nextTd.appendChild(next);tr.appendChild(nextTd);
    body.appendChild(tr);
  }
  if (!matches.length) {const tr=document.createElement('tr');const td=document.createElement('td');td.colSpan=5;td.textContent='No opportunities match your filters.';tr.appendChild(td);body.appendChild(tr);}
  count.textContent = `${matches.length} of ${opportunities.length} opportunities`;
}
search.addEventListener('input', draw);
statusFilter.addEventListener('change', draw);
document.querySelector('#refresh').addEventListener('click', () => { search.value=''; statusFilter.value='all'; draw(); document.querySelector('#refresh').textContent='View reset'; });
draw();
