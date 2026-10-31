import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: [
      "components/tools/endpoints/**/*.test.ts",
      "components/pricing/**/*.test.ts",
      "lib/seo.test.ts",
      "lib/stripe/**/*.test.ts",
      "db/**/*.test.ts",
    ],
    // Neon HTTP round-trips; concurrency races need headroom
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "server-only": path.resolve(__dirname, "db/test/server-only-stub.ts"),
    },
  },
})
