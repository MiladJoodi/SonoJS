import { Suspense } from "react"

import { SignedInHintProvider } from "@/components/auth"
import { MobileHeaderScroll } from "@/components/mobile-header-scroll"
import { NavigationProgress } from "@/components/navigation-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SiteFooter } from "@/components/site-footer"
import { MobileBottomNav, SiteHeader } from "@/components/site-header"
import { getAuthUserId } from "@/lib/clerk-auth"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userId = await getAuthUserId()
  const signedIn = Boolean(userId)

  return (
    <SignedInHintProvider value={signedIn}>
      <div
        data-slot="layout"
        className="group/layout relative z-10 flex min-h-svh flex-col bg-background font-sans"
      >
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <ScrollToTop />
        <MobileHeaderScroll />
        <SiteHeader initialSignedIn={signedIn} />
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </div>
    </SignedInHintProvider>
  )
}
