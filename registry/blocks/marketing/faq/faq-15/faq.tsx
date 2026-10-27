"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "How many items are there in this list?",
    answer:
      "This FAQ includes five common questions covering licensing, usage, and support. You can expand or collapse each item independently to find what you need.",
  },
  {
    question: "Can you describe the product in just one sentence?",
    answer:
      "A copy-ready UI kit that helps teams ship polished marketing and product interfaces without rebuilding the same patterns from scratch.",
  },
  {
    question: "Can I use this template for my client?",
    answer:
      "Yes. You can use these components in personal and commercial client projects. Redistributing the source as a competing kit is not allowed.",
  },
  {
    question: "Do you offer templates in other categories?",
    answer:
      "Yes. Beyond FAQ blocks you will find heroes, pricing, footers, forms, and more. New categories are added regularly based on what teams request most.",
  },
  {
    question: "Do I need to credit you when I use this template?",
    answer:
      "Attribution is appreciated but not required for shipped products. Keep license notices in your source if you redistribute unmodified kit files.",
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
        open ? "rotate-90" : "rotate-0",
        className
      )}
    >
      <svg
        width="9"
        height="14"
        viewBox="0 0 9 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className="icon-dir text-foreground"
      >
        <path
          d="M1.5 1.16683L7.33333 7.00016L1.5 12.8335"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
    <div className="rounded-[12px] border border-border/70 bg-card p-5 shadow-soft transition-colors duration-200 hover:border-border sm:p-6">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <h3
          id={headingId}
          className="min-w-0 flex-1 text-base font-semibold tracking-tight text-foreground"
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
        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
      >
        <div className="min-h-0 overflow-hidden">
          <p className="mt-5 text-base leading-relaxed tracking-tight text-muted-foreground sm:mt-6">
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
        "overflow-hidden bg-background px-4 py-16 md:px-8 md:py-24 lg:py-32",
        className
      )}
      aria-labelledby={`${uid}-title`}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 md:gap-8 lg:gap-16">
        <div className="md:pe-4">
          <span className="mb-5 inline-flex max-w-max rounded-full bg-primary px-3 py-1.5 text-sm font-semibold uppercase tracking-tight text-primary-foreground md:mb-6">
            Try some freebie
          </span>
          <h2
            id={`${uid}-title`}
            className="text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl"
          >
            Provide some additional information with this FAQ Accordion.
          </h2>
        </div>

        <div className="space-y-3">
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
      </div>
    </section>
  )
}
