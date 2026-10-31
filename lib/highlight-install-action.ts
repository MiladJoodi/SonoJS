"use server"

import { highlightCode } from "@/lib/highlight-code"

export type HighlightBlockUsage = {
  title: string
  code: string
}

export type HighlightBlockFile = {
  title: string
  code: string
}

export type HighlightedBlockInstall = {
  cliHtml: string
  files: { title: string; code: string; html: string }[]
  usage: { title: string; code: string; html: string }[]
}

const NAME_RE = /^[a-z0-9][a-z0-9-]*$/i
const MAX_FILES = 40
const MAX_USAGE = 20
const MAX_CODE_CHARS = 400_000

/**
 * Highlight install snippets for a registry block.
 * Caller supplies file/usage source (from static `/r/<name>.json` on the
 * client) — this action does not read `public/r` from disk (keeps functions
 * under the Vercel size limit).
 */
export async function highlightBlockInstall(input: {
  name: string
  files: HighlightBlockFile[]
  usage?: HighlightBlockUsage[]
}): Promise<HighlightedBlockInstall> {
  const name = input.name?.trim() ?? ""
  if (!NAME_RE.test(name)) {
    throw new Error("Invalid registry item name")
  }

  const usage = Array.isArray(input.usage) ? input.usage : []
  const rawFiles = Array.isArray(input.files) ? input.files : []

  if (rawFiles.length > MAX_FILES || usage.length > MAX_USAGE) {
    throw new Error("Too many files for highlight")
  }

  const files: HighlightBlockFile[] = []
  let totalChars = 0
  for (const file of rawFiles) {
    const title = typeof file?.title === "string" ? file.title.trim() : ""
    const code = typeof file?.code === "string" ? file.code : ""
    if (!title || !code) continue
    if (/\.(webp|png|jpe?g|gif|woff2|svg)$/i.test(title)) continue
    totalChars += code.length
    if (totalChars > MAX_CODE_CHARS) {
      throw new Error("Install source too large to highlight")
    }
    files.push({ title, code })
  }

  for (const item of usage) {
    totalChars += typeof item?.code === "string" ? item.code.length : 0
    if (totalChars > MAX_CODE_CHARS) {
      throw new Error("Install source too large to highlight")
    }
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
