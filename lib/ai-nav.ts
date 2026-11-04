export type AiNavPage = {
  title: string
  href: string
  featured?: boolean
  badge?: "new"
}

export type AiNavGroup = {
  title: string
  pages: AiNavPage[]
}

/** Sidebar + index for `/ai`. Docs-only catalog — install targets stay in packages/ui. */
export const aiNav: {
  top: AiNavPage[]
  groups: AiNavGroup[]
} = {
  top: [{ title: "All AI", href: "/ai" }],
  groups: [
    {
      title: "Components",
      pages: [
        { title: "Agent Activity", href: "/ai/agent-activity", featured: true },
        { title: "Agent Activity 2", href: "/ai/agent-activity-2" },
        { title: "AI Sidebar", href: "/ai/ai-sidebar", featured: true },
        { title: "Approval Card", href: "/ai/approval-card" },
        { title: "Attachment", href: "/ai/attachment", featured: true },
        { title: "Citations", href: "/ai/citations", featured: true },
        { title: "Code Block", href: "/ai/code-block", featured: true },
        { title: "File Diff", href: "/ai/file-diff" },
        { title: "Fluid AI Orb", href: "/ai/fluid-orb", featured: true },
        { title: "Image Generation", href: "/ai/image-generation", featured: true },
        { title: "Image Generation 2", href: "/ai/image-generation-2" },
        { title: "Inline Citation", href: "/ai/inline-citation" },
        { title: "Loading States", href: "/ai/loading-states", featured: true },
        { title: "Mic Selector", href: "/ai/mic-selector" },
        { title: "Model Selector", href: "/ai/model-selector", featured: true },
        { title: "Open In Chat", href: "/ai/open-in-chat" },
        { title: "Persona", href: "/ai/persona" },
        { title: "Prompt Input", href: "/ai/prompt-input", featured: true },
        { title: "Prompt Input 2", href: "/ai/prompt-input-2" },
        { title: "Queue", href: "/ai/queue" },
        { title: "Reasoning Text", href: "/ai/reasoning-text", featured: true },
        { title: "Selection Actions", href: "/ai/selection-actions" },
        { title: "Streaming Response", href: "/ai/streaming-response", featured: true },
        { title: "Structured Output", href: "/ai/structured-output" },
        { title: "Task Rows", href: "/ai/task-rows" },
        { title: "Terminal", href: "/ai/terminal" },
        { title: "Thinking Orbs", href: "/ai/thinking-orbs", featured: true },
        { title: "Todo List", href: "/ai/todo-list" },
        { title: "Tool Approval", href: "/ai/tool-approval", featured: true },
        { title: "Trace", href: "/ai/trace" },
        { title: "Transcription", href: "/ai/transcription", featured: true },
        { title: "Voice AI Orb", href: "/ai/voice-ai-orb", featured: true },
        { title: "Voice Selector", href: "/ai/voice-selector" },
      ],
    },
  ],
}

export function getAiPages(): AiNavPage[] {
  return aiNav.groups.flatMap((group) => group.pages)
}

export function getAiSlugs(): string[] {
  return getAiPages().map((page) => page.href.replace(/^\/ai\//, ""))
}

export function getAiCurrentLabel(pathname: string): string | null {
  if (pathname === "/ai") return "AI"
  const page = getAiPages().find((p) => p.href === pathname)
  return page?.title ?? null
}

export function getAiAdjacent(pathname: string): {
  previous: AiNavPage | null
  next: AiNavPage | null
} {
  const pages = getAiPages()
  const index = pages.findIndex((page) => page.href === pathname)
  if (index === -1) return { previous: null, next: null }
  return {
    previous: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
