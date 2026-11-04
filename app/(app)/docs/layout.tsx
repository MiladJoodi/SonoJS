import { DocsListIndex, DocsSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

/**
 * Docs HTML is still cache-friendly via `next.config` Cache-Control on `/docs`.
 * Do not force-static: Installation gates call Clerk `auth()`, which needs the
 * request (proxy headers / cookies). force-static → missing AuthStatus → 500/404.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<DocsListIndex />}
      sidebar={<DocsSidebar />}
      providerClassName="[--top-spacing:var(--space-4)] lg:[--top-spacing:var(--space-4)]"
    >
      {children}
    </WorkspaceShell>
  )
}
