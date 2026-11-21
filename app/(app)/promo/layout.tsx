import { PromoListIndex, PromoSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell listIndex={<PromoListIndex />} sidebar={<PromoSidebar />}>
      {children}
    </WorkspaceShell>
  )
}
