import "server-only"

import { fetchRepoFileBytes, fetchRepoFileText } from "@/lib/github-pro/client"
import { getProRegistryEntry } from "@/lib/github-pro/registry"
import { assertSafeProRepoPath } from "@/lib/github-pro/paths"

export class ProComponentNotFoundError extends Error {
  constructor(slug: string) {
    super(`Pro component not found in registry: ${slug}`)
    this.name = "ProComponentNotFoundError"
  }
}

export class ProArchiveNotFoundError extends Error {
  constructor(slug: string) {
    super(`Pro component has no archive: ${slug}`)
    this.name = "ProArchiveNotFoundError"
  }
}

export type ProComponentFile = {
  path: string
  content: string
}

export type ProComponentSource = {
  slug: string
  name: string
  category?: string
  variant?: string
  /** Repo-relative zip path when the item ships as an archive. */
  archive?: string
  files: ProComponentFile[]
}

function assertSafeArchivePath(path: string): string {
  const safe = assertSafeProRepoPath(path)
  if (!safe.toLowerCase().endsWith(".zip")) {
    throw new Error(`Archive must be a .zip file: ${path}`)
  }
  return safe
}

export async function getProComponentSource(
  slug: string
): Promise<ProComponentSource> {
  const safeSlug = slug.trim()
  if (!safeSlug || safeSlug.includes("/") || safeSlug.includes("..")) {
    throw new ProComponentNotFoundError(slug)
  }

  const entry = await getProRegistryEntry(safeSlug)
  if (!entry) {
    throw new ProComponentNotFoundError(safeSlug)
  }

  const archive = entry.archive
    ? assertSafeArchivePath(entry.archive)
    : undefined

  const files: ProComponentFile[] = []
  for (const rawPath of entry.files ?? []) {
    const path = assertSafeProRepoPath(rawPath)
    const content = await fetchRepoFileText(path)
    files.push({ path, content })
  }

  return {
    slug: safeSlug,
    name: entry.name,
    category: entry.category,
    variant: entry.variant,
    archive,
    files,
  }
}

/** Load the ready-made zip bytes for a Pro slug (no unzip). */
export async function getProComponentArchive(
  slug: string
): Promise<{ slug: string; name: string; filename: string; bytes: Buffer }> {
  const source = await getProComponentSource(slug)
  if (!source.archive) {
    throw new ProArchiveNotFoundError(slug)
  }

  const bytes = await fetchRepoFileBytes(source.archive)
  const filename =
    source.archive.split("/").pop() || `${source.slug}.zip`

  return {
    slug: source.slug,
    name: source.name,
    filename,
    bytes,
  }
}
