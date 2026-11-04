import fs from "node:fs"

const text = fs.readFileSync(
  "E:/SonoJS/.next/server/app/(app)/blocks/authentication/login/page_client-reference-manifest.js",
  "utf8"
)

for (const id of [
  "login-01",
  "login-02",
  "login-demo-lazy",
  "login-demo-loaders",
]) {
  const idx = text.indexOf(id)
  console.log("\n===", id, "idx", idx, "===")
  if (idx >= 0) {
    console.log(text.slice(Math.max(0, idx - 100), idx + 160))
  }
}

const chunks = [...new Set(text.match(/static\/chunks\/[^"']+\.js/g) || [])]
console.log("\nunique chunks", chunks.length)
