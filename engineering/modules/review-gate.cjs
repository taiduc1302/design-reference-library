"use strict";
// Original dependency-free review gate. MIT; see repository LICENSE.
// Evaluates supplied evidence labels, never verifies evidence or grants approval.
function reviewGate(requiredIds, results, revision) {
  const validText = v => typeof v === "string" && v.trim() === v && v.length > 0;
  if (!Array.isArray(requiredIds) || !requiredIds.length || !requiredIds.every(validText) ||
      new Set(requiredIds).size !== requiredIds.length || !Array.isArray(results) ||
      !validText(revision)) throw new TypeError("Invalid gate inputs");
  const required = new Set(requiredIds);
  const rows = new Map();
  for (const row of results) {
    if (!row || !required.has(row.id) || rows.has(row.id) ||
        !["PASS", "FAIL", "NOT_RUN"].includes(row.status) || !validText(row.revision))
      throw new TypeError("Invalid, duplicate, or unexpected check");
    if (row.status !== "NOT_RUN" && !validText(row.evidence))
      throw new TypeError("Executed check requires evidence reference");
    rows.set(row.id, row);
  }
  const checks = requiredIds.map(id => {
    const row = rows.get(id);
    if (!row) return {id, status: "NOT_RUN", reason: "MISSING"};
    if (row.revision !== revision) return {id, status: "NOT_RUN", reason: "STALE_REVISION"};
    return {id, status: row.status, reason: "REPORTED"};
  });
  const status = checks.some(x => x.status === "FAIL") ? "BLOCKED" :
    checks.some(x => x.status === "NOT_RUN") ? "INCOMPLETE" : "READY_FOR_REVIEW";
  return {status, revision, checks, approved: false};
}
module.exports = {reviewGate};
