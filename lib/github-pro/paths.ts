import "server-only"

/**
 * Only allow relative repo paths listed in the Pro registry.
 * Blocks traversal, absolute paths, and URL-ish values.
 */
export function assertSafeProRepoPath(path: string): string {
  const trimmed = path.trim()
  if (!trimmed) {
    throw new Error("Empty file path")
  }
  if (trimmed.startsWith("/") || trimmed.startsWith("\\")) {
    throw new Error(`Absolute paths are not allowed: ${path}`)
  }
  if (trimmed.includes("..")) {
    throw new Error(`Path traversal is not allowed: ${path}`)
  }
  if (trimmed.includes("\0")) {
    throw new Error(`Invalid path: ${path}`)
  }
  if (/^[a-zA-Z]:/.test(trimmed) || trimmed.includes("://")) {
    throw new Error(`Invalid path: ${path}`)
  }
  // Normalize to forward slashes for GitHub
  return trimmed.replace(/\\/g, "/")
}
