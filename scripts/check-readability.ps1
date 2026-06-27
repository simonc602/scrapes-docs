$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$markdownFiles = git ls-files --cached --others --exclude-standard -- "docs/*.md" | Where-Object {
  $_ -notlike "docs/SUMMARY.md"
}

$problems = @()

foreach ($file in $markdownFiles) {
  $path = Join-Path $repoRoot $file
  if (-not (Test-Path -LiteralPath $path)) {
    continue
  }

  $insideCodeBlock = $false
  $lineNumber = 0
  foreach ($line in Get-Content -LiteralPath $path -ErrorAction Stop) {
    $lineNumber += 1

    if ($line.TrimStart().StartsWith('```')) {
      $insideCodeBlock = -not $insideCodeBlock
      continue
    }

    if ($insideCodeBlock) {
      continue
    }

    $trimmed = $line.Trim()
    $skipLine = $trimmed.Length -eq 0
    $skipLine = $skipLine -or ($trimmed.StartsWith('#'))
    $skipLine = $skipLine -or ($trimmed.StartsWith('*'))
    $skipLine = $skipLine -or ($trimmed.StartsWith('|'))
    $skipLine = $skipLine -or ($trimmed.StartsWith('{%'))
    $skipLine = $skipLine -or ($trimmed.StartsWith('<'))
    $skipLine = $skipLine -or ($trimmed -match '^\d+\.')

    if ($skipLine) {
      continue
    }

    $wordCount = ([regex]::Matches($trimmed, '\b[\w-]+\b')).Count
    if ($wordCount -gt 45) {
      $problems += ("{0}:{1}: prose line has {2} words; split it for readability" -f $file, $lineNumber, $wordCount)
    }
  }
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Readability check passed."
