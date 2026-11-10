# Bootstrapping forks and the central repository

The central repository has been published to GitHub. The connected GitHub API available in Chat may support reading/editing existing repositories, but **cannot be assumed to create forks**. The four source forks have not been created by publishing this library.

## Windows setup

Prerequisites: [Git](https://git-scm.com/) and [GitHub CLI](https://cli.github.com/), both on your PATH, plus `gh auth login`. Never paste GitHub tokens into chats, logs or this repository.

Open PowerShell in the extracted `design-reference-library` folder:

```powershell
# Read the proposed operations (no GitHub mutations):
.\scripts\bootstrap-github.ps1

# Explicitly create missing GitHub resources:
.\scripts\bootstrap-github.ps1 -Mode apply -ForkSources
```

For this existing central repository, this operation skips central repository creation/push and forks exactly four specified MIT-licensed source repositories. It will skip already existing destinations rather than overwriting them. **Do not run from within another existing Git repository.**

For manual fork-only setup:

```powershell
gh repo fork gusbavia/the-world-of-peaches --clone=false
gh repo fork gusbavia/city-sustainability-scorecard --clone=false
gh repo fork gusbavia/assisted-report --clone=false
gh repo fork gusbavia/pbi-theme --clone=false
```

Official CLI references: https://cli.github.com/manual/gh_repo_fork and https://cli.github.com/manual/gh_repo_create

## After setup: verify and manage

```powershell
gh repo view taiduc1302/design-reference-library --web
gh repo view taiduc1302/the-world-of-peaches --web
gh repo view taiduc1302/city-sustainability-scorecard --web
gh repo view taiduc1302/assisted-report --web
gh repo view taiduc1302/pbi-theme --web
```

When updates are available, compare upstream changes before syncing fork branches; do not merge blindly into the curated library. For the first iteration, do not enable GitHub Actions; keep checks local and manual.
