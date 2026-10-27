import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const navSrc = fs.readFileSync(path.join(root, "lib/docs-nav.ts"), "utf8")
const re =
  /\{\s*title:\s*"([^"]+)",\s*href:\s*"\/docs\/components\/([^"]+)"/g
const pages = []
let m
while ((m = re.exec(navSrc))) {
  pages.push({ title: m[1], slug: m[2] })
}

const importLine = 'import { componentDocsMetadata } from "@/lib/seo"'
let updated = 0

for (const { title, slug } of pages) {
  const file = path.join(
    root,
    "app/(app)/docs/components",
    slug,
    "page.tsx"
  )
  if (!fs.existsSync(file)) {
    console.warn("missing", file)
    continue
  }
  let text = fs.readFileSync(file, "utf8")
  if (text.includes("componentDocsMetadata")) continue

  const meta = `export const metadata = componentDocsMetadata("${slug}", "${title}")\n\n`
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

console.log(`component pages updated: ${updated}/${pages.length}`)
