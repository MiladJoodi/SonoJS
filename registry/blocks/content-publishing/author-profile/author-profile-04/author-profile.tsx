"use client"

import * as React from "react"
import { SearchIcon, UsersIcon, XIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@sonojs/ui/components/avatar"
import { Button } from "@sonojs/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@sonojs/ui/components/input-group"
import { cn } from "@/lib/utils"

import portrait01 from "./images/portrait-01.webp"
import portrait02 from "./images/portrait-02.webp"
import portrait03 from "./images/portrait-03.webp"
import portrait04 from "./images/portrait-04.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

type Author = {
  id: number
  name: string
  handle: string
  initials: string
  role: string
  company: string
  portrait: string
}

const AUTHORS: Author[] = [
  {
    id: 1,
    name: "Maya Chen",
    handle: "@mayachen",
    initials: "MC",
    role: "Senior Engineer",
    company: "Northwind",
    portrait: assetSrc(portrait01),
  },
  {
    id: 2,
    name: "Ravi Sharma",
    handle: "@ravisharma",
    initials: "RS",
    role: "Staff Engineer",
    company: "Orbit",
    portrait: assetSrc(portrait02),
  },
  {
    id: 3,
    name: "Asha Okafor",
    handle: "@ashaokafor",
    initials: "AO",
    role: "Product Designer",
    company: "Studio",
    portrait: assetSrc(portrait03),
  },
  {
    id: 4,
    name: "Jonas Berg",
    handle: "@jonasberg",
    initials: "JB",
    role: "Design Engineer",
    company: "SonoJS",
    portrait: assetSrc(portrait04),
  },
]

function AuthorRow({ author }: { author: Author }) {
  const [following, setFollowing] = React.useState(false)

  return (
    <li className="border-b border-border/70 last:border-b-0">
      <div className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4 sm:px-5">
        <Avatar className="size-11 shrink-0 sm:size-12">
          <AvatarImage src={author.portrait} alt="" />
          <AvatarFallback>{author.initials}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 text-start">
          <p className="truncate text-sm font-semibold text-foreground">
            {author.name}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {author.role} · {author.company}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground" dir="ltr">
            {author.handle}
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant={following ? "outline" : "default"}
          aria-pressed={following}
          className="shrink-0 cursor-pointer"
          onClick={() => setFollowing((f) => !f)}
        >
          <UsersIcon className="size-3.5" aria-hidden />
          {following ? "Following" : "Follow"}
        </Button>
      </div>
    </li>
  )
}

export default function AuthorProfile({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const [query, setQuery] = React.useState("")

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return AUTHORS
    return AUTHORS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.handle.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section
      className={cn(
        "w-full min-w-0 bg-background py-14 text-foreground sm:py-20",
        className
      )}
      aria-labelledby="author-profile-04-heading"
      {...props}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 text-start">
          <p className="mb-2 text-sm font-medium text-primary">Directory</p>
          <h1
            id="author-profile-04-heading"
            className="text-h1 font-semibold tracking-tight text-foreground"
          >
            Find an author
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Search engineers and designers writing about systems, product, and
            craft.
          </p>
        </div>

        <div className="mb-5">
          <InputGroup className="h-[46px] w-full">
            <InputGroupAddon align="inline-start">
              <SearchIcon aria-hidden />
            </InputGroupAddon>
            <InputGroupInput
              type="search"
              placeholder="Search by name or role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search authors"
            />
            {query ? (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  size="icon-xs"
                  aria-label="Clear search"
                  className="cursor-pointer"
                  onClick={() => setQuery("")}
                >
                  <XIcon aria-hidden />
                </InputGroupButton>
              </InputGroupAddon>
            ) : null}
          </InputGroup>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft">
          {filtered.length > 0 ? (
            <ul role="list">
              {filtered.map((author) => (
                <AuthorRow key={author.id} author={author} />
              ))}
            </ul>
          ) : (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No authors match “{query}”.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
