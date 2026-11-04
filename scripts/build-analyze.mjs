/**
 * Production build with @next/bundle-analyzer enabled.
 * Default `npm run build` stays unchanged (ANALYZE unset).
 */
import { spawnSync } from "node:child_process"
import process from "node:process"

const result = spawnSync(
  "npx",
  ["next", "build", "--webpack"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      ANALYZE: "true",
      NODE_OPTIONS: [process.env.NODE_OPTIONS, "--max-old-space-size=8192"]
        .filter(Boolean)
        .join(" "),
    },
    shell: true,
  }
)

process.exit(result.status ?? 1)
