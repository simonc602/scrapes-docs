# Local install

This guide installs Agentic OS locally and opens Command Centre.

## Prerequisites

Install these first:

| Tool | Why it is needed |
| --- | --- |
| Git | Clones Agentic OS and receives updates. |
| Node.js | Runs Command Centre and memory scripts. |
| Python 3 | Used by some Agentic OS scripts. |
| Claude Code | Main local runtime for Claude-based work. |
| PowerShell | Recommended on Windows. |

Some optional skills need their own API keys. Add keys to `.env` only when a
skill asks for them.

## Clone Agentic OS

Use the access method provided by the project owner.

```bash
git clone https://<YOUR_TOKEN>@github.com/simonc602/agentic-os.git
cd agentic-os
```

Do not paste a real token into documentation, screenshots, or committed files.

## Launch Command Centre

On macOS or Linux:

```bash
bash scripts/centre.sh
```

On Windows PowerShell:

```powershell
powershell -File scripts\centre.ps1
```

The launcher checks the workspace, repairs local bootstrap files when needed,
starts the Command Centre app, and opens the browser.

After the first setup, you can use the optional global shortcut:

```bash
centre
```

## Manual install command

Use the installer directly when you need setup or repair without launching the
browser UI.

```bash
bash scripts/install.sh
bash scripts/install.sh --repair
```

On Windows PowerShell:

```powershell
powershell -File scripts\install.ps1
```

## Update Agentic OS

Run updates from the root workspace:

```bash
bash scripts/update.sh
```

The updater pulls from the official upstream source and preserves local data.
It does not overwrite your brand context, memory source files, projects, cron
jobs, client data, `.env`, or local settings.

## Set up memory

Memory setup usually runs during install and update. You can also run it
manually.

```bash
bash scripts/setup-memory.sh
bash scripts/setup-memory.sh --check
```

On Windows PowerShell:

```powershell
powershell -File scripts\setup-memory.ps1
```

Local memory uses `.command-centre/memory`. Hosted Team OS memory uses Postgres
with pgvector and belongs in the Team OS setup flow.

Next: [First run](first-run.md)
