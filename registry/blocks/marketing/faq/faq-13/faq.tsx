"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "Is it really unlimited downloads?",
    answer:
      "Yes on paid plans. Download any asset in your library as often as you need for personal or commercial projects under your license terms.",
  },
  {
    question: "Do you offer discounts on annual plans?",
    answer:
      "Annual plans include a discounted rate compared to paying monthly. You can switch from monthly to annual anytime from Billing settings.",
  },
  {
    question: "What kind of file do you offer with the packages?",
    answer:
      "Packages include source files in common formats such as Figma, SVG, PNG, and code snippets where applicable. Exact contents are listed on each product page.",
  },
  {
    question: "Can I invite my team members?",
    answer:
      "Yes. Team and business plans let you invite members by email and assign roles so everyone can share the same library and licenses.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "If the product does not meet your needs, contact support within 14 days of purchase. Eligible refunds are issued to the original payment method.",
  },
] as const

function ToggleIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="shrink-0 text-foreground"
      >
        <path
          d="M3.75 7.5L9 2.25M9 2.25L14.25 7.5M9 2.25V15.75"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="icon-dir shrink-0 text-foreground"
    >
      <path
        d="M10.5 3.75L15.75 9M15.75 9L10.5 14.25M15.75 9L2.25 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
  isLast,
}: {
  item: (typeof faqData)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
  isLast: boolean
}) {
  const uid = React.useId()
  const headingId = `${uid}-heading-${index}`
  const panelId = `${uid}-panel-${index}`

  return (
    <div className={cn(!isLast && "bg-gradient-to-r from-primary via-sky-400 to-cyan-500 pb-px")}>
      <div className="bg-card px-4 py-3.5 sm:px-5">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-start justify-between gap-3 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="min-w-0 flex-1">
            <h3
              id={headingId}
              className="text-lg font-semibold text-foreground"
            >
              {item.question}
            </h3>
          </span>
          <span className="pt-1">
            <ToggleIcon open={isOpen} />
          </span>
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
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:mt-5">
              {item.answer}
            </p>
          </div>
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
        "overflow-hidden px-4 py-16 md:px-8 md:pb-24 md:pt-20",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl">
        <h2
          id={`${uid}-title`}
          className="mb-10 text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:mb-14 md:text-6xl lg:text-7xl"
        >
          Frequently asked question
        </h2>

        <div className="mx-auto max-w-2xl bg-gradient-to-br from-primary via-sky-400 to-cyan-500 p-px shadow-soft">
          <div className="bg-card">
            {faqData.map((item, index) => (
              <FaqRow
                key={item.question}
                item={item}
                index={index}
                isOpen={openIndexes.includes(index)}
                onToggle={() => toggleItem(index)}
                isLast={index === faqData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
