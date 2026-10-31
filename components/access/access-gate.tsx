import { AccessLocked } from "@/components/access/access-locked"
import {
  type ContentAccess,
  normalizeContentAccess,
} from "@/lib/access"
import { canAccessContent } from "@/lib/access-server"

/**
 * Server gate for docs / blocks chrome. CLI and MCP are unchanged.
 */
export async function AccessGate({
  access = "public",
  children,
}: {
  access?: ContentAccess | string | null
  children: React.ReactNode
}) {
  const level = normalizeContentAccess(access)
  if (level === "public" || (await canAccessContent(level))) {
    return children
  }
  return <AccessLocked access={level} />
}
