import { ThreeDListIndex, ThreeDSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell listIndex={<ThreeDListIndex />} sidebar={<ThreeDSidebar />}>
      {children}
    </WorkspaceShell>
  )
}
