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
    <span
      className={cn(
        "inline-block shrink-0 transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
        className
      )}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="text-zinc-500"
      >
        <path
          d="M17.9207 8.17993L11.6907 8.17993H6.08072C5.12072 8.17993 4.64073 9.33993 5.32073 10.0199L10.5007 15.1999C11.3307 16.0299 12.6807 16.0299 13.5107 15.1999L15.4807 13.2299L18.6907 10.0199C19.3607 9.33993 18.8807 8.17993 17.9207 8.17993Z"
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

  return (
    <div className="rounded-3xl bg-zinc-950 p-6 sm:p-8 md:p-10">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
      >
        <span className="min-w-0 flex-1">
          <h3
            id={headingId}
            className="text-lg font-black tracking-tight text-zinc-50 sm:text-xl"
          >
            {item.question}
          </h3>
        </span>
        <ChevronIcon open={isOpen} />
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
          <p className="mt-4 text-base font-semibold leading-relaxed text-zinc-400">
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
        "overflow-hidden bg-zinc-950 px-4 py-10 md:px-8",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 px-5 py-12 sm:px-8 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[min(100%,36rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.18)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto mb-10 max-w-xl text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-primary md:mb-5">
            Frequently asked questions
          </span>
          <h2
            id={`${uid}-title`}
            className="mb-5 text-4xl font-black tracking-tight text-zinc-50 md:mb-6 md:text-5xl lg:text-6xl"
          >
            Got questions? We’re here to help!
          </h2>
          <p className="text-base font-semibold leading-relaxed text-zinc-400">
            Find quick answers about plans, discounts, refunds, and product
            support before you reach out to the team.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-8 space-y-3 md:mb-10 md:space-y-6">
            {faqData.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndexes.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>

          <p className="text-center text-base font-semibold text-zinc-400">
            <span>Still have any questions? </span>
            <a
              href="#contact"
              className="cursor-pointer text-primary hover:text-primary/80"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
