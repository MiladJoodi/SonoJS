import assert from "node:assert/strict"
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { ensureGlobalsThemeEntry } from "./ensure-globals-theme.mjs"

const tmp = await mkdtemp(path.join(os.tmpdir(), "sonojs-globals-"))
const appDir = path.join(tmp, "src", "app")
await mkdir(appDir, { recursive: true })
await mkdir(path.join(tmp, "components"), { recursive: true })
await mkdir(path.join(tmp, "styles"), { recursive: true })

await writeFile(
  path.join(tmp, "styles", "sonojs.css"),
  `:root { --primary: #2563eb; --canvas: #f3f3f4; --foreground: #09090b; --background: var(--canvas); }\n.dark { --foreground: #fafafa; --canvas: #09090b; }\n`,
  "utf8"
)

await writeFile(
  path.join(appDir, "globals.css"),
  `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}
`,
  "utf8"
)

const result = await ensureGlobalsThemeEntry(tmp)
assert.equal(result.status, "patched")

const css = await readFile(path.join(appDir, "globals.css"), "utf8")
assert.match(css, /sonojs\.css/)
assert.match(css, /--color-primary:/)
assert.match(css, /bg-primary hover:bg-primary\/90/)
assert.match(css, /@source "\.\.\/\.\.\/components/)
assert.equal(css.includes("@media"), false)
assert.equal(css.includes("--foreground: #ededed"), false)
assert.match(css, /@custom-variant dark/)

console.log("ensure-globals-theme integration: ok")
console.log("tmp:", tmp)
