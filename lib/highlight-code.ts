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

/** VS Code Dark+ — the default dark editor theme. */
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

function plainCodeHtml(code: string) {
  return `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
}

/** Skip Shiki above this size — large registry sources (e.g. clothes-rack drapes) blow Vercel SSR budgets. */
const HIGHLIGHT_MAX_CHARS = 32_000

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
