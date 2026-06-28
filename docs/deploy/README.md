# Deploy

Use this section for hosted and production setup.

Start here when you need to run Team OS from a hosted server instead of a local
solo workspace.

<table data-view="cards">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Team OS hosted server setup</strong></td>
      <td>Deploy Postgres with pgvector and the Team OS API.</td>
      <td><a href="team-os-hosted-server.md">team-os-hosted-server.md</a></td>
    </tr>
    <tr>
      <td><strong>Connect after deploy</strong></td>
      <td>Sign in from a local client after the server is healthy.</td>
      <td><a href="/team-os/client-connection">/team-os/client-connection</a></td>
    </tr>
  </tbody>
</table>

## Deploy choices

| Path | Use it when |
| --- | --- |
| Separate Postgres and API services | You need production backups, scaling, and independent lifecycle management. |
| Single Compose or Coolify stack | You need a simpler self-hosted install for a small team. |

Next: [Admin](/admin)
