# Shared agent acceptance contract (v1)

A lightweight reference contract, not a new agent runtime. Reuse existing target-project checks first. Applies to ENG-032 through ENG-039, and complements ENG-013/015/030. Scope, safety and human approval requirements of the consuming project prevail.

## Before work

Record a task ID, objective, permitted operations, base revision, input/fixture manifest and expected output. Freeze the required checks and identify their trusted owner independently of the candidate. Use synthetic inputs for public research. No provider calls, real customer data, installation, arbitrary shell execution or native-tool changes by default.

## Independent evidence

| Required field | Rule |
|---|---|
| run_id, trial_id, attempt | Stable unique identities; retain previous attempts; never select only successful attempts. |
| base_revision, result_revision | Bind checks to exact inputs and final output; stale evidence does not pass. |
| verifier_revision, fixture_digest, environment | Independent, immutable in the candidate's scope; changed or unknown identity invalidates evidence. |
| check_id, command_or_method, evidence_ref | Record actual check and trusted observation, not agent's claim. Redact sensitive content. |
| evidence_kind | OFFLINE, LIVE_PROVIDER, NATIVE_TOOL or HUMAN_REVIEW; one kind cannot substitute for another. |
| outcome | PASS, FAIL, BUILD_FAIL, TIMEOUT, INFRA_ERROR, NOT_RUN, INVALID. |

A PASS requires a completed required check with matching revision, trusted evidence, and no conflicting build/integrity result. Compilation failure with success reward is INVALID, not PASS. Missing results remain NOT_RUN; infrastructure failures are separate from candidate failures. The scheduled cohort is immutable during comparison. Publish scheduled, attempted and per-outcome counts; disclose exclusions and retry cost. No model ranking or promotion from an incomplete or changed cohort.

## Test design

1. Validate a known-good and known-bad original control before evaluating a candidate.
2. Test actual artifacts/behavior, not merely stdout or model assertions. Keep prior functionality in regression scope.
3. Add seeded decoys and negative fixtures where useful; record seed and expected result independently.
4. Verify correlation of action and result IDs, permissions, scope, current revision and independent readback. Record only sanitized identifiers and observations.
5. For optional Skills/LSP, load approved content only, deny unapproved capability, reject stale/wrong-file diagnostics, distinguish empty current report from absent report. Independent final regression still required.
6. Offline, live and native checks must be reported separately. No unexecuted check can be PASS. Do not weaken required checks because a dependency or credential is absent.

## Release and feedback

Use existing target test and approval mechanisms. This contract does not authenticate the evidence itself, approve bids or permit irreversible actions. A passing check only contributes to readiness for review. Adoption requires actual target-specific tests and required approvals. Record ENG IDs, exact revision, commands, outcomes, limitations and rollback in the consuming repository; publish only sanitized lessons in the central library.

First pilot: inspect AI Model Advisor's existing experiment protocol and judges for missing action/artifact evidence and fail-closed trial accounting; extend only if a concrete gap is reproduced. Then consider controlled native-measurement and tender fixtures. No blanket retrofit.
