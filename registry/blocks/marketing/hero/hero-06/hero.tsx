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

import facePrimer from "./images/face-primer-category.webp"
import logoAsset from "./images/logo.svg"
import product2 from "./images/product2.webp"
import product6 from "./images/product6.webp"
import skinGlow from "./images/skin-glow-category.webp"

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

const DEFAULT_STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "890", label: "Cases Solved" },
  { value: "250", label: "Business Partners" },
] as const

const DEFAULT_GALLERY = [
  { src: assetSrc(facePrimer), alt: "Face primer category" },
  { src: assetSrc(product6), alt: "Product showcase" },
  { src: assetSrc(product2), alt: "Product detail" },
  { src: assetSrc(skinGlow), alt: "Skin glow category" },
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
  eyebrow = "Built to Grow with You",
  title = "Empower Brand with Human-Centered Solutions",
  description = "Showcase your products and connect with your audience. Our all-in-one platform helps you manage operations and boost visibility — whether you're in fashion, beauty, wellness, or beyond.",
  primaryCta = "Get Started Free",
  primaryHref = "#",
  secondaryCta = "Explore Features",
  secondaryHref = "#",
  loginLabel = "Log in",
  loginHref = "#",
  signupLabel = "Sign up",
  signupHref = "#",
  logoSrc = assetSrc(logoAsset),
  stats = DEFAULT_STATS as unknown as { value: string; label: string }[],
  gallery = DEFAULT_GALLERY,
  links = DEFAULT_LINKS as unknown as {
    label: string
    href: string
    current?: boolean
  }[],
  className,
  ...props
}: React.ComponentProps<"div"> & {
  eyebrow?: string
  title?: string
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  loginLabel?: string
  loginHref?: string
  signupLabel?: string
  signupHref?: string
  logoSrc?: string
  stats?: { value: string; label: string }[]
  gallery?: { src: string; alt: string }[]
  links?: { label: string; href: string; current?: boolean }[]
}) {
  return (
    <div className={cn("relative w-full bg-background", className)} {...props}>
      <nav
        className="relative z-20 min-h-[68px] border-b border-border/70 bg-background px-4 py-2 md:px-8"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-6">
          <Brand src={logoSrc} />

          <ul className="hidden items-center gap-8 text-sm font-semibold text-foreground lg:ms-12 lg:flex">
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
              className="hidden cursor-pointer text-sm font-semibold text-foreground outline-none hover:text-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring/40 sm:inline"
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

      <section className="mt-12 px-4 md:px-8" aria-labelledby="hero-heading">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center justify-center gap-x-12 gap-y-16 lg:grid-cols-2">
            <div>
              <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-start">
                <p className="mb-2 text-sm font-medium uppercase text-primary">
                  <span
                    className="me-2 inline-block rotate-90"
                    aria-hidden="true"
                  >
                    |
                  </span>
                  {eyebrow}
                </p>
                <h1
                  id="hero-heading"
                  className="mb-6 text-4xl font-bold tracking-tight text-balance text-foreground md:text-5xl"
                >
                  {title}
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Button asChild>
                    <a href={primaryHref}>{primaryCta}</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={secondaryHref}>{secondaryCta}</a>
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <div className="grid gap-x-4 gap-y-6 text-center sm:grid-cols-3 lg:text-start">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col">
                      <p className="mb-2 text-2xl font-semibold text-primary">
                        {stat.value}
                      </p>
                      <p className="text-base font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="columns-2 space-y-4">
              {gallery.map((item) => (
                <div key={item.src} className="break-inside-avoid">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="size-full max-h-[360px] rounded-[12px] object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
