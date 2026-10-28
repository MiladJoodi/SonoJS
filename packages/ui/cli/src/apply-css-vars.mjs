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

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const THEME_CSS_CANDIDATES = [
  "styles/sonojs.css",
  "app/globals.css",
  "src/app/globals.css",
  "src/styles/globals.css",
  "styles/globals.css",
]

/**
 * @returns {Promise<{ abs: string, rel: string } | null>}
 */
async function resolveThemeCssFile(cwd) {
  for (const rel of THEME_CSS_CANDIDATES) {
    const abs = path.resolve(cwd, rel)
    if (await pathExists(abs)) {
      return { abs, rel }
    }
  }
  return null
}

/**
 * Upsert `--name: value;` declarations inside the first matching selector block.
 * Expects flat blocks (SonoJS `:root` / `.dark` / `@theme inline`).
 */
function upsertVarsInBlock(css, selector, vars) {
  if (!vars || Object.keys(vars).length === 0) {
    return { css, changed: false }
  }

  const startRe = new RegExp(`${escapeRegExp(selector)}\\s*\\{`)
  const startMatch = startRe.exec(css)
  if (!startMatch) return { css, changed: false }

  const openIdx = startMatch.index + startMatch[0].length
  let depth = 1
  let i = openIdx
  for (; i < css.length; i++) {
    const ch = css[i]
    if (ch === "{") depth++
    else if (ch === "}") {
      depth--
      if (depth === 0) break
    }
  }
  if (depth !== 0) return { css, changed: false }

  let body = css.slice(openIdx, i)
  let changed = false

  for (const [rawKey, value] of Object.entries(vars)) {
    const name = rawKey.startsWith("--") ? rawKey : `--${rawKey}`
    const decl = `${name}: ${value};`
    const varRe = new RegExp(`${escapeRegExp(name)}\\s*:[^;]*;`)
    if (varRe.test(body)) {
      const next = body.replace(varRe, decl)
      if (next !== body) {
        body = next
        changed = true
      }
    } else {
      body = `${body.replace(/\s*$/, "")}\n  ${decl}\n`
      changed = true
    }
  }

  if (!changed) return { css, changed: false }
  return {
    css: css.slice(0, openIdx) + body + css.slice(i),
    changed: true,
  }
}

/**
 * Build a CSS `@keyframes name { … }` block from a registry `css` entry value.
 * @param {string} atRule e.g. "@keyframes rainbow"
 * @param {Record<string, Record<string, string>>} frames
 */
function formatKeyframesBlock(atRule, frames) {
  const lines = [`${atRule} {`]
  for (const [step, props] of Object.entries(frames ?? {})) {
    lines.push(`  ${step} {`)
    for (const [prop, value] of Object.entries(props ?? {})) {
      lines.push(`    ${prop}: ${value};`)
    }
    lines.push(`  }`)
  }
  lines.push(`}`)
  return lines.join("\n")
}

/**
 * Merge registry `cssVars` ({ light, dark, theme }) into the consumer theme file.
 * Prefers `styles/sonojs.css`, falls back to common globals.css paths.
 * `theme` vars are upserted into `@theme inline`.
 *
 * @returns {{ status: "patched" | "noop" | "missing", file?: string, keys?: string[] }}
 */
export async function applyRegistryCssVars(cwd, cssVars) {
  const hasLight = cssVars?.light && Object.keys(cssVars.light).length > 0
  const hasDark = cssVars?.dark && Object.keys(cssVars.dark).length > 0
  const hasTheme = cssVars?.theme && Object.keys(cssVars.theme).length > 0
  if (!hasLight && !hasDark && !hasTheme) {
    return { status: "noop" }
  }

  const target = await resolveThemeCssFile(cwd)
  if (!target) {
    return { status: "missing" }
  }

  let css = await readFile(target.abs, "utf8")
  let changed = false
  const keys = []

  if (hasLight) {
    const result = upsertVarsInBlock(css, ":root", cssVars.light)
    css = result.css
    changed = changed || result.changed
    keys.push(...Object.keys(cssVars.light))
  }

  if (hasDark) {
    const result = upsertVarsInBlock(css, ".dark", cssVars.dark)
    css = result.css
    changed = changed || result.changed
    keys.push(...Object.keys(cssVars.dark))
  }

  if (hasTheme) {
    const result = upsertVarsInBlock(css, "@theme inline", cssVars.theme)
    css = result.css
    changed = changed || result.changed
    keys.push(...Object.keys(cssVars.theme).map((k) => `theme:${k}`))
  }

  if (!changed) {
    return { status: "noop", file: target.rel, keys: [...new Set(keys)] }
  }

  await writeFile(target.abs, css, "utf8")
  return { status: "patched", file: target.rel, keys: [...new Set(keys)] }
}

/**
 * Append registry `css` keyframes (e.g. `@keyframes rainbow`) when missing.
 *
 * @param {string} cwd
 * @param {Record<string, Record<string, Record<string, string>>> | undefined} cssMap
 * @returns {{ status: "patched" | "noop" | "missing", file?: string, keys?: string[] }}
 */
export async function applyRegistryCss(cwd, cssMap) {
  if (!cssMap || Object.keys(cssMap).length === 0) {
    return { status: "noop" }
  }

  const target = await resolveThemeCssFile(cwd)
  if (!target) {
    return { status: "missing" }
  }

  let css = await readFile(target.abs, "utf8")
  let changed = false
  const keys = []

  for (const [atRule, frames] of Object.entries(cssMap)) {
    if (!atRule.startsWith("@keyframes")) continue
    const name = atRule.replace(/^@keyframes\s+/, "").trim()
    if (!name) continue
    const exists = new RegExp(
      `@keyframes\\s+${escapeRegExp(name)}\\s*\\{`
    ).test(css)
    if (exists) {
      keys.push(atRule)
      continue
    }
    const block = formatKeyframesBlock(atRule, frames)
    css = `${css.replace(/\s*$/, "")}\n\n${block}\n`
    changed = true
    keys.push(atRule)
  }

  if (!changed) {
    return { status: "noop", file: target.rel, keys }
  }

  await writeFile(target.abs, css, "utf8")
  return { status: "patched", file: target.rel, keys }
}
