"use client"

import * as React from "react"
import {
  BriefcaseIcon,
  ChevronDownIcon,
  FileTextIcon,
  HomeIcon,
  ListIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@sonojs/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@sonojs/ui/components/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@sonojs/ui/components/sheet"

const navLinks = [
  { label: "Landing", href: "#", icon: HomeIcon },
  { label: "Account", href: "#", icon: UserIcon },
  { label: "Work", href: "#", icon: BriefcaseIcon },
  { label: "Blog", href: "#", icon: FileTextIcon },
]

const dropdownItems = [
  { label: "About", href: "#" },
  { label: "Downloads", href: "#" },
  { label: "Team Account", href: "#" },
]

const subMenuItems = [
  { label: "About", href: "#" },
  { label: "Downloads", href: "#" },
  { label: "Team Account", href: "#" },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

const navItemClass =
  "h-auto cursor-pointer rounded-[12px] bg-transparent px-2.5 py-1.5 text-sm font-medium text-foreground shadow-none hover:bg-muted hover:text-foreground focus:bg-muted"

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

function NavDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            navItemClass,
            "inline-flex items-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          Dropdown
          <ChevronDownIcon className="size-3.5 opacity-70" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52 border-border/70">
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="#">About</a>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="cursor-pointer">
            Sub Menu
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-48 border-border/70">
            {subMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.label}
                asChild
                className="cursor-pointer"
              >
                <a href={item.href}>{item.label}</a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        {dropdownItems
          .filter((item) => item.label !== "About")
          .map((item) => (
            <DropdownMenuItem
              key={item.label}
              asChild
              className="cursor-pointer"
            >
              <a href={item.href}>{item.label}</a>
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [active, setActive] = React.useState("Landing")
  const [subOpen, setSubOpen] = React.useState(false)

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
                  {navLinks
                    .filter((l) => l.label === "Landing")
                    .map((link) => {
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

                  <div className="mb-1">
                    <p className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-foreground">
                      <ListIcon className="size-4 shrink-0" />
                      Dropdown
                    </p>
                    <div className="ms-4 space-y-0.5 border-s border-border/70 ps-3">
                      <a
                        href="#"
                        className="flex cursor-pointer rounded-[12px] px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        About
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubOpen((o) => !o)}
                        className="flex w-full cursor-pointer items-center justify-between rounded-[12px] px-3 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        Sub Menu
                        <ChevronDownIcon
                          className={cn(
                            "size-4 shrink-0 transition-transform",
                            subOpen && "rotate-180"
                          )}
                          aria-hidden
                        />
                      </button>
                      {subOpen ? (
                        <div className="ms-2 space-y-0.5 border-s border-border/70 ps-3">
                          {subMenuItems.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              className="flex cursor-pointer rounded-[12px] px-3 py-2 text-sm text-foreground hover:bg-muted"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                      {dropdownItems
                        .filter((item) => item.label !== "About")
                        .map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex cursor-pointer rounded-[12px] px-3 py-2 text-sm text-foreground hover:bg-muted"
                          >
                            {item.label}
                          </a>
                        ))}
                    </div>
                  </div>

                  {navLinks
                    .filter((l) => l.label !== "Landing")
                    .map((link) => {
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

          <div className="hidden min-w-0 grow items-center gap-1 md:flex">
            <div className="flex min-w-0 flex-wrap items-center gap-0.5">
              {navLinks
                .filter((l) => l.label === "Landing")
                .map((link) => {
                  const isActive = active === link.label
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={selectNav(link.label)}
                      className={cn(
                        navItemClass,
                        isActive && "bg-muted text-foreground"
                      )}
                    >
                      {link.label}
                    </a>
                  )
                })}

              <NavDropdown />

              {navLinks
                .filter((l) => l.label !== "Landing")
                .map((link) => {
                  const isActive = active === link.label
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={selectNav(link.label)}
                      className={cn(
                        navItemClass,
                        isActive && "bg-muted text-foreground"
                      )}
                    >
                      {link.label}
                    </a>
                  )
                })}
            </div>

            <div className="ms-auto flex shrink-0 flex-wrap items-center gap-1.5">
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
          Navbar with nested dropdown
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Start-aligned links, a Dropdown with Sub Menu flyout, and auth actions
          pushed to the end — sheet on small screens.
        </p>
      </main>
    </div>
  )
}
