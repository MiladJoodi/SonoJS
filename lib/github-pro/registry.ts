import "server-only"

import {
  fetchRepoFileText,
  GitHubProApiError,
} from "@/lib/github-pro/client"

/** Central product registry in the private Pro repo (under `products/`). */
export const PRO_REGISTRY_PATH = "registry/registry.json"

/**
 * Ordered registry shards. `registry.json` is required; the rest soft-404 to `{}`.
 * Later files win on slug clash.
 */
export const PRO_REGISTRY_PATHS = [
  "registry/registry.json",
  "registry/websites.json",
  "registry/templates.json",
  "registry/components.json",
  "registry/popups.json",
] as const

export type ProRegistryProductType =
  | "component"
  | "block"
  | "template"
  | "hero"
  | "popup"

export type ProRegistryEntry = {
  name: string
  /** Product kind in the central registry. */
  type?: ProRegistryProductType
  category?: string
  variant?: string
  /** Ready-made zip in the Pro repo - users download this as-is. */
  archive?: string
  /** Optional loose source paths (legacy / preview). */
  files?: string[]
}

export type ProRegistry = Record<string, ProRegistryEntry>

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string")
}

function parseType(value: unknown): ProRegistryProductType | undefined {
  if (
    value === "component" ||
    value === "block" ||
    value === "template" ||
    value === "hero" ||
    value === "popup"
  ) {
    return value
  }
  return undefined
}

function parseEntry(_slug: string, raw: unknown): ProRegistryEntry | null {
  if (!raw || typeof raw !== "object") return null
  const obj = raw as Record<string, unknown>
  if (typeof obj.name !== "string") return null

  const archive =
    typeof obj.archive === "string" && obj.archive.trim()
      ? obj.archive.trim()
      : undefined
  const files = isStringArray(obj.files) && obj.files.length > 0 ? obj.files : undefined

  if (!archive && !files) return null

  return {
    name: obj.name,
    type: parseType(obj.type),
    category: typeof obj.category === "string" ? obj.category : undefined,
    variant: typeof obj.variant === "string" ? obj.variant : undefined,
    archive,
    files,
  }
}

function parseRegistryObject(json: unknown, label: string): ProRegistry {
  if (!json || typeof json !== "object" || Array.isArray(json)) {
    throw new Error(`Pro registry must be a JSON object (${label})`)
  }

  const out: ProRegistry = {}
  for (const [slug, value] of Object.entries(json as Record<string, unknown>)) {
    const entry = parseEntry(slug, value)
    if (entry) out[slug] = entry
  }
  return out
}

async function loadRegistryShard(
  path: string,
  required: boolean
): Promise<ProRegistry> {
  let text: string
  try {
    text = await fetchRepoFileText(path)
  } catch (err) {
    if (
      !required &&
      err instanceof GitHubProApiError &&
      err.status === 404
    ) {
      return {}
    }
    throw err
  }

  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Pro registry JSON is invalid (${path})`)
  }

  return parseRegistryObject(json, path)
}

export async function fetchProRegistry(): Promise<ProRegistry> {
  const out: ProRegistry = {}

  for (const path of PRO_REGISTRY_PATHS) {
    const required = path === PRO_REGISTRY_PATH
    const shard = await loadRegistryShard(path, required)
    Object.assign(out, shard)
  }

  return out
}

export async function getProRegistryEntry(
  slug: string
): Promise<ProRegistryEntry | null> {
  const registry = await fetchProRegistry()
  return registry[slug] ?? null
}

/** Alias - central product registry (same as fetchProRegistry). */
export const fetchProductRegistry = fetchProRegistry

/** Alias - lookup by slug in the central product registry. */
export const getProductRegistryEntry = getProRegistryEntry
