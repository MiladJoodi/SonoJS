"use client"

import * as React from "react"
import {
  BarChart3Icon,
  BellIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MenuIcon,
  UsersIcon,
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
import promoAsset from "./promo.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const promoImage = assetSrc(promoAsset)

const links = [
  { label: "Collaboration", href: "#" },
  { label: "Analytics", href: "#" },
  { label: "Integrations", href: "#" },
  { label: "Support", href: "#" },
]

type FeatureItem = {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const featureColumns: FeatureItem[][] = [
  [
    {
      title: "Project Boards",
      description: "Organize your tasks and track project progress in real time.",
      href: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Team Collaboration",
      description: "Communicate with teammates and share files instantly.",
      href: "#",
      icon: UsersIcon,
    },
    {
      title: "Advanced Analytics",
      description:
        "Track performance and gain insights with real-time dashboards.",
      href: "#",
      icon: BarChart3Icon,
    },
  ],
  [
    {
      title: "Smart Notifications",
      description: "Get timely alerts for updates and important activities.",
      href: "#",
      icon: BellIcon,
    },
    {
      title: "24/7 Support",
      description: "Get help anytime via live chat, email, or our support center.",
      href: "#",
      icon: LifeBuoyIcon,
    },
  ],
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

function Brand() {
  return (
    <a
      href="#"
      className="flex shrink-0 cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
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

function FeatureLink({ title, description, href, icon: Icon }: FeatureItem) {
  return (
    <a
      href={href}
      className="flex cursor-pointer items-start gap-3 rounded-[12px] px-4 py-3 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring max-md:flex-col"
    >
      <Icon className="size-5 shrink-0 text-foreground" aria-hidden />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">
          {title}
        </span>
        <span className="mt-1.5 block text-sm font-normal leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
    </a>
  )
}

function PromoPanel() {
  return (
    <a
      href="#"
      className="flex h-full min-w-0 cursor-pointer flex-col justify-center rounded-[12px] bg-muted p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="mb-6 block">
        <span className="block text-sm font-semibold text-foreground">
          We&apos;ve just released an update
        </span>
        <span className="mt-2 block text-sm font-normal text-muted-foreground">
          We&apos;ve rolled out a new update and fixes to enhance performance.
        </span>
      </span>
      <img
        src={promoImage}
        alt=""
        width={560}
        height={320}
        className="w-full rounded-[12px] object-cover"
      />
    </a>
  )
}

function MegaPanel() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
        {featureColumns.map((col, i) => (
          <div key={i} className="min-w-0 space-y-2">
            {col.map((item) => (
              <FeatureLink key={item.title} {...item} />
            ))}
          </div>
        ))}
      </div>
      <div className="w-full max-w-xs shrink-0">
        <PromoPanel />
      </div>
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
      {...props}
    >
      <header className="sticky top-0 z-20 w-full border-b border-border/70 bg-card">
        <nav
          className="mx-auto flex min-h-16 w-full max-w-7xl flex-nowrap items-center gap-4 px-4 py-2 sm:px-6 lg:px-8"
          aria-label="Main"
        >
          <Brand />

          <ul className="ms-0 hidden min-w-0 items-center gap-6 text-sm font-semibold text-foreground lg:ms-8 lg:flex">
            <li>
              <button
                type="button"
                aria-haspopup="true"
                ref={triggerRef}
                aria-expanded={megaOpen}
                aria-controls="mega-menu-panel"
                onClick={() => setMegaOpen((o) => !o)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                Features
                <ChevronDownIcon
                  className={cn(
                    "size-3.5 transition-transform",
                    megaOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
            </li>

            {links.map((link) => (
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
            <Button className={cn("hidden lg:flex", ctaClass)}>
              Get started
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
                <div className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col gap-1 text-sm font-semibold text-foreground">
                    <li>
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between rounded-[12px] px-3 py-3 hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                          Features
                          <ChevronDownIcon className="size-4 shrink-0 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-1 px-1 pb-3 pt-1">
                          {featureColumns.flat().map((item) => (
                            <FeatureLink key={item.title} {...item} />
                          ))}
                          <div className="px-2 pt-2">
                            <PromoPanel />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                    {links.map((link) => (
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
                <div className="border-t border-border/70 p-3">
                  <Button className={cn("w-full", ctaClass)}>Get started</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        {megaOpen ? (
          <div id="mega-menu-panel" ref={panelRef} className="absolute inset-x-0 top-full z-50">
            <div className="mx-auto w-full max-w-6xl rounded-b-[12px] border border-t-0 border-border/70 bg-card p-6 shadow-md">
              <MegaPanel />
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Features mega with release promo
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Two columns of feature links with icons, plus a release update panel —
          sheet on small screens.
        </p>
      </main>
    </div>
  )
}
