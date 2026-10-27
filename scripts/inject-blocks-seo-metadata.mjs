import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const blocksRoot = path.join(root, "app/(app)/blocks")

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name.startsWith("[")) continue
      walk(full, out)
    } else if (entry.name === "page.tsx") {
      out.push(full)
    }
  }
  return out
}

function titleFromHref(href) {
  const slug = href.split("/").pop() || href
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

const importLine = 'import { blocksPageMetadata } from "@/lib/seo"'
let updated = 0

for (const file of walk(blocksRoot)) {
  const rel = path.relative(path.join(root, "app/(app)"), path.dirname(file))
  const href = "/" + rel.replace(/\\/g, "/")
  if (href === "/blocks") continue

  let text = fs.readFileSync(file, "utf8")
  if (text.includes("blocksPageMetadata")) continue

  const title = titleFromHref(href)
  const description = `Ready-to-use ${title} UI blocks for React and Tailwind. Preview variants and install with the SonoJS CLI.`
  const meta = `export const metadata = blocksPageMetadata(${JSON.stringify(href)}, ${JSON.stringify(title)}, ${JSON.stringify(description)})\n\n`
  const importBlock = text.match(
    /^(?:import[\s\S]*?from\s+["'][^"']+["'];?\s*\n)+/
  )
  if (importBlock) {
    text =
      importBlock[0] +
      importLine +
      "\n\n" +
      meta +
      text.slice(importBlock[0].length)
  } else {
    text = `${importLine}\n\n${meta}${text}`
  }
  fs.writeFileSync(file, text)
  updated++
}

console.log(`block category pages updated: ${updated}`)
