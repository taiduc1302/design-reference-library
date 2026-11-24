"use strict";
const {reviewGate} = require("../modules/review-gate.cjs");
const {groupEvidence} = require("../modules/revision-evidence.cjs");
const {checkCatalog} = require("../modules/catalog-check.cjs");
let count = 0;
function equal(actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error("Mismatch: " + JSON.stringify(actual) + " expected " + JSON.stringify(expected));
}
function throws(fn) { let caught = false; try { fn(); } catch (e) { if (!(e instanceof TypeError)) throw e; caught = true; } if (!caught) throw new Error("Expected TypeError"); }
function test(name, fn) { fn(); count++; console.log("PASS " + name); }
const check = (id,status="PASS",revision="r1",evidence="log") => ({id,status,revision,evidence});
test("all checks ready but never approved", () => {const r=reviewGate(["a","b"],[check("a"),check("b")],"r1"); equal([r.status,r.approved],["READY_FOR_REVIEW",false]);});
test("missing check", () => equal(reviewGate(["a"],[],"r1").status,"INCOMPLETE"));
test("failure blocks", () => equal(reviewGate(["a","b"],[check("a","FAIL")],"r1").status,"BLOCKED"));
test("stale pass is not run", () => equal(reviewGate(["a"],[check("a","PASS","old")],"r1").checks[0].reason,"STALE_REVISION"));
test("stale failure not current failure", () => equal(reviewGate(["a"],[check("a","FAIL","old")],"r1").status,"INCOMPLETE"));
test("explicit not run", () => equal(reviewGate(["a"],[check("a","NOT_RUN","r1","")],"r1").status,"INCOMPLETE"));
test("duplicate check rejected", () => throws(()=>reviewGate(["a"],[check("a"),check("a")],"r1")));
test("duplicate required rejected", () => throws(()=>reviewGate(["a","a"],[],"r1")));
test("unknown check rejected", () => throws(()=>reviewGate(["a"],[check("b")],"r1")));
test("unknown status rejected", () => throws(()=>reviewGate(["a"],[check("a","OK")],"r1")));
test("missing evidence rejected", () => throws(()=>reviewGate(["a"],[check("a","PASS","r1","")],"r1")));
test("empty required rejected", () => throws(()=>reviewGate([],[],"r1")));
test("invalid revision rejected", () => throws(()=>reviewGate(["a"],[],"")));
const record=(id="x",revision="1",fingerprint="h1",source="s1")=>({id,revision,fingerprint,source});
test("empty input",()=>equal(groupEvidence([]),[]));
test("single record",()=>equal(groupEvidence([record()])[0].status,"SINGLE_REVISION"));
test("duplicate records idempotent",()=>equal(groupEvidence([record(),record()]),groupEvidence([record()])));
test("same revision corroboration",()=>equal(groupEvidence([record(),record("x","1","h1","s2")])[0].versions[0].variants[0].sources,["s1","s2"]));
test("same revision conflict retained",()=>equal(groupEvidence([record(),record("x","1","h2")])[0].status,"CONFLICT"));
test("different revisions retained",()=>equal(groupEvidence([record(),record("x","2","h2")])[0].status,"MULTIPLE_REVISIONS"));
test("no chosen latest",()=>equal(Object.hasOwn(groupEvidence([record(),record("x","2")])[0],"latest"),false));
test("input ordering irrelevant",()=>{const a=[record(),record("a"),record("x","1","h2")];equal(groupEvidence(a),groupEvidence([...a].reverse()));});
test("unsafe-looking key is plain data",()=>equal(groupEvidence([record("__proto__")])[0].id,"__proto__"));
test("invalid records rejected",()=>throws(()=>groupEvidence([{id:"x"}])));
test("blank revision rejected",()=>throws(()=>groupEvidence([record("x"," ")])));
const catalog=()=>({schema_version:1,targets:{t:"Target"},sources:[{id:"SRC-001",title:"source",url:"https://example.com",reuse_status:"REFERENCE_ONLY"}],patterns:[{id:"ENG-001",title:"p",category:"c",proposal:"p",acceptance:"a",stop_condition:"s",verification:"NOT_RUN",adoption:"NOT_ADOPTED",priority:"P1",status:"RESEARCH_LEAD",source_ids:["SRC-001"],targets:["t"]}]});
test("valid catalog",()=>equal(checkCatalog(catalog()),[]));
test("invalid shape",()=>equal(checkCatalog(null),["Invalid catalog shape"]));
test("duplicate source",()=>{const c=catalog();c.sources.push(c.sources[0]);equal(checkCatalog(c).length,1);});
test("duplicate pattern",()=>{const c=catalog();c.patterns.push(c.patterns[0]);equal(checkCatalog(c).length,1);});
test("missing source reference",()=>{const c=catalog();c.patterns[0].source_ids=["SRC-999"];equal(checkCatalog(c).length,1);});
test("unknown target",()=>{const c=catalog();c.patterns[0].targets=["toString"];equal(checkCatalog(c).length,1);});
test("duplicate target",()=>{const c=catalog();c.patterns[0].targets=["t","t"];equal(checkCatalog(c).length,1);});
test("missing acceptance",()=>{const c=catalog();c.patterns[0].acceptance="";equal(checkCatalog(c).length,1);});
test("adopted without evidence",()=>{const c=catalog();c.patterns[0].status="ADOPTED";equal(checkCatalog(c).length,1);});
console.log("TOTAL " + count + " passed");
module.exports = {count};
