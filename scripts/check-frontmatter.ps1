$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$markdownFiles = git ls-files --cached --others --exclude-standard -- "docs/*.md" "document-templates/*.md" "skills/*.md" | Where-Object {
  $_ -notlike "LICENSE.md" -and $_ -notlike "NOTICE.md"
}

$problems = @()

foreach ($file in $markdownFiles) {
  $path = Join-Path $repoRoot $file
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  $content = Get-Content -LiteralPath $path -ErrorAction Stop
  if ($content.Count -eq 0) {
    $problems += "{0}: file is empty" -f $file
    continue
  }

  $firstHeading = $content | Where-Object { $_ -match '^# ' } | Select-Object -First 1
  if (-not $firstHeading) {
    $problems += "{0}: missing H1 heading" -f $file
  }
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Markdown heading check passed."
