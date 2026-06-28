$ErrorActionPreference = "Stop"

$repoRoot = (git rev-parse --show-toplevel).Trim()
$contentRoot = Join-Path $repoRoot "content/docs"
$problems = @()

if (-not (Test-Path -LiteralPath $contentRoot)) {
  Write-Error "content/docs is missing"
  exit 1
}

$requiredSections = @(
  "get-started",
  "deploy",
  "agentic-os",
  "command-centre",
  "memory",
  "team-os",
  "admin",
  "contribute"
)

function Get-MetaJson($path) {
  try {
    return Get-Content -Raw -LiteralPath $path | ConvertFrom-Json
  } catch {
    $script:problems += "{0}: invalid JSON" -f [System.IO.Path]::GetRelativePath($repoRoot, $path)
    return $null
  }
}

function Test-PageEntry($dir, $entry, $metaPath) {
  if (-not ($entry -is [string])) {
    $script:problems += "{0}: page entry must be a string" -f [System.IO.Path]::GetRelativePath($repoRoot, $metaPath)
    return
  }

  if ($entry.StartsWith("---")) {
    return
  }

  $entryPath = $entry -replace "/", [System.IO.Path]::DirectorySeparatorChar
  $pagePath = Join-Path $dir ($entryPath + ".mdx")
  $indexPath = Join-Path (Join-Path $dir $entryPath) "index.mdx"

  if (-not (Test-Path -LiteralPath $pagePath) -and -not (Test-Path -LiteralPath $indexPath)) {
    $relativeMeta = [System.IO.Path]::GetRelativePath($repoRoot, $metaPath)
    $script:problems += "{0}: missing page target {1}" -f $relativeMeta, $entry
  }
}

function Remove-FencedCodeBlocks($content) {
  return [regex]::Replace($content, '(?ms)^```.*?^```', '')
}

function Test-DocsRoute($href) {
  $cleanHref = ($href -split "[?#]", 2)[0].TrimEnd("/")

  if ($cleanHref -eq "/docs") {
    return Test-Path -LiteralPath (Join-Path $contentRoot "index.mdx")
  }

  if (-not $cleanHref.StartsWith("/docs/")) {
    return $false
  }

  $routePath = $cleanHref.Substring("/docs/".Length)
  $entryPath = $routePath -replace "/", [System.IO.Path]::DirectorySeparatorChar
  $pagePath = Join-Path $contentRoot ($entryPath + ".mdx")
  $indexPath = Join-Path (Join-Path $contentRoot $entryPath) "index.mdx"

  return (Test-Path -LiteralPath $pagePath) -or (Test-Path -LiteralPath $indexPath)
}

function Test-CardHref($filePath) {
  $relativeFile = [System.IO.Path]::GetRelativePath($repoRoot, $filePath)
  $content = Remove-FencedCodeBlocks (Get-Content -Raw -LiteralPath $filePath)
  $matches = [regex]::Matches($content, '(?s)<Card\b[^>]*\bhref\s*=\s*(["''])(?<href>.*?)\1')

  foreach ($match in $matches) {
    $href = $match.Groups["href"].Value

    if ($href -match '\.mdx(?:[?#].*)?$') {
      $script:problems += "{0}: Card href must not point to .mdx source path: {1}" -f $relativeFile, $href
      continue
    }

    if ($href.StartsWith("http://") -or $href.StartsWith("https://") -or $href.StartsWith("#")) {
      continue
    }

    if (-not ($href -eq "/docs" -or $href.StartsWith("/docs/"))) {
      $script:problems += "{0}: Card href must use /docs/... route, http(s), or #: {1}" -f $relativeFile, $href
      continue
    }

    if (-not (Test-DocsRoute $href)) {
      $script:problems += "{0}: Card href points to missing docs route: {1}" -f $relativeFile, $href
    }
  }
}

$rootMetaPath = Join-Path $contentRoot "meta.json"
$rootMeta = Get-MetaJson $rootMetaPath
if ($rootMeta) {
  foreach ($section in $requiredSections) {
    if ($rootMeta.pages -notcontains $section) {
      $problems += "content/docs/meta.json: missing top navigation section {0}" -f $section
    }
  }

  if ($rootMeta.pages -contains "troubleshooting") {
    $problems += "content/docs/meta.json: troubleshooting must stay under Admin, not top navigation"
  }
}

foreach ($metaFile in Get-ChildItem -Path $contentRoot -Filter "meta.json" -Recurse) {
  $meta = Get-MetaJson $metaFile.FullName
  if (-not $meta) {
    continue
  }

  if (-not $meta.pages) {
    $problems += "{0}: missing pages array" -f [System.IO.Path]::GetRelativePath($repoRoot, $metaFile.FullName)
    continue
  }

  $dir = Split-Path -Parent $metaFile.FullName
  foreach ($entry in $meta.pages) {
    Test-PageEntry $dir $entry $metaFile.FullName
  }
}

foreach ($section in $requiredSections) {
  $sectionDir = Join-Path $contentRoot $section
  $index = Join-Path $sectionDir "index.mdx"
  $meta = Join-Path $sectionDir "meta.json"

  if (-not (Test-Path -LiteralPath $index)) {
    $problems += "content/docs/{0}/index.mdx is missing" -f $section
  }

  if (-not (Test-Path -LiteralPath $meta)) {
    $problems += "content/docs/{0}/meta.json is missing" -f $section
    continue
  }

  $sectionMeta = Get-MetaJson $meta
  if ($sectionMeta -and $sectionMeta.root -ne $true) {
    $problems += "content/docs/{0}/meta.json: root must be true so the section appears as a top tab" -f $section
  }
}

foreach ($mdxFile in Get-ChildItem -Path $contentRoot -Filter "*.mdx" -Recurse) {
  Test-CardHref $mdxFile.FullName
}

if ($problems.Count -gt 0) {
  $problems | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Output "Fumadocs navigation check passed."
