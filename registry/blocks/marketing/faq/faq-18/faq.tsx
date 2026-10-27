"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How should I develop my workflow over time?",
    intro: "Build habits that scale as your team and product grow:",
    bullets: [
      "Start with a small set of reusable components",
      "Document patterns as you ship new pages",
      "Review and prune unused variants each quarter",
    ],
  },
  {
    question: "Can I pay by card?",
    intro:
      "Yes. Major credit and debit cards are accepted at checkout. You can update your payment method anytime from Billing settings.",
    bullets: [],
  },
  {
    question: "How often should the app be updated?",
    intro:
      "We ship improvements regularly. Enable automatic updates for the best experience, or check the changelog when you prefer to update manually.",
    bullets: [],
  },
  {
    question: "Are the apps free?",
    intro:
      "A free plan is available with core features. Paid plans unlock higher limits, team seats, and priority support when you need more.",
    bullets: [],
  },
] as const

function ChevronIcon({
  open,
  className,
}: {
  open: boolean
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
        className
      )}
    >
      <svg
        className="size-4 text-primary"
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M16.0185 0.999999C16.2905 0.732 16.7275 0.732 16.9975 0.999999C17.2675 1.268 17.2685 1.701 16.9975 1.969L9.0895 9.799C8.8195 10.067 8.3825 10.067 8.1105 9.799L0.2025 1.969C-0.0675004 1.701 -0.0675004 1.268 0.2025 1C0.4735 0.732 0.9115 0.732 1.1815 1L8.6005 8.141L16.0185 0.999999Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const uid = React.useId()
  const headingId = `${uid}-heading-${index}`
  const panelId = `${uid}-panel-${index}`
  const number = index + 1

  return (
    <li className="mb-4 rounded-2xl bg-card px-4 py-6 shadow-soft last:mb-0 sm:py-8 lg:px-12">
      <div className="flex gap-4 sm:gap-8">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
          {number}
        </span>

        <div className="min-w-0 flex-1 pt-2 sm:pt-3">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full cursor-pointer items-start justify-between gap-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <h3
              id={headingId}
              className="text-lg font-bold text-foreground sm:text-xl"
            >
              {item.question}
            </h3>
            <ChevronIcon open={isOpen} className="mt-1" />
          </button>

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
              <div className="mt-5 border-s-2 border-border/70 ps-6 sm:mt-6 sm:ps-10">
                <p className="text-lg text-muted-foreground sm:text-xl">
                  {item.intro}
                </p>
                {item.bullets.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-3 text-base text-foreground sm:gap-6 sm:text-lg"
                      >
                        <span
                          aria-hidden
                          className="size-2 shrink-0 rounded-full bg-primary"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Faq({
  className,
  ...props
}: React.ComponentProps<"section">) {
  const uid = React.useId()

  const [openIndexes, setOpenIndexes] = React.useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      className={cn(
        "bg-primary/5 px-4 py-16 md:px-8 md:py-20 2xl:py-40",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 text-center md:mb-20">
          <span className="text-base font-bold text-primary md:text-lg">
            Hey! Have any questions?
          </span>
          <h2
            id={`${uid}-title`}
            className="mt-6 text-5xl font-bold tracking-tight text-foreground md:mt-8 md:text-6xl lg:text-7xl"
          >
            FAQ&apos;s
          </h2>
        </div>

        <ul className="mx-auto max-w-4xl">
          {faqData.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndexes.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
