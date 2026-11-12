/**
 * packages/ui uses @sonojs/ui/*; consumers get @/* after install.
 * AI docs items (and their AI-only helpers) install under components/sonojs/.
 * A few social / standalone cards install at components/<name> (not under ui/).
 */

/** @type {ReadonlySet<string>} */
export const SONOJS_COMPONENT_ROOTS = new Set([
  "agent-activity",
  "agent-activity-2",
  "agent-code",
  "agent-code-block",
  "agent-disclosure",
  "ai-sidebar",
  "approval-card",
  "citations",
  "file-diff",
  "fluid-orb",
  "image-generation",
  "image-generation-2",
  "inline-citation",
  "loading-states",
  "mic-selector",
  "model-selector",
  "open-in-chat",
  "persona",
  "prompt-input",
  "prompt-input-2",
  "queue",
  "reasoning-text",
  "selection-actions",
  "streaming-response",
  "structured-output",
  "task-rows",
  "terminal",
  "thinking-orbs",
  "todo-list",
  "tool-approval",
  "transcription",
  "voice-ai-orb",
  "voice-selector",
])

/**
 * Install at `components/<name>` (sibling of `ui/`, not inside it).
 * `3d` nests as `components/3d/<item>/…`.
 * `carousels` nests as `components/carousels/<item>/…`.
 * `clothes-rack` stays flat under Components (also listed on `/3d`).
 */
/** @type {ReadonlySet<string>} */
export const TOP_LEVEL_COMPONENT_ROOTS = new Set([
  "tweet-card",
  "clothes-rack",
  "dotted-map",
  "dropzone",
  "lens",
  "magic-card",
  "phone-input",
  "progressive-blur",
  "border-beam",
  "confetti",
  "shine-border",
  "3d",
  "carousels",
])

/**
 * @param {string} spec - Path after `@sonojs/ui/components/`
 * @returns {"sonojs" | "ui" | null} null = top-level under `components/`
 */
export function consumerComponentsFolder(spec) {
  const root = spec.split("/")[0] ?? ""
  if (TOP_LEVEL_COMPONENT_ROOTS.has(root)) return null
  return SONOJS_COMPONENT_ROOTS.has(root) ? "sonojs" : "ui"
}

/**
 * @param {string} spec - Path after `@sonojs/ui/components/`
 * @returns {string} Consumer import path without quotes
 */
export function consumerComponentImportPath(spec) {
  const folder = consumerComponentsFolder(spec)
  return folder ? `@/components/${folder}/${spec}` : `@/components/${spec}`
}

/**
 * @param {string} content
 * @returns {string}
 */
export function rewriteConsumerImports(content) {
  return content
    .replace(
      /from\s+["']@sonojs\/ui\/components\/([^"']+)["']/g,
      (_full, spec) => `from "${consumerComponentImportPath(spec)}"`
    )
    .replace(
      /from\s+["']@sonojs\/ui\/hooks\/([^"']+)["']/g,
      'from "@/hooks/$1"'
    )
    .replace(
      /from\s+["']@sonojs\/ui\/lib\/([^"']+)["']/g,
      'from "@/lib/$1"'
    )
}
