import type * as React from "react"

import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import food from "./images/food.webp"
import food11 from "./images/food11.webp"
import food22 from "./images/food22.webp"
import food33 from "./images/food33.webp"
import food44 from "./images/food44.webp"
import food55 from "./images/food55.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_POSTS = [
  {
    id: 1,
    image: assetSrc(food),
    title: "10 Pasta Recipes You Must Try",
    date: "08 April 2024",
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(food11),
    title: "Healthy Eating Made Simple",
    date: "28 March 2024",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(food22),
    title: "Futuristic Food Tech Trends",
    date: "15 March 2024",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(food33),
    title: "Fast Food Favorites Make at Home",
    date: "05 March 2024",
    href: "#",
  },
  {
    id: 5,
    image: assetSrc(food44),
    title: "Bowl Meals for Busy Days",
    date: "26 February 2024",
    href: "#",
  },
  {
    id: 6,
    image: assetSrc(food55),
    title: "Desserts That Spark Joy",
    date: "12 February 2024",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  image: string
  title: string
  date: string
  href: string
}

export default function Blog({
  eyebrow = "Collection",
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
      <div className="mx-auto max-w-4xl lg:max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
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

        <div className="grid gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-[12px] border border-border/70 bg-card shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
              style={{
                backgroundColor: "var(--card, #ffffff)",
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div className="px-5 pt-5 pb-5 text-start sm:px-6">
                <p className="mb-2 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {post.date}
                </p>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {post.title}
                </h3>
                <a
                  href={post.href}
                  className="mt-5 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  See more
                  <ArrowRightIcon className="size-3.5 icon-dir transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
