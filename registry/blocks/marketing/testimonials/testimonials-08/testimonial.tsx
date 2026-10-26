"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import avatar1 from "./images/avatar-1.webp"
import avatar2 from "./images/avatar-2.webp"
import avatar3 from "./images/avatar-3.webp"

const STAR_PATH =
  "m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z"

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src
}

function StarIcon({
  filled,
  className,
  ...props
}: React.ComponentProps<"svg"> & { filled?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn(
        "size-3.5",
        filled
          ? "fill-[#ffc107]"
          : "fill-[#CED5D8] dark:fill-neutral-600",
        className
      )}
      {...props}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Founder of Rubik",
    image: avatar1,
    quote:
      "SonoJS made it easy to launch my site. The components are clean, fast to use, and saved hours of build time.",
    stars: 4,
  },
  {
    id: 2,
    name: "Mark Adair",
    role: "Founder of Alpha",
    image: avatar2,
    quote:
      "Everything looks professional with SonoJS. The blocks are modern, responsive, and simple to customize.",
    stars: 5,
  },
  {
    id: 3,
    name: "Simon Konecki",
    role: "Founder of Labar",
    image: avatar3,
    quote:
      "SonoJS gave my project a polished look without the hassle. The layouts are clear and ready to ship.",
    stars: 4,
  },
  {
    id: 4,
    name: "Jane Smith",
    role: "CEO of Beta",
    image: avatar1,
    quote:
      "Exceptional quality and very easy to integrate into our existing workflow. Highly recommended.",
    stars: 5,
  },
]

export default function Testimonial({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  React.useEffect(() => {
    const slider = scrollRef.current
    if (!slider) return

    const updateButtonStates = () => {
      const { scrollLeft, scrollWidth, clientWidth } = slider
      const maxScroll = Math.max(0, scrollWidth - clientWidth)
      setCanScrollPrev(scrollLeft > 5)
      setCanScrollNext(scrollLeft < maxScroll - 5)
    }

    updateButtonStates()
    slider.addEventListener("scroll", updateButtonStates, { passive: true })
    window.addEventListener("resize", updateButtonStates)

    return () => {
      slider.removeEventListener("scroll", updateButtonStates)
      window.removeEventListener("resize", updateButtonStates)
    }
  }, [])

  const scroll = (direction: "prev" | "next") => {
    const slider = scrollRef.current
    const track = trackRef.current
    const card = track?.querySelector("figure")
    if (!slider || !track || !card) return

    const style = window.getComputedStyle(track)
    const gap = Number.parseFloat(style.columnGap || style.gap) || 0
    const scrollAmount = (card as HTMLElement).offsetWidth + gap

    // Scroll island is dir=ltr so scrollLeft math stays consistent in RTL pages.
    slider.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section
      className={cn("w-full px-4 md:px-8", className)}
      aria-labelledby="testimonials-heading"
      {...props}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid max-w-2xl gap-6 max-lg:mx-auto md:mb-16 lg:max-w-none lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2
              id="testimonials-heading"
              className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              What our happy clients say
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              See what our happy clients have to say. They shared how these
              blocks helped them launch quickly.
            </p>
          </div>

          <div className="flex items-end justify-end gap-4 max-lg:justify-center">
            <button
              type="button"
              onClick={() => scroll("prev")}
              disabled={!canScrollPrev}
              aria-label="Previous testimonial"
              className={cn(
                "grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-border/70 bg-muted transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                canScrollPrev ? "opacity-100" : "opacity-50"
              )}
            >
              <ChevronLeftIcon className="size-3.5 text-foreground icon-dir" />
            </button>
            <button
              type="button"
              onClick={() => scroll("next")}
              disabled={!canScrollNext}
              aria-label="Next testimonial"
              className={cn(
                "grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-primary bg-primary text-primary-foreground transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                canScrollNext ? "opacity-100" : "opacity-50"
              )}
            >
              <ChevronRightIcon className="size-3.5 icon-dir" />
            </button>
          </div>
        </div>

        {/* dir=ltr keeps carousel scrollLeft math stable under RTL pages */}
        <div ref={scrollRef} className="overflow-hidden px-2 sm:px-10" dir="ltr">
          <div ref={trackRef} className="flex gap-6 sm:gap-14">
            {testimonials.map((item) => (
              <figure
                key={item.id}
                className="relative h-auto max-w-[330px] shrink-0 rounded-[12px] border-2 border-border/70 bg-card py-4 ps-4 pe-4 shadow-soft sm:ps-14"
              >
                <img
                  src={assetSrc(item.image)}
                  alt={item.name}
                  className="relative mb-4 size-12 rounded-full border-2 border-border/70 object-cover sm:absolute sm:inset-y-0 sm:-start-10 sm:my-auto sm:mb-0 sm:size-20"
                  width={80}
                  height={80}
                />

                <figcaption className="text-start" dir="auto">
                  <p className="text-sm font-semibold text-foreground">
                    {item.name}
                  </p>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {item.role}
                  </span>
                </figcaption>

                <blockquote className="mt-4 text-start" dir="auto">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.quote}
                  </p>
                </blockquote>

                <div
                  className="mt-4 flex gap-2"
                  role="img"
                  aria-label={`${item.stars} out of 5 stars`}
                  dir="ltr"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon key={i} filled={i < item.stars} />
                  ))}
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
