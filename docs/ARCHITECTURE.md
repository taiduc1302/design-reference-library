# Architecture: curated library + independent source forks

```text
GitHub account
  design-reference-library/          <--- own original curated repository
    AGENTS.md                         <--- agent guidance
    catalog/references.json           <--- searchable source metadata
    tokens/                           <--- original reusable design tokens
    patterns/                         <--- original or properly attributed, verified snippets
      dashboard/
      website/
      presentations/
    gallery/                          <--- offline demonstration index
    docs/                             <--- curation and licensing rules

  the-world-of-peaches/               <--- fork of gusbavia original (not a code bank)
  city-sustainability-scorecard/      <--- fork of gusbavia original (not a code bank)
  assisted-report/                    <--- fork of gusbavia original (not a code bank)
  pbi-theme/                          <--- fork of gusbavia original (not a code bank)
```

**Why this separation?** Forks track upstream authors, history, original context and licenses. The central library answers a different question: which parts are actually useful for our next product and which versions have been reviewed? Do not dump all external repositories into a single directory or randomly merge upstream code.

**Growth strategy:** keep one cross-medium hub first. Split `design-tokens`, `ui-components`, or `presentation-kit` into standalone repositories only if they acquire independent maintainers, versioning, and releases. Avoid premature repo sprawl.

**Provenance rule:** record original URL and commit hash whenever any code is brought inside `patterns/`. Record third-party notices and changes. A fork link alone is not evidence of correct licensing.
