import fs from "node:fs"
import os from "node:os"
import path from "node:path"

/** Canonical MCP launch command written into client configs. */
export const SONOJS_MCP_COMMAND = "npx"
export const SONOJS_MCP_ARGS = ["-y", "@sonojs/ui@latest", "mcp"]
export const SONOJS_SERVER_KEY = "sonojs"

/**
 * @typedef {"cursor" | "vscode" | "claude-desktop" | "claude-code" | "codex" | "windsurf"} ClientId
 */

/**
 * @param {ClientId} id
 * @param {{ cwd?: string, home?: string, platform?: NodeJS.Platform }} [env]
 */
export function getClientConfigPath(id, env = {}) {
  const cwd = env.cwd ?? process.cwd()
  const home = env.home ?? os.homedir()
  const platform = env.platform ?? process.platform

  switch (id) {
    case "cursor":
      return path.join(cwd, ".cursor", "mcp.json")
    case "vscode":
      return path.join(cwd, ".vscode", "mcp.json")
    case "claude-code":
      return path.join(cwd, ".mcp.json")
    case "claude-desktop": {
      if (platform === "darwin") {
        return path.join(
          home,
          "Library",
          "Application Support",
          "Claude",
          "claude_desktop_config.json"
        )
      }
      if (platform === "win32") {
        const appData =
          process.env.APPDATA || path.join(home, "AppData", "Roaming")
        return path.join(appData, "Claude", "claude_desktop_config.json")
      }
      return path.join(home, ".config", "Claude", "claude_desktop_config.json")
    }
    case "codex":
      return path.join(home, ".codex", "config.toml")
    case "windsurf":
      return path.join(home, ".codeium", "windsurf", "mcp_config.json")
    default:
      throw new Error(`Unknown MCP client: ${id}`)
  }
}

/** Markers that suggest the client is in use / worth configuring. */
export function clientPresenceMarkers(id, env = {}) {
  const cwd = env.cwd ?? process.cwd()
  const home = env.home ?? os.homedir()
  const platform = env.platform ?? process.platform

  switch (id) {
    case "cursor":
      return [
        path.join(cwd, ".cursor"),
        path.join(home, ".cursor"),
      ]
    case "vscode":
      return [
        path.join(cwd, ".vscode"),
        platform === "win32"
          ? path.join(
              process.env.APPDATA || path.join(home, "AppData", "Roaming"),
              "Code"
            )
          : platform === "darwin"
            ? path.join(home, "Library", "Application Support", "Code")
            : path.join(home, ".config", "Code"),
      ]
    case "claude-desktop":
      return [path.dirname(getClientConfigPath("claude-desktop", env))]
    case "claude-code":
      return [
        path.join(cwd, ".mcp.json"),
        path.join(home, ".claude"),
        path.join(home, ".claude.json"),
      ]
    case "codex":
      return [path.join(home, ".codex")]
    case "windsurf":
      return [
        path.join(home, ".codeium", "windsurf"),
        path.join(home, ".codeium"),
      ]
    default:
      return []
  }
}

export const ALL_CLIENT_IDS = /** @type {ClientId[]} */ ([
  "cursor",
  "vscode",
  "claude-desktop",
  "claude-code",
  "codex",
  "windsurf",
])

export function clientLabel(id) {
  const labels = {
    cursor: "Cursor",
    vscode: "VS Code / Copilot",
    "claude-desktop": "Claude Desktop",
    "claude-code": "Claude Code",
    codex: "Codex",
    windsurf: "Windsurf",
  }
  return labels[id] ?? id
}

/**
 * Detect which MCP clients look present. Always includes `cursor` as a
 * fallback when nothing else is found (project-level default).
 *
 * @param {{ cwd?: string, home?: string, platform?: NodeJS.Platform }} [env]
 * @returns {ClientId[]}
 */
export function detectClients(env = {}) {
  const found = []
  for (const id of ALL_CLIENT_IDS) {
    const markers = clientPresenceMarkers(id, env)
    const present = markers.some((p) => {
      try {
        return fs.existsSync(p)
      } catch {
        return false
      }
    })
    if (present) found.push(id)
  }
  if (found.length === 0) return ["cursor"]
  return found
}

export function buildSonojsServerEntry({ registryUrl } = {}) {
  const entry = {
    type: "stdio",
    command: SONOJS_MCP_COMMAND,
    args: [...SONOJS_MCP_ARGS],
  }
  if (registryUrl && registryUrl !== "https://sonojs.com/r") {
    entry.env = { SONOJS_REGISTRY: registryUrl }
  }
  return entry
}

export function reloadHint(id) {
  switch (id) {
    case "cursor":
      return "Reload Cursor MCP (Settings → MCP, or restart Cursor)."
    case "vscode":
      return "Reload VS Code window, then open MCP servers."
    case "claude-desktop":
      return "Fully quit and reopen Claude Desktop."
    case "claude-code":
      return "Restart Claude Code / reload MCP servers."
    case "codex":
      return "Restart Codex so it picks up MCP config."
    case "windsurf":
      return "Reload Windsurf MCP settings / restart Windsurf."
    default:
      return "Reload the MCP client."
  }
}
