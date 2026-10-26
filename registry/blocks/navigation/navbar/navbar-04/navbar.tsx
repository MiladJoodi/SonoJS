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
  { label: "Blog", href: "#" },
]

const ctaClass =
  "!h-[46px] h-[46px] min-h-[46px] max-h-[46px] rounded-[12px] shadow-none"

const iconBtn =
  "size-[46px] min-h-[46px] max-h-[46px] min-w-[46px] max-w-[46px] rounded-[12px] border-border/70 shadow-none"

function Brand({ light }: { light?: boolean }) {
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
      <span
        className={cn(
          "text-sm font-semibold tracking-tight",
          light ? "text-white" : "text-foreground"
        )}
      >
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
    <div className={cn("w-full overflow-hidden bg-card", className)} {...props}>
      <div className="relative isolate min-h-[28rem] overflow-hidden bg-zinc-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 50% -10%, color-mix(in oklab, var(--primary) 55%, transparent), transparent 60%)",
          }}
          aria-hidden
        />
        <header className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex min-h-[62px] w-full max-w-5xl items-center gap-6 px-4 sm:px-6">
            <Brand light />
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="cursor-pointer rounded-md px-2.5 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="ms-auto flex items-center gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "hidden md:inline-flex",
                  ctaClass,
                  "text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Sign in
              </Button>
              <Button className={cn("hidden md:inline-flex", ctaClass)}>
                Get started
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      iconBtn,
                      "md:hidden border-white/25 text-white hover:bg-white/10 hover:text-white"
                    )}
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
            </div>
          </div>
        </header>
        <div className="relative mx-auto flex min-h-[28rem] max-w-5xl flex-col justify-end gap-3 px-4 pb-12 pt-24 sm:px-6">
          <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
          <p className="text-sm font-medium text-primary">Transparent</p>
          <h1 className="max-w-xl text-balance text-h2 text-white">
            Clear bar over a dark hero
          </h1>
          <p className="max-w-md text-sm text-white/65">
            Navigation floats on the landing atmosphere — no solid header fill.
          </p>
        </div>
      </div>
    </div>
  )
}
