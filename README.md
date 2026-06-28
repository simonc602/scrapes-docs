# Agentic OS Docs

This repository contains the official Agentic OS documentation source.

Team OS is the first priority. The docs will explain how to set up a hosted
server, connect a local client, sign in, manage teams and clients, use shared
memory, sync files safely, and verify the setup.

## Documentation stack

- **Fumadocs** for the self-hosted documentation site.
- **Next.js** for the docs web app.
- **MDX** for page source.
- **Vale** for writing style checks.
- **Lychee** for external link checks.
- **PowerShell checks** for navigation, headings, and forbidden source-product
  references.
- **GitHub Actions** for CI.

## Repository structure

```text
agentic-os-docs/
├── app/                          # Next.js app routes
├── components/                   # MDX component mapping
├── content/docs/                 # Public Fumadocs documentation
│   ├── meta.json
│   ├── get-started/
│   ├── agentic-os/
│   ├── command-centre/
│   ├── memory/
│   ├── team-os/
│   ├── deploy/
│   ├── admin/
│   └── contribute/
├── lib/                          # Fumadocs source and layout helpers
├── public/assets/                # Logo and docs card artwork
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

Run the web app checks:

```powershell
pnpm install
pnpm typecheck
pnpm build
```

Run one check at a time:

```powershell
pwsh ./scripts/check-forbidden-terms.ps1
pwsh ./scripts/check-fumadocs-navigation.ps1
pwsh ./scripts/check-frontmatter.ps1
```

If Vale or Lychee are installed locally, run:

```powershell
vale content/docs
lychee --config lychee.toml ./content/docs
```

## Local preview

Start the local Fumadocs app:

```powershell
pnpm dev
```

Open:

```powershell
http://localhost:3000/docs/get-started
```

## Self-hosted deploy

Build and run the Next.js server:

```powershell
pnpm build
pnpm start
```

Or build the Docker image:

```powershell
docker build -t scrapes-docs .
docker run --rm -p 3000:3000 scrapes-docs
```

## Source and license notes

This local foundation was prepared from a public documentation repository so
Agentic OS could reuse a proven documentation workflow.
See [NOTICE.md](NOTICE.md) for source commit and license notes.
