/**
 * Make consumer globals.css a reliable Tailwind v4 entry for SonoJS.
 *
 * create-next-app leaves prefers-color-scheme :root colors that fight
 * SonoJS class-based `.dark` + `--canvas`. Nested `@theme` in an imported
 * file is also unreliable under Next + `@tailwindcss/turbopack` — so we
 * put `@theme` / `@source` on the same file that `@import "tailwindcss"`.
 */

import { access, readFile, writeFile } from "node:fs/promises"
import { constants as fsConstants } from "node:fs"
import path from "node:path"

async function pathExists(p) {
  try {
    await access(p, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

export async function findGlobalsCss(cwd) {
  const candidates = [
    "app/globals.css",
    "src/app/globals.css",
    "src/styles/globals.css",
    "styles/globals.css",
  ]
  for (const rel of candidates) {
    const abs = path.resolve(cwd, rel)
    if (await pathExists(abs)) return { abs, rel }
  }
  return null
}

export function importLineForGlobals(cwd, globalsAbs) {
  const sonoAbs = path.resolve(cwd, "styles/sonojs.css")
  let rel = path.relative(path.dirname(globalsAbs), sonoAbs).replace(/\\/g, "/")
  if (!rel.startsWith(".")) rel = `./${rel}`
  return `@import "${rel}";`
}

/** Block-critical utilities — emit even if a path is missed by content scan. */
export const SONOJS_SOURCE_INLINE_LINES = [
  '@source inline("border-destructive bg-destructive text-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[invalid=true]:text-destructive data-[invalid=true]:[&_[data-slot=label]]:text-destructive data-[invalid=true]:[&_[data-slot=field-label]]:text-destructive");',
  '@source inline("ltr:data-[state=checked]:translate-x-[calc(100%-2px)] rtl:data-[state=checked]:-translate-x-[calc(100%-2px)]");',
  '@source inline("bg-canvas bg-card text-card-foreground border-border/70 shadow-soft rounded-[12px] ring-border/70");',
  '@source inline("bg-primary hover:bg-primary/90 bg-primary/90 !text-white text-primary bg-destructive hover:bg-destructive/90 text-destructive text-muted-foreground bg-muted hover:bg-muted bg-secondary text-secondary-foreground bg-accent text-accent-foreground text-foreground text-background bg-foreground bg-background from-card via-card/70 to-transparent");',
]

/**
 * Same maps as templates/init/styles/sonojs.css — kept on the Tailwind entry
 * so Turbopack always generates semantic color utilities.
 */
export const SONOJS_THEME_INLINE_BLOCK = `@theme inline {
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: var(--radius);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.333);
  --radius-2xl: calc(var(--radius) * 1.667);
  --radius-3xl: calc(var(--radius) * 2);
  --radius-4xl: calc(var(--radius) * 2.333);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-canvas: var(--canvas);
  --color-border-soft: var(--border-soft);
  --shadow-soft: var(--shadow-soft);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-collapsible-down: collapsible-down 0.3s ease-out;
  --animate-collapsible-up: collapsible-up 0.25s ease-out;
  --animate-caret-blink: caret-blink 1.25s ease-out infinite;
}
`

const ENTRY_MARKER = "/* sonojs-tailwind-entry */"

/**
 * Remove create-next-app theme that fights SonoJS class-based `.dark`.
 * Tokens live in styles/sonojs.css — globals must not override --foreground
 * via prefers-color-scheme while --canvas stays light.
 */
export function stripCreateNextAppTheme(css) {
  let next = css

  // @media (prefers-color-scheme: dark) { :root { … } }
  next = next.replace(
    /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)\s*\{\s*:root\s*\{[\s\S]*?\}\s*\}/g,
    `${ENTRY_MARKER} /* removed OS media :root colors — SonoJS uses class .dark */`
  )

  // Bare :root color islands without SonoJS --primary (CNA or soft-surface-only patches)
  next = next.replace(/:root\s*\{([^{}]*)\}/g, (full, body) => {
    const hasPrimary = /--primary\s*:/.test(body)
    const hasBgOrFg =
      /--background\s*:/.test(body) || /--foreground\s*:/.test(body)
    if (!hasPrimary && hasBgOrFg) {
      return `${ENTRY_MARKER} /* removed conflicting :root — tokens in styles/sonojs.css */`
    }
    return full
  })

  return next
}

/**
 * @param {string} globalsAbs
 * @param {string} cwd
 */
export async function buildSourcePathLines(globalsAbs, cwd) {
  const dir = path.dirname(globalsAbs)
  const roots = [
    path.resolve(cwd, "components"),
    path.resolve(cwd, "lib"),
    path.resolve(cwd, "hooks"),
    path.resolve(cwd, "src"),
    path.resolve(cwd, "app"),
  ]

  const lines = []
  const seen = new Set()

  for (const root of roots) {
    if (!(await pathExists(root))) continue
    let rel = path.relative(dir, root).replace(/\\/g, "/")
    if (!rel.startsWith(".")) rel = `./${rel}`
    const line = `@source "${rel}/**/*.{js,ts,jsx,tsx,mdx}";`
    if (seen.has(line)) continue
    seen.add(line)
    lines.push(line)
  }

  return lines
}

function insertAfterImports(css, block) {
  const importBlock = css.match(/^(?:@import[^;]+;\s*)+/m)
  if (importBlock) {
    const end = importBlock.index + importBlock[0].length
    return css.slice(0, end) + block + css.slice(end)
  }
  return block + css
}

/**
 * Ensure sonojs import, strip CNA theme conflict, and pin @theme/@source
 * on the Tailwind entry stylesheet.
 */
export async function ensureGlobalsThemeEntry(cwd) {
  const found = await findGlobalsCss(cwd)
  if (!found) {
    return {
      status: "missing",
      message:
        'No globals.css found — add: @import "../styles/sonojs.css";',
    }
  }

  let css = await readFile(found.abs, "utf8")
  const before = css
  const keys = []

  // 1) Import styles/sonojs.css
  if (!css.includes("sonojs.css")) {
    const importLine = importLineForGlobals(cwd, found.abs)
    css = insertAfterImports(css, `${importLine}\n`)
    keys.push("import")
  }

  // 2) Strip create-next-app prefers-color-scheme / conflicting :root
  const stripped = stripCreateNextAppTheme(css)
  if (stripped !== css) {
    css = stripped
    keys.push("strip-cna-theme")
  }

  // 3) Ensure @custom-variant dark on entry
  if (!css.includes("@custom-variant dark")) {
    css = insertAfterImports(
      css,
      `\n${ENTRY_MARKER}\n@custom-variant dark (&:is(.dark *));\n`
    )
    keys.push("custom-variant-dark")
  }

  // 4) @source path globs for CLI install roots (components/ outside src/, etc.)
  const pathLines = await buildSourcePathLines(found.abs, cwd)
  for (const line of pathLines) {
    if (!css.includes(line)) {
      css = insertAfterImports(css, `\n${line}\n`)
      keys.push("source-paths")
    }
  }

  // 5) Inline safelist (idempotent by distinctive class tokens)
  const safelistNeedles = [
    ["data-[invalid=true]:text-destructive", SONOJS_SOURCE_INLINE_LINES[0]],
    ["rtl:data-[state=checked]:-translate-x", SONOJS_SOURCE_INLINE_LINES[1]],
    ["bg-canvas bg-card text-card-foreground", SONOJS_SOURCE_INLINE_LINES[2]],
    ["bg-primary hover:bg-primary/90", SONOJS_SOURCE_INLINE_LINES[3]],
  ]
  for (const [needle, line] of safelistNeedles) {
    if (css.includes(needle)) continue
    css = insertAfterImports(css, `\n${line}\n`)
    keys.push("source-inline")
  }

  // 6) @theme inline on entry (Turbopack-safe)
  if (!css.includes("--color-primary:")) {
    css = insertAfterImports(
      css,
      `\n${ENTRY_MARKER}\n${SONOJS_THEME_INLINE_BLOCK}\n`
    )
    keys.push("theme-inline")
  }

  if (css === before) {
    return { status: "exists", rel: found.rel, keys: [] }
  }

  await writeFile(found.abs, css, "utf8")
  return {
    status: "patched",
    rel: found.rel,
    keys: [...new Set(keys)],
  }
}
