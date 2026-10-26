"use client"

import * as React from "react"
import {
  BriefcaseIcon,
  ContainerIcon,
  FileTextIcon,
  HomeIcon,
  MenuIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@sonojs/ui/components/badge"
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

type MegaItem = {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const resourceItems: MegaItem[] = [
  {
    title: "Data",
    description: "How you get the most accurate and up-to-date data",
    href: "#",
    icon: ContainerIcon,
  },
  {
    title: "Team",
    description: "Meet the people building products to help your business grow",
    href: "#",
    icon: UsersIcon,
    badge: "We're hiring",
  },
  {
    title: "Blog",
    description: "The latest news, feature releases, and how to grow with data",
    href: "#",
    icon: FileTextIcon,
  },
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
  badge,
}: MegaItem) {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className="flex flex-row items-start gap-x-4 rounded-[12px] p-3 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
      >
        <Icon className="mt-1 size-4 shrink-0 text-foreground" />
        <span className="min-w-0 grow">
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm font-semibold text-foreground">
            {title}
            {badge ? (
              <Badge className="ms-0.5 h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                {badge}
              </Badge>
            ) : null}
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
  return (
    <div className="w-[min(100vw-2rem,20rem)] space-y-0.5 p-1">
      {resourceItems.map((item, index) => (
        <React.Fragment key={item.title}>
          {index > 0 ? (
            <div
              className="my-2 border-t border-border/70"
              aria-hidden
            />
          ) : null}
          <ResourceLink {...item} />
        </React.Fragment>
      ))}
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
      {...props}
    >
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
                  {resourceItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="flex cursor-pointer gap-3 rounded-[12px] px-3 py-2.5 hover:bg-muted"
                    >
                      <item.icon className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-foreground">
                          {item.title}
                          {item.badge ? (
                            <Badge className="h-auto rounded-full px-2 py-0.5 text-[11px] font-medium">
                              {item.badge}
                            </Badge>
                          ) : null}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  ))}
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
          Navbar with compact Resources menu
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          End-aligned links and a narrow Resources panel with Data, Team, and
          Blog — sheet on small screens.
        </p>
      </main>
    </div>
  )
}
