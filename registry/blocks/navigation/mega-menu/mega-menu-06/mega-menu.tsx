"use client"

import * as React from "react"
import {
  BookOpenIcon,
  ChevronDownIcon,
  CircleHelpIcon,
  FileTextIcon,
  FolderOpenIcon,
  MenuIcon,
  NewspaperIcon,
  PhoneIcon,
  ScaleIcon,
  ScrollTextIcon,
  ShapesIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sonojs/ui/components/collapsible"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import logoAsset from "./logo.svg"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const logoSrc = assetSrc(logoAsset)

type MegaItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const megaColumns: MegaItem[][] = [
  [
    { label: "About Us", href: "#", icon: CircleHelpIcon },
    { label: "Library", href: "#", icon: BookOpenIcon },
    { label: "Resources", href: "#", icon: FolderOpenIcon },
    { label: "Pro Version", href: "#", icon: SparklesIcon },
  ],
  [
    { label: "Blog", href: "#", icon: FileTextIcon },
    { label: "Newsletter", href: "#", icon: NewspaperIcon },
    { label: "Playground", href: "#", icon: ShapesIcon },
    { label: "License", href: "#", icon: ScaleIcon },
  ],
  [
    { label: "Contact Us", href: "#", icon: PhoneIcon },
    { label: "Support Center", href: "#", icon: CircleHelpIcon },
    { label: "Terms", href: "#", icon: ScrollTextIcon },
  ],
]

const links = [
  { label: "Home", href: "#", current: true },
  { label: "Team", href: "#" },
  { label: "Contact", href: "#" },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

const megaLinkClass =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-md text-sm font-normal text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"

function Brand() {
  return (
    <a
      href="#"
      className="flex shrink-0 cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Sono"
    >
      <img
        src={logoSrc}
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

function MegaPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid w-max max-w-[min(100vw-2rem,36rem)] grid-cols-2 gap-0 overflow-hidden rounded-[12px] border border-border/70 bg-card text-sm shadow-md md:grid-cols-3",
        className
      )}>
      {megaColumns.map((col, colIndex) => (
        <div
          key={colIndex}
          className={cn(
            "p-4",
            colIndex < megaColumns.length - 1 && "border-b border-border/70 md:border-b-0 md:border-e"
          )}
        >
          <ul className="space-y-3">
            {col.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <a href={item.href} className={megaLinkClass}>
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function MegaMenu({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [megaOpen, setMegaOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!megaOpen) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return
      }
      setMegaOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMegaOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [megaOpen])

  return (
    <div
      className={cn(
        "flex min-h-[28rem] w-full flex-1 flex-col bg-card",
        className
      )}
      {...props}>
      <header className="sticky top-0 z-20 w-full border-b border-border/70 bg-card">
        <nav
          className="mx-auto flex min-h-16 w-full max-w-7xl flex-nowrap items-center gap-4 px-4 py-2 sm:px-6 lg:px-8"
          aria-label="Main"
        >
          <Brand />

          <ul className="ms-0 hidden min-w-0 items-center gap-6 text-sm font-semibold text-foreground lg:ms-8 lg:flex">
            <li>
              <a
                href="#"
                aria-current="page"
                className="cursor-pointer rounded-md text-primary outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                Home
              </a>
            </li>

            <li className="relative">
              <button
                type="button"
                aria-haspopup="true"
                ref={triggerRef}
                aria-expanded={megaOpen}
                aria-controls="mega-menu-icons-panel"
                onClick={() => setMegaOpen((o) => !o)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                Company
                <ChevronDownIcon
                  className={cn(
                    "size-3.5 transition-transform",
                    megaOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>

              {megaOpen ? (
                <div
                  id="mega-menu-icons-panel"
                  ref={panelRef}
                  className="absolute start-0 top-[calc(100%+0.75rem)] z-50"
                >
                  <MegaPanel />
                </div>
              ) : null}
            </li>

            {links
              .filter((l) => l.label !== "Home")
              .map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="cursor-pointer rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
          </ul>

          <div className="ms-auto flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              className={cn("hidden lg:inline-flex", ctaClass)}
            >
              Login
            </Button>
            <Button className={cn("hidden lg:inline-flex", ctaClass)}>
              Sign Up
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(iconBtn, "lg:hidden")}
                  aria-label="Open menu"
                >
                  <MenuIcon className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="end"
                showCloseButton={false}
                className="flex w-[min(100%,20rem)] flex-col gap-0 border-border/70 p-0"
              >
                <SheetHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/70 px-4 py-4 text-start">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <Brand />
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full"
                      aria-label="Close"
                    >
                      <XIcon className="size-4" />
                    </Button>
                  </SheetClose>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-4 pb-8">
                  <ul className="flex flex-col gap-1 text-sm font-semibold text-foreground">
                    <li>
                      <a
                        href="#"
                        aria-current="page"
                        className="flex cursor-pointer rounded-[12px] px-3 py-3 text-primary hover:bg-muted"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between rounded-[12px] px-3 py-3 hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                          Company
                          <ChevronDownIcon className="size-4 shrink-0 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 px-3 pb-3 pt-1">
                          {megaColumns.map((col, colIndex) => (
                            <ul
                              key={colIndex}
                              className="space-y-1 font-medium text-muted-foreground"
                            >
                              {col.map((item) => {
                                const Icon = item.icon
                                return (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted hover:text-foreground"
                                    >
                                      <Icon
                                        className="size-4 shrink-0"
                                        aria-hidden
                                      />
                                      {item.label}
                                    </a>
                                  </li>
                                )
                              })}
                            </ul>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                    {links
                      .filter((l) => l.label !== "Home")
                      .map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="flex cursor-pointer rounded-[12px] px-3 py-3 hover:bg-muted"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-2 border-t border-border/70 p-3">
                  <Button variant="ghost" className={cn("w-full", ctaClass)}>
                    Login
                  </Button>
                  <Button className={cn("w-full", ctaClass)}>Sign Up</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Company mega menu with icons
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Compact three-column Company panel with Lucide icons — Login and Sign
          Up, sheet with collapsible Company on small screens.
        </p>
      </main>
    </div>
  )
}
