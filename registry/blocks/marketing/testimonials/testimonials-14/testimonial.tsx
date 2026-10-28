"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"
import avatar4 from "./images/avatar-4.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const PEOPLE = [
  {
    id: "maya",
    name: "Maya Chen",
    role: "Head of Product",
    company: "Helio",
    initials: "MC",
    image: avatar1,
    quote:
      "We swapped a week of layout thrash for an afternoon of polish. The blocks dropped in clean, and the design system finally felt like one product.",
    outcomes: ["2.4× faster ship", "−38% support load"],
  },
  {
    id: "jordan",
    name: "Jordan Blake",
    role: "Founding Engineer",
    company: "Parcel",
    initials: "JB",
    image: avatar2,
    quote:
      "Every screen we needed was already a block. We tuned tokens once, and the whole app stayed consistent without a design debt tax.",
    outcomes: ["1 theme, 12 screens", "Zero layout rewrites"],
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    role: "Design Lead",
    company: "Orbit",
    initials: "SR",
    image: avatar3,
    quote:
      "RTL, dark mode, and density just worked. I stopped babysitting spacing and started shipping the actual product story.",
    outcomes: ["RTL on day one", "Dark mode free"],
  },
  {
    id: "noah",
    name: "Noah Patel",
    role: "CTO",
    company: "Northwind",
    initials: "NP",
    image: avatar4,
    quote:
      "Installable source beats another black-box kit. Our team owns every line, and reviews stay honest.",
    outcomes: ["Full source ownership", "Reviewable diffs"],
  },
] as const

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [index, setIndex] = React.useState(0)
  const active = PEOPLE[index]!

  const go = (next: number) => {
    const len = PEOPLE.length
    setIndex(((next % len) + len) % len)
  }

  return (
    <section
      className={cn(
        "w-full bg-canvas px-4 py-14 text-foreground sm:px-6 md:px-8 md:py-20",
        className
      )}
      aria-labelledby="testimonials-14-heading"
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 max-w-2xl text-start md:mb-12">
          <p className="text-sm font-medium text-primary">Customers</p>
          <h2
            id="testimonials-14-heading"
            className="mt-2 text-h1 font-semibold tracking-tight"
          >
            They shipped. Here’s the receipt.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Pick a voice — the quote, outcomes, and role stay in sync.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <ol className="flex flex-col gap-1 lg:col-span-4">
            {PEOPLE.map((person, i) => {
              const on = i === index
              return (
                <li key={person.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-[12px] px-3 py-3 text-start transition-colors",
                      on ? "bg-card shadow-soft" : "hover:bg-muted/60"
                    )}
                    aria-current={on ? "true" : undefined}
                  >
                    <span
                      className={cn(
                        "w-1 self-stretch rounded-full",
                        on ? "bg-primary" : "bg-transparent"
                      )}
                      aria-hidden
                    />
                    <Avatar className="size-10 border border-border/70">
                      <AvatarImage
                        src={assetSrc(person.image)}
                        alt={person.name}
                      />
                      <AvatarFallback className="text-xs font-semibold">
                        {person.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block truncate text-sm font-semibold",
                          on ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {person.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {person.company}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex min-h-[22rem] flex-col rounded-[16px] bg-card p-6 shadow-soft sm:p-8 lg:col-span-8">
            <blockquote className="flex-1 text-start">
              <p className="text-lg font-medium leading-relaxed tracking-tight text-foreground sm:text-xl md:text-2xl md:leading-snug">
                {active.quote}
              </p>
            </blockquote>

            <div className="mt-8 flex flex-col gap-6 border-t border-border/70 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 items-center gap-3 text-start">
                <Avatar className="size-12 border border-border/70">
                  <AvatarImage
                    src={assetSrc(active.image)}
                    alt={active.name}
                  />
                  <AvatarFallback className="text-sm font-semibold">
                    {active.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{active.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {active.role} · {active.company}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-primary">
                    Verified customer
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {active.outcomes.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground" dir="ltr">
                {index + 1} / {PEOPLE.length}
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Previous testimonial"
                  onClick={() => go(index - 1)}
                  className="cursor-pointer"
                >
                  <ChevronLeftIcon className="size-4 icon-dir" aria-hidden />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Next testimonial"
                  onClick={() => go(index + 1)}
                  className="cursor-pointer"
                >
                  <ChevronRightIcon className="size-4 icon-dir" aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Northwind · Helio · Parcel · Orbit
        </p>
      </div>
    </section>
  )
}
