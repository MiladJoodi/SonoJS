# Command Menu — pending sketches

**Catalog:** Navigation → Command Menu  
Each file is a *distinct* UX job. Port one at a time; do not ship `_references/`.

| # | File | Job (why it exists) |
|---|---|---|
| 01 | `01-inline-create.tsx` | Embedded palette — no modal; lives in page chrome |
| 02 | `02-global-launcher.tsx` | Classic ⌘K app launcher + hint footer |
| 03 | `03-people-scout.tsx` | People search with chip filters + match highlight |
| 04 | `04-code-jump.tsx` | IDE-style file jump (path + type pill) |
| 05 | `05-integration-split.tsx` | Split list \| detail studio for integrations |
| 06 | `06-slash-studio.tsx` | Slash / AI action palette (`/` groups) |

When shipping: Sono tokens, Lucide, `CommandSeparator`, logical CSS, `cursor-pointer`.

## Audit checklist (refs)

- [x] Dark / light: `bg-popover` / `bg-card` / `border-border` / `text-muted-foreground` / `primary` only
- [x] Responsive: `max-h-[min(…,dvh)]`, wrapping footers, mobile list↔detail (05), `w-full min-w-0`
- [x] RTL / LTR: `text-start`, `ms-auto`, `md:border-e`, `icon-dir` back, `dir="ltr"` on paths / shortcuts / slash / kbd
