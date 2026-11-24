"use strict";
// Original dependency-free structural check; no license or implementation certification.
function checkCatalog(catalog) {
  const errors = [];
  const nonempty = v => typeof v === "string" && v.trim().length > 0;
  const object = v => v !== null && typeof v === "object" && !Array.isArray(v);
  if (!object(catalog) || catalog.schema_version !== 1 ||
      !Array.isArray(catalog.sources) || !catalog.sources.length ||
      !Array.isArray(catalog.patterns) || !catalog.patterns.length ||
      !object(catalog.targets) || !Object.keys(catalog.targets).length)
    return ["Invalid catalog shape"];
  const sourceIds = new Set(), patternIds = new Set();
  for (const s of catalog.sources) {
    if (!object(s) || !/^SRC-\d{3,}$/.test(s.id ?? "") ||
        !nonempty(s.title) || !nonempty(s.url) || !nonempty(s.reuse_status)) {
      errors.push("Invalid source"); continue;
    }
    if (sourceIds.has(s.id)) errors.push("Duplicate source: " + s.id);
    sourceIds.add(s.id);
  }
  for (const p of catalog.patterns) {
    if (!object(p) || !/^ENG-\d{3,}$/.test(p.id ?? "") ||
        !["title","category","proposal","acceptance","stop_condition","verification","adoption"].every(k => nonempty(p[k])) ||
        !["P1","P2"].includes(p.priority) ||
        !["RESEARCH_LEAD","SOURCE_REVIEWED","PILOT_TESTED","ADOPTED","BLOCKED","REJECTED"].includes(p.status)) {
      errors.push("Invalid pattern"); continue;
    }
    if (patternIds.has(p.id)) errors.push("Duplicate pattern: " + p.id);
    patternIds.add(p.id);
    for (const [key,known] of [["source_ids",s => sourceIds.has(s)],["targets",t => Object.hasOwn(catalog.targets,t)]]) {
      const values = p[key];
      if (!Array.isArray(values) || !values.length || new Set(values).size !== values.length ||
          !values.every(v => typeof v === "string" && known(v))) errors.push(p.id + ": invalid " + key);
    }
    if (p.status === "ADOPTED" && (p.verification === "NOT_RUN" || p.adoption === "NOT_ADOPTED" ||
        !nonempty(p.adoption_evidence))) errors.push(p.id + ": adoption evidence missing");
  }
  return errors;
}
module.exports = {checkCatalog};
