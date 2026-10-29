import fs from "node:fs"
import path from "node:path"

import { parseJsonText } from "../strip-bom.mjs"
import {
  ALL_CLIENT_IDS,
  buildSonojsServerEntry,
  clientLabel,
  detectClients,
  getClientConfigPath,
  reloadHint,
  SONOJS_SERVER_KEY,
} from "./clients.mjs"

/**
 * @param {unknown} a
 * @param {unknown} b
 */
function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * Merge-safe upsert of the `sonojs` server into a JSON MCP config.
 * Supports Cursor/Claude (`mcpServers`) and VS Code (`servers`).
 *
 * @param {string} raw
 * @param {Record<string, unknown>} entry
 * @param {{ preferKey?: "mcpServers" | "servers" }} [opts]
 */
export function upsertJsonMcpConfig(raw, entry, opts = {}) {
  let data = {}
  const trimmed = (raw ?? "").trim()
  if (trimmed) {
    data = parseJsonText(trimmed, "mcp.json")
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("MCP config must be a JSON object")
    }
  }

  /** @type {"mcpServers" | "servers"} */
  let key = opts.preferKey ?? "mcpServers"
  if (data.servers && !data.mcpServers) key = "servers"
  else if (data.mcpServers) key = "mcpServers"
  else if (opts.preferKey) key = opts.preferKey

  const servers = {
    ...(typeof data[key] === "object" && data[key] && !Array.isArray(data[key])
      ? data[key]
      : {}),
  }

  const nextEntry =
    key === "servers"
      ? { type: "stdio", ...entry }
      : entry

  const previous = servers[SONOJS_SERVER_KEY]
  if (deepEqual(previous, nextEntry)) {
    return {
      changed: false,
      text: trimmed ? `${JSON.stringify(data, null, 2)}\n` : "",
      data,
    }
  }

  servers[SONOJS_SERVER_KEY] = nextEntry
  const next = { ...data, [key]: servers }
  return {
    changed: true,
    text: `${JSON.stringify(next, null, 2)}\n`,
    data: next,
  }
}

/**
 * Upsert `[mcp_servers.sonojs]` (or `[mcp.servers.sonojs]`) in Codex TOML.
 *
 * @param {string} raw
 * @param {{ command: string, args: string[], env?: Record<string, string> }} entry
 */
export function upsertCodexToml(raw, entry) {
  const sectionHeader = "[mcp_servers.sonojs]"
  const altHeader = "[mcp.servers.sonojs]"
  const lines = [
    sectionHeader,
    `command = ${JSON.stringify(entry.command)}`,
    `args = [${entry.args.map((a) => JSON.stringify(a)).join(", ")}]`,
  ]
  if (entry.env && Object.keys(entry.env).length) {
    lines.push(`[mcp_servers.sonojs.env]`)
    for (const [k, v] of Object.entries(entry.env)) {
      lines.push(`${k} = ${JSON.stringify(v)}`)
    }
  }
  const block = `${lines.join("\n")}\n`

  const text = raw ?? ""
  const headerRe =
    /^\[(?:mcp_servers|mcp\.servers)\.sonojs\][^\n]*(?:\n(?!\[)[^\n]*)*/gm
  if (headerRe.test(text)) {
    const next = text.replace(headerRe, block.trimEnd())
    const already = next === text || next.trim() === text.trim()
    // Normalize: if content equivalent after rewrite
    if (already) {
      return { changed: false, text }
    }
    // Check if args/command already match by simple includes
    const hasCommand = text.includes(
      `command = ${JSON.stringify(entry.command)}`
    )
    const hasArgs = text.includes(
      `args = [${entry.args.map((a) => JSON.stringify(a)).join(", ")}]`
    )
    if (hasCommand && hasArgs) {
      return { changed: false, text }
    }
    return { changed: true, text: next.endsWith("\n") ? next : `${next}\n` }
  }

  const sep = text.trim().length ? (text.endsWith("\n") ? "\n" : "\n\n") : ""
  return { changed: true, text: `${text}${sep}${block}` }
}

/**
 * @param {import("./clients.mjs").ClientId} id
 */
function preferKeyForClient(id) {
  if (id === "vscode") return "servers"
  return "mcpServers"
}

/**
 * @param {import("./clients.mjs").ClientId} clientId
 * @param {{
 *   cwd?: string
 *   home?: string
 *   platform?: NodeJS.Platform
 *   registryUrl?: string
 *   dryRun?: boolean
 *   log?: (msg: string) => void
 * }} [opts]
 */
export function configureClient(clientId, opts = {}) {
  const log = opts.log ?? console.log
  const configPath = getClientConfigPath(clientId, opts)
  const entry = buildSonojsServerEntry({ registryUrl: opts.registryUrl })
  const label = clientLabel(clientId)

  let existing = ""
  if (fs.existsSync(configPath)) {
    existing = fs.readFileSync(configPath, "utf8")
  }

  let result
  if (clientId === "codex") {
    result = upsertCodexToml(existing, entry)
  } else {
    result = upsertJsonMcpConfig(existing, entry, {
      preferKey: preferKeyForClient(clientId),
    })
  }

  if (!result.changed) {
    log(`~ ${configPath} (${label} — already configured)`)
    return { clientId, path: configPath, status: "unchanged", dryRun: !!opts.dryRun }
  }

  if (opts.dryRun) {
    log(`+ ${configPath} (${label} — dry-run)`)
    return { clientId, path: configPath, status: "would-write", dryRun: true }
  }

  fs.mkdirSync(path.dirname(configPath), { recursive: true })
  fs.writeFileSync(configPath, result.text, "utf8")
  log(`+ ${configPath} (${label})`)
  return { clientId, path: configPath, status: "written", dryRun: false }
}

/**
 * @param {{
 *   cwd?: string
 *   home?: string
 *   platform?: NodeJS.Platform
 *   clients?: import("./clients.mjs").ClientId[]
 *   all?: boolean
 *   client?: string
 *   registryUrl?: string
 *   dryRun?: boolean
 *   log?: (msg: string) => void
 * }} [opts]
 */
export function runMcpInit(opts = {}) {
  const log = opts.log ?? console.log
  const cwd = opts.cwd ?? process.cwd()

  /** @type {import("./clients.mjs").ClientId[]} */
  let targets
  if (opts.all) {
    targets = [...ALL_CLIENT_IDS]
  } else if (opts.client) {
    const id = opts.client
    if (!ALL_CLIENT_IDS.includes(/** @type {any} */ (id))) {
      throw new Error(
        `Unknown client "${id}". Use one of: ${ALL_CLIENT_IDS.join(", ")}`
      )
    }
    targets = [/** @type {import("./clients.mjs").ClientId} */ (id)]
  } else if (opts.clients?.length) {
    targets = opts.clients
  } else {
    targets = detectClients({
      cwd,
      home: opts.home,
      platform: opts.platform,
    })
  }

  log(
    opts.dryRun
      ? "SonoJS MCP init (dry-run)\n"
      : "SonoJS MCP init\n"
  )
  log(`Detected / targeting: ${targets.map(clientLabel).join(", ")}\n`)

  const results = []
  for (const id of targets) {
    results.push(
      configureClient(id, {
        cwd,
        home: opts.home,
        platform: opts.platform,
        registryUrl: opts.registryUrl,
        dryRun: opts.dryRun,
        log,
      })
    )
  }

  log("")
  for (const id of targets) {
    log(`→ ${clientLabel(id)}: ${reloadHint(id)}`)
  }

  return { targets, results }
}
