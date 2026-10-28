import fs from "fs"
import path from "path"

const p =
  "C:/Users/Salam/.cursor/projects/i-Github-new-Sono-SonoJs/agent-transcripts/2948dda0-828d-4cd6-b535-6c8614508c93/2948dda0-828d-4cd6-b535-6c8614508c93.jsonl"
const out = "I:/Github/new/Sono/SonoJs/.tmp-crypto-extract"
const lines = fs.readFileSync(p, "utf8").split(/\n/)

// All StrReplace on crypto-portfolio docs page
const docs = []
for (let i = 0; i < lines.length; i++) {
  let obj
  try {
    obj = JSON.parse(lines[i])
  } catch {
    continue
  }
  const content = obj?.message?.content
  if (!Array.isArray(content)) continue
  for (const part of content) {
    if (part.type !== "tool_use" || part.name !== "StrReplace") continue
    const fpath = String(part.input?.path || "").replace(/\\/g, "/")
    if (!fpath.includes("blocks/dashboards-analytics/crypto-portfolio/page.tsx"))
      continue
    docs.push({
      line: i + 1,
      old: part.input.old_string,
      neu: part.input.new_string,
    })
  }
}
fs.writeFileSync(path.join(out, "all-docs-patches.json"), JSON.stringify(docs, null, 2))
console.log("docs patches", docs.length)

// Find later Write of crypto-portfolio-01 after L5104 (SVG spark version)
for (let i = 5104; i < lines.length; i++) {
  let obj
  try {
    obj = JSON.parse(lines[i])
  } catch {
    continue
  }
  const content = obj?.message?.content
  if (!Array.isArray(content)) continue
  for (const part of content) {
    if (part.type !== "tool_use") continue
    const fpath = String(part.input?.path || "").replace(/\\/g, "/")
    if (!fpath.includes("crypto-portfolio-01/crypto-portfolio.tsx")) continue
    if (part.name === "Write") {
      fs.writeFileSync(
        path.join(out, "cp01-write-L" + (i + 1) + ".tsx"),
        part.input.contents
      )
      console.log("01 write L" + (i + 1), part.input.contents.length)
    }
    if (part.name === "StrReplace" && (part.input.new_string || "").includes("function MiniArea")) {
      fs.writeFileSync(
        path.join(out, "cp01-miniarea-L" + (i + 1) + ".txt"),
        "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + part.input.new_string
      )
      console.log("01 miniarea L" + (i + 1))
    }
  }
}

// Avatar webp conversion notes
for (let i = 5145; i < 5170; i++) {
  let obj
  try {
    obj = JSON.parse(lines[i])
  } catch {
    continue
  }
  const content = obj?.message?.content
  if (!Array.isArray(content)) continue
  for (const part of content) {
    if (part.type !== "tool_use") continue
    const blob = JSON.stringify(part.input || {})
    if (/avatar\.(avif|webp)/.test(blob) && /crypto-portfolio/.test(blob)) {
      fs.writeFileSync(
        path.join(out, "avatar-L" + (i + 1) + ".txt"),
        JSON.stringify(part, null, 2).slice(0, 4000)
      )
      console.log("avatar related L" + (i + 1), part.name)
    }
  }
}

// Initial buildSeries fix (Math.random -> deterministic)
for (let i = 5080; i < 5090; i++) {
  let obj
  try {
    obj = JSON.parse(lines[i])
  } catch {
    continue
  }
  const texts = (obj?.message?.content || [])
    .filter((c) => c.type === "text")
    .map((c) => c.text)
  if (texts.length) console.log("text L" + (i + 1), texts.join(" ").slice(0, 200))
}
