/**
 * Gallery thumbs for `/ai`: `public/images/ai/{slug}.webp` or `.png`.
 * Add a slug here once the capture is committed under that path.
 */

const THUMB_EXT = {
  "agent-activity": "png",
  "agent-activity-2": "png",
  "ai-sidebar": "png",
  "approval-card": "png",
  "attachment": "png",
  "citations": "png",
  "code-block": "png",
  "file-diff": "webp",
  "fluid-orb": "webp",
  "image-generation": "webp",
  "image-generation-2": "webp",
  "inline-citation": "webp",
  "loading-states": "webp",
  "mic-selector": "webp",
  "model-selector": "webp",
  "open-in-chat": "webp",
  "persona": "webp",
  "prompt-input": "webp",
  "prompt-input-2": "webp",
  "queue": "webp",
  "reasoning-text": "webp",
  "selection-actions": "webp",
  "streaming-response": "webp",
  "structured-output": "webp",
  "task-rows": "webp",
  "terminal": "webp",
  "thinking-orbs": "webp",
  "todo-list": "webp",
  "tool-approval": "webp",
  "trace": "webp",
  "transcription": "webp",
  "voice-ai-orb": "webp",
  "voice-selector": "webp",
} as const satisfies Record<string, "png" | "webp">

const THUMB_SLUGS = new Set(Object.keys(THUMB_EXT))

export function aiThumbSrc(slug: string) {
  const ext = THUMB_EXT[slug as keyof typeof THUMB_EXT] ?? "webp"
  return `/images/ai/${slug}.${ext}`
}

export function hasAiThumb(slug: string) {
  return THUMB_SLUGS.has(slug)
}

export function aiSlugFromHref(href: string) {
  return href.replace(/^\/ai\//, "").replace(/\/$/, "")
}
