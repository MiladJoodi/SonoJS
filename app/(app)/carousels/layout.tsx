import {
  CarouselsListIndex,
  CarouselsSidebar,
} from "@/components/sidebar-nav"
import { WorkspaceShell } from "@/components/workspace-shell"

import "@/styles/registry-catalog.css"

export default function CarouselsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceShell
      listIndex={<CarouselsListIndex />}
      sidebar={<CarouselsSidebar />}
    >
      {children}
    </WorkspaceShell>
  )
}
