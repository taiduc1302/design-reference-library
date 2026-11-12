# Forks and provenance

**Remote state verified 2026-11-12:** `taiduc1302/design-reference-library` exists and accepts GitHub connector writes. The four requested Gus Bavia forks were **not present** in the connected account's repository list at that check. The connector currently has no `fork repository` or `create repository` action. A copy of source code in the central library must never be described as a GitHub fork.

Source commits and expected destinations are pinned in [`catalog/upstreams.json`](../catalog/upstreams.json). The central library is deliberately original code; its upstream ideas and licenses are documented separately.

## Fastest manual option: GitHub's Fork button

- [The World of Peaches — Fork](https://github.com/gusbavia/the-world-of-peaches/fork)
- [City Sustainability Scorecard — Fork](https://github.com/gusbavia/city-sustainability-scorecard/fork)
- [Assisted Report — Fork](https://github.com/gusbavia/assisted-report/fork)
- [PBI Theme — Fork](https://github.com/gusbavia/pbi-theme/fork)

Choose **Owner: `taiduc1302`**, retain the original repo names, and keep the fork relationship. GitHub offers “Copy the DEFAULT branch only”; leave that unchecked if preserving all branches matters for studying history. Verify each new fork's page says **forked from gusbavia/...**.

## Windows one-command option (GitHub CLI)

Install [GitHub CLI](https://cli.github.com/), sign in locally using `gh auth login` (never share tokens), then from the repository root:

```powershell
# Inspects only; makes no changes
.\scripts\fork-gusbavia.ps1

# Creates missing real forks, checks parent, never overwrites
.\scripts\fork-gusbavia.ps1 -Apply
```

Or use the manual commands:

```powershell
gh repo fork gusbavia/the-world-of-peaches --clone=false
gh repo fork gusbavia/city-sustainability-scorecard --clone=false
gh repo fork gusbavia/assisted-report --clone=false
gh repo fork gusbavia/pbi-theme --clone=false
```

**Note:** The older `bootstrap-github.ps1` exists for initial repo creation; the central repo now exists. Prefer `fork-gusbavia.ps1` for forks only. No GitHub Actions or paid automation needed.

## Verify each actual parent

```powershell
gh api repos/taiduc1302/the-world-of-peaches --jq '.parent.full_name'
gh api repos/taiduc1302/city-sustainability-scorecard --jq '.parent.full_name'
gh api repos/taiduc1302/assisted-report --jq '.parent.full_name'
gh api repos/taiduc1302/pbi-theme --jq '.parent.full_name'
```

Expected output: corresponding `gusbavia/...` (not `null`). Only after seeing those results, update `catalog/upstreams.json` status for each verified fork from `NOT_PRESENT_AT_LAST_CHECK` to `VERIFIED_PARENT`. Sync each fork deliberately after reviewing upstream changes; do not treat fork merges as automatically approved component code.
