import fs from "fs"
import path from "path"

const p =
  "C:/Users/Salam/.cursor/projects/i-Github-new-Sono-SonoJs/agent-transcripts/2948dda0-828d-4cd6-b535-6c8614508c93/2948dda0-828d-4cd6-b535-6c8614508c93.jsonl"
const out = "I:/Github/new/Sono/SonoJs/.tmp-crypto-extract"
const lines = fs.readFileSync(p, "utf8").split(/\n/)

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
    if (part.type !== "tool_use" || part.name !== "Write") continue
    const fpath = String(part.input?.path || "").replace(/\\/g, "/")
    if (fpath.includes("crypto-portfolio-01/icons/") && fpath.endsWith(".svg")) {
      const name = path.basename(fpath)
      fs.writeFileSync(path.join(out, name), part.input.contents)
      console.log("icon", name, part.input.contents.length)
    }
  }
}

// Find Deterministic buildSeries replacement
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
    const ns = part.input?.new_string || ""
    if (ns.includes("Deterministic walk")) {
      fs.writeFileSync(
        path.join(out, "cp03-deterministic-buildSeries.txt"),
        "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + ns
      )
      console.log("deterministic L" + (i + 1))
    }
  }
}

// Docs / view page updates mentioning CryptoPortfolio0[234]
for (let i = 5055; i < 5220; i++) {
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
    const blob = (part.input.old_string || "") + (part.input.new_string || "")
    if (
      (fpath.includes("crypto-portfolio/page.tsx") ||
        fpath.includes("view/[name]/page.tsx")) &&
      /CryptoPortfolio0[234]|crypto-portfolio-0[234]/.test(blob)
    ) {
      const name =
        "wire-" +
        (fpath.includes("view") ? "view" : "docs") +
        "-L" +
        (i + 1) +
        ".txt"
      fs.writeFileSync(
        path.join(out, name),
        "PATH: " +
          fpath +
          "\nOLD:\n" +
          part.input.old_string +
          "\n\nNEW:\n" +
          part.input.new_string
      )
      console.log("wire", name)
    }
  }
}

// Later cp04 border / hero patches
for (let i = 5190; i < 5250; i++) {
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
    if (!fpath.includes("crypto-portfolio-04")) continue
    fs.writeFileSync(
      path.join(out, "cp04-patch-L" + (i + 1) + ".txt"),
      "OLD:\n" + part.input.old_string + "\n\nNEW:\n" + part.input.new_string
    )
    console.log("cp04 patch L" + (i + 1))
  }
}

// Summarize structure
for (const f of [
  "cp02-write-L5063.tsx",
  "cp03-write-L5077.tsx",
  "cp04-write-L5139.tsx",
  "cp01-write-L5104.tsx",
]) {
  const t = fs.readFileSync(path.join(out, f), "utf8")
  const comments = [...t.matchAll(/\{\/\* ([^*]+) \*\//g)].map((m) => m[1])
  console.log("\n==", f, "==")
  console.log("lines", t.split("\n").length)
  console.log("comments", comments)
  console.log("recharts", /recharts/.test(t))
  console.log(
    "intervals",
    (t.match(/setInterval\([^)]+\)/g) || []).join(" | ")
  )
  console.log(
    "keyframes",
    [...t.matchAll(/@keyframes ([a-z0-9-]+)/g)].map((m) => m[1])
  )
  // section className / bg hints
  const bg = t.match(/background:[^;]+;/g)?.slice(0, 6)
  console.log("bg snippets", bg)
}
