"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How should I develop my workflow over time?",
    answer:
      "Start with a small set of reusable patterns, document what you ship, and prune unused variants each quarter as the product grows.",
    featured: true,
  },
  {
    question: "How often should the app be updated?",
    answer:
      "We ship improvements regularly. Enable automatic updates for the best experience, or follow the changelog when you prefer to update manually.",
    featured: false,
  },
  {
    question: "Can I pay by credit card?",
    answer:
      "Yes. Major credit and debit cards are accepted at checkout, and you can change your payment method anytime in Billing settings.",
    featured: false,
  },
  {
    question: "Do you offer a free plan?",
    answer:
      "Yes. The free plan includes core features so you can explore before upgrading. Paid plans unlock higher limits and priority support.",
    featured: false,
  },
  {
    question: "How do I contact support?",
    answer:
      "Open a ticket from Settings → Support, or email support@example.com. We typically reply within one business day on weekdays.",
    featured: false,
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
        width="20"
        height="12"
        viewBox="0 0 20 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="text-foreground"
      >
        <path
          d="M1 1.5L10 10.5L19 1.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function StepDot({ n }: { n: number }) {
  return (
    <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-card shadow-soft">
      <span className="text-2xl font-bold text-foreground">{n}</span>
    </div>
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

  return (
    <div
      className={cn(
        "mb-8 max-w-4xl last:mb-0 md:mb-10",
        item.featured &&
          "rounded-3xl bg-card px-6 py-7 shadow-soft md:px-10 md:py-9"
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-6 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-amber-400 md:gap-10",
          !item.featured && "px-2 md:px-4"
        )}
      >
        <h3
          id={headingId}
          className="min-w-0 flex-1 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
        >
          {item.question}
        </h3>
        <ChevronIcon open={isOpen} />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isOpen}
        inert={!isOpen ? true : undefined}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out",
          !item.featured && "px-2 md:px-4"
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-4 max-w-2xl text-start text-base font-normal leading-relaxed text-foreground/80 md:mt-5 md:text-lg">
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

  const [openIndexes, setOpenIndexes] = React.useState<number[]>([0])
  const [showAll, setShowAll] = React.useState(false)

  const visible = showAll ? faqData : faqData.slice(0, 3)

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      className={cn(
        "bg-amber-400 px-4 py-16 font-medium text-foreground md:px-8 md:py-24 2xl:pb-48 2xl:pt-40",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <span className="mb-6 block text-xs uppercase leading-4 tracking-widest text-foreground/80 md:mb-9">
          The Most popular
        </span>
        <h2
          id={`${uid}-title`}
          className="mb-12 text-6xl font-semibold leading-none tracking-tight md:mb-16 md:text-8xl lg:mb-20 lg:text-9xl"
        >
          FAQ&apos;s
        </h2>

        {/* Mobile step rail */}
        <div className="relative mb-12 flex justify-between md:hidden">
          {[1, 2, 3].map((n) => (
            <StepDot key={n} n={n} />
          ))}
          <div
            aria-hidden
            className="absolute start-6 end-6 top-1/2 h-0.5 -translate-y-1/2 bg-foreground"
          />
        </div>

        <div className="flex gap-8 lg:gap-12">
          {/* Desktop step rail */}
          <div className="relative top-6 hidden shrink-0 flex-col md:flex">
            <div className="mb-28 lg:mb-24">
              <StepDot n={1} />
            </div>
            <div className="mb-16 lg:mb-12">
              <StepDot n={2} />
            </div>
            <div>
              <StepDot n={3} />
            </div>
            <div
              aria-hidden
              className="absolute left-1/2 top-6 h-[18rem] w-0.5 -translate-x-1/2 bg-foreground lg:h-64"
            />
          </div>

          <div className="min-w-0 flex-1">
            {visible.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndexes.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}

            <div className="mt-10 flex justify-center md:mt-14">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-medium tracking-tight text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-amber-400 md:px-10 md:py-5 md:text-xl"
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
