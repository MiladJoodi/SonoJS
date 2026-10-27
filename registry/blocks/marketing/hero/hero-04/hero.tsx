"use client"

import type * as React from "react"

import { Button } from "@sonojs/ui/components/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import { cn } from "@/lib/utils"

import kpiDashboard from "./images/kpis-dashboard-img.webp"
import logoAsset from "./images/logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_LINKS = [
  { label: "Home", href: "#", current: true },
  { label: "Features", href: "#" },
  { label: "Blog", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
] as const

function MenuIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("size-7 fill-current", className)}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function Brand({
  src = assetSrc(logoAsset),
  className,
}: {
  src?: string
  className?: string
}) {
  return (
    <a
      href="#"
      className={cn(
        "inline-flex min-w-9 cursor-pointer outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <span className="sr-only">SonoJS</span>
      <img src={src} alt="" className="h-9 w-auto" />
    </a>
  )
}

export default function Hero({
  titleBefore = "Boost Your Productivity with ",
  titleAccent = "EffortlessTask",
  description = "The all-in-one app to finally master your workflow. Organize tasks effortlessly, focus without distractions, and accomplish more every day—just like 100,000+ professionals.",
  primaryCta = "Start Free Trial",
  primaryHref = "#",
  secondaryCta = "How It Works",
  secondaryHref = "#",
  navCta = "Get started",
  navCtaHref = "#",
  imageSrc = assetSrc(kpiDashboard),
  imageAlt = "KPI dashboard preview",
  logoSrc = assetSrc(logoAsset),
  links = DEFAULT_LINKS as unknown as {
    label: string
    href: string
    current?: boolean
  }[],
  className,
  ...props
}: React.ComponentProps<"div"> & {
  titleBefore?: string
  titleAccent?: string
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  navCta?: string
  navCtaHref?: string
  imageSrc?: string
  imageAlt?: string
  logoSrc?: string
  links?: { label: string; href: string; current?: boolean }[]
}) {
  return (
    <div
      className={cn(
        "relative w-full bg-gradient-to-b from-primary/15 via-primary/5 to-background dark:from-background dark:via-primary/20 dark:to-background",
        className
      )}
      {...props}
    >
      <div className="p-4 pb-0">
        <nav
          className="relative z-20 mx-auto flex max-w-max rounded-full border border-border/70 bg-card px-4 py-2 shadow-soft"
          aria-label="Main navigation"

              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-16 gap-y-2">
            <Brand src={logoSrc} />

            <ul className="hidden items-center gap-8 text-sm font-semibold text-foreground lg:flex">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-current={link.current ? "page" : undefined}
                    className="cursor-pointer rounded-md outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3 sm:gap-4">
              <Button asChild size="sm" className="hidden rounded-full sm:inline-flex">
                <a href={navCtaHref}>{navCta}</a>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="rounded-full lg:hidden"
                    aria-label="Open main menu"
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="end"
                  className="flex w-[min(100%,20rem)] flex-col gap-0 border-border/70 p-0 sm:max-w-sm"
                >
                  <SheetHeader className="border-b border-border/70 px-4 py-4 text-start">
                    <SheetTitle className="sr-only">Main menu</SheetTitle>
                    <Brand src={logoSrc} />
                  </SheetHeader>
                  <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                    {links.map((link) => (
                      <SheetClose asChild key={link.label}>
                        <a
                          href={link.href}
                          aria-current={link.current ? "page" : undefined}
                          className={cn(
                            "cursor-pointer rounded-[12px] px-3 py-3 text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                            link.current
                              ? "bg-muted text-foreground"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          {link.label}
                        </a>
                      </SheetClose>
                    ))}
                  </nav>
                  <div className="border-t border-border/70 p-4">
                    <Button asChild className="w-full rounded-full">
                      <a href={navCtaHref}>{navCta}</a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>

      <section
        className="px-4 py-12 md:px-8 md:py-20"
        aria-labelledby="hero-heading"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              {titleBefore}
              <span className="text-primary">{titleAccent}</span>
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <a href={primaryHref}>{primaryCta}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-5xl md:mt-20">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full rounded-[12px]"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
