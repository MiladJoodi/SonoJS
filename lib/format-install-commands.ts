/**
 * Separate install steps for docs / MCP hints.
 * Never chain with `&&` or `;` — PowerShell 5.x rejects `&&`, and separate
 * copyable commands are safer across shells.
 *
 * Client-safe (no Node fs) — keep this file free of server-only imports.
 */
export function formatInstallCommands(opts: {
  registry?: string[]
  npm?: string[]
}): string[] {
  const registryNames = [
    ...new Set((opts.registry ?? []).filter(Boolean)),
  ].sort()
  const npmNames = [...new Set((opts.npm ?? []).filter(Boolean))].sort()
  const out: string[] = []
  if (registryNames.length > 0) {
    out.push(`npx @sonojs/ui@latest add ${registryNames.join(" ")}`)
  }
  if (npmNames.length > 0) {
    out.push(`npm i ${npmNames.join(" ")}`)
  }
  return out
}
