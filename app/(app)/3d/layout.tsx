import {
  SIDEBAR_LAYOUT_MAIN_CLASS,
  SIDEBAR_LAYOUT_PROVIDER_CLASS,
  ThreeDListIndex,
  ThreeDSidebar,
} from "@/components/sidebar-nav"
import { WorkspaceOfferRail } from "@/components/workspace-offer-rail"
import { SidebarProvider } from "@sonojs/ui/components/sidebar"

export default function ThreeDLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col">
      <ThreeDListIndex />
      <div className="workspace-shell flex flex-1 flex-col">
        <SidebarProvider className={SIDEBAR_LAYOUT_PROVIDER_CLASS}>
          <ThreeDSidebar />
          <div data-workspace-main="" className={SIDEBAR_LAYOUT_MAIN_CLASS}>
            {children}
          </div>
          <WorkspaceOfferRail />
        </SidebarProvider>
      </div>
    </div>
  )
}
