# Curation and acceptance

## Quality score (0-2 points per criterion, max 12)

| Criterion | 0 | 1 | 2 |
|---|---|---|---|
| User-task fit | Decorative only | Partial | Clearly supports a real decision/task |
| Legibility/hierarchy | Ambiguous | Usable | Clear scan path and helpful context |
| Responsive design | Breaks | Basic | Narrow and desktop sizes tested |
| Accessibility | Keyboard/contrast problems | Partial | Focus, labels, contrast, motion handled |
| Technical reuse | Hidden dependencies | Some setup | Small, documented and reproducible |
| License/provenance | Unknown | Known but incomplete | Verified exact code and notices |

**Decision rules:** 10-12 = candidate for reusable implementation; 7-9 = keep as inspiration or prototype; below 7 = reference only until improved. A non-permissive/unknown license blocks code copying regardless of score.

## Reference states

- `CANDIDATE`: link only; not researched.
- `SOURCE_REVIEWED`: repository/README/license checked; no claim that UI was visually tested.
- `PROTOTYPED`: local pattern exists and opens; further QA pending.
- `VISUALLY_CHECKED`: responsive and accessibility spot checks recorded.
- `ADOPTED`: promoted to an application after functional/visual testing.

## Per-pattern evidence template

```markdown
# Pattern: [name]

- Task/persona:
- Original source URL:
- Exact source file(s) and commit SHA:
- License and notices:
- Implementation path:
- Why chosen, and alternatives rejected:
- Dependencies, data sensitivity, and permissions:
- Tested viewport widths and browser(s):
- Keyboard/focus/contrast observations:
- Long/empty/loading/error state tests:
- Visual check evidence:
- Known limitations:
- Approved date/reviewer:
```

## Machine-tested vs visual-tested

Node unit tests and DOM fakes validate deterministic component behavior, not actual browser rendering, responsive layout, color contrast, focus order or assistive-technology announcements. Mark these as `PROTOTYPED` until a real browser review verifies them at 1440, 390 and 320 px (plus keyboard, empty/error states, no unintended page overflow). An application is `ADOPTED` only after its project-specific acceptance tests.

## Never promote by screenshot alone

A pretty screenshot may hide unreadable dense tables, broken mobile UX, inaccessible charts, external CDN dependencies or misleading data. Keep a record of what the browser actually did.
