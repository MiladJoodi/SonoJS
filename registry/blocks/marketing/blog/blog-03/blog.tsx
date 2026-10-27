import type * as React from "react"

import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import team1 from "./images/team-1.webp"
import team2 from "./images/team-2.webp"
import team3 from "./images/team-3.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_POSTS = [
  {
    id: 1,
    date: "10 Feb 2025",
    title: "A Guide to Igniting Your Imagination",
    description:
      "Unlock creative potential with rituals that turn quiet sparks into bold, shippable ideas — for designers, writers, and builders alike.",
    author: "John Doe",
    authorImg: assetSrc(team1),
    role: "Creative Lead",
    href: "#",
  },
  {
    id: 2,
    date: "7 Jun 2025",
    title: "Hacks to Supercharge Your Day",
    description:
      "Small, compounding habits that reclaim hours each week — energy, focus, and a calmer cadence without burning out.",
    author: "Mark Adair",
    authorImg: assetSrc(team2),
    role: "Product Ops",
    href: "#",
  },
  {
    id: 3,
    date: "5 Oct 2025",
    title: "Trends and Predictions",
    description:
      "What’s next across design, tech, and culture — signal over noise so you stay prepared, inspired, and a step ahead.",
    author: "Simon Konecki",
    authorImg: assetSrc(team3),
    role: "Strategy",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  date: string
  title: string
  description: string
  author: string
  authorImg: string
  role?: string
  href: string
}

export default function Blog({
  eyebrow = "Essays",
  title = "Latest Blog Posts",
  description = "Get inspired with our latest articles on creativity, productivity, and future trends. Stay ahead with expert insights, practical tips, and thought-provoking ideas.",
  posts = DEFAULT_POSTS,
  className,
  ...props
}: React.ComponentProps<"section"> & {
  eyebrow?: string
  title?: string
  description?: string
  posts?: BlogPost[]
}) {
  return (
    <section
      className={cn("w-full bg-canvas px-4 py-12 md:px-8 md:py-16", className)}
      style={{ backgroundColor: "var(--canvas, #f3f3f4)" }}
      aria-labelledby="blog-heading"
      {...props}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-start md:mb-14">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2
            id="blog-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-5">
          {posts.map((post, index) => {
            const n = String(index + 1).padStart(2, "0")
            return (
              <a
                key={post.id}
                href={post.href}
                className={cn(
                  "group relative block cursor-pointer overflow-hidden rounded-[12px] border border-border/70 bg-card p-5 shadow-soft",
                  "transition-[box-shadow,transform,border-color] duration-300",
                  "hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "sm:p-6"
                )}
                style={{
                  backgroundColor: "var(--card, #ffffff)",
                  boxShadow:
                    "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 start-0 w-1 scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100"
                />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground/80 tabular-nums sm:w-10 sm:shrink-0 sm:pt-1">
                    {n}
                  </span>

                  <div className="min-w-0 flex-1 text-start">
                    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <time className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        {post.date}
                      </time>
                      <span
                        className="hidden size-1 rounded-full bg-border sm:inline-block"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-medium tracking-[0.08em] text-primary uppercase">
                        Essay
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <h3 className="min-w-0 flex-1 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-[1.35rem]">
                        {post.title}
                      </h3>
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-muted/50 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowUpRightIcon className="size-4" />
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {post.description}
                    </p>

                    <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-5">
                      <img
                        src={post.authorImg}
                        className="size-10 rounded-full object-cover ring-2 ring-background shadow-sm"
                        alt={post.author}
                        loading="lazy"
                      />
                      <div className="min-w-0 text-start">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {post.author}
                        </p>
                        {post.role ? (
                          <p className="truncate text-xs text-muted-foreground">
                            {post.role}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
