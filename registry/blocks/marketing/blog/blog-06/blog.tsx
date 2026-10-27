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
    image: assetSrc(food),
    date: "10 FEB 2023",
    author: "JOHN DOE",
    title: "The Future of Food and Tech",
    description:
      "Explore how robotics and AI are revolutionizing fast food. From kitchens to counters, automation is reshaping how we eat.",
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(food11),
    date: "7 JUN 2023",
    author: "MARK ADAIR",
    title: "Eating Clean, Feeling Great",
    description:
      "Healthy eating doesn’t have to be boring. Discover delicious meals that boost your mood and energy throughout the day.",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(food22),
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    title: "Pasta That Tells a Story",
    description:
      "Dive into the world of bold flavors and cultural traditions with this mouth-watering pasta journey.",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(food33),
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    title: "Colorful Bites for Creativity",
    description:
      "Bright meals, bold ideas—see how vibrant food presentation can spark imagination and joy.",
    href: "#",
  },
  {
    id: 5,
    image: assetSrc(food44),
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
    title: "Energize Your Routine",
    description:
      "Power your day with nourishing bowls packed with flavor, crunch, and feel-good nutrients.",
    href: "#",
  },
  {
    id: 6,
    image: assetSrc(food55),
    date: "5 OCT 2023",
    author: "SIMON KONECKI",
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
  author: string
  title: string
  description: string
  href: string
}

export default function Blog({
  eyebrow = "Editorial",
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
            <a
              key={post.id}
              href={post.href}
              className="group relative block cursor-pointer overflow-hidden rounded-[12px] shadow-soft ring-1 ring-border/40 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                boxShadow:
                  "var(--shadow-soft, 0 2px 4px -1px rgba(10, 10, 12, 0.04), 0 28px 56px -28px rgba(10, 10, 12, 0.18))",
              }}
            >
              <div className="relative aspect-[3/4] w-full bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
              />

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-start sm:p-6">
                <div className="rounded-[12px] border border-white/15 bg-card/90 p-4 shadow-soft backdrop-blur-md">
                  <span className="mb-2 block text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    {post.date}
                    <span className="mx-2 text-border" aria-hidden="true">
                      ·
                    </span>
                    {post.author}
                  </span>
                  <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground md:line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
