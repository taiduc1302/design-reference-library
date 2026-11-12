<#
.SYNOPSIS
  Checks four approved MIT-licensed upstreams and optionally forks missing ones.
.DESCRIPTION
  Dry-run by default. Run -Apply only after authenticating GitHub CLI (`gh auth login`).
  Never overwrites an existing repo, deletes anything or modifies the original repos.
#>
[CmdletBinding()]
param([switch]$Apply)
$ErrorActionPreference = 'Stop'
$owner = 'taiduc1302'
$sources = @(
  'gusbavia/the-world-of-peaches',
  'gusbavia/city-sustainability-scorecard',
  'gusbavia/assisted-report',
  'gusbavia/pbi-theme'
)
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  throw 'GitHub CLI not found. Install GitHub CLI and run gh auth login first.'
}
& gh auth status *> $null
if ($LASTEXITCODE -ne 0) { throw 'GitHub CLI is not authenticated. Run gh auth login first.' }

foreach ($source in $sources) {
  $name = $source.Split('/')[1]
  $dest = "$owner/$name"
  $parent = & gh api "repos/$dest" --jq '.parent.full_name' 2>$null
  $existing = $LASTEXITCODE -eq 0
  if ($existing) {
    if ($parent -ne $source) { throw "$dest exists but is not a fork of $source. Stopping; do not overwrite." }
    Write-Host "VERIFIED existing fork: $dest <- $source"
    continue
  }
  if (-not $Apply) {
    Write-Host "PLAN (not created): gh repo fork $source --clone=false"
    continue
  }
  Write-Host "Creating fork: $source"
  & gh repo fork $source --clone=false
  if ($LASTEXITCODE -ne 0) { throw "Fork failed: $source" }
  $newParent = & gh api "repos/$dest" --jq '.parent.full_name'
  if ($LASTEXITCODE -ne 0 -or $newParent -ne $source) {
    throw "Could not verify new fork parent for $dest. Check GitHub manually."
  }
  Write-Host "VERIFIED new fork: $dest <- $source"
}
Write-Host 'Completed. Only verified forks should be marked VERIFIED_PARENT in catalog/upstreams.json.'
