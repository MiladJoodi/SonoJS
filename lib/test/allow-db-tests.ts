/**
 * Gate for tests that write to Postgres.
 *
 * Default `npm test` never hits DATABASE_URL (avoids polluting Neon with fixtures).
 * Opt in with `npm run test:db` or `ALLOW_DB_TESTS=1`.
 */
export function allowDbIntegrationTests(): boolean {
  if (!process.env.DATABASE_URL?.trim()) return false
  if (process.env.ALLOW_DB_TESTS === "1") return true
  if (process.env.npm_lifecycle_event === "test:db") return true
  return false
}
