"use server"

import { highlightCode } from "@/lib/highlight-code"
import { readRegistryJson } from "@/lib/read-registry-json"

export type HighlightBlockUsage = {
  title: string
  code: string
}

export type HighlightedBlockInstall = {
  cliHtml: string
  files: { title: string; code: string; html: string }[]
  usage: { title: string; code: string; html: string }[]
}

const NAME_RE = /^[a-z0-9][a-z0-9-]*$/i

/**
 * Highlight install snippets for a registry block.
 * Loads `public/r/<name>.json` via disk or static URL (not bundled into
 * every serverless function) so the client never POSTs full source.
 */
export async function highlightBlockInstall(
  name: string,
  usage: HighlightBlockUsage[] = []
): Promise<HighlightedBlockInstall> {
  if (!NAME_RE.test(name)) {
    throw new Error("Invalid registry item name")
  }

  const json = await readRegistryJson<{
    files?: {
      path?: string
      target?: string
      content?: string
      encoding?: string
    }[]
  }>(name)
  if (!json) {
    throw new Error(`Registry item not found: ${name}`)
  }

  const files: { title: string; code: string }[] = []
  for (const file of json.files ?? []) {
    if (!file.content) continue
    // Binary registry assets (webp/png/…) ship as base64 — never show in Code tab.
    if (file.encoding === "base64") continue
    const title = file.target || file.path
    if (!title) continue
    if (/\.(webp|png|jpe?g|gif|woff2|svg)$/i.test(title)) continue
    files.push({ title, code: file.content })
  }

  const cli = `npx @sonojs/ui@latest add ${name}`
  const [cliHtml, ...rest] = await Promise.all([
    highlightCode(cli, "bash"),
    ...files.map((file) => highlightCode(file.code, "tsx")),
    ...usage.map((item) => highlightCode(item.code, "tsx")),
  ])

  return {
    cliHtml: cliHtml ?? "",
    files: files.map((file, index) => ({
      title: file.title,
      code: file.code,
      html: rest[index] ?? "",
    })),
    usage: usage.map((item, index) => ({
      title: item.title,
      code: item.code,
      html: rest[files.length + index] ?? "",
    })),
  }
}
