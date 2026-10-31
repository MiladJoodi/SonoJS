import "server-only"

import { fetchRepoFileText } from "@/lib/github-pro/client"

export const PRO_REGISTRY_PATH = "registry/components.json"

export type ProRegistryEntry = {
  name: string
  category?: string
  variant?: string
  /** Ready-made zip in the Pro repo — users download this as-is. */
  archive?: string
  /** Optional loose source paths (legacy / preview). */
  files?: string[]
}

export type ProRegistry = Record<string, ProRegistryEntry>

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string")
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
    category: typeof obj.category === "string" ? obj.category : undefined,
    variant: typeof obj.variant === "string" ? obj.variant : undefined,
    archive,
    files,
  }
}

export async function fetchProRegistry(): Promise<ProRegistry> {
  const text = await fetchRepoFileText(PRO_REGISTRY_PATH)
  let json: unknown
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error("Pro registry JSON is invalid")
  }
  if (!json || typeof json !== "object" || Array.isArray(json)) {
    throw new Error("Pro registry must be a JSON object")
  }

  const out: ProRegistry = {}
  for (const [slug, value] of Object.entries(json as Record<string, unknown>)) {
    const entry = parseEntry(slug, value)
    if (entry) out[slug] = entry
  }
  return out
}

export async function getProRegistryEntry(
  slug: string
): Promise<ProRegistryEntry | null> {
  const registry = await fetchProRegistry()
  return registry[slug] ?? null
}
