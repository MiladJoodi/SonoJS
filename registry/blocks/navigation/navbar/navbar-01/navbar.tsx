"use client"

import { MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
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

export default function Navbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-[28rem] w-full flex-col bg-card", className)}
      {...props}
    >
      <div className="border-b border-border/70 bg-canvas/80 px-4 py-5 sm:px-6">
        <header
          className={cn(
            "mx-auto flex min-h-[62px] w-full max-w-3xl items-center gap-4 rounded-[12px] border border-border/70 bg-card pe-1.5 ps-4",
            "shadow-[0_2px_4px_-1px_rgba(10,10,12,0.04),0_16px_32px_-20px_rgba(10,10,12,0.18)]",
            "dark:shadow-[0_2px_4px_-1px_rgba(0,0,0,0.24),0_16px_32px_-20px_rgba(0,0,0,0.48)]"
          )}
        >
          <Brand />
          <nav className="ms-2 hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button className={cn("ms-auto md:ms-auto", ctaClass)}>
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
              className="flex w-[min(100%,18rem)] flex-col gap-0 border-border/70 p-0"
            >
              <SheetHeader className="border-b border-border/70 px-4 py-4 text-start">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Brand />
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="cursor-pointer rounded-[12px] px-3 py-3 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </header>
      </div>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-3 px-6 py-14">
        <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
        <h1 className="max-w-md text-balance text-h3 text-foreground">
          Minimal floating bar
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Logo, a few links, one CTA — for quiet product pages.
        </p>
      </main>
    </div>
  )
}
