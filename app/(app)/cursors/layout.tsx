import { CursorsListIndex, CursorsSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

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
