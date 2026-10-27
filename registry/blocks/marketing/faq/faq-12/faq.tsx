"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Do you provide any free plan?",
    answer:
      "Yes. Our free plan includes core features so you can explore the product before upgrading. Paid plans unlock higher limits, team seats, and priority support.",
  },
  {
    question: "How to claim your 25% discount offer?",
    answer:
      "Apply the promo code at checkout during signup, or enter it under Billing → Plans. Offers are limited-time and cannot be combined with other promotions.",
  },
  {
    question: "What’s your refund policy?",
    answer:
      "If you are not satisfied, contact support within 14 days of your first paid charge. Eligible refunds are returned to the original payment method.",
  },
  {
    question: "How to get support for the product?",
    answer:
      "Browse the Help Center, open a ticket from Settings → Support, or email support@example.com. Paid plans include faster response times.",
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
    <svg
      width={open ? 20 : 18}
      height={open ? 20 : 18}
      viewBox={open ? "0 0 20 20" : "0 0 18 18"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("relative top-0.5 shrink-0", className)}
    >
      {open ? (
        <path
          d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M14.25 6.75L9 12L3.75 6.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function FaqCard({
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
        "rounded-2xl border-2 bg-card/80 px-6 py-6 shadow-soft transition-colors duration-200 sm:px-8 sm:py-7",
        isOpen ? "border-primary" : "border-border/70"
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <span className="min-w-0 flex-1">
          <h3
            id={headingId}
            className="text-lg font-semibold leading-normal text-foreground"
          >
            {item.question}
          </h3>
        </span>
        <ChevronIcon
          open={isOpen}
          className={isOpen ? "text-primary" : "text-foreground"}
        />
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
          <p className="mt-4 text-base font-medium leading-relaxed text-muted-foreground">
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

  const [openIndexes, setOpenIndexes] = React.useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-muted/40 px-4 pb-20 pt-16 md:px-8 md:pb-24 md:pt-20",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-48 w-[min(100%,40rem)] rounded-full bg-primary/15 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-primary md:mb-7">
          Have any questions?
        </p>
        <h2
          id={`${uid}-title`}
          className="mb-10 text-center text-4xl font-bold tracking-tight text-foreground md:mb-14 md:text-6xl lg:text-7xl"
        >
          Frequently Asked Questions
        </h2>

        <div className="mb-8 space-y-2 md:mb-11">
          {faqData.map((item, index) => (
            <FaqCard
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndexes.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <p className="text-center text-base font-medium text-muted-foreground">
          <span>Still have any questions? </span>
          <a
            href="#contact"
            className="cursor-pointer font-semibold text-primary hover:text-primary/80"
          >
            Contact us
          </a>
        </p>
      </div>
    </section>
  )
}
