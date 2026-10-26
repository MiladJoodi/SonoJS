import type * as React from "react"

import { cn } from "@/lib/utils"

import food from "./images/food.webp"
import food11 from "./images/food11.webp"
import food22 from "./images/food22.webp"
import hacksWatch from "./images/hacks-watch.webp"
import imagination from "./images/imagination.webp"
import prediction from "./images/prediction.webp"

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
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(hacksWatch),
    title: "Hacks to Supercharge Your Day",
    date: "7 JUN 2023",
    author: "MARK ADAIR",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(prediction),
    title: "Trends and Predictions",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(food),
    title: "Healthy Eating Secrets",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    href: "#",
  },
  {
    id: 5,
    image: assetSrc(food11),
    title: "Sustainable Food Sourcing",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    href: "#",
  },
  {
    id: 6,
    image: assetSrc(food22),
    title: "The Art of Presentation",
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  image: string
  title: string
  date: string
  author: string
  href: string
}

export default function Blog({
  eyebrow = "Gallery",
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
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="blog-heading"
      {...props}
    >
      <div className="mx-auto max-w-4xl lg:max-w-7xl">
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

        <div className="mx-auto grid max-w-md gap-5 md:max-w-full md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              className="group relative block cursor-pointer overflow-hidden rounded-[12px] bg-muted shadow-soft ring-1 ring-border/40 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative aspect-[3/4] w-full bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    zIndex: 1,
                    backgroundImage:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 28%, rgba(0,0,0,0.35) 55%, transparent 78%)",
                  }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 p-5 text-start sm:p-6"
                  style={{ zIndex: 2, color: "#ffffff" }}
                >
                  <span
                    className="mb-2 block text-[11px] font-medium tracking-[0.14em] uppercase"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {post.date}
                    <span
                      className="mx-2"
                      aria-hidden="true"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      ·
                    </span>
                    {post.author}
                  </span>
                  <h3
                    className="text-xl font-semibold tracking-tight"
                    style={{ color: "#ffffff" }}
                  >
                    {post.title}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
