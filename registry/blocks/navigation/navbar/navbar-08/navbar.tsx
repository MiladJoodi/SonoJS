"use client"

import * as React from "react"
import {
  ArrowRightIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BlocksIcon,
  Code2Icon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@sonojs/ui/components/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"
import storyAsset from "./story.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const storyImage = assetSrc(storyAsset)

const resourceCols = [
  [
    {
      title: "Support Docs",
      description: "Advice and explanations for every Sono feature.",
      href: "#",
      icon: BookOpenIcon,
    },
    {
      title: "Integrations",
      description: "Tools that connect cleanly with your stack.",
      href: "#",
      icon: BlocksIcon,
    },
    {
      title: "API Reference",
      description: "Build custom integrations with a first-class API.",
      href: "#",
      icon: Code2Icon,
    },
  ],
  [
    {
      title: "Help Center",
      description: "Install, set up, and ship with Sono.",
      href: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Developer Hub",
      description: "Integrate or extend on top of the registry.",
      href: "#",
      icon: SettingsIcon,
    },
    {
      title: "Community Forum",
      description: "Learn, share, and connect with other builders.",
      href: "#",
      icon: UsersIcon,
    },
  ],
]

const navLinks = [
  { label: "Landing", href: "#", icon: HomeIcon },
  { label: "Account", href: "#", icon: UserIcon },
  { label: "Work", href: "#", icon: BriefcaseIcon },
  { label: "Blog", href: "#", icon: FileTextIcon },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

const menuTriggerClass =
  "h-auto bg-transparent px-2.5 py-1.5 shadow-none hover:bg-muted hover:text-foreground focus:bg-muted data-[state=open]:bg-muted data-[state=open]:text-foreground"

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

function ResourceLink({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex flex-row items-start gap-x-4 rounded-[12px] p-3 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
      >
        <Icon className="mt-1 size-4 shrink-0 text-foreground" />
        <span className="min-w-0 grow">
          <span className="block text-sm font-medium text-foreground">
            {title}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
            {description}
          </span>
        </span>
      </a>
    </NavigationMenuLink>
  )
}

function ResourcesMega() {
  // Panel is always wide enough for 3 cols; use md (not lg) so iframe
  // previews don't drop Customer stories onto a stray full-width row.
  return (
    <div className="grid w-[min(100vw-2rem,52rem)] grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-3">
      {resourceCols.map((col, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          {col.map((item) => (
            <ResourceLink key={item.title} {...item} />
          ))}
        </div>
      ))}
      <div className="flex flex-col gap-2 p-2 sm:col-span-2 md:col-span-1">
        <p className="px-1 text-[11px] font-semibold tracking-wider text-foreground uppercase">
          Customer stories
        </p>
        <a
          href="#"
          className="group flex cursor-pointer items-center gap-4 rounded-[12px] p-2 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
        >
          <img
            src={storyImage}
            alt=""
            width={128}
            height={128}
            className="size-28 shrink-0 rounded-[12px] object-cover"
          />
          <span className="min-w-0 grow">
            <span className="block text-sm leading-snug text-foreground">
              Sono helped the team ship a consistent UI language across every
              product surface.
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Learn more
              <ArrowRightIcon className="size-4 icon-dir" aria-hidden />
            </span>
          </span>
        </a>
      </div>
    </div>
  )
}

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState("Landing")

  function selectNav(label: string) {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      setActive(label)
    }
  }

  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-card", className)}
      {...props}>
      <header className="z-50 w-full border-b border-border/70 bg-card">
        <nav className="relative mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 md:flex-nowrap">
          <div className="flex w-full items-center justify-between gap-2 md:w-auto">
            <Brand />
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
                className="flex w-[min(100%,20rem)] flex-col gap-0 border-border/70 p-0"
              >
                <SheetHeader className="border-b border-border/70 px-4 py-4 text-start">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <Brand />
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-3">
                  {navLinks.map((link) => {
                    const isActive = active === link.label
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={selectNav(link.label)}
                        className={cn(
                          "mb-1 flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <link.icon className="size-4 shrink-0" />
                        {link.label}
                      </a>
                    )
                  })}
                  <p className="mt-3 mb-1 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Resources
                  </p>
                  {resourceCols.flat().map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex cursor-pointer gap-3 rounded-[12px] px-3 py-2.5 hover:bg-muted"
                    >
                      <item.icon className="mt-0.5 size-4 shrink-0" />
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  ))}
                  <a
                    href="#"
                    className="mt-2 flex cursor-pointer gap-3 rounded-[12px] p-2 hover:bg-muted"
                  >
                    <img
                      src={storyImage}
                      alt=""
                      className="size-16 shrink-0 rounded-[12px] object-cover"
                    />
                    <span className="text-sm text-foreground">
                      Customer story — learn how teams ship with Sono.
                    </span>
                  </a>
                </div>
                <div className="space-y-2 border-t border-border/70 p-3">
                  <Button
                    variant="outline"
                    className={cn("w-full border-border/70", ctaClass)}
                  >
                    Sign in
                  </Button>
                  <Button className={cn("w-full", ctaClass)}>Get started</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden min-w-0 grow items-center md:flex">
            <div className="flex min-w-0 grow justify-end">
              <NavigationMenu className="max-w-none" viewport>
                <NavigationMenuList className="flex-wrap justify-end gap-0.5">
                  {navLinks
                    .filter((l) => l.label === "Landing")
                    .map((link) => {
                      const isActive = active === link.label
                      return (
                        <NavigationMenuItem key={link.label}>
                          <NavigationMenuLink
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={selectNav(link.label)}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              menuTriggerClass,
                              "cursor-pointer",
                              isActive && "bg-muted text-foreground"
                            )}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    })}

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={menuTriggerClass}>
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ResourcesMega />
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {navLinks
                    .filter((l) => l.label !== "Landing")
                    .map((link) => {
                      const isActive = active === link.label
                      return (
                        <NavigationMenuItem key={link.label}>
                          <NavigationMenuLink
                            href={link.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={selectNav(link.label)}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              menuTriggerClass,
                              "cursor-pointer",
                              isActive && "bg-muted text-foreground"
                            )}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Sample uses a short md:h-4 rule; with 46px CTAs that looks orphaned — use gap instead */}
            <div className="ms-2 flex shrink-0 flex-wrap items-center gap-1.5">
              <Button
                variant="outline"
                className={cn("border-border/70", ctaClass)}
              >
                Sign in
              </Button>
              <Button className={ctaClass}>Get started</Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Navbar with Resources mega menu
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          End-aligned links, a three-column Resources panel, and auth actions —
          sheet on small screens.
        </p>
      </main>
    </div>
  )
}
