# Authoring Kit

Use the templates in `document-templates/` when creating new pages.

| Template | Use for |
| --- | --- |
| `concept.md` | Explaining an idea before a task. |
| `how-to.md` | Helping users complete one task. |
| `tutorial.md` | Guiding a first-time end-to-end path. |
| `reference.md` | Listing commands, settings, APIs, or fields. |
| `troubleshooting.md` | Explaining symptoms, causes, and fixes. |
| `release-notes.md` | Recording product changes. |

When you add a page:

1. Put it in the right section folder.
2. Add it to the section `SUMMARY.md`.
3. Add a link from a related page if the reader will need it.
4. Run the quality checks.
5. Check [Visual style](visual-style.md) before adding images or theme notes.

## GitBook examples

Use a hint for important setup details:

```markdown
{% hint style="warning" %}
Do not commit real secrets. Use placeholders in examples.
{% endhint %}
```

Use tabs when the same task has more than one path:

```markdown
{% tabs %}
{% tab title="Terminal" %}
Run `agentic team whoami`.
{% endtab %}

{% tab title="Command Centre" %}
Open Team OS and check the signed-in user.
{% endtab %}
{% endtabs %}
```

Use a collapsible block for optional detail:

```markdown
<details>
<summary>Why this matters</summary>

The server is the source of truth for identity and permissions.

</details>
```

Use titled code blocks for commands:

````markdown
```powershell
pwsh ./scripts/check-docs.ps1
```
````

Use images with alt text:

```markdown
![Command Centre Team OS login](../.gitbook/assets/team-os-login.png)
```

Use reusable includes for repeated warnings:

```markdown
{% include "../reusable/secrets-warning.md" %}
```

Use tables for permissions and settings:

```markdown
| Role | Can manage clients | Can grant skills |
| --- | --- | --- |
| Owner | Yes | Yes |
| Member | No | No |
```
