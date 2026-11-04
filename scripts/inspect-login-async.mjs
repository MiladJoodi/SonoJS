import fs from "node:fs"

const text = fs.readFileSync(
  "E:/SonoJS/.next/server/app/(app)/blocks/authentication/login/page_client-reference-manifest.js",
  "utf8"
)

for (let i = 1; i <= 16; i++) {
  const id = `login-${String(i).padStart(2, "0")}`
  const marker = `authentication/login/${id}/login-form.tsx`
  const idx = text.indexOf(marker)
  if (idx < 0) {
    console.log(id, "NOT FOUND")
    continue
  }
  // Look back for nearest "async":true/false before this module entry
  const windowStart = Math.max(0, idx - 200)
  const snippet = text.slice(windowStart, idx + marker.length + 120)
  const asyncMatch = snippet.match(/"async":(true|false)/g)
  console.log(id, asyncMatch ? asyncMatch.join(",") : "no-async-flag", "...")
}
