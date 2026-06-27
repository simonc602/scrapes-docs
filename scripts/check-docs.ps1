$ErrorActionPreference = "Stop"

pwsh ./scripts/check-forbidden-terms.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

pwsh ./scripts/check-gitbook-navigation.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

pwsh ./scripts/check-frontmatter.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

pwsh ./scripts/check-readability.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

if (Get-Command vale -ErrorAction SilentlyContinue) {
  vale docs
} else {
  Write-Output "Vale is not installed locally; skipping Vale."
}

if (Get-Command lychee -ErrorAction SilentlyContinue) {
  lychee --config lychee.toml ./docs
} else {
  Write-Output "Lychee is not installed locally; skipping Lychee."
}

Write-Output "Docs checks completed."
