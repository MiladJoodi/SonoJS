import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const emptyUrl = pathToFileURL(
  path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "../node_modules/server-only/empty.js"
  )
).href

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "server-only") {
    return { shortCircuit: true, url: emptyUrl }
  }
  return nextResolve(specifier, context)
}
