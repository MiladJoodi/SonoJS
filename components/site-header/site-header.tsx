"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { DevBanner } from "@/components/site-header/dev-banner"
import { GithubLink } from "@/components/site-header/github-link"
import { MainNav } from "@/components/site-header/main-nav"
import { MobileNav } from "@/components/site-header/mobile-nav"
import { ModeSwitcher } from "@/components/site-header/mode-switcher"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Separator } from "@sonojs/ui/components/separator"

export function SiteHeader({
  githubStars = null,
}: {
  githubStars?: number | null
}) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header
      data-site-header=""
      data-home-header={isHome ? "" : undefined}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,backdrop-filter,border-color,transform] duration-300 ease-out supports-backdrop-filter:bg-white/25 dark:border-white/10 dark:bg-background/40 dark:supports-backdrop-filter:bg-background/25 [[data-header-hidden]_&]:pointer-events-none [[data-header-hidden]_&]:-translate-y-full"
      )}
    >
      <DevBanner />
      <div className="container-wrapper">
        <div className="relative flex h-(--header-nav-height) items-center gap-2 sm:gap-2.5 **:data-[slot=separator]:h-4!">
          <MobileNav
            items={siteConfig.navItems}
            className="me-0.5 flex lg:hidden"
          />
          <Link
            href="/"
            prefetch={false}
            className="me-2 flex shrink-0 cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img
              src="/images/logos/logo.svg"
              alt=""
              aria-hidden
              width={20}
              height={22}
              className="h-[22px] w-auto shrink-0"
            />
            <span className="text-sm font-bold leading-none tracking-tight text-foreground">
              Sono
            </span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

          <div className="ms-auto flex shrink-0 items-center gap-1.5">
            <GithubLink stars={githubStars} />
            <Separator orientation="vertical" className="mx-0.5 hidden sm:block" />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
