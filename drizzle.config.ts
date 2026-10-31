import { config } from "dotenv"
import { defineConfig } from "drizzle-kit"

config({ path: ".env.local" })

const url = process.env.DATABASE_URL
if (!url?.trim()) {
  throw new Error("DATABASE_URL is required for drizzle-kit")
}

export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
  strict: true,
  verbose: true,
})
