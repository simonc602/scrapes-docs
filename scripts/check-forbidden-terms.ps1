$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$forbiddenTerms = @(
  ("n" + "8n"),
  ("docs." + "n" + "8n.io"),
  ("n" + "8n-io"),
  ("n" + "8nio"),
  ("N" + "8N_")
)

$allowedFiles = @(
  "LICENSE.md",
  "NOTICE.md",
  "scripts/check-forbidden-terms.ps1"
)

$trackedFiles = git ls-files --cached --others --exclude-standard | Where-Object {
  $_ -like "*.md" -or
  $_ -like "*.yml" -or
  $_ -like "*.yaml" -or
  $_ -like "*.toml" -or
  $_ -like "*.json" -or
  $_ -like "*.ps1" -or
  $_ -like "*.txt"
}

$violations = @()

foreach ($file in $trackedFiles) {
  $normalized = $file -replace "\\", "/"
  if ($allowedFiles -contains $normalized) {
    continue
  }

  $path = Join-Path $repoRoot $file
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  foreach ($term in $forbiddenTerms) {
    $matches = Select-String -LiteralPath $path -Pattern $term -SimpleMatch -CaseSensitive:$false -ErrorAction Stop
    foreach ($match in $matches) {
      $violations += "{0}:{1}: forbidden source reference '{2}'" -f $normalized, $match.LineNumber, $term
    }
  }
}

if ($violations.Count -gt 0) {
  $violations | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Forbidden reference check passed."
