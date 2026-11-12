import Link from "next/link"

import { AuthControls } from "@/components/site-header/auth-controls"
import { GithubLink } from "@/components/site-header/github-link"
import { MainNav } from "@/components/site-header/main-nav"
import { ModeSwitcher } from "@/components/site-header/mode-switcher"
// import { LinkedinLink } from "@/components/site-header/linkedin-link"
// import { XLink } from "@/components/site-header/x-link"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

/**
 * Server shell + client islands (MainNav, ModeSwitcher, AuthControls).
 * Keeps nav out of the Clerk auth chunk so header links hydrate independently.
 */
export function SiteHeader({
  initialSignedIn = false,
  sticky = true,
}: {
  /** Server auth hint so header chrome paints before Clerk JS loads. */
  initialSignedIn?: boolean
  /** When false, header scrolls away with the page (no sticky / hide-on-scroll). */
  sticky?: boolean
}) {
  return (
    <header
      data-site-header=""
      className={cn(
        "z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,backdrop-filter,border-color,transform] duration-300 ease-out supports-backdrop-filter:bg-white/25 dark:border-white/10 dark:bg-background/40 dark:supports-backdrop-filter:bg-background/25",
        sticky
          ? "sticky top-0 [[data-header-hidden]_&]:pointer-events-none [[data-header-hidden]_&]:-translate-y-full"
          : "relative"
      )}
    >
      <div className="container-wrapper">
        <div className="relative flex h-(--header-height) items-center gap-2 sm:gap-2.5">
          <Link
            href="/"
            prefetch={false}
            aria-label="SonoJS"
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
            <span className="text-sm font-bold leading-none tracking-tight text-foreground lg:hidden">
              Sono
            </span>
          </Link>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />

          <div className="ms-auto flex shrink-0 items-center gap-1.5">
            <GithubLink />
            {/* <XLink /> */}
            {/* <LinkedinLink /> */}
            {/* Static divider — avoid Radix Separator + hidden/sm:block (stuck display:none). */}
            <span
              aria-hidden
              className="mx-0.5 inline-block h-4 w-px shrink-0 self-center bg-border max-sm:hidden"
            />
            <ModeSwitcher />
            <AuthControls initialSignedIn={initialSignedIn} />
          </div>
        </div>
      </div>
    </header>
  )
}
