# Team OS memory and file sync

Team OS lets a hosted server control shared memory and client files.

The local client signs in, then asks the server for memory and files. The server
checks the signed-in user, team role, client grants, and skill grants before it
returns anything.

Start with [client connection](client-connection.md) before using these
commands.

## Memory layers

| Layer | Who can use it | Typical content |
| --- | --- | --- |
| System | Local Agentic OS or trusted service paths. | Baseline Agentic OS methods. |
| Team | Active team members. | Shared operating notes and team context. |
| Client | Users with a grant for that client. | Client notes, briefs, and context. |
| Private | One signed-in user. | User-specific memory and session context. |

Manual shared imports publish only `team` or `client` memory. Private memory is
captured through normal private capture paths, not the shared import command.

## Import shared memory

Owners and admins can publish shared memory through the Team OS API.

Import a team note:

```powershell
npm run team -- memory import --file ./team-note.md --visibility team --title "Team note"
```

Import a client note:

```powershell
npm run team -- memory import --file ./acme-note.md --visibility client --client acme --title "Acme note"
```

By default, the source path is `manual/<file-name>`. Use `--source-path` when
you need a stable path:

```powershell
npm run team -- memory import --file ./onboarding.md --visibility client --client acme --source-path manual/acme/onboarding.md
```

Expected output:

```text
Import indexed: manual/acme/onboarding.md
ID: <import-id>
Source: <source-id>
Chunks inserted: 3
```

The import creates a durable import record before indexing. If indexing fails,
the admin can list and retry it later.

## List and retry imports

List recent imports:

```powershell
npm run team -- memory imports --limit 5
```

List only failed imports:

```powershell
npm run team -- memory imports --status failed
```

Retry a failed import:

```powershell
npm run team -- memory retry --id <import-id>
```

Retry normally forces re-indexing. Add `--no-force` only when you want the
server to skip unchanged content.

## Search hosted memory

The terminal does not expose a `memory search` subcommand yet. Search uses the
hosted API endpoint `POST /v1/memory/search`.

PowerShell example:

```powershell
$saved = Get-Content "$env:AGENTIC_OS_TEAM_CONFIG_DIR\team-context.json" | ConvertFrom-Json
$body = @{
  query = "onboarding notes"
  topK = 5
  scope = @{
    teamId = "server-resolved"
    clientId = "acme"
    userId = $null
    include = @("team", "client")
  }
  storeQueryText = $false
} | ConvertTo-Json -Depth 6

Invoke-RestMethod `
  -Uri "$($saved.apiUrl)/v1/memory/search" `
  -Method Post `
  -Headers @{ Authorization = "Bearer $($saved.token)" } `
  -ContentType "application/json" `
  -Body $body
```

The server resolves the real team and user from the saved login. Body IDs can
ask for a narrower search, but they cannot widen access.

For endpoint details, see [Hosted memory API](../memory/hosted-api.md).

## File sync model

Team OS file sync is permission-scoped. It exposes only text Agentic OS files
under granted client workspaces.

The server decides:

* which clients the signed-in user can see;
* whether each client grant is `read` or `write`;
* which files appear in the manifest;
* whether a push can write a file.

The local client never receives full server filesystem access.

## View the manifest

Show all granted client files:

```powershell
npm run team -- sync manifest
```

Show one client:

```powershell
npm run team -- sync manifest --client acme
```

Expected output:

```text
clients/acme/context/notes.md    245    write
clients/acme/AGENTS.md           800    read
```

If no files are available, confirm the user has an active client grant.

## Pull granted files

Pull one client into a local folder:

```powershell
$pull="$env:TEMP\team-os-pull"
npm run team -- sync pull --client acme --dest $pull
```

This creates a folder like:

```text
team-os-pull/
|-- .agentic-os/
|   `-- team-sync-state.json
`-- clients/
    `-- acme/
        `-- context/
            `-- notes.md
```

The state file stores the remote SHA for each pulled file. Team OS uses that
SHA to prevent accidental overwrites during push.

## Push file changes

A user needs a `write` client grant to push files.

The source can be either a workspace folder that contains `clients/acme`:

```powershell
npm run team -- sync push --client acme --src $pull
```

Or the client folder itself:

```powershell
npm run team -- sync push --client acme --src "$pull\clients\acme"
```

For existing remote files, pull before pushing. If the local state does not have
a base SHA, the command stops with this message:

```text
No base version for clients/acme/context/notes.md. Run sync pull before pushing existing files.
```

## Conflict behavior

Team OS sends the last pulled SHA when it pushes an existing file. If the server
file changed since the pull, the server returns a conflict instead of silently
overwriting the new remote version.

To resolve a conflict:

1. Run `sync pull` into a clean folder.
2. Compare the remote file with your local change.
3. Merge the content manually.
4. Run `sync push` again.

## Excluded files

Sync includes text files only. It skips large files and sensitive or generated
paths.

Common exclusions:

* `.env`, `.env.local`, `.env.*`, and `.mcp.json`
* `.git`, `.next`, `.memsearch`, `.command-centre`, and `node_modules`
* `backups`, `coverage`, and `dist`
* `clients/<slug>/context/transcripts`
* files larger than 1 MB

Do not use Team OS file sync for secrets. Shared secrets use the Team OS secrets
flow in Command Centre.

## Revoke behavior

Client grant changes take effect on the next server request.

After a grant is revoked:

* `sync manifest` no longer lists that client;
* `sync pull` cannot fetch that client;
* `sync push` is denied for that client;
* old local files are not automatically deleted from disk.

When access changes, remove old pulled folders from the local machine if they
should no longer be used.

## Restricted local runner workflow

Use this workflow when testing a member who should see only one client.

1. Sign in as that member.
2. Run `npm run team -- clients`.
3. Pull the granted client into a clean folder.
4. Start the local runner from the pulled folder, not from the full source
   workspace.

Example:

```powershell
$env:AGENTIC_OS_TEAM_CONFIG_DIR="$env:TEMP\aios-member-client"
npm run team -- login --api-url https://team.example.com --email member@example.com --password "<password>"
npm run team -- sync pull --client acme --dest "$env:TEMP\team-os-member-runner"
cd "$env:TEMP\team-os-member-runner"
Get-ChildItem -Recurse
```

The folder should contain only files returned by the Team OS manifest.

## Next

Continue with [Team OS admin operations](../admin/team-os-admin.md).
