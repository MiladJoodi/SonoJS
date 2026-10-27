import { Suspense } from "react"

import { MobileHeaderScroll } from "@/components/mobile-header-scroll"
import { NavigationProgress } from "@/components/navigation-progress"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getGithubStars } from "@/lib/github"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const githubStars = await getGithubStars()

  return (
    <div
      data-slot="layout"
      className="group/layout relative z-10 flex min-h-svh flex-col bg-background font-sans"
    >
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <ScrollToTop />
      <MobileHeaderScroll />
      <SiteHeader githubStars={githubStars} />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  )
}
