"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    id: 1,
    question: "How do I deploy my app to production?",
    answer:
      "You can deploy your app using platforms like Vercel, Netlify, or your own server. Make sure to configure environment variables and use a production build (`npm run build`) before deployment.",
  },
  {
    id: 2,
    question: "Can I use a custom domain with my project?",
    answer:
      "Yes, you can connect a custom domain via your DNS provider. Most platforms like Vercel or Netlify offer simple guides to point your domain to your deployed site.",
  },
  {
    id: 3,
    question: "How do I contribute or suggest improvements to the platform?",
    answer:
      "You can contribute by submitting feedback through our contact form or GitHub issues (if applicable). We welcome ideas and suggestions to improve our UI components and developer experience.",
  },
  {
    id: 4,
    question: "Is the codebase optimized for SEO and performance?",
    answer:
      "Yes, our components are built with performance and SEO in mind. HTML is semantic, images are optimized, and we follow best practices like lazy loading, accessibility, and Open Graph support.",
  },
] as const

function PlusMinusIcon({
  open,
  className,
}: {
  open: boolean
  className?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("size-3.5 shrink-0 fill-current", className)}
      aria-hidden
    >
      <path d="M40.421 215.579H471.579C493.868 215.579 512 233.711 512 256s-18.132 40.421-40.421 40.421H40.421C18.132 296.421 0 278.289 0 256s18.132-40.421 40.421-40.421z" />
      <path
        className={cn(
          "origin-center transition-opacity duration-300",
          open ? "opacity-0" : "opacity-100"
        )}
        d="M215.579 40.421C215.579 18.132 233.711 0 256 0s40.421 18.132 40.421 40.421v431.158C296.421 493.868 278.289 512 256 512s-40.421-18.132-40.421-40.421V40.421z"
      />
    </svg>
  )
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const uid = React.useId()
  const headingId = `${uid}-heading-${item.id}`
  const panelId = `${uid}-panel-${item.id}`

  return (
    <div
      className={cn(
        "rounded-[12px] border border-border/70 bg-card shadow-soft transition-colors duration-300",
        isOpen && "bg-muted"
      )}
    >
      <h3 id={headingId}>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center gap-4 rounded-[12px] p-5 text-start text-base font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="min-w-0 flex-1">{item.question}</span>
          <PlusMinusIcon open={isOpen} className="text-foreground" />
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="min-h-0 overflow-hidden">
          <p className="px-5 pb-5 text-base leading-relaxed text-muted-foreground">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()

  const [openIds, setOpenIds] = React.useState<number[]>([1])

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section
      className={cn(
        "mx-auto w-full max-w-5xl bg-canvas px-4 py-12 md:px-8 md:py-16",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mb-8 max-w-3xl md:mb-10">
        <h2
          id={`${uid}-title`}
          className="mb-4 text-2xl font-semibold tracking-tight text-foreground md:mb-6 md:text-3xl"
        >
          Frequently Asked Questions
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Explore common questions about using our platform, managing your
          account, billing, and accessing support. Whether you&apos;re a
          developer or a new user, this section helps you get quick answers
          without the hassle.
        </p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {faqData.map((item) => (
          <FaqItem
            key={item.id}
            item={item}
            isOpen={openIds.includes(item.id)}
            onToggle={() => toggleFaq(item.id)}
          />
        ))}
      </div>
    </section>
  )
}
