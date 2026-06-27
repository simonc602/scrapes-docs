# Visual style

Use this page when adding docs visuals, screenshots, or GitBook theme settings.

The docs should follow the Command Centre visual direction without becoming a
new design project. Keep the page quiet, readable, and product-led.

## Source of truth

Use these files in the Agentic OS source repo as the visual source:

* `command-centre/src/design-system/theme.css`
* `command-centre/src/design-system/tokens.ts`
* `command-centre/public/logo.png`

The local docs repo stores the GitBook logo at:

```text
docs/.gitbook/assets/agentic-os-logo.png
```

The local MkDocs preview uses this copy:

```text
docs/assets/agentic-os-logo.png
```

## Logo

Use the Agentic OS / Command Centre logo for docs identity.

```markdown
![Agentic OS logo](../assets/agentic-os-logo.png)
```

Use a clear alt text. Do not use decorative logos without alt text.

## Light theme colors

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--cc-canvas` | `#FCF9F7` |
| Surface | `--cc-surface` | `#FFFFFF` |
| Muted surface | `--cc-surface-muted` | `#F6F3F1` |
| Primary text | `--cc-text-primary` | `#1B1C1B` |
| Secondary text | `--cc-text-secondary` | `#5E5E65` |
| Brand primary | `--cc-brand-primary` | `#93452A` |
| Brand hover | `--cc-brand-hover` | `#B25D3F` |
| Brand soft | `--cc-brand-soft` | `#FFDBCF` |
| Warning | `--cc-status-warning` | `#D2783C` |
| Danger | `--cc-status-danger` | `#C04030` |
| Success | `--cc-status-success` | `#6B8E6B` |

## Dark theme colors

| Role | Token | Value |
| --- | --- | --- |
| Canvas | `--cc-canvas` | `#141518` |
| Surface | `--cc-surface` | `#1E2026` |
| Muted surface | `--cc-surface-muted` | `#1A1C21` |
| Primary text | `--cc-text-primary` | `#EDEFF7` |
| Secondary text | `--cc-text-secondary` | `#D3D6E0` |
| Brand primary | `--cc-brand-primary` | `#EB652A` |
| Brand hover | `--cc-brand-hover` | `#FF7A3D` |
| Brand soft | `--cc-brand-soft` | `#3B241E` |

## Fonts

Use these families where the docs platform allows custom fonts:

| Use | Font |
| --- | --- |
| Body | Inter |
| Headings | Epilogue |
| Labels and small UI text | Space Grotesk |
| Code | Space Grotesk or the platform monospace fallback |

If GitBook cannot load a font in the local source, use the closest platform
default and keep the brand colors and logo.

## GitBook theme settings

Some GitBook theme settings are configured in GitBook itself, not in this local
repo. Apply these settings after the private remote and publishing setup exist:

| Setting | Value |
| --- | --- |
| Site title | Agentic OS Docs |
| Logo | `docs/.gitbook/assets/agentic-os-logo.png` |
| Primary color | `#93452A` |
| Accent color | `#B25D3F` |
| Background | `#FCF9F7` |
| Typography | Inter body, Epilogue headings if available |

Do not redesign the layout. Keep GitBook navigation, tables, hints, tabs, code
blocks, and copy button behavior.

## Local preview styling

The local preview uses MkDocs only so the Markdown can be browsed in a local
browser. GitBook remains the public documentation framework.

The preview CSS lives at:

```text
docs/stylesheets/agentic-os.css
```

It mirrors the Command Centre colors and fonts closely enough for local review.
