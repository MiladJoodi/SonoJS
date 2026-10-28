"use client"

import * as React from "react"
import { ArrowRightIcon, ChevronDownIcon, MenuIcon, XIcon } from "lucide-react"

import { AdobeXdIcon } from "@/registry/icons/adobe-xd"
import { AsanaIcon } from "@/registry/icons/asana"
import { CanvaIcon } from "@/registry/icons/canva"
import { DiscordIcon } from "@/registry/icons/discord"
import { DropboxIcon } from "@/registry/icons/dropbox"
import { GithubIcon } from "@/registry/icons/github"
import { GoogleMeetIcon } from "@/registry/icons/google-meet"
import { MicrosoftTeamsIcon } from "@/registry/icons/microsoft-teams"
import { PhotoshopIcon } from "@/registry/icons/photoshop"
import { ProjectBoardsIcon } from "@/registry/icons/project-boards"
import { SketchIcon } from "@/registry/icons/sketch"
import { SlackIcon } from "@/registry/icons/slack"
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

type ToolItem = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const toolColumns: ToolItem[][] = [
  [
    { title: "Project Boards", href: "#", icon: ProjectBoardsIcon },
    { title: "Adobe XD", href: "#", icon: AdobeXdIcon },
    { title: "Canva", href: "#", icon: CanvaIcon },
    { title: "Sketch", href: "#", icon: SketchIcon },
  ],
  [
    { title: "Photoshop", href: "#", icon: PhotoshopIcon },
    { title: "GitHub", href: "#", icon: GithubIcon },
    { title: "Google Meet", href: "#", icon: GoogleMeetIcon },
    { title: "Slack", href: "#", icon: SlackIcon },
  ],
  [
    { title: "Microsoft Teams", href: "#", icon: MicrosoftTeamsIcon },
    { title: "Discord", href: "#", icon: DiscordIcon },
    { title: "Asana", href: "#", icon: AsanaIcon },
    { title: "Dropbox", href: "#", icon: DropboxIcon },
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

function ToolCard({ title, href, icon: Icon }: ToolItem) {
  return (
    <a
      href={href}
      className="group flex cursor-pointer items-center gap-3 rounded-[12px] border border-border/70 p-4 shadow-none outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="size-6 shrink-0" />
      <span className="text-sm font-semibold text-foreground">{title}</span>
      <ArrowRightIcon
        className="ms-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 icon-dir rtl:group-hover:-translate-x-0.5"
        aria-hidden
      />
    </a>
  )
}

function MegaPanel() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {toolColumns.map((col, i) => (
          <div key={i} className="min-w-0 space-y-3">
            {col.map((item) => (
              <ToolCard key={item.title} {...item} />
            ))}
          </div>
        ))}
      </div>

      <a
        href="#"
        className="flex w-full max-w-80 shrink-0 cursor-pointer flex-col self-start rounded-[12px] bg-muted p-5 outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-80"
      >
        <img
          src={promoImage}
          alt=""
          width={640}
          height={360}
          className="aspect-[16/10] w-full rounded-[12px] object-cover object-center"
        />
        <span className="mt-4 block text-start text-sm font-semibold text-foreground">
          We&apos;ve just released an update
        </span>
        <span className="mt-2 block text-start text-sm font-normal text-muted-foreground">
          We&apos;ve rolled out a new update and fixes to enhance performance.
        </span>
      </a>
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
              <button
                type="button"
                aria-haspopup="true"
                ref={triggerRef}
                aria-expanded={megaOpen}
                aria-controls="mega-menu-panel"
                onClick={() => setMegaOpen((o) => !o)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-md outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
                  megaOpen && "text-primary"
                )}
              >
                Tools
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
              Sign up
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
                      <Collapsible>
                        <CollapsibleTrigger className="flex w-full cursor-pointer items-center justify-between rounded-[12px] px-3 py-3 hover:bg-muted [&[data-state=open]>svg]:rotate-180">
                          Tools
                          <ChevronDownIcon className="size-4 shrink-0 transition-transform" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-3 px-1 pb-3 pt-1">
                          {toolColumns.flat().map((item) => (
                            <ToolCard key={item.title} {...item} />
                          ))}
                          <a
                            href="#"
                            className="block cursor-pointer rounded-[12px] bg-muted p-4"
                          >
                            <img
                              src={promoImage}
                              alt=""
                              className="mb-3 w-full rounded-[12px] object-cover"
                            />
                            <span className="block text-sm font-semibold">
                              We&apos;ve just released an update
                            </span>
                            <span className="mt-1 block text-xs text-muted-foreground">
                              New update and fixes to enhance performance.
                            </span>
                          </a>
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
                  <Button className={cn("w-full", ctaClass)}>Sign up</Button>
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
          Tools mega with app icons
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Three columns of tool cards plus a release promo panel — sheet on
          small screens.
        </p>
      </main>
    </div>
  )
}
