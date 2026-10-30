/**
 * packages/ui uses @sonojs/ui/*; consumers get @/* after install.
 * AI docs items (and their AI-only helpers) install under components/sonojs/.
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
 * @param {string} spec - Path after `@sonojs/ui/components/`
 * @returns {"sonojs" | "ui"}
 */
export function consumerComponentsFolder(spec) {
  const root = spec.split("/")[0] ?? ""
  return SONOJS_COMPONENT_ROOTS.has(root) ? "sonojs" : "ui"
}

/**
 * @param {string} content
 * @returns {string}
 */
export function rewriteConsumerImports(content) {
  return content
    .replace(
      /from\s+["']@sonojs\/ui\/components\/([^"']+)["']/g,
      (_full, spec) =>
        `from "@/components/${consumerComponentsFolder(spec)}/${spec}"`
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
