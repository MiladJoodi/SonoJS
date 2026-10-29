import assert from "node:assert/strict"
import { mkdtemp, mkdir, writeFile, readFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { initSonojsProject } from "./init.mjs"
import { parseJsonText } from "./strip-bom.mjs"

const tmp = await mkdtemp(path.join(os.tmpdir(), "sonojs-init-"))
await mkdir(path.join(tmp, "src", "app"), { recursive: true })

await writeFile(
  path.join(tmp, "src", "app", "globals.css"),
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
  color: var(--foreground);
}
`,
  "utf8"
)

await writeFile(
  path.join(tmp, "package.json"),
  JSON.stringify({ name: "t", private: true, dependencies: {} }, null, 2),
  "utf8"
)

const result = await initSonojsProject({
  cwd: tmp,
  overwrite: true,
  registryUrl: "https://sonojs.com/r",
})

const cj = await readFile(path.join(tmp, "components.json"), "utf8")
assert.notEqual(cj.charCodeAt(0), 0xfeff)
const json = parseJsonText(cj)
assert.equal(json.registries["@sonojs"], "https://sonojs.com/r/{name}.json")

const globals = await readFile(path.join(tmp, "src", "app", "globals.css"), "utf8")
assert.equal(globals.includes("@media"), false)
assert.match(globals, /sonojs\.css/)
assert.match(globals, /--color-primary/)

assert.ok(result.written.includes("components.json"))
console.log("init-bom integration: ok")
