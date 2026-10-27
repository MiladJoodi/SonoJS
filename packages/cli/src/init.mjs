import { mkdir, readFile, writeFile, access } from "node:fs/promises"
import { constants as fsConstants } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { applyRegistryCssVars } from "./apply-css-vars.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templatesRoot = path.resolve(__dirname, "../templates/init")

/** Neon semantics — same hex as docs `style-vega` / registry cssVars. */
export const CHART_NEON_CSS_VARS = {
  light: {
    "chart-up": "#16a34a",
    "chart-down": "#e11d48",
    "chart-mute": "#52525b",
  },
  dark: {
    "chart-up": "#4ade80",
    "chart-down": "#f25f70",
    "chart-mute": "#d4d4d8",
  },
}

const INIT_FILES = [
  { from: "lib/utils.ts", to: "lib/utils.ts" },
  { from: "lib/direction.ts", to: "lib/direction.ts" },
  { from: "hooks/use-direction.tsx", to: "hooks/use-direction.tsx" },
  { from: "styles/sonojs.css", to: "styles/sonojs.css" },
  { from: "components.json", to: "components.json" },
]

async function pathExists(p) {
  try {
    await access(p, fsConstants.F_OK)
    return true
  } catch {
    return false
  }
}

async function findGlobalsCss(cwd) {
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

function importLineForGlobals(cwd, globalsAbs) {
  const sonoAbs = path.resolve(cwd, "styles/sonojs.css")
  let rel = path.relative(path.dirname(globalsAbs), sonoAbs).replace(/\\/g, "/")
  if (!rel.startsWith(".")) rel = `./${rel}`
  return `@import "${rel}";`
}

/**
 * Ensure existing sonojs.css pulls enter/exit utilities (Sheet, Dialog, …).
 * Safe when the file was skipped because it already existed.
 */
export async function ensureTwAnimateImport(cwd) {
  const sonoAbs = path.resolve(cwd, "styles/sonojs.css")
  if (!(await pathExists(sonoAbs))) {
    return { status: "missing" }
  }

  let css = await readFile(sonoAbs, "utf8")
  if (css.includes("tw-animate-css")) {
    return { status: "exists" }
  }

  css = `@import "tw-animate-css";\n\n${css}`
  await writeFile(sonoAbs, css, "utf8")
  return { status: "patched" }
}

/**
 * Ensure `--chart-up` / `--chart-down` / `--chart-mute` exist (and match vega).
 * Covers projects that inited before neon tokens were part of the baseline.
 */
export async function ensureChartNeonVars(cwd) {
  return applyRegistryCssVars(cwd, CHART_NEON_CSS_VARS)
}

/** Soft surfaces — same as docs `:root` / blocks (`bg-card` + `shadow-soft` on canvas). */
export const SOFT_SURFACE_CSS_VARS = {
  light: {
    canvas: "#f3f3f4",
    "border-soft": "color-mix(in oklab, #e4e4e7 70%, transparent)",
    "shadow-soft":
      "0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18)",
    background: "var(--canvas)",
    card: "#ffffff",
  },
  dark: {
    canvas: "#09090b",
    "border-soft": "color-mix(in oklab, #27272a 70%, transparent)",
    "shadow-soft":
      "0 2px 4px -1px rgba(0, 0, 0, 0.24), 0 28px 56px -28px rgba(0, 0, 0, 0.48)",
    background: "var(--canvas)",
    card: "#18181b",
  },
}

const SOFT_SURFACE_THEME_LINES = [
  "  --color-canvas: var(--canvas);",
  "  --color-border-soft: var(--border-soft);",
  "  --shadow-soft: var(--shadow-soft);",
]

const SHADOW_SOFT_RULE = `.shadow-soft {
  box-shadow: var(--shadow-soft);
}
`

/**
 * Ensure canvas / shadow-soft tokens + utility exist for elevated cards.
 * Covers projects that inited before soft surfaces were part of the baseline.
 */
export async function ensureSoftSurfaceTokens(cwd) {
  const varsResult = await applyRegistryCssVars(cwd, SOFT_SURFACE_CSS_VARS)

  const candidates = [
    "styles/sonojs.css",
    "app/globals.css",
    "src/app/globals.css",
    "src/styles/globals.css",
    "styles/globals.css",
  ]

  let target = null
  for (const rel of candidates) {
    const abs = path.resolve(cwd, rel)
    if (await pathExists(abs)) {
      target = { abs, rel }
      break
    }
  }

  if (!target) {
    return varsResult.status === "missing"
      ? { status: "missing" }
      : { ...varsResult, status: varsResult.status }
  }

  let css = await readFile(target.abs, "utf8")
  let changed = varsResult.status === "patched"
  const keys = [...(varsResult.keys ?? [])]

  if (css.includes("@theme inline") || css.includes("@theme {")) {
    for (const line of SOFT_SURFACE_THEME_LINES) {
      const prop = line.trim().split(":")[0]
      if (!css.includes(prop)) {
        css = css.replace(/(@theme(?:\s+inline)?\s*\{)/, `$1\n${line}`)
        changed = true
        keys.push(prop.replace(/^--/, ""))
      }
    }
  }

  if (!css.includes(".shadow-soft") && !css.includes("@utility shadow-soft")) {
    css = `${css.replace(/\s*$/, "")}\n\n${SHADOW_SOFT_RULE}`
    changed = true
    keys.push("shadow-soft")
  }

  if (
    !css.includes("bg-canvas bg-card") &&
    css.includes("@source inline(")
  ) {
    const marker =
      '@source inline("bg-canvas bg-card text-card-foreground border-border/70 shadow-soft rounded-[12px]");\n'
    if (!css.includes(marker.trim())) {
      css = css.replace(
        /(@source inline\("[^"]*"\);\s*)/,
        `$1${marker}`
      )
      changed = true
    }
  }

  if (!changed) {
    return {
      status: varsResult.status === "patched" ? "patched" : "noop",
      file: target.rel,
      keys: [...new Set(keys)],
    }
  }

  await writeFile(target.abs, css, "utf8")
  return {
    status: "patched",
    file: target.rel,
    keys: [...new Set(keys)],
  }
}

/**
 * Ensure sonojs.css is imported from the app globals stylesheet.
 */
async function ensureGlobalsImport(cwd) {
  const found = await findGlobalsCss(cwd)
  if (!found) {
    return {
      status: "missing",
      message:
        'No globals.css found — add: @import "../styles/sonojs.css";',
    }
  }

  let css = await readFile(found.abs, "utf8")
  if (css.includes("styles/sonojs.css") || css.includes("sonojs.css")) {
    return { status: "exists", rel: found.rel }
  }

  const importLine = importLineForGlobals(cwd, found.abs)

  // Insert after the last leading @import, or at the top.
  const importBlock = css.match(/^(?:@import[^;]+;\s*)+/m)
  if (importBlock) {
    const end = importBlock.index + importBlock[0].length
    css = css.slice(0, end) + `${importLine}\n` + css.slice(end)
  } else {
    css = `${importLine}\n${css}`
  }

  await writeFile(found.abs, css, "utf8")
  return { status: "patched", rel: found.rel }
}

/**
 * Install SonoJS design system + utils into a consumer project.
 * Theme tokens land on `:root` via styles/sonojs.css (imported from globals.css).
 */
export async function initSonojsProject({
  cwd = process.cwd(),
  overwrite = false,
  registryUrl,
} = {}) {
  const written = []
  const skipped = []

  for (const file of INIT_FILES) {
    const src = path.join(templatesRoot, file.from)
    const dest = path.resolve(cwd, file.to)

    if (!overwrite && (await pathExists(dest))) {
      skipped.push(file.to)
      continue
    }

    let content = await readFile(src, "utf8")

    if (file.to === "components.json" && registryUrl) {
      const json = JSON.parse(content)
      const base = registryUrl.replace(/\/?$/, "/")
      json.registries = {
        ...(json.registries ?? {}),
        "@sonojs": `${base}{name}.json`,
      }
      content = `${JSON.stringify(json, null, 2)}\n`
    }

    await mkdir(path.dirname(dest), { recursive: true })
    await writeFile(dest, content, "utf8")
    written.push(file.to)
  }

  const globals = await ensureGlobalsImport(cwd)
  const twAnimate = await ensureTwAnimateImport(cwd)
  const chartNeon = await ensureChartNeonVars(cwd)
  const softSurface = await ensureSoftSurfaceTokens(cwd)

  return { written, skipped, globals, twAnimate, chartNeon, softSurface }
}
