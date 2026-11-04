import { BlocksListIndex, BlocksSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<BlocksListIndex />}
      sidebar={<BlocksSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}
