import { ThreeDListIndex, ThreeDSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

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
