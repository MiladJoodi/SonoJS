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

const CODEX_SONOJS_SECTION_RE =
  /^\[(?:mcp_servers|mcp\.servers)\.sonojs(?:\.env)?\][^\n]*(?:\n(?!\[)[^\n]*)*/gm

const CODEX_SONOJS_MAIN_HEADER_RE = /^\[(?:mcp_servers|mcp\.servers)\.sonojs\]/m

/**
 * @param {{ command: string, args: string[], env?: Record<string, string> }} entry
 */
function buildCodexSonojsBlock(entry) {
  const lines = [
    "[mcp_servers.sonojs]",
    `command = ${JSON.stringify(entry.command)}`,
    `args = [${entry.args.map((a) => JSON.stringify(a)).join(", ")}]`,
  ]
  if (entry.env && Object.keys(entry.env).length) {
    lines.push("[mcp_servers.sonojs.env]")
    for (const [k, v] of Object.entries(entry.env)) {
      lines.push(`${k} = ${JSON.stringify(v)}`)
    }
  }
  return `${lines.join("\n")}\n`
}

/**
 * @param {Record<string, string> | undefined} env
 */
function normalizedCodexEnv(env) {
  if (!env || !Object.keys(env).length) return undefined
  return env
}

/**
 * @param {{ command: string, args: string[], env?: Record<string, string> }} a
 * @param {{ command: string, args: string[], env?: Record<string, string> }} b
 */
function codexSonojsEntryEqual(a, b) {
  if (a.command !== b.command) return false
  if (JSON.stringify(a.args) !== JSON.stringify(b.args)) return false
  const aEnv = a.env ?? {}
  const bEnv = b.env ?? {}
  const keys = new Set([...Object.keys(aEnv), ...Object.keys(bEnv)])
  for (const k of keys) {
    if (aEnv[k] !== bEnv[k]) return false
  }
  return true
}

/**
 * Read the canonical `sonojs` Codex MCP block (supports `mcp_servers` / `mcp.servers` aliases).
 *
 * @param {string} text
 * @returns {{ command: string, args: string[], env?: Record<string, string> } | null}
 */
export function parseCodexSonojsConfig(text) {
  const lines = text.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const header = lines[i].match(/^\[(mcp_servers|mcp\.servers)\.sonojs\]$/)
    if (!header) continue

    /** @type {string | undefined} */
    let command
    /** @type {string[] | undefined} */
    let args
    i++
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("[")) {
      const kv = lines[i].match(/^(command|args)\s*=\s*(.+)$/)
      if (kv) {
        try {
          const val = JSON.parse(kv[2].trim())
          if (kv[1] === "command") command = val
          else args = val
        } catch {
          return null
        }
      }
      i++
    }

    /** @type {Record<string, string>} */
    const env = {}
    if (i < lines.length) {
      const envHeader = lines[i].match(
        /^\[(mcp_servers|mcp\.servers)\.sonojs\.env\]$/
      )
      if (envHeader) {
        i++
        while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("[")) {
          const kv = lines[i].match(/^(\w+)\s*=\s*(.+)$/)
          if (kv) {
            try {
              env[kv[1]] = JSON.parse(kv[2].trim())
            } catch {
              env[kv[1]] = kv[2].trim()
            }
          }
          i++
        }
      }
    }

    if (typeof command !== "string" || !Array.isArray(args)) return null
    return {
      command,
      args,
      env: Object.keys(env).length ? env : undefined,
    }
  }
  return null
}

/**
 * @param {string} text
 */
function stripCodexSonojsSections(text) {
  return text.replace(CODEX_SONOJS_SECTION_RE, "")
}

/**
 * @param {string} text
 */
function hasCodexSonojsEnvSection(text) {
  return /^\[(?:mcp_servers|mcp\.servers)\.sonojs\.env\]/m.test(text)
}

/**
 * @param {string} text
 */
function hasOrphanCodexSonojsEnv(text) {
  return (
    hasCodexSonojsEnvSection(text) && !CODEX_SONOJS_MAIN_HEADER_RE.test(text)
  )
}

/**
 * Upsert `[mcp_servers.sonojs]` (or `[mcp.servers.sonojs]`) in Codex TOML.
 *
 * @param {string} raw
 * @param {{ command: string, args: string[], env?: Record<string, string> }} entry
 */
export function upsertCodexToml(raw, entry) {
  const text = raw ?? ""
  const desired = {
    command: entry.command,
    args: entry.args,
    env: normalizedCodexEnv(entry.env),
  }
  const existing = parseCodexSonojsConfig(text)
  const block = buildCodexSonojsBlock(entry)

  if (
    existing &&
    codexSonojsEntryEqual(existing, desired) &&
    !hasOrphanCodexSonojsEnv(text) &&
    Boolean(desired.env) === hasCodexSonojsEnvSection(text)
  ) {
    return { changed: false, text }
  }

  const mainIdx = text.search(CODEX_SONOJS_MAIN_HEADER_RE)
  let next
  if (mainIdx >= 0) {
    const before = text.slice(0, mainIdx).replace(/\s+$/, "")
    const after = stripCodexSonojsSections(text.slice(mainIdx)).replace(
      /^\s+/,
      ""
    )
    next = ""
    if (before.length) {
      next += before.endsWith("\n") ? before : `${before}\n`
      next += "\n"
    }
    next += block
    if (after.length) {
      if (!next.endsWith("\n")) next += "\n"
      next += after.endsWith("\n") ? after : `${after}\n`
    } else if (!next.endsWith("\n")) {
      next += "\n"
    }
  } else if (hasOrphanCodexSonojsEnv(text)) {
    const stripped = stripCodexSonojsSections(text).replace(/\n{3,}/g, "\n\n")
    const sep = stripped.trim().length
      ? stripped.endsWith("\n")
        ? ""
        : "\n\n"
      : ""
    next = `${stripped.replace(/\s+$/, "")}${sep}${block}`
    if (!next.endsWith("\n")) next += "\n"
  } else {
    const sep = text.trim().length ? (text.endsWith("\n") ? "\n" : "\n\n") : ""
    next = `${text.replace(/\s+$/, "")}${text.trim().length ? sep : ""}${block}`
  }

  return { changed: true, text: next }
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
    log(`~ ${configPath} (${label} - already configured)`)
    return { clientId, path: configPath, status: "unchanged", dryRun: !!opts.dryRun }
  }

  if (opts.dryRun) {
    log(`+ ${configPath} (${label} - dry-run)`)
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
