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
import team1 from "./images/team-1.webp"
import team2 from "./images/team-2.webp"
import team3 from "./images/team-3.webp"

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

function SearchIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192.904 192.904"
      className={cn("size-4 fill-current", className)}
      aria-hidden="true"
      {...props}
    >
      <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
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
  titleBefore = "Boost Your Brand with Smart ",
  titleAccent = "Marketing Strategies",
  description = "We help businesses grow by leveraging cutting-edge digital marketing strategies that drive results, increase ROI, and build lasting customer relationships.",
  primaryCta = "Get started today",
  primaryHref = "#",
  secondaryCta = "How It Works",
  secondaryHref = "#",
  navCta = "Get started",
  navCtaHref = "#",
  searchPlaceholder = "Search...",
  socialProof = "Over 10,000",
  socialProofSuffix = " Professionals trust us",
  logoSrc = assetSrc(logoAsset),
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
  navCta?: string
  navCtaHref?: string
  searchPlaceholder?: string
  socialProof?: string
  socialProofSuffix?: string
  logoSrc?: string
  avatars?: { src: string; alt: string }[]
  links?: { label: string; href: string; current?: boolean }[]
}) {
  return (
    <div
      className={cn(
        "relative w-full bg-[radial-gradient(at_50%_5%,var(--background),var(--background),color-mix(in_oklab,var(--primary)_22%,var(--background)))]",
        className
      )}
      {...props}
    >
      <nav
        className="relative z-20 min-h-[68px] border-b border-border/70 px-4 py-2 md:px-8"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
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
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={navCtaHref}>{navCta}</a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
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
                <div className="border-t border-border/70 p-4">
                  <Button asChild className="w-full">
                    <a href={navCtaHref}>{navCta}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section
        className="px-4 py-12 md:px-8 lg:py-20"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 mx-auto max-w-4xl text-center">
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

            <form className="mx-auto mt-12 max-w-xl" role="search">
              <div className="flex items-center gap-2.5 rounded-full border border-border/70 bg-muted/60 px-5 py-4 outline-none focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/40">
                <label htmlFor="hero-search" className="sr-only">
                  Search
                </label>
                <input
                  type="search"
                  id="hero-search"
                  name="q"
                  placeholder={searchPlaceholder}
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <SearchIcon className="ms-auto shrink-0 text-muted-foreground" />
              </div>
            </form>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild>
                <a href={primaryHref}>{primaryCta}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={secondaryHref}>{secondaryCta}</a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {avatars.map((avatar) => (
                  <img
                    key={avatar.src}
                    src={avatar.src}
                    alt={avatar.alt}
                    className="size-10 rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-base text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {socialProof}
                </span>
                {socialProofSuffix}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
