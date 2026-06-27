---
name: agentic-os-docs-author
description: Write and review Agentic OS documentation in simple English using the local GitBook structure.
---

# Agentic OS Docs Author

Use this skill when creating or reviewing Agentic OS documentation.

## Workflow

1. Identify the reader goal.
2. Choose the right page type from `document-templates/`.
3. Write in simple English.
4. Use Agentic OS product terms from `docs/contribute/style-guide.md`.
5. Add practical examples when a concept is complex.
6. Add internal links when the reader may need related context.
7. Update the relevant `SUMMARY.md`.
8. Use `docs/contribute/visual-style.md` for logos, colors, and screenshots.
9. Run `pwsh ./scripts/check-docs.ps1`.

## Page choices

* Concept: explain what something is.
* How-to: help the reader complete one task.
* Tutorial: guide a first-time path.
* Reference: list commands, settings, APIs, or fields.
* Troubleshooting: explain symptoms, causes, and fixes.
* Release notes: record changes.

## Writing rules

* Prefer short sentences.
* Use active voice.
* Avoid filler words.
* Keep setup steps in the order the reader should run them.
* Show expected output when it helps users confirm success.
* Never include real secrets.

## GitBook blocks

Use hints, tabs, collapsibles, titled code blocks, images, reusable includes,
and tables only when they help the reader finish the task faster.

## Reference

Read `reference.md` in this folder for reusable patterns.
