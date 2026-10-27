/**
 * Atomically builds public/r/registry.json and public/r/<item>.json
 * with a shared version + generatedAt so index and items stay compatible.
 *
 * Usage: node scripts/build-registry.mjs
 */

import { createHash } from "node:crypto"
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { registryItems } from "./registry-items.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outDir = path.join(root, "public", "r")

function readPackageVersion() {
  const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"))
  return pkg.version ?? "0.0.0"
}

function contentHash(files) {
  const hash = createHash("sha256")
  for (const file of files) {
    hash.update(file.path)
    hash.update("\0")
    hash.update(file.content)
    hash.update("\0")
  }
  return hash.digest("hex").slice(0, 12)
}

/**
 * packages/ui uses @sonojs/ui/*; consumers get @/* after install.
 */
function rewriteConsumerImports(content) {
  return content
    .replace(
      /from\s+["']@sonojs\/ui\/components\/([^"']+)["']/g,
      'from "@/components/ui/$1"'
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

/**
 * Authoring may live under `registry/charts/<category>/` (`../_lib`), while
 * install `target` stays flat (`components/charts/<slug>.tsx` → `./_lib`).
 */
function rewriteChartLibImports(content, targetPath) {
  if (!targetPath) return content
  const targetDir = path.posix.dirname(targetPath.replace(/\\/g, "/"))
  if (!targetDir.startsWith("components/charts")) return content

  let rel = path.posix.relative(targetDir, "components/charts/_lib")
  if (!rel || rel === "") rel = "."
  if (!rel.startsWith(".")) rel = `./${rel}`

  return content.replace(
    /from\s+["'](?:\.\/|\.\.\/)+_lib\//g,
    `from "${rel}/`
  )
}

/**
 * Authoring imports `@/registry/blocks/...`. Installed files use each file's
 * `target` (`components/blocks/<name>/...`).
 */
function rewriteBlockTargets(content, files) {
  const bySource = new Map()
  for (const file of files) {
    if (!file.target) continue
    const source = file.path.replace(/\\/g, "/")
    bySource.set(source.replace(/\.(tsx|ts|jsx|js)$/, ""), file.target)
  }
  return content.replace(
    /from\s+["']@\/registry\/([^"']+)["']/g,
    (full, spec) => {
      const target = bySource.get(`registry/${spec}`)
      if (!target) return full
      const withoutExt = target.replace(/\.(tsx|ts|jsx|js)$/, "")
      return `from "@/${withoutExt}"`
    }
  )
}

const BINARY_EXT = new Set([
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".woff2",
  ".mp4",
  ".webm",
])

function isBinaryRegistryPath(filePath) {
  return BINARY_EXT.has(path.extname(filePath).toLowerCase())
}

function buildItemPayload(item, version, generatedAt) {
  const files = item.files.map((file) => {
    const abs = path.join(root, file.path)
    if (!existsSync(abs)) {
      throw new Error(`Missing registry file: ${file.path}`)
    }

    if (isBinaryRegistryPath(file.path)) {
      const payload = {
        path: file.target || file.path,
        type: file.type,
        content: readFileSync(abs).toString("base64"),
        encoding: "base64",
      }
      if (file.target) payload.target = file.target
      return payload
    }

    let content = readFileSync(abs, "utf8")
    const isSourceText =
      /\.(tsx?|jsx?|mjs|cjs|css)$/i.test(file.path) &&
      !file.path.endsWith(".json")
    if (
      isSourceText &&
      (file.path.startsWith("packages/ui/") ||
        file.path.startsWith("registry/blocks/"))
    ) {
      content = rewriteConsumerImports(content)
    }
    content = rewriteBlockTargets(content, item.files)
    if (file.target) {
      content = rewriteChartLibImports(content, file.target)
    }
    const payload = {
      path: file.target || file.path,
      type: file.type,
      content,
    }
    if (file.target) payload.target = file.target
    return payload
  })

  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    ...(item.cssVars ? { cssVars: item.cssVars } : {}),
    files,
    version,
    generatedAt,
  }
}

function toIndexEntry(item) {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    ...(item.cssVars ? { cssVars: item.cssVars } : {}),
    files: item.files.map(({ content: _content, ...file }) => file),
    version: item.version,
    generatedAt: item.generatedAt,
  }
}

function writeAtomic(dir, files) {
  mkdirSync(path.dirname(dir), { recursive: true })
  const staging = mkdtempSync(path.join(tmpdir(), "sonojs-r-"))
  try {
    for (const [name, contents] of Object.entries(files)) {
      writeFileSync(path.join(staging, name), contents, "utf8")
    }

    const backup = `${dir}.bak-${Date.now()}`
    let renamed = false
    if (existsSync(dir)) {
      try {
        renameSync(dir, backup)
        renamed = true
      } catch (error) {
        // Windows may lock public/r (dev server). Fall back to in-place overwrite.
        if (error && error.code !== "EPERM" && error.code !== "EACCES") {
          throw error
        }
        console.warn(
          `Could not rename ${dir} (${error.code}); writing files in place.`
        )
      }
    }

    if (renamed || !existsSync(dir)) {
      try {
        mkdirSync(dir, { recursive: true })
        for (const name of readdirSync(staging)) {
          cpSync(path.join(staging, name), path.join(dir, name))
        }
        if (existsSync(backup)) {
          rmSync(backup, { recursive: true, force: true })
        }
      } catch (error) {
        if (existsSync(dir)) {
          rmSync(dir, { recursive: true, force: true })
        }
        if (existsSync(backup)) {
          renameSync(backup, dir)
        }
        throw error
      }
    } else {
      for (const name of readdirSync(staging)) {
        cpSync(path.join(staging, name), path.join(dir, name))
      }
    }
  } finally {
    rmSync(staging, { recursive: true, force: true })
  }
}

function main() {
  const generatedAt = new Date().toISOString()
  const pkgVersion = readPackageVersion()

  const draftItems = registryItems.map((item) =>
    buildItemPayload(item, "pending", generatedAt)
  )

  const version = `${pkgVersion}+${contentHash(draftItems.flatMap((item) => item.files))}`

  const builtItems = draftItems.map((item) => ({
    ...item,
    version,
    generatedAt,
  }))

  const index = {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "sonojs",
    homepage: "https://sonojs.com",
    version,
    generatedAt,
    items: builtItems.map(toIndexEntry),
  }

  const output = {
    "registry.json": `${JSON.stringify(index, null, 2)}\n`,
  }

  for (const item of builtItems) {
    output[`${item.name}.json`] = `${JSON.stringify(item, null, 2)}\n`
  }

  writeAtomic(outDir, output)
  console.log(
    `Wrote ${Object.keys(output).length} files to public/r (version ${version})`
  )
}

main()
