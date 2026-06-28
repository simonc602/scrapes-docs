# Core concepts

This page explains the main Agentic OS terms in simple English.

| Term | Meaning |
| --- | --- |
| Workspace | The local Agentic OS folder on your machine. |
| Client | A separate workspace for one customer, brand, team, or project area. |
| Context | The instructions and background files that help the agent understand the work. |
| Skill | A reusable instruction package for a specific kind of task. |
| Memory | Searchable records of past context, decisions, learnings, and sessions. |
| Cron | A scheduled job that runs an agent task at a chosen time. |
| Command Centre | The local browser UI for managing Agentic OS. |
| Team OS | Hosted mode for teams, permissions, shared memory, and file sync. |
| Server | The hosted Team OS API and database. |
| Local client | A local Agentic OS workspace signed in to a Team OS server. |

## Claude Code, Codex, and Command Centre

Agentic OS does not replace your AI tools. It gives them a shared workspace.

Claude Code reads `CLAUDE.md`. In Agentic OS, that file imports the shared
instructions from `AGENTS.md`.

Codex reads `AGENTS.md` directly. This lets Claude Code and Codex follow the
same shared rules when they work in the same workspace.

Command Centre is the local UI. It reads the same workspace files and helps you
manage work from the browser.

## Skills

A skill is a focused set of instructions. It tells the agent how to do one kind
of work in a repeatable way.

Examples:

* write marketing copy;
* build a diagram;
* run a scheduled research job;
* capture useful memory at the end of a session.

Skills can be shared at the root workspace. They can also have local client
overrides when one client needs different rules.

## Memory

Memory helps the agent reuse past context. Local memory can run on your machine.
Hosted Team OS memory can run on Postgres with pgvector.

Memory is scoped. A root workspace, a client workspace, a team, and a private
user can have different memory layers.

Read [Memory](/memory) before changing memory settings.

## Team OS

Team OS adds a hosted server. The server becomes the source of truth for users,
teams, clients, roles, grants, shared memory, and file access.

Start with [Team OS concepts](/team-os/concepts) before setup.
