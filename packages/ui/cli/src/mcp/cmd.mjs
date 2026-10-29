import path from "node:path"

import { ALL_CLIENT_IDS } from "./clients.mjs"
import { runMcpInit } from "./init.mjs"
import { startMcpServer } from "./server.mjs"

const DEFAULT_REGISTRY = "https://sonojs.com/r"

function printMcpHelp() {
  console.log(`Usage:
  sonojs mcp [--registry <url-or-path>]
  sonojs mcp init [--client <name>] [--all] [--dry-run] [--cwd <dir>] [--registry <url-or-path>]

mcp       — run the SonoJS MCP stdio server (what Cursor/Claude/Codex launch)
mcp init  — detect agent clients and write a merge-safe \`sonojs\` MCP entry

Clients: ${ALL_CLIENT_IDS.join(", ")}

Published launch command written to configs:
  npx -y @sonojs/ui@latest mcp

Environment:
  SONOJS_REGISTRY   Default registry base (URL or local directory)
`)
}

/**
 * @param {string[]} rest argv after `mcp`
 */
export async function cmdMcp(rest) {
  if (rest[0] === "--help" || rest[0] === "-h") {
    printMcpHelp()
    return
  }

  if (rest[0] === "init") {
    await cmdMcpInit(rest.slice(1))
    return
  }

  let registry = process.env.SONOJS_REGISTRY || DEFAULT_REGISTRY
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--registry" && rest[i + 1]) {
      registry = rest[i + 1]
      i++
    } else if (rest[i] === "--help" || rest[i] === "-h") {
      printMcpHelp()
      return
    }
  }

  await startMcpServer({ registryUrl: registry })
}

/**
 * @param {string[]} rest argv after `mcp init`
 */
async function cmdMcpInit(rest) {
  let registry = process.env.SONOJS_REGISTRY || DEFAULT_REGISTRY
  let cwd = process.cwd()
  let dryRun = false
  let all = false
  /** @type {string | undefined} */
  let client

  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--registry" && rest[i + 1]) {
      registry = rest[i + 1]
      i++
    } else if (rest[i] === "--cwd" && rest[i + 1]) {
      cwd = path.resolve(rest[i + 1])
      i++
    } else if (rest[i] === "--client" && rest[i + 1]) {
      client = rest[i + 1]
      i++
    } else if (rest[i] === "--all") {
      all = true
    } else if (rest[i] === "--dry-run") {
      dryRun = true
    } else if (rest[i] === "--help" || rest[i] === "-h") {
      printMcpHelp()
      return
    }
  }

  runMcpInit({
    cwd,
    registryUrl: registry,
    dryRun,
    all,
    client,
  })
}
