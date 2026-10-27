"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  BookOpenIcon,
  BoxesIcon,
  ComponentIcon,
  FileQuestionIcon,
  HomeIcon,
  SearchIcon,
} from "lucide-react"

import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { Separator } from "@sonojs/ui/components/separator"
import { cn } from "@/lib/utils"

const SUGGESTIONS = [
  {
    href: "/docs",
    title: "Documentation",
    description: "Guides, APIs, and getting started",
    icon: BookOpenIcon,
  },
  {
    href: "/docs/components",
    title: "Components",
    description: "Installable UI primitives",
    icon: ComponentIcon,
  },
  {
    href: "/blocks",
    title: "Blocks",
    description: "Ready-made page sections",
    icon: BoxesIcon,
  },
] as const

export default function NotFound({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const [query, setQuery] = React.useState("")

  return (
    <main
      className={cn(
        "flex min-h-[min(40rem,100svh)] w-full flex-col items-center justify-center bg-canvas px-4 py-12 text-foreground sm:px-6",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full border border-border/70 bg-card shadow-soft">
            <FileQuestionIcon
              className="size-5 text-muted-foreground"
              aria-hidden
            />
          </div>
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Error 404
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            We can&apos;t find that page
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            The link may be broken, or the page may have moved. Try a search or
            pick one of the destinations below.
          </p>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          <form
            className="border-b border-border/70 p-4 sm:p-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <SearchIcon aria-hidden />
              </InputGroupAddon>
              <InputGroupInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search docs and blocks…"
                aria-label="Search the site"
              />
            </InputGroup>
          </form>

          <ul className="divide-y divide-border/70">
            {SUGGESTIONS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5"
                  >
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-muted/50">
                      <Icon
                        className="size-3.5 text-muted-foreground"
                        aria-hidden
                      />
                    </div>
                    <span className="min-w-0 flex-1 text-start">
                      <span className="block text-sm font-medium">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>

          <Separator />

          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:p-5">
            <Button type="button" className="flex-1 gap-1.5">
              <HomeIcon className="size-4" aria-hidden />
              Back to home
            </Button>
            <Button type="button" variant="outline" className="flex-1 gap-1.5">
              <ArrowLeftIcon className="icon-dir size-4" aria-hidden />
              Go back
            </Button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Not found · Trace{" "}
          <span className="font-mono tabular-nums" dir="ltr">
            REQ-4F0UND-404
          </span>
        </p>
      </div>
    </main>
  )
}
