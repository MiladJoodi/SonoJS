import fs from "node:fs"
import path from "node:path"

const root = "registry/blocks/marketing/faq"
const dirs = fs
  .readdirSync(root)
  .filter((d) => d.startsWith("faq-"))
  .sort((a, b) => Number(a.split("-")[1]) - Number(b.split("-")[1]))

const physRe =
  /\b(ml-\S+|mr-\S+|pl-\S+|pr-\S+|left-\S+|right-\S+|text-left|text-right|border-l\b|border-r\b|rounded-l-\S+|rounded-r-\S+)/g

const report = []

for (const d of dirs) {
  const f = path.join(root, d, "faq.tsx")
  const s = fs.readFileSync(f, "utf8")
  const pubPath = path.join("public/r", `${d}.json`)
  const inReg = fs.existsSync(pubPath)
  let jsonParity = { ok: false }
  if (inReg) {
    const j = JSON.parse(fs.readFileSync(pubPath, "utf8"))
    const content = j.files?.[0]?.content ?? ""
    const target = j.files?.[0]?.target
    // Strip "use client" / whitespace for rough parity of key markers
    const markers = [
      "gridTemplateRows",
      "bg-canvas",
      "shadow-soft",
      "bg-card",
      "icon-dir",
      "text-start",
      "cursor-pointer",
    ]
    jsonParity = {
      ok: true,
      target,
      markerDiff: markers.filter(
        (m) => s.includes(m) !== content.includes(m)
      ),
      contentLen: content.length,
      srcLen: s.length,
      // exact content should match source after build rewrite of imports only
      exact: content.replace(/\r\n/g, "\n") === s.replace(/\r\n/g, "\n"),
    }
  }

  const physHits = [...new Set(s.match(physRe) || [])]
  // translate-x-1/2 for centering is OK; flag physical left-1/2 without start
  const leftHalf = (s.match(/left-1\/2/g) || []).length
  const startHalf = (s.match(/start-1\/2/g) || []).length
  const translateX = (s.match(/-translate-x-1\/2/g) || []).length

  report.push({
    d,
    accordion: s.includes("aria-expanded"),
    inlineRows: s.includes("gridTemplateRows"),
    staleGridClass: s.includes("grid-rows-[0fr]"),
    shadow: /shadow-soft|shadow-md|shadow-xl|shadow-sm/.test(s),
    bgCard: s.includes("bg-card"),
    img: s.includes("<img") || s.includes("next/image"),
    hardDir: /dir=["'](ltr|rtl)["']/.test(s),
    physHits,
    leftHalf,
    startHalf,
    translateX,
    useClient: s.startsWith('"use client"') || s.includes('"use client"'),
    inReg,
    jsonParity,
  })
}

console.log(JSON.stringify(report, null, 2))

const problems = report.filter(
  (r) =>
    r.physHits.length ||
    r.staleGridClass ||
    (r.accordion && !r.inlineRows) ||
    !r.inReg ||
    (r.jsonParity.markerDiff && r.jsonParity.markerDiff.length) ||
    r.hardDir
)
console.log("\n--- PROBLEMS ---")
console.log(JSON.stringify(problems, null, 2))
