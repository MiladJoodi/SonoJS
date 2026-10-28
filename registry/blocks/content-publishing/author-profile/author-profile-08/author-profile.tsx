"use client"

import * as React from "react"
import { UsersIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import { cn } from "@/lib/utils"

import portrait01 from "./images/portrait-01.webp"
import portrait02 from "./images/portrait-02.webp"
import portrait03 from "./images/portrait-03.webp"
import portrait04 from "./images/portrait-04.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Author = {
  name: string
  handle: string
  initials: string
  role: string
  company: string
  portrait: string
}

const AUTHORS: Author[] = [
  {
    name: "Maya Chen",
    handle: "@mayachen",
    initials: "MC",
    role: "Senior Engineer",
    company: "Northwind",
    portrait: assetSrc(portrait01),
  },
  {
    name: "Ravi Sharma",
    handle: "@ravisharma",
    initials: "RS",
    role: "Staff Engineer",
    company: "Orbit",
    portrait: assetSrc(portrait02),
  },
  {
    name: "Asha Okafor",
    handle: "@ashaokafor",
    initials: "AO",
    role: "Product Designer",
    company: "Studio",
    portrait: assetSrc(portrait03),
  },
  {
    name: "Jonas Berg",
    handle: "@jonasberg",
    initials: "JB",
    role: "Design Engineer",
    company: "SonoJS",
    portrait: assetSrc(portrait04),
  },
]

function ContributorCard({ author }: { author: Author }) {
  const [following, setFollowing] = React.useState(false)

  return (
    <article className="flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card p-5 shadow-soft sm:w-72">
      <Avatar className="size-16 ring-2 ring-border/70">
        <AvatarImage src={author.portrait} alt="" />
        <AvatarFallback className="text-base">{author.initials}</AvatarFallback>
      </Avatar>

      <div className="mt-4 min-w-0 text-start">
        <h3 className="truncate text-base font-semibold text-foreground">
          {author.name}
        </h3>
        <p className="truncate text-sm text-muted-foreground" dir="ltr">
          {author.handle}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {author.role} · {author.company}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        variant={following ? "outline" : "default"}
        aria-pressed={following}
        className="mt-5 w-full cursor-pointer"
        onClick={() => setFollowing((f) => !f)}
      >
        <UsersIcon className="size-3.5" aria-hidden />
        {following ? "Following" : "Follow"}
      </Button>
    </article>
  )
}

export default function AuthorProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="author-profile-08-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 text-start sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-medium text-primary">Team</p>
            <h1
              id="author-profile-08-heading"
              className="text-h2 font-semibold tracking-tight text-foreground"
            >
              Contributors
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              The people shaping design systems publishing — scroll to meet
              everyone.
            </p>
          </div>
          <p className="text-xs text-muted-foreground" dir="ltr">
            {AUTHORS.length} authors
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto overscroll-x-contain px-4 pb-2 scrollbar-thin sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex snap-x snap-mandatory gap-4">
            {AUTHORS.map((author) => (
              <ContributorCard key={author.handle} author={author} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
