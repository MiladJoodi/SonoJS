export type MarkdownDraft = {
  markdown: string
  updatedAt: number
}

const DRAFT_KEY = "sonojs.tools.markdown-editor.draft"

export const EMPTY_DRAFT: MarkdownDraft = {
  markdown: "",
  updatedAt: 0,
}

/** Starter content when there is no saved draft. */
export const SAMPLE_MARKDOWN = `---
title: Welcome
tags:
  - markdown
  - draft
---

# Welcome

Try *italic*, ~~strike~~, <u>underline</u>, and \`inline code\`.

## Modes

- **Write** for rich editing (toolbar: Rich text · Source · Diff)
- **Preview** for a clean reading view
- **Ctrl/Cmd+S** save · **Ctrl/Cmd+F** find · **Zen** from the menu

## Lists

- Bullet item
- Nested
  - Nested item

1. Ordered one
2. Ordered two

- [x] Checklist done
- [ ] Checklist next

## Quote & break

> Tip: insert images, tables, code, admonitions, and frontmatter from the toolbar.

---

## Code

\`\`\`ts
export function hello(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Table

| Feature | Status |
| --- | --- |
| Rich text | Ready |
| Source / Diff | Ready |

## Admonition

:::tip
Admonitions: tip, note, info, caution, danger — insert from the toolbar.
:::

## Link

Read more in the [Markdown Guide](https://www.markdownguide.org/).

Happy writing.
`

export function loadDraft(): MarkdownDraft {
  if (typeof window === "undefined") return EMPTY_DRAFT
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return EMPTY_DRAFT
    const parsed = JSON.parse(raw) as Partial<MarkdownDraft>
    return {
      markdown: typeof parsed.markdown === "string" ? parsed.markdown : "",
      updatedAt:
        typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
    }
  } catch {
    return EMPTY_DRAFT
  }
}

export function getInitialMarkdown(): string {
  const draft = loadDraft()
  if (draft.markdown.trim().length > 0) return draft.markdown
  return SAMPLE_MARKDOWN
}

/** Explicit persist — call on Save / leave tab, not on every keystroke. */
export function saveDraft(markdown: string): MarkdownDraft {
  const draft: MarkdownDraft = {
    markdown,
    updatedAt: Date.now(),
  }
  if (typeof window === "undefined") return draft
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  return draft
}

export function clearDraft(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(DRAFT_KEY)
}
