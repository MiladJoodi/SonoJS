import {
  DocsListIndex,
  DocsSidebar,
  SIDEBAR_LAYOUT_MAIN_CLASS,
  SIDEBAR_LAYOUT_PROVIDER_CLASS,
} from "@/components/sidebar-nav"
import { WorkspaceOfferRail } from "@/components/workspace-offer-rail"
import { cn } from "@/lib/utils"
import { SidebarProvider } from "@sonojs/ui/components/sidebar"

/**
 * Docs HTML is still cache-friendly via `next.config` Cache-Control on `/docs`.
 * Do not force-static: Installation gates call Clerk `auth()`, which needs the
 * request (proxy headers / cookies). force-static → missing AuthStatus → 500/404.
 */
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col">
      <DocsListIndex />
      <div className="workspace-shell flex flex-1 flex-col">
        <SidebarProvider
          className={cn(
            SIDEBAR_LAYOUT_PROVIDER_CLASS,
            "[--top-spacing:var(--space-4)] lg:[--top-spacing:var(--space-4)]"
          )}
        >
          <DocsSidebar />
          <div data-workspace-main="" className={SIDEBAR_LAYOUT_MAIN_CLASS}>
            {children}
          </div>
          <WorkspaceOfferRail />
        </SidebarProvider>
      </div>
    </div>
  )
}
