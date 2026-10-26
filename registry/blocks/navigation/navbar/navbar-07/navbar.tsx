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
  { label: "Guide", href: "#" },
  { label: "API", href: "#" },
  { label: "Examples", href: "#" },
]

const chapters = [
  {
    n: "01",
    title: "Install the CLI",
    body: "Add the package, point components.json at the registry, then pull the first block.",
  },
  {
    n: "02",
    title: "Wire direction",
    body: "Keep logical CSS from day one so LTR and RTL share the same source.",
  },
  {
    n: "03",
    title: "Ship the page",
    body: "Drop the sticky bar on long docs. Readers keep primary actions without scrolling back up.",
  },
  {
    n: "04",
    title: "Tune the chrome",
    body: "Match radius, border, and CTA height to the rest of your auth and form surfaces.",
  },
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
        Sono Docs
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
      className={cn(
        "max-h-[28rem] w-full overflow-y-auto overscroll-contain bg-canvas",
        className
      )}
      {...props}
    >
      <header className="sticky top-0 z-20 border-b border-border/70 bg-card/95 backdrop-blur-md supports-backdrop-filter:bg-card/80">
        <div className="mx-auto flex min-h-[62px] w-full max-w-5xl items-center gap-6 px-4 sm:px-6">
          <Brand />
          <nav className="hidden items-center gap-1 md:flex">
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
          <div className="ms-auto flex items-center gap-2">
            <Button className={ctaClass}>Get started</Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    iconBtn,
                    "md:hidden"
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

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[11rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            On this page
          </p>
          <ol className="mt-4 space-y-2">
            {chapters.map((chapter) => (
              <li key={chapter.n}>
                <a
                  href={`#${chapter.n}`}
                  className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {chapter.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="space-y-10 rounded-[12px] border border-border/70 bg-card p-6 sm:p-8">
          <div className="space-y-3">
            <span className="h-0.5 w-8 rounded-full bg-primary" aria-hidden />
            <h1 className="text-balance text-h3 text-foreground">
              Sticky docs header
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              Scroll this frame. The bar stays locked while the reading column
              moves — built for long guides, not landing pages.
            </p>
          </div>
          {chapters.map((chapter) => (
            <section
              id={chapter.n}
              key={chapter.n}
              className="scroll-mt-24 space-y-2 border-t border-border/70 pt-8"
            >
              <p className="font-mono text-xs text-muted-foreground">
                {chapter.n}
              </p>
              <h2 className="text-h4 text-foreground">{chapter.title}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                {chapter.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
