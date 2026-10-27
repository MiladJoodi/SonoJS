"use client"

import * as React from "react"
import {
  ActivityIcon,
  ArrowRightIcon,
  AwardIcon,
  BookOpenIcon,
  BriefcaseIcon,
  BlocksIcon,
  Code2Icon,
  FileTextIcon,
  HelpCircleIcon,
  HomeIcon,
  MenuIcon,
  PenToolIcon,
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

type MegaLink = {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const aboutLinks: MegaLink[] = [
  { title: "Support Docs", href: "#", icon: BookOpenIcon },
  { title: "Integrations", href: "#", icon: BlocksIcon },
  { title: "Guides", href: "#", icon: FileTextIcon },
  { title: "API Reference", href: "#", icon: Code2Icon },
  { title: "API Status", href: "#", icon: ActivityIcon },
]

const supportLinks: MegaLink[] = [
  { title: "Help Center", href: "#", icon: HelpCircleIcon },
  { title: "Developer Hub", href: "#", icon: SettingsIcon },
  { title: "Community Forum", href: "#", icon: UsersIcon },
]

const partnerLinks: MegaLink[] = [
  { title: "Become a Partner", href: "#", icon: AwardIcon },
  { title: "Build on Sono", href: "#", icon: PenToolIcon },
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

function MegaItem({ title, href, icon: Icon }: MegaLink) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex flex-row items-start gap-x-3 rounded-[12px] p-2 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
      >
        <Icon className="mt-0.5 size-4 shrink-0 text-foreground" />
        <span className="grow text-sm text-foreground">{title}</span>
      </a>
    </NavigationMenuLink>
  )
}

function MegaSection({
  label,
  links,
  className,
}: {
  label: string
  links: MegaLink[]
  className?: string
}) {
  return (
    <div className={cn("space-y-0.5", className)}>
      <span className="mb-2 ms-2.5 block text-xs font-semibold tracking-wider text-foreground uppercase">
        {label}
      </span>
      {links.map((link) => (
        <MegaItem key={link.title} {...link} />
      ))}
    </div>
  )
}

function ResourcesMega() {
  return (
    <div className="w-[min(100vw-2rem,46.875rem)] overflow-hidden md:rounded-[12px]">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:gap-0">
        <div className="col-span-1 p-2 sm:col-span-1 md:col-span-3 md:p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-1">
            <MegaSection label="About us" links={aboutLinks} />
            <div className="flex flex-col">
              <MegaSection label="Support" links={supportLinks} />
              <MegaSection
                label="Partners"
                links={partnerLinks}
                className="mt-3 md:mt-7"
              />
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex h-full flex-col rounded-[12px] p-2 md:rounded-none md:rounded-ee-[12px] md:bg-muted md:p-4">
            <span className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
              Customer stories
            </span>
            <a
              href="#"
              className="group flex cursor-pointer flex-row items-center gap-4 no-underline outline-hidden md:flex-col md:items-start md:gap-2"
            >
              <img
                src={storyImage}
                alt=""
                width={560}
                height={320}
                className="size-28 shrink-0 rounded-[12px] object-cover md:h-auto md:w-full md:max-h-40"
              />
              <span className="min-w-0 grow">
                <span className="block text-sm text-foreground">
                  Sono helped the team ship a consistent UI language across every
                  product surface.
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                  Learn more
                  <ArrowRightIcon
                    className="size-4 transition ease-in-out group-hover:translate-x-0.5 icon-dir rtl:group-hover:-translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileMegaLinks({
  label,
  links,
}: {
  label: string
  links: MegaLink[]
}) {
  return (
    <>
      <p className="mt-3 mb-1 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      {links.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm text-foreground hover:bg-muted"
        >
          <item.icon className="size-4 shrink-0" />
          {item.title}
        </a>
      ))}
    </>
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
                  <MobileMegaLinks label="About us" links={aboutLinks} />
                  <MobileMegaLinks label="Support" links={supportLinks} />
                  <MobileMegaLinks label="Partners" links={partnerLinks} />
                  <p className="mt-3 mb-1 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Customer stories
                  </p>
                  <a
                    href="#"
                    className="mt-1 flex cursor-pointer gap-3 rounded-[12px] p-2 hover:bg-muted"
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
          Navbar with medium Resources mega
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          About, Support, and Partners columns plus a muted Customer stories
          panel — sheet on small screens.
        </p>
      </main>
    </div>
  )
}
