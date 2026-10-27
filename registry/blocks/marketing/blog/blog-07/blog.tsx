import type * as React from "react"

import { cn } from "@/lib/utils"

import hacksWatch from "./images/hacks-watch.webp"
import imagination from "./images/imagination.webp"
import prediction from "./images/prediction.webp"
import teamImage from "./images/team-image.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_POSTS = [
  {
    id: 1,
    image: assetSrc(imagination),
    title: "A Guide to Igniting Your Imagination",
    date: "10 FEB 2023",
    author: "JOHN DOE",
    description:
      "Explore simple ways to spark your creativity and bring ideas to life. Perfect for artists, writers, and dreamers.",
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(hacksWatch),
    title: "Hacks to Supercharge Your Day",
    date: "7 JUN 2023",
    author: "MARK ADAIR",
    description:
      "Boost productivity with smart, time-saving tips. Small changes can make a big impact on your routine.",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(prediction),
    title: "Trends and Predictions",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    description:
      "Discover what’s next in the world of design, tech, and lifestyle. Stay ahead of the curve with expert insights.",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(teamImage),
    title: "Innovators Changing the Game",
    date: "10 DEC 2023",
    author: "SIMON KONECKI",
    description:
      "Meet the minds reshaping industries with bold ideas and fresh thinking. Be inspired by real change-makers.",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  image: string
  title: string
  date: string
  author: string
  description: string
  href: string
}

export default function Blog({
  eyebrow = "Dispatch",
  title = "Latest Blog Posts",
  description = "Explore our latest articles, insights, and practical tips designed to help you stay updated, improve your workflow, and build better products with confidence.",
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
      <div className="mx-auto max-w-2xl lg:max-w-6xl">
        <div className="mb-12 max-w-2xl text-start md:mb-16">
          <p className="mb-3 text-sm font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2
            id="blog-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              className={cn(
                "group flex cursor-pointer flex-col overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft",
                "transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "sm:flex-row"
              )}
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div
                className="relative w-full shrink-0 overflow-hidden bg-muted sm:w-52 sm:max-w-52 sm:flex-none"
                style={{ aspectRatio: "4 / 3" }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center p-5 text-start sm:p-6">
                <p className="mb-2 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {post.date}
                  <span className="mx-2 text-border" aria-hidden="true">
                    ·
                  </span>
                  {post.author}
                </p>
                <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
