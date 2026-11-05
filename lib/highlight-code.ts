import {
  createHighlighter,
  createJavaScriptRegexEngine,
  type Highlighter,
} from "shiki"

export type CodeLang =
  | "tsx"
  | "ts"
  | "typescript"
  | "jsx"
  | "js"
  | "javascript"
  | "html"
  | "css"
  | "json"
  | "bash"
  | "shell"
  | "sh"

/** VS Code Dark+ - the default dark editor theme. */
const THEME = "dark-plus" as const

const langs = [
  "tsx",
  "typescript",
  "jsx",
  "javascript",
  "html",
  "css",
  "json",
  "bash",
  "shellscript",
] as const

/** JS engine avoids Oniguruma WASM corruption under Turbopack/HMR. */
const engine = createJavaScriptRegexEngine()

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...langs],
      engine,
    })
  }
  return highlighterPromise
}

function resolveLang(lang: CodeLang): string {
  switch (lang) {
    case "ts":
      return "typescript"
    case "js":
      return "javascript"
    case "shell":
    case "sh":
      return "bash"
    default:
      return lang
  }
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function plainCodeHtml(code: string) {
  return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
}

/** Skip Shiki above this size - large registry sources (e.g. clothes-rack drapes) blow Vercel SSR budgets. */
const HIGHLIGHT_MAX_CHARS = 32_000

/**
 * Extensions that are not worth running through Shiki on docs SSR.
 * Bundled SVG/image/binary payloads (e.g. icon-cloud ×30) otherwise blow
 * Vercel `FUNCTION_INVOCATION_TIMEOUT` when each file is highlighted as tsx.
 */
const PLAIN_INSTALL_EXTS = new Set([
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
  ".ico",
  ".bin",
  ".gltf",
  ".glb",
  ".wasm",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".mp3",
  ".mp4",
  ".hdr",
  ".exr",
])

function extname(path: string): string {
  const base = path.split(/[/\\]/).pop() ?? path
  const i = base.lastIndexOf(".")
  return i === -1 ? "" : base.slice(i).toLowerCase()
}

/** Map an install path to a Shiki lang, or `null` for plain escape only. */
export function highlightLangForPath(path: string): CodeLang | null {
  const ext = extname(path)
  if (!ext || PLAIN_INSTALL_EXTS.has(ext)) return null
  switch (ext) {
    case ".tsx":
    case ".jsx":
      return "tsx"
    case ".ts":
      return "ts"
    case ".js":
    case ".mjs":
    case ".cjs":
      return "js"
    case ".css":
      return "css"
    case ".json":
      return "json"
    case ".html":
    case ".htm":
      return "html"
    case ".bash":
    case ".sh":
      return "bash"
    default:
      // Unknown / data-ish: avoid guessing tsx (SVG-as-tsx was the 504 trigger).
      return null
  }
}

/** Highlight a registry install file by path (assets stay plain). */
export async function highlightInstallFile(
  path: string,
  code: string
): Promise<string> {
  const lang = highlightLangForPath(path)
  if (!lang) return plainCodeHtml(code.replace(/\n$/, ""))
  return highlightCode(code, lang)
}

/** Highlight source with VS Code Dark+ (shiki `dark-plus`). */
export async function highlightCode(
  code: string,
  lang: CodeLang = "tsx"
): Promise<string> {
  const source = code.replace(/\n$/, "")

  // Plain escape is enough for huge baked/data files; highlighting them times out serverless.
  if (source.length > HIGHLIGHT_MAX_CHARS) {
    return plainCodeHtml(source)
  }

  try {
    const highlighter = await getHighlighter()
    return highlighter.codeToHtml(source, {
      lang: resolveLang(lang),
      theme: THEME,
    })
  } catch (error) {
    // Drop the cached highlighter so the next request can recover.
    highlighterPromise = null
    console.error("[highlight-code] falling back to plain code:", error)
    return plainCodeHtml(source)
  }
}
