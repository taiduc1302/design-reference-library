#Requires -Version 5.1
[CmdletBinding()]
param(
  [ValidateSet('preview','apply')][string] $Mode = 'preview',
  [switch] $ForkSources
)
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$account = 'taiduc1302'
$central = "$account/design-reference-library"
$sources = @(
  'gusbavia/the-world-of-peaches',
  'gusbavia/city-sustainability-scorecard',
  'gusbavia/assisted-report',
  'gusbavia/pbi-theme'
)

Write-Host "Central repository: $central (PUBLIC)"
Write-Host "Local source directory: $root"
Write-Host "Source forks: $($sources -join ', ')"
if ($Mode -eq 'preview') {
  Write-Host 'PREVIEW ONLY. No remote repositories, forks, or commits will be created.'
  Write-Host 'After reviewing, run: .\scripts\bootstrap-github.ps1 -Mode apply -ForkSources'
  return
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'GitHub CLI (gh) is required. See https://cli.github.com/' }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'git is required. See https://git-scm.com/' }
& gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Not authenticated to GitHub CLI. Run: gh auth login' }
$loggedIn = (& gh api user --jq '.login' | Out-String).Trim()
if ($LASTEXITCODE -ne 0 -or $loggedIn -ne $account) {
  throw "Authenticated account '$loggedIn' does not match expected owner '$account'. Aborting."
}

& gh repo view $central --json name | Out-Null
$centralExists = ($LASTEXITCODE -eq 0)
if (-not $centralExists) {
  if (Test-Path (Join-Path $root '.git')) {
    throw 'This folder already has a .git directory but remote repository was not found. Inspect remotes and push manually; no overwrite attempted.'
  }
  Write-Host "Initializing local repository at $root"
  & git -C $root init -b main
  if ($LASTEXITCODE -ne 0) { throw 'git init failed' }
  & git -C $root add .
  if ($LASTEXITCODE -ne 0) { throw 'git add failed' }
  & git -C $root commit -m 'Initial design reference library scaffold'
  if ($LASTEXITCODE -ne 0) { throw 'git commit failed. Configure git user.name and user.email, then inspect the folder.' }
  Write-Host "Creating public repository $central and pushing first commit"
  & gh repo create $central --public --description 'Curated design references, reusable UI examples, and presentation patterns' --source $root --remote origin --push
  if ($LASTEXITCODE -ne 0) { throw 'Repository creation/push failed. Inspect GitHub and local git state before retrying.' }
} else {
  Write-Host "SKIP: $central already exists. No attempt to overwrite or push."
}

if ($ForkSources) {
  foreach($source in $sources) {
    $name = ($source -split '/')[-1]
    $destination = "$account/$name"
    & gh repo view $destination --json name | Out-Null
    if ($LASTEXITCODE -eq 0) {
      Write-Host "SKIP: $destination already exists (check that it is an upstream fork)."
      continue
    }
    Write-Host "Forking $source"
    & gh repo fork $source --clone=false
    if ($LASTEXITCODE -ne 0) { Write-Warning "Could not fork $source. Check access and destination." }
  }
}
Write-Host "Finished. Verify repository parentage and files in GitHub: https://github.com/$account"
