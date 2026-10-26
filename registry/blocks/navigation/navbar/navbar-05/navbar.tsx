"use client"

import { MenuIcon } from "lucide-react"

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

const productItems = [
  {
    title: "Components",
    href: "#",
    description: "Buttons, inputs, and primitives ready to copy.",
  },
  {
    title: "Blocks",
    href: "#",
    description: "Auth, nav, and layout sections for shipping fast.",
  },
  {
    title: "Charts",
    href: "#",
    description: "Gallery charts with locked product chrome.",
  },
]

const solutionItems = [
  {
    title: "Startups",
    href: "#",
    description: "Ship a polished marketing site in a weekend.",
  },
  {
    title: "Product teams",
    href: "#",
    description: "Shared UI language across apps and docs.",
  },
  {
    title: "Agencies",
    href: "#",
    description: "Reusable blocks for client after client.",
  },
]

const resourceItems = [
  {
    title: "Documentation",
    href: "#",
    description: "Install, direction, and component APIs.",
  },
  {
    title: "Changelog",
    href: "#",
    description: "What shipped this month.",
  },
  {
    title: "Support",
    href: "#",
    description: "Talk to the team when you are stuck.",
  },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

/** Mega triggers: text links, no solid gray chrome. */
const menuTriggerClass =
  "h-auto bg-transparent px-2.5 py-1.5 shadow-none hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent data-[state=open]:text-foreground"

const mobileSections = [
  { heading: "Product", items: productItems },
  { heading: "Solutions", items: solutionItems },
  { heading: "Resources", items: resourceItems },
]

function Brand() {
  return (
    <a
      href="#"
      className="flex cursor-pointer items-center gap-2 outline-none focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring"
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

function ListItem({
  title,
  href,
  children,
}: {
  title: string
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block cursor-pointer rounded-[12px] px-3 py-2.5 no-underline outline-hidden transition-colors hover:bg-muted/70 focus:bg-muted/70"
        >
          <span className="block text-sm font-medium text-foreground">
            {title}
          </span>
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
            {children}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  )
}

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-card", className)}
      {...props}
    >
      <header className="z-30 border-b border-border/70 bg-card">
        <div className="mx-auto flex min-h-[62px] w-full max-w-5xl items-center gap-5 px-4 sm:px-6">
          <Brand />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-0.5">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={menuTriggerClass}>
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[min(100vw-2rem,34rem)] gap-3 p-3 md:grid-cols-[0.9fr_1.1fr]">
                    <NavigationMenuLink asChild>
                      <a
                        href="#"
                        className={cn(
                          "flex min-h-44 cursor-pointer flex-col justify-end overflow-hidden rounded-[12px] border border-border/70 bg-canvas p-5 no-underline outline-hidden",
                          "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_20px_40px_-28px_rgba(10,10,12,0.16)]"
                        )}
                      >
                        <span className="h-0.5 w-8 rounded-full bg-primary" />
                        <span className="mt-3 text-sm font-semibold text-foreground">
                          Sono UI
                        </span>
                        <span className="mt-1 text-xs leading-snug text-muted-foreground">
                          Copy-source components and blocks with direction
                          built in.
                        </span>
                      </a>
                    </NavigationMenuLink>
                    <ul className="grid gap-0.5">
                      {productItems.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={menuTriggerClass}>
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[min(100vw-2rem,36rem)] gap-0.5 p-3 sm:grid-cols-3">
                    {solutionItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={menuTriggerClass}>
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[min(100vw-2rem,22rem)] gap-0.5 p-3">
                    {resourceItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "cursor-pointer",
                    menuTriggerClass
                  )}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="ms-auto flex items-center gap-2">
            <Button
              variant="ghost"
              className={cn("hidden md:inline-flex", ctaClass)}
            >
              Sign in
            </Button>
            <Button className={cn("hidden md:inline-flex", ctaClass)}>
              Get started
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
                className="flex w-[min(100%,20rem)] flex-col gap-0 border-border/70 p-0"
              >
                <SheetHeader className="border-b border-border/70 px-4 py-4 text-start">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <Brand />
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-3">
                  {mobileSections.map((section) => (
                    <div key={section.heading} className="mb-4 space-y-1">
                      <p className="px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {section.heading}
                      </p>
                      {section.items.map((item) => (
                        <a
                          key={item.title}
                          href={item.href}
                          className="block cursor-pointer rounded-[12px] px-3 py-2.5 hover:bg-muted"
                        >
                          <span className="block text-sm font-medium text-foreground">
                            {item.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
                  <a
                    href="#"
                    className="block cursor-pointer rounded-[12px] px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Pricing
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
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-lg text-balance text-h3 text-foreground">
          Cascading mega menus
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Product, Solutions, and Resources — three panels, text-only rows.
        </p>
      </main>
    </div>
  )
}
