# Agentic OS Docs

This repository contains the official Agentic OS documentation source.

Team OS is the first priority. The docs will explain how to set up a hosted
server, connect a local client, sign in, manage teams and clients, use shared
memory, sync files safely, and verify the setup.

## Documentation stack

- **GitBook** for the public documentation structure.
- **Markdown** for page source.
- **Vale** for writing style checks.
- **Lychee** for external link checks.
- **PowerShell checks** for navigation, headings, and forbidden source-product
  references.
- **GitHub Actions** for CI once the private remote is available.

## Repository structure

```text
agentic-os-docs/
├── docs/                         # Public GitBook documentation
│   ├── SUMMARY.md
│   ├── get-started/
│   ├── agentic-os/
│   ├── command-centre/
│   ├── memory/
│   ├── team-os/
│   ├── deploy/
│   ├── admin/
│   ├── troubleshooting/
│   └── contribute/
├── document-templates/           # Reusable page templates
├── skills/agentic-os-docs-author # Authoring guidance for agents
├── styles/                       # Vale writing rules
├── scripts/                      # Local quality checks
└── .github/workflows/            # CI checks
```

## Local checks

Run the full local check suite from the repository root:

```powershell
pwsh ./scripts/check-docs.ps1
```

Run one check at a time:

```powershell
pwsh ./scripts/check-forbidden-terms.ps1
pwsh ./scripts/check-gitbook-navigation.ps1
pwsh ./scripts/check-frontmatter.ps1
```

If Vale or Lychee are installed locally, run:

```powershell
vale docs
lychee --config lychee.toml ./docs
```

## Local preview

GitBook remains the public documentation framework. MkDocs is only used for a
local browser preview.

Install preview dependencies if needed:

```powershell
python -m pip install -r requirements.txt
```

Start the local preview:

```powershell
python -m mkdocs serve -a 127.0.0.1:8000
```

## Source and license notes

This local foundation was prepared from a public documentation repository so
Agentic OS could reuse a proven GitBook structure and documentation workflow.
See [NOTICE.md](NOTICE.md) for source commit and license notes.
