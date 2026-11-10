# Contributing design references

Contributions are welcome, especially clear, licensed, replicable patterns for dashboards, public-facing sites, desktop-style tools, and presentations.

## Reference submission

Open an issue using the reference submission template or propose a pull request updating `catalog/references.json`. Include author, URL, purpose, source file paths if applicable, license evidence, dependency inventory, screenshots rights, tested breakpoints, accessibility issues, and an honest status.

## Promotion flow

`CANDIDATE` -> `SOURCE_REVIEWED` -> `PROTOTYPED` -> `VISUALLY_CHECKED` -> `ADOPTED`

A nice screenshot alone does not justify `ADOPTED`. Forking alone does not confer permission to reuse third-party logos/media. A candidate can be rejected and remain in the catalogue with rationale.

## PR checklist

- [ ] A concrete user problem is described.
- [ ] Source ownership/license and copied files, if any, are documented.
- [ ] No secrets, personal info, trademarks, copyrighted photos or private client data were introduced.
- [ ] Responsive, keyboard and accessible states were considered.
- [ ] Preview instructions work without paid subscriptions.
- [ ] `python scripts/validate_catalog.py` passes.
- [ ] New dependencies and tradeoffs were documented.
- [ ] Screenshot checks were performed, or limitations stated.

No automated actions are required for this starter.
