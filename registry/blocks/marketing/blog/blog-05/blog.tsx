import type * as React from "react"

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
    image: assetSrc(food22),
    date: "August 16, 2023",
    title: "The Future of Food and Tech",
    description:
      "Explore how robotics and AI are revolutionizing fast food.",
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(food11),
    date: "August 16, 2023",
    title: "Eating Clean, Feeling Great",
    description:
      "Healthy eating doesn’t have to be boring. Discover delicious meals that boost your mood.",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(food),
    date: "August 16, 2023",
    title: "Pasta That Tells a Story",
    description:
      "Dive into the world of bold flavors and cultural traditions.",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(food33),
    date: "June 10, 2023",
    title: "Food That Inspires",
    description:
      "Bright meals, bold ideas—see how vibrant food presentation can spark imagination and joy.",
    href: "#",
  },
  {
    id: 5,
    image: assetSrc(food44),
    date: "April 20, 2023",
    title: "Energize Your Routine",
    description:
      "Power your day with nourishing bowls packed with flavor and crunch.",
    href: "#",
  },
  {
    id: 6,
    image: assetSrc(food55),
    date: "August 16, 2023",
    title: "Sweet Trends to Watch",
    description:
      "From aesthetic plating to bite-sized delights, uncover what’s trending in the world of desserts and snacks.",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  image: string
  date: string
  title: string
  description: string
  href: string
}

export default function Blog({
  eyebrow = "Featured",
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
      <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-6xl">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group rounded-[12px] border border-border/70 bg-card shadow-soft transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]"
            >
              <a
                href={post.href}
                className="block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-[12px] bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute end-3 bottom-3 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary-foreground uppercase shadow-sm">
                    {post.date}
                  </div>
                </div>

                <div className="p-5 text-start sm:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
