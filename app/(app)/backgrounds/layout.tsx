import {
  BackgroundsListIndex,
  BackgroundsSidebar,
} from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function BackgroundsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<BackgroundsListIndex />}
      sidebar={<BackgroundsSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}
