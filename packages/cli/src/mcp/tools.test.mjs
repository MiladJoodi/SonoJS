import assert from "node:assert/strict"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { createToolHandlers } from "./tools.mjs"
import {
  buildAddCommand,
  loadRegistryIndex,
  searchIndexItems,
} from "./registry.mjs"

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../../"
)
const registryPath = path.join(root, "public", "r")

const index = await loadRegistryIndex(registryPath)
assert.ok(Array.isArray(index.items))
assert.ok(index.items.length > 0)

const buttonHits = searchIndexItems(index, "button")
assert.ok(buttonHits.some((i) => i.name === "button"))

const handlers = createToolHandlers({ registryUrl: registryPath })

{
  const res = await handlers.list_components()
  assert.equal(res.isError, undefined)
  const payload = JSON.parse(res.content[0].text)
  assert.ok(payload.count > 0)
  assert.ok(payload.items.some((i) => i.name === "button"))
}

{
  const res = await handlers.search_components({ query: "calendar" })
  const payload = JSON.parse(res.content[0].text)
  assert.ok(payload.items.some((i) => i.name === "calendar"))
}

{
  const res = await handlers.get_component({ name: "button" })
  assert.equal(res.isError, undefined)
  const payload = JSON.parse(res.content[0].text)
  assert.equal(payload.name, "button")
  assert.ok(Array.isArray(payload.files))
  assert.ok(payload.files.length > 0)
}

{
  const res = await handlers.get_add_command({ name: "button" })
  const payload = JSON.parse(res.content[0].text)
  assert.equal(payload.command, "npx @sonojs/ui@latest add button")
  assert.ok(payload.hint.includes("add button"))
}

{
  const { command, alsoNeeds } = buildAddCommand("calendar", {
    registryDeps: ["button"],
    npmDeps: ["date-fns", "clsx", "react-day-picker@^9.14.0"],
  })
  assert.equal(command, "npx @sonojs/ui@latest add calendar")
  assert.ok(alsoNeeds.includes("add button"))
  assert.ok(alsoNeeds.includes("date-fns"))
  assert.ok(alsoNeeds.includes("react-day-picker@^9.14.0"))
  assert.ok(!alsoNeeds.includes("clsx"))
}

{
  const res = await handlers.get_component({ name: "" })
  assert.equal(res.isError, true)
}

console.log("mcp/tools: ok")
