# Quality Checks

Run checks before opening a pull request or marking an issue complete.

## Full check

```powershell
pwsh ./scripts/check-docs.ps1
```

## Individual checks

```powershell
pwsh ./scripts/check-forbidden-terms.ps1
pwsh ./scripts/check-gitbook-navigation.ps1
pwsh ./scripts/check-frontmatter.ps1
pwsh ./scripts/check-readability.ps1
```

## Vale

Vale checks writing style.

```powershell
vale docs
```

If Vale is not installed, CI will run it later. Still run the local PowerShell
checks before handing off work.

## Readability

The local readability check catches prose lines that are too long to scan.

```powershell
pwsh ./scripts/check-readability.ps1
```

This is a lightweight check, not a replacement for human review. During review,
confirm that each page uses simple English, short steps, examples, and useful
internal links.

## Lychee

Lychee checks external links.

```powershell
lychee --config lychee.toml ./docs
```

If Lychee is not installed, CI will run it later.

## Forbidden source references

Product content from the source project must not appear in public docs.

Allowed exceptions:

* `LICENSE.md`
* `NOTICE.md`
* `scripts/check-forbidden-terms.ps1`

The check is case-insensitive.
