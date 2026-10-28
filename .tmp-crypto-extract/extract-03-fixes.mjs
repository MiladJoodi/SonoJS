import fs from "fs"
import path from "path"

const p =
  "C:/Users/Salam/.cursor/projects/i-Github-new-Sono-SonoJs/agent-transcripts/2948dda0-828d-4cd6-b535-6c8614508c93/2948dda0-828d-4cd6-b535-6c8614508c93.jsonl"
const out = "I:/Github/new/Sono/SonoJs/.tmp-crypto-extract"
const lines = fs.readFileSync(p, "utf8").split(/\n/)

for (let i = 5085; i <= 5100; i++) {
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
    if (!fpath.includes("crypto-portfolio-03")) continue
    fs.writeFileSync(
      path.join(out, "cp03-fix-L" + (i + 1) + ".txt"),
      "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + part.input.new_string
    )
    console.log(
      "03 fix L" + (i + 1),
      (part.input.old_string || "").slice(0, 60).replace(/\n/g, " ")
    )
  }
}

// Find docs page BlockExample additions for 02/03/04
for (let i = 5060; i <= 5120; i++) {
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
    const ns = part.input.new_string || ""
    if (
      fpath.includes("crypto-portfolio/page.tsx") &&
      /CryptoPortfolio0[234]/.test(ns)
    ) {
      fs.writeFileSync(
        path.join(out, "docs-examples-L" + (i + 1) + ".txt"),
        "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + ns
      )
      console.log("docs examples L" + (i + 1), ns.length)
    }
  }
}

// view import lines
for (let i = 5060; i <= 5120; i++) {
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
    const ns = part.input.new_string || ""
    if (
      fpath.includes("view/[name]/page.tsx") &&
      ns.includes("import CryptoPortfolio0")
    ) {
      fs.writeFileSync(
        path.join(out, "view-import-L" + (i + 1) + ".txt"),
        "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + ns
      )
      console.log("view import L" + (i + 1))
    }
  }
}
