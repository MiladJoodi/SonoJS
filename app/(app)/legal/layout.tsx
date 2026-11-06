import { LegalListIndex, LegalSidebar } from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<LegalListIndex />}
      sidebar={<LegalSidebar />}
      offerRailMode="toc"
      providerClassName="[--top-spacing:var(--space-4)] lg:[--top-spacing:var(--space-4)]"
    >
      {children}
    </WorkspaceShell>
  )
}
