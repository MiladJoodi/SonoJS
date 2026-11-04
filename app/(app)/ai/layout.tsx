import { AiListIndex, AiSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceShell listIndex={<AiListIndex />} sidebar={<AiSidebar />}>
      {children}
    </WorkspaceShell>
  )
}
