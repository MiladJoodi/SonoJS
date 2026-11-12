import { ChartsListIndex, ChartsSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<ChartsListIndex />}
      sidebar={<ChartsSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}
