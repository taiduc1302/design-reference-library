// Original dependency-free normalization and search; canonical catalogs stay separate.
export const collections = Object.freeze([
  {id:"engineering", label:"Engineering patterns", path:"../engineering/catalog.json"},
  {id:"chan", label:"ChanMeng666 research", path:"../catalog/chanmeng666-opportunity-matrix.json"},
  {id:"dchantlos", label:"dchantlos research", path:"../catalog/dchantlos-opportunity-matrix.json"},
  {id:"design", label:"Design references", path:"../catalog/references.json"},
  {id:"components", label:"Original UI components", path:"../catalog/components.json"}
]);
const list = v => Array.isArray(v) ? v : [];
const str = v => typeof v === "string" ? v : "";
const norm = v => String(v ?? "").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
const labels = { "civil-takeoff":"civil-geometry", "ai-cad-mcp":"civil-geometry", "design-library":"web-ux" };
const capability = v => Object.hasOwn(labels,v) ? labels[v] : v;
export function normalizeCollection(id, data) {
  if (!data || typeof data !== "object" || data.schema_version !== 1) throw Error("Unsupported catalog schema");
  const config=collections.find(x=>x.id===id);
  if (!config) throw Error("Unknown collection");
  const key=({engineering:"patterns",chan:"records",dchantlos:"patterns",design:"references",components:"components"})[id];
  if (!Array.isArray(data[key]) || !data[key].length) throw Error("Missing or empty collection");
  const sources=new Map(list(data.sources).map(s=>[s.id,s]));
  const seen=new Set();
  return data[key].map(r=>{
    if (!r || typeof r.id!=="string" || !r.id.trim() || seen.has(r.id)) throw Error("Missing or duplicate record ID");
    seen.add(r.id);
    let title=r.title||r.name||r.id, category=r.category||list(r.categories)[0]||"general";
    let targets=list(r.targets).map(capability), status=r.status||"RESEARCH_LEAD", priority=r.priority||"UNRANKED";
    let summary="", acceptance="", risk="", links=[], tags=[];
    if(id==="engineering"){
      summary=r.proposal; acceptance=r.acceptance; risk=r.stop_condition;
      links=list(r.source_ids).map(s=>{const x=sources.get(s);if(!x)throw Error("Unknown source ID: "+s);return {label:x.title,url:x.url,detail:x.reuse_status};});
      tags=list(r.source_ids);
    }else if(id==="chan"){
      summary=r.applicability_note; risk=r.license_status+"; "+r.security_review;
      links=[{label:r.id,url:r.source_url}]; tags=[r.upstream_kind];
    }else if(id==="dchantlos"){
      category="construction research"; summary=r.requirements; acceptance=r.pilot;
      risk="Research only; source-level evidence and license limitations in canonical matrix.";
      links=list(r.sources).map(s=>({label:s,url:"https://github.com/dchantlos/"+s}));
      status="RESEARCH_LEAD";
    }else if(id==="design"){
      summary=list(r.patterns).join("; "); risk=r.reuse_note; tags=list(r.categories);
      targets=["web-ux"]; links=[{label:r.author||r.name,url:r.source_url,detail:r.license}];
    }else{
      category="UI component"; targets=["web-ux"]; summary=r.use_case;
      acceptance=list(r.tested_with).join("; "); risk=list(r.unverified_checks).join("; ");
      links=[{label:"Component documentation",url:"../components/README.md"}];
    }
    return {key:id+":"+r.id,id:r.id,collection:id,title:str(title),category:str(category),
      targets:[...new Set(targets.filter(x=>typeof x==="string"))],status:str(status),priority:str(priority),
      summary:str(summary),acceptance:str(acceptance),risk:str(risk),links,tags:tags.filter(x=>typeof x==="string"),
      canonical:config.path,collectionLabel:config.label};
  });
}
const rank={P1:0,HIGH:0,P2:1,MEDIUM:1,P3:2,LOW:2,NONE:3,UNRANKED:4};
export function searchRecords(records, filters={}) {
  const terms=norm(filters.query).split(/\s+/).filter(Boolean);
  return list(records).filter(r=>{
    for (const k of ["collection","status","category","priority"]) if(filters[k]&&filters[k]!=="all"&&r[k]!==filters[k])return false;
    if(filters.target&&filters.target!=="all"&&!r.targets.includes(filters.target))return false;
    const hay=norm([r.id,r.title,r.collectionLabel,r.category,r.status,r.priority,...r.targets,...r.tags,r.summary,r.acceptance,r.risk,...r.links.map(l=>l.label+" "+l.url+" "+(l.detail||""))].join(" "));
    return terms.every(t=>hay.includes(t));
  }).sort((a,b)=>(rank[a.priority]??9)-(rank[b.priority]??9)||a.collection.localeCompare(b.collection)||a.id.localeCompare(b.id));
}
export function safeLink(value) {
  if(typeof value!=="string"||!value||/[\\\u0000-\u0020]/.test(value))return null;
  if(value.startsWith("https://")) {try{const u=new URL(value);return u.protocol==="https:"&&!u.username&&!u.password?u.href:null;}catch{return null;}}
  // Permit only known repository-relative roots; reject traversal, encoded path and query/fragment.
  const local=value.replace(/^\.\.\//,"");
  if(!/^(?:catalog|engineering|components|patterns|docs)\/[A-Za-z0-9_./-]+$|^README\.md$/.test(local)||local.split("/").includes("..")||local.includes("//"))return null;
  return "../"+local;
}
