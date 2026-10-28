"use client"

import * as React from "react"
import { MenuIcon, SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@sonojs/ui/components/badge"
import { Button } from "@sonojs/ui/components/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"

const links = [
  { label: "Product", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Customers", href: "#" },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

function Brand() {
  return (
    <a
      href="#"
      className="flex cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Sono"
    >
      <img
        src="/images/logos/logo.svg"
        alt=""
        width={28}
        height={32}
        className="h-8 w-auto shrink-0"
      />
      <span className="text-sm font-semibold tracking-tight text-foreground">
        Sono
      </span>
    </a>
  )
}

function SearchTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-11.5 min-w-0 cursor-pointer items-center gap-2 rounded-[12px] border border-border/70 bg-background px-3 text-sm text-muted-foreground shadow-none transition-colors hover:bg-muted/60 hover:text-foreground",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0" aria-hidden />
      <span className="truncate">Search docs…</span>
      <kbd className="ms-auto hidden rounded-md border border-border/70 bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-block">
        ⌘K
      </kbd>
    </button>
  )
}

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState("Product")

  function selectNav(label: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setActive(label)
    }
  }

  return (
    <div
      className={cn("flex min-h-112 w-full flex-col bg-card", className)}
      {...props}>
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex min-h-15.5 w-full max-w-5xl items-center gap-3 px-4 sm:px-6 md:gap-6">
          <Brand />

          <nav className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => {
              const isActive = active === link.label
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={selectNav(link.label)}
                  className={cn(
                    "cursor-pointer rounded-[12px] px-2.5 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="ms-auto flex min-w-0 items-center gap-2">
            <SearchTrigger className="hidden w-54 lg:inline-flex xl:w-56" />

            <a
              href="#"
              className="hidden cursor-pointer items-center gap-1.5 rounded-[12px] px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
            >
              Changelog
              <Badge className="h-auto rounded-full px-1.5 py-0 text-[10px] font-medium">
                New
              </Badge>
            </a>

            <Button
              variant="ghost"
              className={cn("hidden md:inline-flex", ctaClass)}
            >
              Sign in
            </Button>
            <Button className={cn("hidden md:inline-flex", ctaClass)}>
              Start free trial
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(iconBtn, "md:hidden")}
                  aria-label="Open menu"
                >
                  <MenuIcon className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="start"
                className="flex w-[min(100%,18rem)] flex-col gap-0 border-border/70 p-0"
              >
                <SheetHeader className="border-b border-border/70 px-4 py-4 text-start">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <Brand />
                </SheetHeader>
                <div className="border-b border-border/70 p-3">
                  <SearchTrigger className="w-full" />
                </div>
                <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3 pb-8">
                  {links.map((link) => {
                    const isActive = active === link.label
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={selectNav(link.label)}
                        className={cn(
                          "cursor-pointer rounded-[12px] px-3 py-3 text-sm font-medium",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                  <a
                    href="#"
                    className="mt-1 flex cursor-pointer items-center gap-2 rounded-[12px] px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Changelog
                    <Badge className="h-auto rounded-full px-1.5 py-0 text-[10px] font-medium">
                      New
                    </Badge>
                  </a>
                </nav>
                <div className="space-y-2 border-t border-border/70 p-3">
                  <Button
                    variant="outline"
                    className={cn("w-full border-border/70", ctaClass)}
                  >
                    Sign in
                  </Button>
                  <Button className={cn("w-full", ctaClass)}>
                    Start free trial
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          SaaS navbar with search and trial CTA
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Product links, docs search shortcut, Changelog badge, then Sign in and
          Start free trial.
        </p>
      </main>
    </div>
  )
}
