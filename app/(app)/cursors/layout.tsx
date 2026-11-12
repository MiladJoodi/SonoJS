import { CursorsListIndex, CursorsSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function CursorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<CursorsListIndex />}
      sidebar={<CursorsSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}
