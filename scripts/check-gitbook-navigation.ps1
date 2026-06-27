$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$summaryFiles = Get-ChildItem -Path (Join-Path $repoRoot "docs") -Filter "SUMMARY.md" -Recurse
$missingTargets = @()

foreach ($summary in $summaryFiles) {
  $summaryDir = Split-Path -Parent $summary.FullName
  $content = Get-Content -LiteralPath $summary.FullName
  foreach ($line in $content) {
    if ($line -match '\]\(([^)]+)\)') {
      $target = $Matches[1]
      if ($target.StartsWith("http")) {
        continue
      }
      $targetPath = Join-Path $summaryDir $target
      if (-not (Test-Path -LiteralPath $targetPath)) {
        $relativeSummary = [System.IO.Path]::GetRelativePath($repoRoot, $summary.FullName)
        $missingTargets += "{0}: missing navigation target {1}" -f $relativeSummary, $target
      }
    }
  }
}

$requiredSections = @(
  "get-started",
  "agentic-os",
  "command-centre",
  "memory",
  "team-os",
  "deploy",
  "admin",
  "troubleshooting",
  "contribute"
)

foreach ($section in $requiredSections) {
  $readme = Join-Path $repoRoot ("docs/{0}/README.md" -f $section)
  $summary = Join-Path $repoRoot ("docs/{0}/SUMMARY.md" -f $section)
  if (-not (Test-Path -LiteralPath $readme)) {
    $missingTargets += "docs/{0}/README.md is missing" -f $section
  }
  if (-not (Test-Path -LiteralPath $summary)) {
    $missingTargets += "docs/{0}/SUMMARY.md is missing" -f $section
  }
}

if ($missingTargets.Count -gt 0) {
  $missingTargets | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "GitBook navigation check passed."
