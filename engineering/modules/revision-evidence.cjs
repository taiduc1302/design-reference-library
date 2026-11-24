"use strict";
// Original dependency-free evidence grouping. MIT; see repository LICENSE.
// Caller supplies trustworthy source IDs and content fingerprints; no hashing,
// chronological ordering, source authentication, or conflict resolution occurs here.
function groupEvidence(records) {
  if (!Array.isArray(records)) throw new TypeError("Expected records array");
  const valid = v => typeof v === "string" && v.length > 0 && v.trim() === v;
  const groups = new Map();
  for (const row of records) {
    if (!row || !["id", "revision", "fingerprint", "source"].every(k => valid(row[k])))
      throw new TypeError("Invalid evidence record");
    if (!groups.has(row.id)) groups.set(row.id, new Map());
    const revisions = groups.get(row.id);
    if (!revisions.has(row.revision)) revisions.set(row.revision, new Map());
    const variants = revisions.get(row.revision);
    if (!variants.has(row.fingerprint)) variants.set(row.fingerprint, new Set());
    variants.get(row.fingerprint).add(row.source);
  }
  const sort = a => [...a].sort();
  return sort(groups.keys()).map(id => {
    const revisions = groups.get(id);
    const versions = sort(revisions.keys()).map(revision => {
      const variants = revisions.get(revision);
      return {revision, variants: sort(variants.keys()).map(fingerprint =>
        ({fingerprint, sources: sort(variants.get(fingerprint))})),
        status: variants.size > 1 ? "CONFLICT" : "CONSISTENT"};
    });
    return {id, status: versions.some(v => v.status === "CONFLICT") ? "CONFLICT" :
      versions.length > 1 ? "MULTIPLE_REVISIONS" : "SINGLE_REVISION", versions};
  });
}
module.exports = {groupEvidence};
