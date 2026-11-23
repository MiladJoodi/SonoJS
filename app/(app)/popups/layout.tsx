import { PopupsListIndex, PopupsSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function PopupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell listIndex={<PopupsListIndex />} sidebar={<PopupsSidebar />}>
      {children}
    </WorkspaceShell>
  )
}
