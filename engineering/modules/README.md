# Original reusable engineering utilities

Small dependency-free CommonJS modules, original MIT implementation under the repository LICENSE. No third-party or private implementation copied. These are standalone prototypes, not production integrations or engineering certifications. Node 18+ recommended.

| Module | Pattern | Contract |
|---|---|---|
| review-gate.cjs | ENG-013 / ENG-016 | `reviewGate(requiredIds, results, revision)` reports BLOCKED, INCOMPLETE or READY_FOR_REVIEW. Required IDs must be unique; current executed checks require a nonblank evidence reference. Stale or missing checks remain NOT_RUN. Always returns approved: false. |
| revision-evidence.cjs | ENG-006 / ENG-008 | `groupEvidence(records)` groups by stable ID, revision and caller-supplied fingerprint; retains distinct sources and conflicts. Different revisions are not automatically contradictory or ordered. Does not hash or authenticate sources. |
| catalog-check.cjs | ENG-013 | `checkCatalog(catalog)` returns structural errors for schema, IDs, references, required gates and missing adoption evidence. Does not verify URLs, licenses, evidence authenticity or actual adoption. |

## Run offline

From repository root:

```sh
node engineering/tests/modules.test.cjs
node -e "const c=require('./engineering/catalog.json'); const e=require('./engineering/modules/catalog-check.cjs').checkCatalog(c); console.log(e); process.exitCode=e.length?1:0"
```

## Examples

```js
const {reviewGate} = require("./engineering/modules/review-gate.cjs");
reviewGate(["unit", "browser"], [
  {id:"unit", status:"PASS", revision:"r1", evidence:"unit-log.txt"}
], "r1"); // INCOMPLETE; browser missing; never approved

const {groupEvidence} = require("./engineering/modules/revision-evidence.cjs");
groupEvidence([
  {id:"requirement-A", revision:"rev1", fingerprint:"synthetic-A", source:"page1"},
  {id:"requirement-A", revision:"rev1", fingerprint:"synthetic-B", source:"page2"}
]); // CONFLICT; both retained
```

## QA evidence

2026-11-24: 33/33 synthetic unit cases executed in an isolated JavaScript V8 runtime using a restricted in-memory CommonJS loader and the actual test source; catalog structural check returned zero errors. No Node CLI/full checkout, packaged browser, Windows, native construction tool or consuming-project integration test executed in this pass. A local git remote check failed DNS resolution. These checks are not proof of production readiness. Do not replace existing domain-specific engines with these prototypes; evaluate fit and run target regression before adoption. No ENG pattern was promoted to ADOPTED.
