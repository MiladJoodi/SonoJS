/**
 * packages/ui uses @sonojs/ui/*; consumers get @/* after install.
 * AI docs items (and their AI-only helpers) install under components/sonojs/.
 */

/** @type {ReadonlySet<string>} */
export const SONOJS_COMPONENT_ROOTS = new Set([
  "agent-code",
  "agent-disclosure",
  "approval-card",
  "fluid-orb",
  "image-generation",
  "tool-approval",
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
