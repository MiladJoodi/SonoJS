import assert from "node:assert/strict"
import { parseJsonText, stripBom } from "./strip-bom.mjs"

assert.equal(stripBom("hello"), "hello")
assert.equal(stripBom("\uFEFFhello"), "hello")

const bomJson = "\uFEFF{\n  \"$schema\": \"https://example.com\"\n}\n"
const parsed = parseJsonText(bomJson, "components.json")
assert.equal(parsed.$schema, "https://example.com")

assert.throws(
  () => parseJsonText("{not json", "bad"),
  /bad:/
)

console.log("strip-bom: ok")
