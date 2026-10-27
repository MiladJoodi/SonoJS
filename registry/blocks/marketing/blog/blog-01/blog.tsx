import type * as React from "react"

import { cn } from "@/lib/utils"

import aiImg from "./images/ai-img1.webp"
import hacksWatch from "./images/hacks-watch.webp"
import headphone from "./images/headphone-img8.webp"
import hotelImg from "./images/hotel-img.webp"
import imagination from "./images/imagination.webp"
import teamImage from "./images/team-image.webp"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

const DEFAULT_POSTS = [
  {
    id: 1,
    title: "Creative Design Trends",
    description:
      "Stay ahead of the curve with the latest creative design trends shaping the digital world.",
    image: assetSrc(aiImg),
    alt: "Creative design trends cover",
    href: "#",
  },
  {
    id: 2,
    title: "The Rise of Boutique Hotels",
    description:
      "Explore how boutique hotels are redefining luxury and guest experience in the travel industry.",
    image: assetSrc(hotelImg),
    alt: "Boutique hotel cover",
    href: "#",
  },
  {
    id: 3,
    title: "Boost Team Productivity",
    description:
      "Discover powerful techniques to help your team collaborate better and get more done.",
    image: assetSrc(teamImage),
    alt: "Team collaboration cover",
    href: "#",
  },
  {
    id: 4,
    title: "Ecommerce Trends to Watch",
    description:
      "Stay ahead with insights into what's driving the future of online shopping and digital retail.",
    image: assetSrc(headphone),
    alt: "Ecommerce trends cover",
    href: "#",
  },
  {
    id: 5,
    title: "Time Management Hacks",
    description:
      "Master your schedule with proven strategies that save hours each week and reduce stress.",
    image: assetSrc(hacksWatch),
    alt: "Time management cover",
    href: "#",
  },
  {
    id: 6,
    title: "The Power of Creativity",
    description:
      "Uncover how creative thinking fuels innovation and helps brands stay competitive in any market.",
    image: assetSrc(imagination),
    alt: "Creativity cover",
    href: "#",
  },
]

export type BlogPost = {
  id: number
  title: string
  description: string
  image: string
  alt: string
  href: string
}

export default function Blog({
  eyebrow = "Journal",
  title = "Latest Blog Posts",
  description = "Explore our latest articles, insights, and practical tips to help you stay updated and build better products.",
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
      <div className="mx-auto max-w-md sm:max-w-4xl lg:max-w-6xl">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
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
              <a
                href={post.href}
                className="block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="px-5 pt-5 pb-5 text-start sm:px-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
