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

import logoAsset from "./images/logo.svg"
import logoWhite from "./images/logo-white.svg"
import realEstate from "./images/real-estate-img.webp"
import team1 from "./images/team-1.webp"
import team2 from "./images/team-2.webp"
import team3 from "./images/team-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_LINKS = [
  { label: "Home", href: "#", current: true },
  { label: "Features", href: "#" },
  { label: "How it works", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "FAQs", href: "#" },
] as const

const DEFAULT_AVATARS = [
  { src: assetSrc(team1), alt: "Customer portrait 1" },
  { src: assetSrc(team2), alt: "Customer portrait 2" },
  { src: assetSrc(team3), alt: "Customer portrait 3" },
]

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
  src = assetSrc(logoWhite),
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
  titleBefore = "Boost Your Brand with Smart ",
  titleAccent = "Marketing Strategies",
  description = "We help businesses grow by leveraging cutting-edge digital marketing strategies that drive results, increase ROI, and build lasting customer relationships.",
  primaryCta = "Get started today",
  primaryHref = "#",
  secondaryCta = "Our services",
  secondaryHref = "#",
  loginLabel = "Log in",
  loginHref = "#",
  signupLabel = "Sign up",
  signupHref = "#",
  socialProof = "Over 10,000",
  socialProofSuffix = " Professionals trust us",
  backgroundSrc = assetSrc(realEstate),
  logoSrc = assetSrc(logoWhite),
  logoSheetSrc = assetSrc(logoAsset),
  avatars = DEFAULT_AVATARS,
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
  loginLabel?: string
  loginHref?: string
  signupLabel?: string
  signupHref?: string
  socialProof?: string
  socialProofSuffix?: string
  backgroundSrc?: string
  logoSrc?: string
  logoSheetSrc?: string
  avatars?: { src: string; alt: string }[]
  links?: { label: string; href: string; current?: boolean }[]
}) {
  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundSrc})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

      <nav
        className="relative z-20 min-h-[68px] px-4 py-2 md:px-8"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-6">
          <Brand src={logoSrc} />

          <ul className="hidden items-center gap-8 text-sm font-semibold text-white lg:ms-12 lg:flex">
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

          <div className="ms-auto flex items-center gap-3 sm:gap-4">
            <a
              href={loginHref}
              className="hidden cursor-pointer text-sm font-semibold text-white outline-none hover:text-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/40 sm:inline"
            >
              {loginLabel}
            </a>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={signupHref}>{signupLabel}</a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 hover:text-white lg:hidden"
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
                  <a
                    href="#"
                    className="inline-flex min-w-9 cursor-pointer outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    <span className="sr-only">SonoJS</span>
                    <img src={logoSheetSrc} alt="" className="h-9 w-auto" />
                  </a>
                </SheetHeader>
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4 pb-8">
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
                <div className="space-y-2 border-t border-border/70 p-4">
                  <Button asChild variant="outline" className="w-full">
                    <a href={loginHref}>{loginLabel}</a>
                  </Button>
                  <Button asChild className="w-full">
                    <a href={signupHref}>{signupLabel}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-10 sm:px-8 lg:min-h-[calc(100vh-84px)]"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1
              id="hero-heading"
              className="mb-6 text-4xl font-bold tracking-tight text-balance text-white md:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              {titleBefore}
              <span className="text-primary">{titleAccent}</span>
            </h1>
            <p className="text-lg leading-relaxed text-white/80">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <a href={primaryHref}>{primaryCta}</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/80 bg-white text-foreground hover:bg-white/90"
              >
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {avatars.map((avatar) => (
                  <img
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    className="size-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-base text-white/80">
                <span className="font-semibold text-white">{socialProof}</span>
                {socialProofSuffix}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
