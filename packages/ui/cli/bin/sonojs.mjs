#!/usr/bin/env node
import path from "node:path"
import { fileURLToPath } from "node:url"

import {
  applyRegistryCss,
  applyRegistryCssVars,
} from "../src/apply-css-vars.mjs"
import { RegistryConsistencyError } from "../src/consistency.mjs"
import {
  ensureChartNeonVars,
  ensureGlobalsThemeEntry,
  ensureSoftSurfaceTokens,
  ensureSonojsSafelist,
  ensureTwAnimateImport,
  initSonojsProject,
} from "../src/init.mjs"
import {
  installInitNpmDependencies,
  installNpmDependencies,
} from "../src/install-npm.mjs"
import { installRegistryItemFiles } from "../src/install.mjs"
import { cmdMcp } from "../src/mcp/cmd.mjs"
import { resolveRegistryItem } from "../src/resolve.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** Published default — monorepo overrides via SONOJS_REGISTRY or --registry. */
const defaultRegistry = "https://sonojs.com/r"

function printHelp() {
  console.log(`Usage:
  sonojs init [--cwd <dir>] [--registry <url-or-path>] [--overwrite]
  sonojs add <name> [name...] [--registry <url-or-path>] [--cwd <dir>] [--overwrite]
  sonojs mcp [--registry <url-or-path>]
  sonojs mcp init [--client <name>] [--all] [--dry-run] [--cwd <dir>] [--registry <url-or-path>]

init      — installs design system (styles/sonojs.css), lib/utils.ts, components.json
add       — copies component(s) into components/ui/ (run init first)
mcp       — run the SonoJS MCP stdio server (agents launch this)
mcp init  — detect Cursor/VS Code/Claude/Codex/Windsurf and write MCP config

Environment:
  SONOJS_REGISTRY   Default registry base (URL or local directory)
`)
}

function parseFlags(rest) {
  let registry = process.env.SONOJS_REGISTRY || defaultRegistry
  let cwd = process.cwd()
  let overwrite = false

  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--registry" && rest[i + 1]) {
      registry = rest[i + 1]
      i++
    } else if (rest[i] === "--cwd" && rest[i + 1]) {
      cwd = path.resolve(rest[i + 1])
      i++
    } else if (rest[i] === "--overwrite") {
      overwrite = true
    }
  }

  return { registry, cwd, overwrite }
}

async function cmdInit(rest) {
  const { registry, cwd, overwrite } = parseFlags(rest)
  const registryUrl =
    registry.startsWith("http://") ||
    registry.startsWith("https://") ||
    registry.startsWith("file:")
      ? registry
      : undefined

  const {
    written,
    skipped,
    globals,
    twAnimate,
    safelist,
    chartNeon,
    softSurface,
  } = await initSonojsProject({
    cwd,
    overwrite,
    registryUrl,
  })

  console.log(
    "SonoJS initialized (tokens in styles/sonojs.css; @theme on globals — class .dark only)"
  )
  for (const file of written) console.log(`  + ${file}`)
  for (const file of skipped) {
    console.log(`  ~ skip (exists): ${file}  (use --overwrite)`)
  }
  if (globals?.status === "patched") {
    const detail = globals.keys?.length
      ? ` (${globals.keys.join(", ")})`
      : ""
    console.log(`  + globals theme entry → ${globals.rel}${detail}`)
  } else if (globals?.status === "exists") {
    console.log(`  ~ globals theme entry already in ${globals.rel}`)
  } else if (globals?.status === "missing") {
    console.log(`  ! ${globals.message}`)
  }
  if (twAnimate?.status === "patched") {
    console.log("  + @import tw-animate-css in styles/sonojs.css")
  }
  if (safelist?.status === "patched") {
    console.log("  + @source inline safelist in styles/sonojs.css")
  }
  if (chartNeon?.status === "patched") {
    console.log(
      `  + chart neon cssVars → ${chartNeon.file} (${chartNeon.keys?.join(", ")})`
    )
  }
  if (softSurface?.status === "patched") {
    console.log(
      `  + soft surface cssVars → ${softSurface.file} (${softSurface.keys?.join(", ")})`
    )
  }

  installInitNpmDependencies(cwd)

  console.log(`
Next:
  sonojs add button
`)
}

async function cmdAdd(names, rest) {
  const { registry, cwd, overwrite } = parseFlags(rest)
  const npmDeps = new Set()
  const seen = new Set()
  /** @type {{ light?: Record<string, string>, dark?: Record<string, string>, theme?: Record<string, string> }} */
  const mergedCssVars = { light: {}, dark: {}, theme: {} }
  /** @type {Record<string, Record<string, Record<string, string>>>} */
  const mergedCss = {}

  async function addOne(itemName) {
    if (seen.has(itemName)) return
    seen.add(itemName)

    const { item, index } = await resolveRegistryItem({
      name: itemName,
      registryUrl: registry,
    })

    for (const dep of item.registryDependencies ?? []) {
      await addOne(dep)
    }

    const { written, skipped } = await installRegistryItemFiles(item, {
      cwd,
      overwrite,
    })

    console.log(`Added ${item.name} from ${index.name} @ ${index.version}`)
    for (const file of written) console.log(`  + ${file}`)
    for (const file of skipped) {
      console.log(`  ~ skip (exists): ${file}  (use --overwrite)`)
    }

    if (item.cssVars?.light) {
      Object.assign(mergedCssVars.light, item.cssVars.light)
    }
    if (item.cssVars?.dark) {
      Object.assign(mergedCssVars.dark, item.cssVars.dark)
    }
    if (item.cssVars?.theme) {
      Object.assign(mergedCssVars.theme, item.cssVars.theme)
    }
    if (item.css) {
      Object.assign(mergedCss, item.css)
    }

    for (const dep of item.dependencies ?? []) npmDeps.add(dep)
  }

  for (const name of names) {
    await addOne(name)
  }

  const hasCssVars =
    Object.keys(mergedCssVars.light).length > 0 ||
    Object.keys(mergedCssVars.dark).length > 0 ||
    Object.keys(mergedCssVars.theme).length > 0
  if (hasCssVars) {
    const cssResult = await applyRegistryCssVars(cwd, mergedCssVars)
    if (cssResult.status === "patched") {
      console.log(
        `  + cssVars → ${cssResult.file} (${cssResult.keys?.join(", ")})`
      )
    } else if (cssResult.status === "missing") {
      console.log(
        "  ! No styles/sonojs.css or globals.css — set --chart-* tokens manually from the registry item cssVars"
      )
    }
  }

  if (Object.keys(mergedCss).length > 0) {
    const keyframesResult = await applyRegistryCss(cwd, mergedCss)
    if (keyframesResult.status === "patched") {
      console.log(
        `  + css → ${keyframesResult.file} (${keyframesResult.keys?.join(", ")})`
      )
    } else if (keyframesResult.status === "missing") {
      console.log(
        "  ! No styles/sonojs.css or globals.css — add registry keyframes manually from the item css field"
      )
    }
  }

  // Sheet/Dialog/Popover enter-exit — install package + CSS import if missing
  // (covers projects that inited before tw-animate was part of the baseline).
  npmDeps.add("tw-animate-css")
  installNpmDependencies(cwd, [...npmDeps])

  // Heal failed/partial init: clsx + tailwind-merge for lib/utils.ts
  installInitNpmDependencies(cwd)

  const twAnimate = await ensureTwAnimateImport(cwd)
  if (twAnimate?.status === "patched") {
    console.log("  + @import tw-animate-css in styles/sonojs.css")
  }

  const safelist = await ensureSonojsSafelist(cwd)
  if (safelist?.status === "patched") {
    console.log("  + @source inline safelist in styles/sonojs.css")
  }

  // Heal create-next-app theme conflict + pin @theme/@source on every add
  const globals = await ensureGlobalsThemeEntry(cwd)
  if (globals?.status === "patched") {
    const detail = globals.keys?.length
      ? ` (${globals.keys.join(", ")})`
      : ""
    console.log(`  + globals theme entry → ${globals.rel}${detail}`)
  } else if (globals?.status === "missing") {
    console.log(`  ! ${globals.message}`)
  }

  const chartNeon = await ensureChartNeonVars(cwd)
  if (chartNeon?.status === "patched") {
    console.log(
      `  + chart neon cssVars → ${chartNeon.file} (${chartNeon.keys?.join(", ")})`
    )
  }

  const softSurface = await ensureSoftSurfaceTokens(cwd)
  if (softSurface?.status === "patched") {
    console.log(
      `  + soft surface cssVars → ${softSurface.file} (${softSurface.keys?.join(", ")})`
    )
  }

  if (seen.has("sonner")) {
    console.log(`
Next — mount <Toaster /> once in your root layout (inside ThemeProvider if you use one):
  import { Toaster } from "@/components/ui/sonner"
  …
  <body>
    {children}
    <Toaster />
  </body>
`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    printHelp()
    process.exit(0)
  }

  const [command, ...rest] = args

  try {
    if (command === "init") {
      await cmdInit(rest)
      return
    }

    if (command === "add") {
      const names = []
      let i = 0
      for (; i < rest.length; i++) {
        if (rest[i].startsWith("-")) break
        names.push(rest[i])
      }
      if (names.length === 0) {
        printHelp()
        process.exit(1)
      }
      await cmdAdd(names, rest.slice(i))
      return
    }

    if (command === "mcp") {
      await cmdMcp(rest)
      return
    }

    printHelp()
    process.exit(1)
  } catch (error) {
    if (error instanceof RegistryConsistencyError) {
      console.error(`sonojs: ${error.message}`)
      process.exit(2)
    }
    console.error(`sonojs: ${error instanceof Error ? error.message : error}`)
    process.exit(1)
  }
}

main()
