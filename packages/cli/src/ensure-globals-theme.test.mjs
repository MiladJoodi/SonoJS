import assert from "node:assert/strict"
import {
  stripCreateNextAppTheme,
  SONOJS_THEME_INLINE_BLOCK,
  SONOJS_SOURCE_INLINE_LINES,
} from "./ensure-globals-theme.mjs"

const cna = `@import "tailwindcss";

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
`

const out = stripCreateNextAppTheme(cna)

assert.equal(out.includes("@media"), false)
assert.equal(out.includes("--foreground: #171717"), false)
assert.equal(out.includes("--foreground: #ededed"), false)
assert.equal(out.includes("sonojs-tailwind-entry"), true)
assert.equal(SONOJS_THEME_INLINE_BLOCK.includes("--color-primary"), true)
assert.equal(SONOJS_SOURCE_INLINE_LINES[3].includes("bg-primary"), true)

// Soft-surface-only :root (no --primary) must also be stripped
const softOnly = `:root {
  --background: var(--canvas);
  --foreground: #171717;
  --canvas: #f3f3f4;
  --card: #fff;
}`
assert.equal(stripCreateNextAppTheme(softOnly).includes("--canvas:"), false)

// Full SonoJS :root must be kept
const sonoRoot = `:root {
  --background: var(--canvas);
  --foreground: #09090b;
  --primary: #2563eb;
}`
assert.equal(stripCreateNextAppTheme(sonoRoot).includes("--primary:"), true)

console.log("ensure-globals-theme: ok")
