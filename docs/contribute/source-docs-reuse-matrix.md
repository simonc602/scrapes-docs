# Source Docs Reuse Matrix

This matrix records which documentation patterns Agentic OS should keep, adapt,
replace, or delete from the source documentation structure.

| Area | Decision | Agentic OS use |
| --- | --- | --- |
| GitBook spaces and `SUMMARY.md` files | Keep | Use `docs/SUMMARY.md` for public navigation and section `SUMMARY.md` files for each top-level area. |
| Frontmatter | Adapt | Use frontmatter only when GitBook or publishing needs it. Do not add metadata that has no reader value. |
| Hints | Keep | Use for warnings, secrets handling, setup notes, and permission details. |
| Tabs | Keep | Use for Docker, Coolify, Railway, VPS, terminal, and Command Centre paths. |
| Collapsibles | Keep | Use for optional detail that would slow down the main task. |
| Titled code blocks | Keep | Use for commands, config examples, expected output, and logs. |
| Tables | Keep | Use for terms, permissions, environment variables, commands, and troubleshooting. |
| Reusable includes | Adapt | Use for repeated warning blocks, secrets notes, and verification steps. |
| Vale rules | Adapt | Keep a small style rule set focused on simple English and Agentic OS terms. |
| Lychee workflow | Adapt | Keep external link checks, with exclusions only for known blocked public sites. |
| Authoring skill | Adapt | Replace source-project wording with Agentic OS guidance and templates. |
| Product docs | Delete | Replace source product content with Agentic OS pages. |
| Generated integration docs | Delete | Not relevant to Agentic OS documentation. |
| Old URLs and product assets | Delete | Keep only approved source/license notes. |

## Useful visual patterns

Agentic OS should reuse these patterns:

* Numbered steps for setup flows.
* Warning hints before destructive or secret-handling actions.
* Tabs for hosting choices and UI versus terminal paths.
* Tables for permissions, environment variables, and command reference.
* Small examples after complex concepts.
* Internal links at the end of setup pages.
