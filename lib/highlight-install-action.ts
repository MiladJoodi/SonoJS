"use server"

import { readFile } from "node:fs/promises"
import path from "node:path"

import { highlightCode } from "@/lib/highlight-code"

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
 * Reads `public/r/<name>.json` on the server so the client never POSTs
 * full source (Next.js logs server-action args in dev).
 */
export async function highlightBlockInstall(
  name: string,
  usage: HighlightBlockUsage[] = []
): Promise<HighlightedBlockInstall> {
  if (!NAME_RE.test(name)) {
    throw new Error("Invalid registry item name")
  }

  const filePath = path.join(process.cwd(), "public", "r", `${name}.json`)
  const raw = await readFile(filePath, "utf8")
  const json = JSON.parse(raw) as {
    files?: { path?: string; target?: string; content?: string }[]
  }

  const files: { title: string; code: string }[] = []
  for (const file of json.files ?? []) {
    if (!file.content) continue
    const title = file.target || file.path
    if (!title) continue
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
