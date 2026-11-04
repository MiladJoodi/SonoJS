"use client"

import {
  ScrollTriggerContainer,
  ScrollTriggerRow,
} from "@sonojs/ui/components/3d/scroll-trigger"

const REVIEWS = [
  {
    text: "SonoJS made our design system feel consistent without slowing shipping. Components drop in clean and stay ours.",
    author: "Aria Thompson",
    company: "CreativePixel Studio",
    avatar: "/media/3d/scroll-trigger/avatar-1.webp",
  },
  {
    text: "We stood up a full SaaS dashboard in days. The copy-source CLI and registry deps are exactly what we needed.",
    author: "Ethan Rivera",
    company: "CodeLoom Technologies",
    avatar: "/media/3d/scroll-trigger/avatar-2.webp",
  },
  {
    text: "Flexible enough for product work, polished enough for marketing. Direction and tokens just work.",
    author: "Maya Chen",
    company: "Visionary Labs",
    avatar: "/media/3d/scroll-trigger/avatar-3.webp",
  },
  {
    text: "From landing pages to dense tools, the same control scale keeps everything readable and on-brand.",
    author: "Liam Patel",
    company: "NextGen Interfaces",
    avatar: "/media/3d/scroll-trigger/avatar-4.webp",
  },
  {
    text: "Motion, spacing, and component harmony make every screen feel intentional. Our team ships faster with less polish debt.",
    author: "Zoe Williams",
    company: "Studio Aurora",
    avatar: "/media/3d/scroll-trigger/avatar-5.webp",
  },
]

function ReviewCard({
  text,
  author,
  company,
  avatar,
}: (typeof REVIEWS)[number]) {
  return (
    <div className="ms-4 inline-flex w-72 shrink-0 flex-col items-start rounded-[12px] border border-border/70 bg-card p-4 shadow-soft">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt=""
          width={48}
          height={48}
          className="size-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="min-w-0 text-start">
          <h4 className="truncate text-sm font-semibold text-foreground">
            {author}
          </h4>
          <p className="truncate text-xs text-muted-foreground">{company}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-pretty text-foreground">
        {text}
      </p>
    </div>
  )
}

export function ScrollTriggerDefault() {
  return (
    <div className="relative w-full overflow-hidden py-2">
      <ScrollTriggerContainer className="w-full">
        <ScrollTriggerRow baseVelocity={6} direction={1} className="py-2">
          {REVIEWS.map((review) => (
            <ReviewCard key={`a-${review.author}`} {...review} />
          ))}
        </ScrollTriggerRow>
        <ScrollTriggerRow baseVelocity={6} direction={-1} className="py-2">
          {REVIEWS.map((review) => (
            <ReviewCard key={`b-${review.author}`} {...review} />
          ))}
        </ScrollTriggerRow>
        <ScrollTriggerRow baseVelocity={6} direction={1} className="py-2">
          {REVIEWS.map((review) => (
            <ReviewCard key={`c-${review.author}`} {...review} />
          ))}
        </ScrollTriggerRow>
      </ScrollTriggerContainer>
      <div className="pointer-events-none absolute inset-y-0 start-0 w-1/5 bg-linear-to-r from-background to-transparent sm:w-1/4" />
      <div className="pointer-events-none absolute inset-y-0 end-0 w-1/5 bg-linear-to-l from-background to-transparent sm:w-1/4" />
    </div>
  )
}
