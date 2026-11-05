import { readFile } from "node:fs/promises"
import path from "node:path"

import type { VariantExample } from "@/components/docs/variant-preview"
import { highlightCode } from "@/lib/highlight-code"
import { rewriteConsumerImports } from "../scripts/rewrite-consumer-imports.mjs"

/** Longer names first so `alert-dialog` wins over `alert`. */
const EXAMPLE_FOLDERS = [
  "agent-activity",
  "agent-activity-2",
  "agent-code-block",
  "ai-sidebar",
  "alert-dialog",
  "approval-card",
  "attachment",
  "button-group",
  "breadcrumb",
  "accordion",
  "avatar",
  "badge",
  "border-beam",
  "bubble",
  "alert",
  "button",
  "context-menu",
  "code-block",
  "collapsible",
  "combobox",
  "command",
  "confetti",
  "carousel",
  "checkbox",
  "citations",
  "card",
  "data-table",
  "date-picker",
  "dialog",
  "dotted-map",
  "drawer",
  "dropdown-menu",
  "electro-border",
  "empty",
  "field",
  "file-diff",
  "fluid-orb",
  "hover-card",
  "image-generation",
  "image-generation-2",
  "inline-citation",
  "input-group",
  "input-otp",
  "input",
  "tool-approval",
  "item",
  "kbd",
  "label",
  "lens",
  "loading-states",
  "marker",
  "marquee",
  "menubar",
  "message-scroller",
  "message",
  "mic-selector",
  "model-selector",
  "open-in-chat",
  "native-select",
  "persona",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "progressive-blur",
  "pro-button",
  "prompt-input-2",
  "prompt-input",
  "queue",
  "radio-group",
  "reasoning-text",
  "resizable",
  "scroll-area",
  "select",
  "selection-actions",
  "separator",
  "sheet",
  "skeleton",
  "slider",
  "sortable",
  "sonner",
  "spinner",
  "streaming-response",
  "structured-output",
  "switch",
  "table",
  "tabs",
  "task-list",
  "task-rows",
  "terminal",
  "thinking-orbs",
  "timeline",
  "todo-list",
  "textarea",
  "toggle-group",
  "toggle",
  "tooltip",
  "trace",
  "transcription",
  "clothes-rack",
  "3d/image-ring",
  "3d/glass-coin-carousel",
  "3d/hover-gallery",
  "3d/image-marquee",
  "3d/model-viewer",
  "3d/perspective-card",
  "3d/scroll-trigger",
  "3d/smokey-frame",
  "3d/image-pageflip",
  "3d/beam-circle",
  "3d/beam-circle-3d",
  "3d/infinite-drift",
  "3d/infinite-drift-2",
  "3d/hanging-id-card",
  "3d/plasma-globe",
  "3d/globe",
  "3d/orbiting-circles",
  "3d/icon-cloud",
  "carousels/3d-image-carousel",
  "carousels/3d-carousel",
  "carousels/3d-image-slider",
  "carousels/3d-bend-carousel",
  "carousels/3d-slider",
  "carousels/angled-slider",
  "carousels/chain-carousel",
  "carousels/stylish-carousel",
  "carousels/cool-slide-gallery",
  "tweet-card",
  "verified-badge",
  "voice-ai-orb",
  "voice-selector",
] as const

function exampleSlug(folder: string): string {
  const i = folder.lastIndexOf("/")
  return i === -1 ? folder : folder.slice(i + 1)
}

function exampleFilePath(exampleName: string): string | null {
  const foldersBySlugLength = [...EXAMPLE_FOLDERS].sort(
    (a, b) => exampleSlug(b).length - exampleSlug(a).length
  )
  for (const folder of foldersBySlugLength) {
    const slug = exampleSlug(folder)
    const prefix = `${slug}-`
    if (!exampleName.startsWith(prefix)) continue
    const file = exampleName.slice(prefix.length)
    return path.join(
      process.cwd(),
      "registry",
      "examples",
      ...folder.split("/"),
      `${file}.tsx`
    )
  }
  return null
}

/** Rewrite monorepo imports to consumer install paths for docs Code tab. */
function toConsumerSource(source: string): string {
  return rewriteConsumerImports(source)
}

/**
 * Attach consumer-facing source + highlighted HTML for each variant tab.
 * Used by docs Preview | Code chrome.
 */
export async function withVariantCode(
  examples: Pick<
    VariantExample,
    "name" | "title" | "description" | "requires" | "npmRequires"
  >[]
): Promise<VariantExample[]> {
  return Promise.all(
    examples.map(async (item) => {
      const filePath = exampleFilePath(item.name)
      if (!filePath) {
        return item
      }
      try {
        const raw = await readFile(filePath, "utf8")
        const code = toConsumerSource(raw)
        return {
          ...item,
          code,
          codeHtml: await highlightCode(code),
        }
      } catch {
        return item
      }
    })
  )
}
