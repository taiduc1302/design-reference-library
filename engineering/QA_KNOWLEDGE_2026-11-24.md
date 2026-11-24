# Knowledge Explorer QA — 2026-11-24

Tested source revision: b1a965db90dda013385c14235540ccb790acb6e8.

## Executed
- Seven real GitHub catalogs: 675 records (147 curated, 528 discovery); 13/13 non-URL knowledge test bodies executed in isolated V8 with a lightweight assertion/import adapter, not Node's test runner. 33/33 engineering module cases executed with the actual CommonJS bodies.
- Chromium 144.0.7559.96 / Playwright: 17/17 isolated UI checks with original synthetic catalogs matching collection sizes. The five source files were reconstructed and Git blob hashes verified: knowledge-model.mjs 04c27d12651d0e3f1eccf7e09b8e90cfc3e272b3; knowledge.mjs 3b5be31a30ddb1d01d0a8cc774a3d08fba6db0f4; knowledge.html 51d6f783940bd49a4799b0760c8197b337354f78; knowledge.css 838051c9a72020538f5eabc90f4029223ec353ee; tokens/design-tokens.css f3b17e93a521b0324fcd529de5aedcfd5fc8ebd1.
- Isolated browser harness used inline CSS, data-URL ES modules and mocked fetch. Checks: loading, initial counts, keyboard skip, ID search and untrusted markup, detail expansion and HTTPS link, scope filter reset, empty state, clear filters, pagination/focus, width 320/390/768/1440, dark mode, forced colors/reduced motion/focus, partial failure, retry, total failure, uncaught JS errors, native URL checks (both safe and unsafe link groups).
- Reproduced and fixed blur/change rerender swallowing detail clicks, and reset event timing yielding empty results. Both passed on final source.

## NOT_RUN / limits
- git ls-remote failed DNS resolution; full checkout and full npm run check not executed. Earlier component/legacy tests not rerun here.
- Actual HTTP navigation to loopback failed ERR_BLOCKED_BY_ADMINISTRATOR; isolated DOM/ESM checks are not HTTP delivery/CSP verification. Browser data is synthetic, not the actual catalog contents.
- Windows, other browsers, screen reader/manual accessibility, live external link verification, and consuming-project integrations not run.
- No new dependencies, Actions, paid services, production deployment or ENG adoption claims.

## Repeat in an authorized environment
Run npm run check from a clean checkout. Serve the root with python -m http.server 8765 and exercise gallery/knowledge.html with the actual catalogs. Recheck filters, details after search blur, reset, keyboard focus, pagination and failure/retry across viewport and media modes. Keep actual results and revision in the release evidence.
