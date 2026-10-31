/**
 * Patch CJS + ESM resolution so Node ops scripts can import app modules
 * that declare `import "server-only"`.
 */
import { createRequire } from "node:module"
import { register } from "node:module"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import fs from "node:fs"

const require = createRequire(import.meta.url)
const dir = path.dirname(fileURLToPath(import.meta.url))
const emptyJs = path.join(dir, "../node_modules/server-only/empty.js")
if (!fs.existsSync(emptyJs)) {
  throw new Error(`Missing server-only empty stub at ${emptyJs}`)
}

const Module = require("module")
const originalResolveFilename = Module._resolveFilename
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request === "server-only") {
    return emptyJs
  }
  return originalResolveFilename.call(this, request, parent, isMain, options)
}

require.cache[emptyJs] = {
  id: emptyJs,
  filename: emptyJs,
  loaded: true,
  exports: {},
  children: [],
  paths: [],
  parent: null,
  isPreloading: false,
  path: path.dirname(emptyJs),
  require,
}

register(
  pathToFileURL(path.join(dir, "server-only-loader.mjs")).href,
  pathToFileURL(path.join(dir, "register-server-only-stub.mjs")).href
)
