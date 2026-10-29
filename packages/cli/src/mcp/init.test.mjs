import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

import {
  detectClients,
  getClientConfigPath,
  buildSonojsServerEntry,
} from "./clients.mjs"
import {
  runMcpInit,
  upsertCodexToml,
  upsertJsonMcpConfig,
} from "./init.mjs"

const entry = buildSonojsServerEntry()

// --- JSON merge (Cursor / Claude) ---
{
  const empty = upsertJsonMcpConfig("", entry)
  assert.equal(empty.changed, true)
  assert.deepEqual(empty.data.mcpServers.sonojs, entry)

  const again = upsertJsonMcpConfig(empty.text, entry)
  assert.equal(again.changed, false)

  const withOther = upsertJsonMcpConfig(
    JSON.stringify({
      mcpServers: {
        other: { command: "echo", args: ["hi"] },
      },
    }),
    entry
  )
  assert.equal(withOther.changed, true)
  assert.ok(withOther.data.mcpServers.other)
  assert.deepEqual(withOther.data.mcpServers.sonojs, entry)
}

// --- VS Code prefers `servers` + type stdio ---
{
  const vs = upsertJsonMcpConfig("", entry, { preferKey: "servers" })
  assert.equal(vs.data.servers.sonojs.type, "stdio")
  assert.equal(vs.data.servers.sonojs.command, "npx")
  const again = upsertJsonMcpConfig(vs.text, entry, { preferKey: "servers" })
  assert.equal(again.changed, false)
}

// --- Codex TOML ---
{
  const first = upsertCodexToml("", entry)
  assert.equal(first.changed, true)
  assert.match(first.text, /\[mcp_servers\.sonojs\]/)
  assert.match(first.text, /@sonojs\/ui@latest/)

  const second = upsertCodexToml(first.text, entry)
  assert.equal(second.changed, false)

  const withPreamble = upsertCodexToml("model = \"gpt\"\n", entry)
  assert.equal(withPreamble.changed, true)
  assert.match(withPreamble.text, /^model = "gpt"/)
  assert.match(withPreamble.text, /\[mcp_servers\.sonojs\]/)
}

// --- Paths ---
{
  const cwd = path.join(os.tmpdir(), "sonojs-mcp-paths")
  assert.equal(
    getClientConfigPath("cursor", { cwd }),
    path.join(cwd, ".cursor", "mcp.json")
  )
  assert.equal(
    getClientConfigPath("vscode", { cwd }),
    path.join(cwd, ".vscode", "mcp.json")
  )
  assert.equal(
    getClientConfigPath("claude-code", { cwd }),
    path.join(cwd, ".mcp.json")
  )
}

// --- Detect fallback → cursor ---
{
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-home-"))
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-cwd-"))
  assert.deepEqual(detectClients({ cwd, home, platform: "linux" }), ["cursor"])
  fs.rmSync(home, { recursive: true, force: true })
  fs.rmSync(cwd, { recursive: true, force: true })
}

// --- Detect when .cursor exists ---
{
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-home-"))
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-cwd-"))
  fs.mkdirSync(path.join(cwd, ".cursor"))
  const found = detectClients({ cwd, home, platform: "linux" })
  assert.ok(found.includes("cursor"))
  fs.rmSync(home, { recursive: true, force: true })
  fs.rmSync(cwd, { recursive: true, force: true })
}

// --- Dry-run smoke ---
{
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-init-"))
  const lines = []
  const { results } = runMcpInit({
    cwd,
    client: "cursor",
    dryRun: true,
    log: (m) => lines.push(String(m)),
  })
  assert.equal(results[0].status, "would-write")
  assert.ok(lines.some((l) => l.includes("dry-run")))
  assert.equal(fs.existsSync(path.join(cwd, ".cursor", "mcp.json")), false)

  const written = runMcpInit({
    cwd,
    client: "cursor",
    dryRun: false,
    log: () => {},
  })
  assert.equal(written.results[0].status, "written")
  const cfg = JSON.parse(
    fs.readFileSync(path.join(cwd, ".cursor", "mcp.json"), "utf8")
  )
  assert.deepEqual(cfg.mcpServers.sonojs.args, [
    "-y",
    "@sonojs/ui@latest",
    "mcp",
  ])

  const again = runMcpInit({
    cwd,
    client: "cursor",
    dryRun: false,
    log: () => {},
  })
  assert.equal(again.results[0].status, "unchanged")

  fs.rmSync(cwd, { recursive: true, force: true })
}

console.log("mcp/init: ok")
