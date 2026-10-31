import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"

config({ path: ".env.local" })

const url = process.env.DATABASE_URL
if (!url) {
  console.error("DATABASE_URL missing")
  process.exit(1)
}

const sql = neon(url)
const rows = await sql`select 1 as ok`
console.log("Neon ping OK:", rows[0])

const tables = await sql`
  select table_name
  from information_schema.tables
  where table_schema = 'public'
    and table_name in ('users','plans','subscriptions','payments','stripe_webhook_events')
  order by table_name
`
console.log(
  "Tables:",
  tables.map((t) => t.table_name).join(", ")
)
