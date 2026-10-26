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
    description:
      "Discover delicious and easy-to-make pasta recipes perfect for any occasion, from weeknight dinners to family gatherings.",
    date: "08 April 2024",
    href: "#",
  },
  {
    id: 2,
    image: assetSrc(food11),
    title: "Healthy Eating Made Simple",
    description:
      "Learn how to build balanced meals with fresh ingredients that fuel your day and support a healthy lifestyle.",
    date: "28 March 2024",
    href: "#",
  },
  {
    id: 3,
    image: assetSrc(food22),
    title: "Futuristic Food Tech Trends",
    description:
      "Dive into the innovations reshaping how we eat — from lab-grown meat to AI-assisted cooking.",
    date: "15 March 2024",
    href: "#",
  },
  {
    id: 4,
    image: assetSrc(food33),
    title: "Fast Food Favorites Make at Home",
    description:
      "Recreate your favorite fast food dishes in your kitchen with these fun and simple recipes.",
    date: "05 March 2024",
    href: "#",
  },
  {
    id: 5,
    image: assetSrc(food44),
    title: "Bowl Meals for Busy Days",
    description:
      "Try these nutrient-packed bowl meals that are quick to prep and easy to customize to your taste.",
    date: "26 February 2024",
    href: "#",
  },
  {
    id: 6,
    image: assetSrc(food55),
    title: "Desserts That Spark Joy",
    description:
      "Treat yourself with playful and colorful dessert ideas that are just as fun to make as they are to eat.",
    date: "12 February 2024",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  image: string
  title: string
  description: string
  date: string
  href: string
}

export default function Blog({
  eyebrow = "Stories",
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
      <div className="mx-auto max-w-md sm:max-w-4xl lg:max-w-6xl">
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

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group text-start">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  {post.date}
                </p>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <a
                  href={post.href}
                  className="mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read more
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
