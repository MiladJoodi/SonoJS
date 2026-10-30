export function downloadTextFile(
  filename: string,
  content: string,
  mime = "text/plain;charset=utf-8"
): void {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function suggestFilename(markdown: string): string {
  const fromTitle = markdown.match(/^#\s+(.+)$/m)?.[1]
  const raw = (fromTitle ?? "document")
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
  return raw || "document"
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}
