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

const CODEX_SONOJS_SECTION_RE =
  /^\[(?:mcp_servers|mcp\.servers)\.sonojs(?:\.env)?\][^\n]*(?:\n(?!\[)[^\n]*)*/gm

/**
 * @param {string} text
 */
function withoutSonojsTomlSections(text) {
  return text.replace(CODEX_SONOJS_SECTION_RE, "").replace(/\n{3,}/g, "\n\n").trim()
}

/**
 * Assert non-sonojs TOML is unchanged (full diff minus sonojs tables).
 *
 * @param {string} before
 * @param {string} after
 * @param {string[]} markers optional substrings that must survive in `after`
 */
function assertCodexUnrelatedPreserved(before, after, markers = []) {
  assert.equal(
    withoutSonojsTomlSections(before),
    withoutSonojsTomlSections(after),
    "only sonojs MCP tables should change"
  )
  for (const marker of markers) {
    assert.ok(before.includes(marker), `fixture missing ${marker}`)
    assert.ok(after.includes(marker), `unrelated setting removed: ${marker}`)
  }
}

const entry = buildSonojsServerEntry()
const DEFAULT_REGISTRY = "https://sonojs.com/r"

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
  const def = buildSonojsServerEntry({ registryUrl: "https://sonojs.com/r" })
  const customA = buildSonojsServerEntry({ registryUrl: "http://a.local/r" })
  const customB = buildSonojsServerEntry({ registryUrl: "http://b.local/r" })

  const first = upsertCodexToml("", def)
  assert.equal(first.changed, true)
  assert.match(first.text, /\[mcp_servers\.sonojs\]/)
  assert.match(first.text, /@sonojs\/ui@latest/)
  assert.doesNotMatch(first.text, /\[mcp_servers\.sonojs\.env\]/)

  const second = upsertCodexToml(first.text, def)
  assert.equal(second.changed, false)

  const withPreamble = upsertCodexToml("model = \"gpt\"\n", def)
  assert.equal(withPreamble.changed, true)
  assert.match(withPreamble.text, /^model = "gpt"/)
  assert.match(withPreamble.text, /\[mcp_servers\.sonojs\]/)

  const withCustom = upsertCodexToml("", customA)
  assert.equal(withCustom.changed, true)
  assert.match(withCustom.text, /SONOJS_REGISTRY = "http:\/\/a\.local\/r"/)

  const customToCustom = upsertCodexToml(withCustom.text, customB)
  assert.equal(customToCustom.changed, true)
  assert.match(customToCustom.text, /SONOJS_REGISTRY = "http:\/\/b\.local\/r"/)
  assert.doesNotMatch(customToCustom.text, /a\.local/)

  const backToDefault = upsertCodexToml(customToCustom.text, def)
  assert.equal(backToDefault.changed, true)
  assert.doesNotMatch(backToDefault.text, /\[mcp_servers\.sonojs\.env\]/)
  assert.doesNotMatch(backToDefault.text, /SONOJS_REGISTRY/)

  const unchanged = upsertCodexToml(backToDefault.text, def)
  assert.equal(unchanged.changed, false)

  const aliasToml = `[mcp.servers.sonojs]
command = ${JSON.stringify(def.command)}
args = [${def.args.map((a) => JSON.stringify(a)).join(", ")}]
`
  const aliasFresh = upsertCodexToml(aliasToml, def)
  assert.equal(aliasFresh.changed, false)

  const withOtherMcp = `model = "gpt"

[mcp_servers.other]
command = "echo"
args = ["hi"]

[mcp_servers.sonojs]
command = "npx"
args = ["-y", "@sonojs/ui@latest", "mcp"]
[mcp_servers.sonojs.env]
SONOJS_REGISTRY = "http://a.local/r"
`
  const mergeOther = upsertCodexToml(withOtherMcp, customB)
  assert.equal(mergeOther.changed, true)
  assert.match(mergeOther.text, /\[mcp_servers\.other\]/)
  assert.match(mergeOther.text, /command = "echo"/)
  assert.match(mergeOther.text, /SONOJS_REGISTRY = "http:\/\/b\.local\/r"/)
}

// --- Codex: real config.toml on disk + upsertCodexToml round-trip ---
{
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-codex-file-"))
  const configPath = path.join(dir, "config.toml")
  const customA = buildSonojsServerEntry({ registryUrl: "http://a.local/r" })
  const customB = buildSonojsServerEntry({ registryUrl: "http://b.local/r" })
  const def = buildSonojsServerEntry({ registryUrl: DEFAULT_REGISTRY })
  const seed = `# codex prefs
model = "gpt-4"
temperature = 0.2

[mcp_servers.other]
command = "echo"
args = ["legacy"]

[feature_flags]
beta = true
`
  const markers = [
    "# codex prefs",
    'model = "gpt-4"',
    "temperature = 0.2",
    "[mcp_servers.other]",
    'command = "echo"',
    "[feature_flags]",
    "beta = true",
  ]

  fs.writeFileSync(configPath, seed, "utf8")

  let onDisk = fs.readFileSync(configPath, "utf8")
  let result = upsertCodexToml(onDisk, customA)
  assert.equal(result.changed, true)
  fs.writeFileSync(configPath, result.text, "utf8")
  onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.match(onDisk, /SONOJS_REGISTRY = "http:\/\/a\.local\/r"/)

  onDisk = fs.readFileSync(configPath, "utf8")
  result = upsertCodexToml(onDisk, customB)
  assert.equal(result.changed, true)
  fs.writeFileSync(configPath, result.text, "utf8")
  onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.match(onDisk, /SONOJS_REGISTRY = "http:\/\/b\.local\/r"/)

  onDisk = fs.readFileSync(configPath, "utf8")
  result = upsertCodexToml(onDisk, def)
  assert.equal(result.changed, true)
  fs.writeFileSync(configPath, result.text, "utf8")
  onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.doesNotMatch(onDisk, /\[mcp_servers\.sonojs\.env\]/)
  assert.doesNotMatch(onDisk, /SONOJS_REGISTRY/)

  onDisk = fs.readFileSync(configPath, "utf8")
  result = upsertCodexToml(onDisk, def)
  assert.equal(result.changed, false)
  assert.equal(fs.readFileSync(configPath, "utf8"), onDisk)

  fs.rmSync(dir, { recursive: true, force: true })
}

// --- Codex: runMcpInit registry reset via real ~/.codex/config.toml ---
{
  const home = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-codex-home-"))
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "sonojs-mcp-codex-cwd-"))
  const configPath = path.join(home, ".codex", "config.toml")
  const seed = `# agent settings
model = "gpt-4"
approval_policy = "on-request"

[mcp_servers.puppeteer]
command = "npx"
args = ["-y", "@modelcontextprotocol/server-puppeteer"]

[notifications]
desktop = false
`
  const markers = [
    "# agent settings",
    'model = "gpt-4"',
    'approval_policy = "on-request"',
    "[mcp_servers.puppeteer]",
    "@modelcontextprotocol/server-puppeteer",
    "[notifications]",
    "desktop = false",
  ]

  fs.mkdirSync(path.dirname(configPath), { recursive: true })
  fs.writeFileSync(configPath, seed, "utf8")

  let init = runMcpInit({
    cwd,
    home,
    client: "codex",
    registryUrl: "http://registry-a.test/r",
    dryRun: false,
    log: () => {},
  })
  assert.equal(init.results[0].status, "written")
  assert.equal(init.results[0].path, configPath)
  let onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.match(onDisk, /SONOJS_REGISTRY = "http:\/\/registry-a\.test\/r"/)

  init = runMcpInit({
    cwd,
    home,
    client: "codex",
    registryUrl: "http://registry-b.test/r",
    dryRun: false,
    log: () => {},
  })
  assert.equal(init.results[0].status, "written")
  onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.match(onDisk, /SONOJS_REGISTRY = "http:\/\/registry-b\.test\/r"/)
  assert.doesNotMatch(onDisk, /registry-a\.test/)

  init = runMcpInit({
    cwd,
    home,
    client: "codex",
    registryUrl: DEFAULT_REGISTRY,
    dryRun: false,
    log: () => {},
  })
  assert.equal(init.results[0].status, "written")
  onDisk = fs.readFileSync(configPath, "utf8")
  assertCodexUnrelatedPreserved(seed, onDisk, markers)
  assert.doesNotMatch(onDisk, /\[mcp_servers\.sonojs\.env\]/)
  assert.doesNotMatch(onDisk, /SONOJS_REGISTRY/)
  assert.match(onDisk, /\[mcp_servers\.sonojs\]/)

  init = runMcpInit({
    cwd,
    home,
    client: "codex",
    registryUrl: DEFAULT_REGISTRY,
    dryRun: false,
    log: () => {},
  })
  assert.equal(init.results[0].status, "unchanged")
  assert.equal(fs.readFileSync(configPath, "utf8"), onDisk)

  fs.rmSync(home, { recursive: true, force: true })
  fs.rmSync(cwd, { recursive: true, force: true })
}

// --- JSON registry lifecycle (non-Codex clients) ---
{
  const def = buildSonojsServerEntry({ registryUrl: "https://sonojs.com/r" })
  const customA = buildSonojsServerEntry({ registryUrl: "http://a.local/r" })
  const customB = buildSonojsServerEntry({ registryUrl: "http://b.local/r" })

  const fresh = upsertJsonMcpConfig("", def)
  assert.equal(fresh.changed, true)
  assert.equal(fresh.data.mcpServers.sonojs.env, undefined)

  const custom = upsertJsonMcpConfig(fresh.text, customA)
  assert.equal(custom.changed, true)
  assert.deepEqual(custom.data.mcpServers.sonojs.env, {
    SONOJS_REGISTRY: "http://a.local/r",
  })

  const swap = upsertJsonMcpConfig(custom.text, customB)
  assert.equal(swap.changed, true)
  assert.equal(swap.data.mcpServers.sonojs.env.SONOJS_REGISTRY, "http://b.local/r")

  const reset = upsertJsonMcpConfig(swap.text, def)
  assert.equal(reset.changed, true)
  assert.equal(reset.data.mcpServers.sonojs.env, undefined)

  const stable = upsertJsonMcpConfig(reset.text, def)
  assert.equal(stable.changed, false)
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
