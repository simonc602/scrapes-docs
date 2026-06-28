$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$markdownFiles = git ls-files --cached --others --exclude-standard -- "content/docs/*.mdx" "document-templates/*.md" "skills/*.md" | Where-Object {
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

  if ($file -like "content/docs/*") {
    if ($content[0].Trim() -ne "---") {
      $problems += "{0}: missing frontmatter block" -f $file
      continue
    }

    $closingIndex = -1
    for ($i = 1; $i -lt $content.Count; $i++) {
      if ($content[$i].Trim() -eq "---") {
        $closingIndex = $i
        break
      }
    }

    if ($closingIndex -lt 0) {
      $problems += "{0}: frontmatter block is not closed" -f $file
      continue
    }

    $frontmatter = $content[1..($closingIndex - 1)]
    $title = $frontmatter | Where-Object { $_ -match '^title:\s*.+' } | Select-Object -First 1
    if (-not $title) {
      $problems += "{0}: missing frontmatter title" -f $file
    }
  } else {
    $firstHeading = $content | Where-Object { $_ -match '^# ' } | Select-Object -First 1
    if (-not $firstHeading) {
      $problems += "{0}: missing H1 heading" -f $file
    }
  }
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Markdown metadata check passed."
