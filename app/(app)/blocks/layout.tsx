import { BlocksListIndex, BlocksSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

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
