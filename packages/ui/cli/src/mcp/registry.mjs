import { readFile } from "node:fs/promises"
import path from "node:path"

import { parseJsonText } from "../strip-bom.mjs"

const DEFAULT_REGISTRY = "https://sonojs.com/r"

export function normalizeRegistryBase(registryUrl = DEFAULT_REGISTRY) {
  if (!registryUrl) return DEFAULT_REGISTRY
  return registryUrl.endsWith("/") ? registryUrl.slice(0, -1) : registryUrl
}

function joinRegistryUrl(base, file) {
  const normalized = base.endsWith("/") ? base : `${base}/`
  return new URL(file, normalized).href
}

async function loadJson(urlOrPath) {
  if (
    urlOrPath.startsWith("http://") ||
    urlOrPath.startsWith("https://") ||
    urlOrPath.startsWith("file:")
  ) {
    const res = await fetch(urlOrPath)
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${urlOrPath}: ${res.status} ${res.statusText}`
      )
    }
    return parseJsonText(await res.text(), urlOrPath)
  }

  const abs = path.resolve(urlOrPath)
  return parseJsonText(await readFile(abs, "utf8"), abs)
}

export async function loadRegistryIndex(registryUrl = DEFAULT_REGISTRY) {
  const base = normalizeRegistryBase(registryUrl)
  const isRemote =
    base.startsWith("http://") ||
    base.startsWith("https://") ||
    base.startsWith("file:")

  if (isRemote) {
    return loadJson(joinRegistryUrl(base, "registry.json"))
  }
  return loadJson(path.join(path.resolve(base), "registry.json"))
}

export async function loadRegistryItem(
  name,
  registryUrl = DEFAULT_REGISTRY
) {
  const base = normalizeRegistryBase(registryUrl)
  const isRemote =
    base.startsWith("http://") ||
    base.startsWith("https://") ||
    base.startsWith("file:")

  if (isRemote) {
    return loadJson(joinRegistryUrl(base, `${name}.json`))
  }
  return loadJson(path.join(path.resolve(base), `${name}.json`))
}

/** Skip noisy baseline packages in “Also needs” style hints. */
const SKIP_NPM = new Set([
  "clsx",
  "tailwind-merge",
  "radix-ui",
  "class-variance-authority",
])

export function summarizeItem(item) {
  const files = (item.files ?? []).map((f) => ({
    path: f.path,
    target: f.target ?? f.path,
    type: f.type,
  }))
  return {
    name: item.name,
    title: item.title ?? item.name,
    description: item.description ?? "",
    type: item.type,
    registryDependencies: item.registryDependencies ?? [],
    dependencies: item.dependencies ?? [],
    files,
  }
}

export function buildAddCommand(name, { registryDeps = [], npmDeps = [] } = {}) {
  const add = `npx @sonojs/ui@latest add ${name}`
  const notableNpm = npmDeps.filter((d) => {
    const bare = d.startsWith("@")
      ? d.slice(0, d.indexOf("@", 1) === -1 ? d.length : d.indexOf("@", 1))
      : d.split("@")[0]
    return !SKIP_NPM.has(bare)
  })
  const also = []
  if (registryDeps.length) {
    also.push(`npx @sonojs/ui@latest add ${registryDeps.join(" ")}`)
  }
  if (notableNpm.length) {
    also.push(`npm i ${notableNpm.join(" ")}`)
  }
  return {
    command: add,
    alsoNeeds: also.length ? also.join(" && ") : null,
  }
}

export function indexItems(index) {
  return (index.items ?? []).map((item) => ({
    name: item.name,
    title: item.title ?? item.name,
    description: item.description ?? "",
    type: item.type,
  }))
}

export function searchIndexItems(index, query) {
  const q = String(query ?? "")
    .trim()
    .toLowerCase()
  const items = indexItems(index)
  if (!q) return items
  return items.filter((item) => {
    const hay = `${item.name} ${item.title} ${item.description} ${item.type}`.toLowerCase()
    return hay.includes(q)
  })
}
